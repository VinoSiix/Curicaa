/*
 * Auth Script — Curicaa
 * Real backend auth using Supabase.
 * Accounts persist in the cloud — work across devices and browsers.
 */
(function () {
  // ─── Supabase Config ───
  var SUPABASE_URL = 'https://muhtsytbbdzkfeiugdoo.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aHRzeXRiYmR6a2ZlaXVnZG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTYyNzMsImV4cCI6MjA5Mzg3MjI3M30.JOr0rv0K_GBSarVq8VXFMhCGnznRZz4LZWA2JaPwEWQ';

  var sb = null;           // Supabase client
  var currentUser = null;  // Cached profile in memory (sync reads)

  // ─── Initialize Supabase client ───
  function init() {
    if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
      console.error('[Auth] Supabase JS not loaded.');
      return false;
    }
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }

  // ─── Load profile from the profiles table ───
  function loadProfile(userId) {
    return sb
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
      .then(function (result) {
        if (result.error) {
          console.error('[Auth] Profile load error:', result.error.message);
          return null;
        }
        var d = result.data;
        currentUser = {
          id: d.id,
          name: d.name,
          email: d.email,
          plan: d.plan || 'free',
          grades: Array.isArray(d.grades) ? d.grades : []
        };
        return currentUser;
      });
  }

  // ─── Create or fix profile (for Google OAuth users) ───
  function ensureProfile(authUser) {
    var metaName = (authUser.user_metadata && authUser.user_metadata.full_name) ||
                   (authUser.user_metadata && authUser.user_metadata.name) || '';
    var email = (authUser.email || '').toLowerCase();

    // First check if profile already exists — never overwrite plan/grades
    return loadProfile(authUser.id).then(function (existing) {
      if (existing) return existing;

      // Profile doesn't exist yet — create it
      return sb
        .from('profiles')
        .insert({
          id: authUser.id,
          name: metaName || email.split('@')[0],
          email: email,
          plan: 'free',
          grades: []
        })
        .then(function () {
          return loadProfile(authUser.id);
        })
        .then(function (profile) {
          return profile || {
            id: authUser.id,
            name: metaName || email.split('@')[0],
            email: email,
            plan: 'free',
            grades: []
          };
        });
    });
  }

  // ─── Expose to window (same API surface as old localStorage version) ───
  window.CuricaaAuth = {

    getUsers: function () {
      // Deprecated — admin only, no longer available client-side
      return [];
    },

    getSession: function () {
      return currentUser;
    },

    /**
     * Sign up a new user.
     * Returns Promise<{ ok, user?, error? }>
     */
    signup: function (name, email, password) {
      if (!name || name.trim().length < 2) return Promise.resolve({ ok: false, error: 'Please enter your name.' });
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Promise.resolve({ ok: false, error: 'Please enter a valid email address.' });
      if (!password || password.length < 8) return Promise.resolve({ ok: false, error: 'Password must be at least 8 characters.' });
      if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) return Promise.resolve({ ok: false, error: 'Password must contain at least one letter and one number.' });

      if (!sb) return Promise.resolve({ ok: false, error: 'Auth service not available.' });

      return sb.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
        options: {
          data: { name: name.trim() }
        }
      }).then(function (result) {
        if (result.error) {
          var msg = result.error.message || 'Signup failed.';
          // Friendly error messages
          if (msg.indexOf('already registered') !== -1) msg = 'Could not create account. Please try logging in or use a different email.';
          if (msg.indexOf('Password') === 0) msg = 'Password must be at least 6 characters.';
          return { ok: false, error: msg };
        }

        var authUser = result.data.user;
        if (!authUser) {
          // Email confirmation required — user not logged in yet
          return { ok: false, error: 'If an account exists with this email, you\'ll receive a confirmation. Please check your inbox.' };
        }

        // Trigger auto-creates the profile, but it might not be ready yet.
        // Retry up to 3 times with 500ms between attempts.
        function retryProfile(userId, attempts, resolve) {
          if (attempts <= 0) {
            currentUser = {
              id: authUser.id,
              name: name.trim(),
              email: email.trim().toLowerCase(),
              plan: 'free',
              grades: []
            };
            resolve({ ok: true, user: currentUser });
            return;
          }
          loadProfile(userId).then(function (profile) {
            if (profile) {
              resolve({ ok: true, user: profile });
            } else {
              setTimeout(function () {
                retryProfile(userId, attempts - 1, resolve);
              }, 500);
            }
          });
        }
        return new Promise(function (resolve) {
          retryProfile(authUser.id, 3, resolve);
        });
      }).catch(function (e) {
        return { ok: false, error: e.message || 'Signup failed.' };
      });
    },

    /**
     * Log in an existing user.
     * Returns Promise<{ ok, user?, error? }>
     */
    login: function (email, password) {
      if (!sb) return Promise.resolve({ ok: false, error: 'Auth service not available.' });

      return sb.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password
      }).then(function (result) {
        if (result.error) {
          return { ok: false, error: 'Invalid email or password.' };
        }

        return loadProfile(result.data.user.id).then(function (profile) {
          if (!profile) {
            return { ok: false, error: 'Account not found. Please sign up first.' };
          }
          return { ok: true, user: profile };
        });
      }).catch(function () {
        return { ok: false, error: 'Invalid email or password.' };
      });
    },

    /**
     * Sign in with Google.
     * Redirects to Google, then back to the site.
     */
    loginWithGoogle: function () {
      if (!sb) return;
      var redirectUrl = window.location.origin + '/hub.html';
      sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
    },

    /**
     * Log out.
     * Returns Promise<void>
     */
    logout: function () {
      currentUser = null;
      if (!sb) return Promise.resolve();
      return sb.auth.signOut();
    },

    /**
     * Check if user is logged in (sync — reads from cached state).
     */
    isLoggedIn: function () {
      return currentUser !== null;
    },

    /**
     * Get current user (sync — reads from cached state).
     * Returns { id, name, email, plan, grades } or null.
     */
    getUser: function () {
      return currentUser;
    },

    /**
      * Get the shared Supabase client instance.
      * Used by waitlist.js and other modules that need direct Supabase access.
      */
    getClient: function () {
      return sb;
    },

    /**
     * Update the user's name (for Google OAuth users setting their name).
     * Returns Promise<void>
     */
    updateName: function (name) {
      if (!currentUser || !sb) return Promise.resolve();
      currentUser.name = name;
      return sb
        .from('profiles')
        .update({ name: name })
        .eq('id', currentUser.id);
    },

    /**
      * Update the user's plan and grades.
      * Routes through server-side RPC (verify_and_update_plan) which
      * only allows downgrades. Upgrades are blocked until Stripe integration.
      * Returns Promise<{ ok, error? }>
      */
    updatePlan: function (plan, grades) {
      if (!currentUser) return Promise.resolve({ ok: false, error: 'Not logged in.' });
      if (!sb) return Promise.resolve({ ok: false, error: 'Auth service not available.' });

      var oldPlan = currentUser.plan;
      var oldGrades = currentUser.grades ? currentUser.grades.slice() : [];

      // Optimistic UI update
      currentUser.plan = plan;
      if (grades) currentUser.grades = grades;

      return sb
        .rpc('verify_and_update_plan', {
          new_plan: plan,
          new_grades: grades || []
        })
        .then(function (result) {
          if (result.error) {
            console.error('[Auth] Plan update RPC error:', result.error.message);
            currentUser.plan = oldPlan;
            currentUser.grades = oldGrades;
            return { ok: false, error: result.error.message };
          }
          var data = result.data;
          if (data && data.ok) {
            return { ok: true };
          }
          // RPC blocked the change — revert
          currentUser.plan = oldPlan;
          currentUser.grades = oldGrades;
          var errMsg = (data && data.error) || 'Plan change not allowed.';
          console.error('[Auth] Plan update blocked:', errMsg);
          return { ok: false, error: errMsg };
        })
        .catch(function (e) {
          currentUser.plan = oldPlan;
          currentUser.grades = oldGrades;
          return { ok: false, error: e.message || 'Plan update failed.' };
        });
    },

    /**
      * Cancel the user's subscription via server-side RPC.
      * Downgrades to free plan. Returns Promise<{ ok, error? }>
      */
    cancelSubscription: function () {
      if (!currentUser) return Promise.resolve({ ok: false, error: 'Not logged in.' });
      if (!sb) return Promise.resolve({ ok: false, error: 'Auth service not available.' });

      return sb
        .rpc('cancel_subscription')
        .then(function (result) {
          if (result.error) {
            return { ok: false, error: result.error.message };
          }
          var data = result.data;
          if (data && data.ok) {
            currentUser.plan = 'free';
            currentUser.grades = [];
            return { ok: true };
          }
          return { ok: false, error: (data && data.error) || 'Cancel failed.' };
        })
        .catch(function (e) {
          return { ok: false, error: e.message || 'Cancel failed.' };
        });
    }
  };

  // ─── Boot: restore session from Supabase ───
  function boot() {
    // Clean up old localStorage auth data (migrated to Supabase)
    localStorage.removeItem('curicaa_users');
    localStorage.removeItem('curicaa_session');
    localStorage.removeItem('curicaa_accounts');
    localStorage.removeItem('curicaa_leads');

    if (!init()) {
      window.dispatchEvent(new Event('curicaa-auth-ready'));
      return;
    }

    // Check if this is a Google OAuth redirect (hash contains access_token)
    var isOAuthReturn = window.location.hash && window.location.hash.indexOf('access_token') !== -1;

    sb.auth.getSession().then(function (result) {
      var session = result.data && result.data.session;
      if (session && session.user) {
        // Try loading the profile first
        return loadProfile(session.user.id).then(function (profile) {
          if (!profile) {
            // Profile doesn't exist yet (trigger race) — create it
            return ensureProfile(session.user);
          }
          return profile;
        }).then(function (profile) {
            if (profile && isOAuthReturn) {
            // Clean up the URL hash
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
            // Check if user needs to set their name (only if name is missing or is just an email prefix)
            if (!profile.name || profile.name.indexOf('@') !== -1) {
              window.dispatchEvent(new CustomEvent('curicaa-needs-name', { detail: { email: profile.email } }));
            }
          }
          return profile;
        });
      }
      return null;
    }).then(function () {
      window.dispatchEvent(new Event('curicaa-auth-ready'));
    }).catch(function () {
      window.dispatchEvent(new Event('curicaa-auth-ready'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

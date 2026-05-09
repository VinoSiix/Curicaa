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
      if (!email || !email.includes('@')) return Promise.resolve({ ok: false, error: 'Please enter a valid email.' });
      if (!password || password.length < 6) return Promise.resolve({ ok: false, error: 'Password must be at least 6 characters.' });

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
          if (msg.indexOf('already registered') !== -1) msg = 'An account with this email already exists.';
          if (msg.indexOf('Password') === 0) msg = 'Password must be at least 6 characters.';
          return { ok: false, error: msg };
        }

        var authUser = result.data.user;
        if (!authUser) {
          // Email confirmation required — user not logged in yet
          return { ok: false, error: 'Please check your email to confirm your account, then log in.' };
        }

        // Trigger auto-creates the profile, but it might not be ready yet.
        // Load it manually with a small delay to let the trigger finish.
        return new Promise(function (resolve) {
          setTimeout(function () {
            loadProfile(authUser.id).then(function (profile) {
              if (profile) {
                resolve({ ok: true, user: profile });
              } else {
                // Trigger hasn't fired yet — create profile manually as fallback
                currentUser = {
                  id: authUser.id,
                  name: name.trim(),
                  email: email.trim().toLowerCase(),
                  plan: 'free',
                  grades: []
                };
                resolve({ ok: true, user: currentUser });
              }
            });
          }, 500);
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
      sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + window.location.pathname.replace('admin.html', 'hub.html')
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
     * Update the user's plan and grades.
     * Returns Promise<void>
     */
    updatePlan: function (plan, grades) {
      if (!currentUser) return Promise.resolve();
      if (!sb) return Promise.resolve();

      var updates = { plan: plan };
      if (grades) updates.grades = grades;

      // Optimistic local update
      currentUser.plan = plan;
      if (grades) currentUser.grades = grades;

      return sb
        .from('profiles')
        .update(updates)
        .eq('id', currentUser.id)
        .then(function (result) {
          if (result.error) {
            console.error('[Auth] Plan update failed:', result.error.message);
            // Revert optimistic update
            // (best effort — the UI already changed)
          }
        });
    }
  };

  // ─── Boot: restore session from Supabase ───
  function boot() {
    if (!init()) {
      // Supabase not available — dispatch ready event anyway
      window.dispatchEvent(new Event('curicaa-auth-ready'));
      return;
    }

    sb.auth.getSession().then(function (result) {
      var session = result.data && result.data.session;
      if (session && session.user) {
        return loadProfile(session.user.id);
      }
      return null;
    }).then(function () {
      // Dispatch ready event so other scripts can update UI
      window.dispatchEvent(new Event('curicaa-auth-ready'));
      // If we just came back from a Google redirect, update the UI immediately
      if (window.location.hash && window.location.hash.indexOf('access_token') !== -1) {
        if (typeof updateAuthUI === 'function') updateAuthUI();
      }
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

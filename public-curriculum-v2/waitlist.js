/*
 * Waitlist Script — Curicaa
 * Handles waitlist submission to Supabase.
 * Requires a logged-in account to join the waitlist.
 * Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project credentials.
 */
(function () {
  // ─── CONFIG — Replace these with your Supabase project values ───
  var SUPABASE_URL = 'https://muhtsytbbdzkfeiugdoo.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aHRzeXRiYmR6a2ZlaXVnZG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTYyNzMsImV4cCI6MjA5Mzg3MjI3M30.JOr0rv0K_GBSarVq8VXFMhCGnznRZz4LZWA2JaPwEWQ';

  var supabaseClient = null;

  // ─── Initialize Supabase ───
  function initSupabase() {
    if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
      console.error('Supabase JS not loaded. Waitlist disabled.');
      return false;
    }
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
      console.warn('Supabase credentials not configured. Waitlist in demo mode.');
      return false;
    }
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }

  // ─── Submit to waitlist (requires auth) ───
  function submitWaitlist(email) {
    var cleanEmail = email.trim().toLowerCase();

    // Demo mode — no Supabase configured
    if (!supabaseClient) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          console.log('[Waitlist Demo] Email submitted:', cleanEmail);
          resolve({ demo: true });
        }, 800);
      });
    }

    return supabaseClient
      .from('waitlist')
      .insert([{ email: cleanEmail }])
      .then(function (result) {
        if (result.error) {
          // Duplicate email — still a success for the user
          if (result.error.code === '23505') {
            return { alreadyExists: true };
          }
          throw new Error(result.error.message);
        }
        return { success: true };
      });
  }

  // ─── Check if user's email is already on the waitlist ───
  function checkAlreadyOnWaitlist(email) {
    if (!supabaseClient) return Promise.resolve(false);
    return supabaseClient
      .from('waitlist')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .limit(1)
      .then(function (result) {
        return result.data && result.data.length > 0;
      })
      .catch(function () {
        return false;
      });
  }

  // ─── UI State Management ───
  function setFormState(state, errorMsg) {
    var form = document.getElementById('waitlistForm');
    var authGate = document.getElementById('waitlistAuthGate');
    var btn = document.getElementById('waitlistBtn');
    var btnText = document.getElementById('waitlistBtnText');
    var btnLoader = document.getElementById('waitlistBtnLoader');
    var errorMsgEl = document.getElementById('waitlistError');
    var successBox = document.getElementById('waitlistSuccess');

    if (!form) return;

    switch (state) {
      case 'loading':
        btn.disabled = true;
        btnText.textContent = 'Joining...';
        btnLoader.style.display = 'inline-block';
        errorMsgEl.style.display = 'none';
        successBox.style.display = 'none';
        break;

      case 'success':
        form.style.display = 'none';
        if (authGate) authGate.style.display = 'none';
        successBox.style.display = 'block';
        errorMsgEl.style.display = 'none';
        break;

      case 'error':
        btn.disabled = false;
        btnText.textContent = 'Join Waitlist';
        btnLoader.style.display = 'none';
        errorMsgEl.textContent = errorMsg || 'Something went wrong. Please try again.';
        errorMsgEl.style.display = 'block';
        break;

      default: // 'idle'
        btn.disabled = false;
        btnText.textContent = 'Join Waitlist';
        btnLoader.style.display = 'none';
        errorMsgEl.style.display = 'none';
        successBox.style.display = 'none';
        break;
    }
  }

  // ─── Update waitlist UI based on auth state ───
  function updateWaitlistUI() {
    var authGate = document.getElementById('waitlistAuthGate');
    var form = document.getElementById('waitlistForm');
    var successBox = document.getElementById('waitlistSuccess');
    var userEmailEl = document.getElementById('waitlistUserEmail');

    if (!authGate || !form) return;

    var isLoggedIn = typeof CuricaaAuth !== 'undefined' && CuricaaAuth.isLoggedIn();

    if (isLoggedIn) {
      var user = CuricaaAuth.getUser();
      authGate.style.display = 'none';
      if (userEmailEl && user && user.email) {
        userEmailEl.textContent = 'Signed in as ' + user.email;
      }
      // Check if this user's email is already on the waitlist
      checkAlreadyOnWaitlist(user.email).then(function (isOnList) {
        if (isOnList) {
          form.style.display = 'none';
          if (successBox) successBox.style.display = 'block';
        } else {
          if (successBox && successBox.style.display === 'block') {
            form.style.display = 'none';
          } else {
            form.style.display = 'block';
          }
        }
      });
    } else {
      authGate.style.display = 'block';
      form.style.display = 'none';
      if (successBox) successBox.style.display = 'none';
    }
  }

  // ─── Form submit handler (requires auth) ───
  window.handleWaitlistSubmit = function (e) {
    // Allow being called without event (onclick without form)
    if (e && e.preventDefault) e.preventDefault();

    // Require auth
    if (typeof CuricaaAuth === 'undefined' || !CuricaaAuth.isLoggedIn()) {
      if (typeof openSignupModal === 'function') {
        openSignupModal();
      }
      return;
    }

    var user = CuricaaAuth.getUser();
    if (!user || !user.email) {
      setFormState('error', 'Could not detect your email. Please try again.');
      return;
    }

    setFormState('loading');

    submitWaitlist(user.email)
      .then(function (result) {
        setFormState('success');
        // Auto-hide the announcement bar
        var bar = document.getElementById('announceBar');
        if (bar) bar.classList.add('hidden');
        localStorage.setItem('curicaa-announce-closed', '1');
      })
      .catch(function (err) {
        var msg = (err && err.message) || 'Something went wrong. Please try again.';
        if (msg.indexOf('duplicate') !== -1 || msg.indexOf('unique') !== -1) {
          setFormState('success');
          return;
        }
        setFormState('error', msg);
      });
  };

  // ─── Auto-hide announcement bar if user is on the waitlist ───
  function hideAnnounceIfOnWaitlist() {
    var isLoggedIn = typeof CuricaaAuth !== 'undefined' && CuricaaAuth.isLoggedIn();
    if (!isLoggedIn) return;
    var user = CuricaaAuth.getUser();
    if (!user || !user.email) return;
    checkAlreadyOnWaitlist(user.email).then(function (isOnList) {
      if (isOnList) {
        var bar = document.getElementById('announceBar');
        if (bar) bar.classList.add('hidden');
        localStorage.setItem('curicaa-announce-closed', '1');
      }
    });
  }

  // ─── Boot ───
  function boot() {
    initSupabase();

    // Update waitlist UI when auth state becomes available
    window.addEventListener('curicaa-auth-ready', function () {
      updateWaitlistUI();
      hideAnnounceIfOnWaitlist();
    });

    // Hook into updateAuthUI (defined in hub-premium.js) to react to login/signup/logout
    function hookAuthUI() {
      if (typeof updateAuthUI === 'function') {
        var origFn = updateAuthUI;
        updateAuthUI = function () {
          origFn.apply(this, arguments);
          updateWaitlistUI();
        };
      } else {
        // updateAuthUI not defined yet — retry shortly
        setTimeout(hookAuthUI, 100);
      }
    }
    hookAuthUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

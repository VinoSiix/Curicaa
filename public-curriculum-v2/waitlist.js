/*
 * Waitlist Script — Curicaa
 * Handles email submission to Supabase waitlist table.
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

  // ─── Email validation ───
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ─── Submit to waitlist ───
  function submitWaitlist(email) {
    if (!isValidEmail(email)) {
      return Promise.reject({ message: 'Please enter a valid email address.' });
    }

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

  // ─── UI State Management ───
  function setFormState(state, errorMsg) {
    var form = document.getElementById('waitlistForm');
    var input = document.getElementById('waitlistEmail');
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
        input.style.borderColor = 'var(--border-card)';
        break;

      case 'success':
        form.style.display = 'none';
        successBox.style.display = 'block';
        errorMsgEl.style.display = 'none';
        break;

      case 'error':
        btn.disabled = false;
        btnText.textContent = 'Join Waitlist';
        btnLoader.style.display = 'none';
        errorMsgEl.textContent = errorMsg || 'Something went wrong. Please try again.';
        errorMsgEl.style.display = 'block';
        input.style.borderColor = '#f87171';
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

  // ─── Form submit handler ───
  window.handleWaitlistSubmit = function (e) {
    e.preventDefault();
    var input = document.getElementById('waitlistEmail');
    if (!input) return;

    var email = input.value.trim();
    if (!email) {
      setFormState('error', 'Please enter your email address.');
      return;
    }

    setFormState('loading');

    submitWaitlist(email)
      .then(function (result) {
        setFormState('success');
      })
      .catch(function (err) {
        var msg = (err && err.message) || 'Something went wrong. Please try again.';
        if (msg.indexOf('duplicate') !== -1 || msg.indexOf('unique') !== -1) {
          // Email already on the list — treat as success
          setFormState('success');
          return;
        }
        setFormState('error', msg);
      });
  };

  // ─── Boot ───
  function boot() {
    initSupabase();

    // Pre-fill email if user is logged in
    if (typeof CuricaaAuth !== 'undefined' && CuricaaAuth.isLoggedIn()) {
      var user = CuricaaAuth.getUser();
      var input = document.getElementById('waitlistEmail');
      if (input && user && user.email) {
        input.value = user.email;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

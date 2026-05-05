/*
 * Auth Script — Curriculum Hub
 * Local account system using localStorage.
 * No backend — accounts live in the browser.
 */
(function(){
  var DB_KEY = 'curicaa_users';
  var SESSION_KEY = 'curicaa_session';

  // --- Database helpers ---
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(DB_KEY)) || []; }
    catch(e) { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
  }
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch(e) { return null; }
  }
  function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // --- Expose to window ---
  window.CuricaaAuth = {
    getUsers: getUsers,
    getSession: getSession,

    signup: function(name, email, password) {
      var users = getUsers();
      var existing = users.find(function(u) { return u.email.toLowerCase() === email.toLowerCase(); });
      if (existing) return { ok: false, error: 'An account with this email already exists.' };
      if (!name || name.trim().length < 2) return { ok: false, error: 'Please enter your name.' };
      if (!email || !email.includes('@')) return { ok: false, error: 'Please enter a valid email.' };
      if (!password || password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
      var user = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        plan: 'free',
        createdAt: new Date().toISOString(),
        grades: []
      };
      users.push(user);
      saveUsers(users);
      saveSession({ id: user.id, name: user.name, email: user.email, plan: user.plan });
      return { ok: true, user: user };
    },

    login: function(email, password) {
      var users = getUsers();
      var user = users.find(function(u) {
        return u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password;
      });
      if (!user) return { ok: false, error: 'Invalid email or password.' };
      saveSession({ id: user.id, name: user.name, email: user.email, plan: user.plan });
      return { ok: true, user: user };
    },

    logout: function() {
      clearSession();
    },

    isLoggedIn: function() {
      return getSession() !== null;
    },

    getUser: function() {
      return getSession();
    },

    updatePlan: function(plan, grades) {
      var session = getSession();
      if (!session) return;
      var users = getUsers();
      var user = users.find(function(u) { return u.id === session.id; });
      if (user) {
        user.plan = plan;
        if (grades) user.grades = grades;
        saveUsers(users);
        session.plan = plan;
        if (grades) session.grades = grades;
        saveSession(session);
      }
    }
  };
})();

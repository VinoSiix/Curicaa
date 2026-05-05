/*
 * Paywall Script — Curriculum Hub Premium
 * Gates all months except September (free preview).
 * Also handles auth UI on subject pages.
 */
(function(){
  // Don't run on hub pages
  if (!document.getElementById('monthTabs')) return;

  // --- Redirect back links to hub-premium.html ---
  document.querySelectorAll('a[href="hub.html"]').forEach(function(a) {
    a.href = 'hub-premium.html';
  });

  // No inline paywall modal — redirecting to hub-premium.html checkout instead

  var pwStyle = document.createElement('style');
  pwStyle.textContent = '@keyframes pwIn{from{opacity:0;transform:scale(0.94) translateY(12px);}to{opacity:1;transform:scale(1) translateY(0);}}';
  document.head.appendChild(pwStyle);

  // --- Show paywall (redirect to checkout) ---
  function showPaywall() {
    window.location.href = 'hub-premium.html#checkout';
  }

  var FREE_MONTH = 'September';

  function isFreeMonth(name) {
    return name === FREE_MONTH;
  }

  // --- Check if user has paid access ---
  function hasPaidAccess() {
    if (typeof CuricaaAuth === 'undefined') return false;
    var user = CuricaaAuth.getUser();
    if (!user) return false;
    if (user.plan === 'bundle') return true;
    if (user.plan === 'single') {
      var path = window.location.pathname;
      var pageName = path.split('/').pop().replace('.html', '');
      var grades = user.grades || [];
      for (var i = 0; i < grades.length; i++) {
        if (pageName.indexOf(grades[i]) === 0) return true;
      }
      return false;
    }
    return false;
  }

  // --- Auth UI on subject pages ---
  function initAuthUI() {
    // No floating badge — paywall.js is just for gating now
  }

  // --- Paywall patching functions ---
  function patchSelectMonth() {
    if (typeof selectMonth === 'function') {
      var origSelectMonth = selectMonth;
      window.selectMonth = function(m) {
        if (!isFreeMonth(m)) {
          showPaywall();
          var tabs = document.querySelectorAll('.month-tab');
          var months = Object.keys(curriculumData || {});
          tabs.forEach(function(tab, i) {
            if (months[i] === FREE_MONTH) tab.classList.add('active');
            else if (!isFreeMonth(months[i])) tab.classList.remove('active');
          });
          return;
        }
        return origSelectMonth(m);
      };
    }
  }

  function patchTabButtons() {
    var tabsContainer = document.getElementById('monthTabs');
    if (!tabsContainer) return;

    function patchButtons() {
      var buttons = tabsContainer.querySelectorAll('.month-tab');
      buttons.forEach(function(btn) {
        if (btn.dataset.paywallPatched) return;
        btn.dataset.paywallPatched = 'true';
        var btnText = btn.textContent.trim();
        var clone = btn.cloneNode(true);
        btn.parentNode.replaceChild(clone, btn);
        if (btnText && !isFreeMonth(btnText)) {
          clone.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            showPaywall();
            var allTabs = tabsContainer.querySelectorAll('.month-tab');
            allTabs.forEach(function(t) { t.classList.remove('active'); });
            allTabs.forEach(function(t) {
              if (t.textContent.trim() === FREE_MONTH) t.classList.add('active');
            });
          }, true);
        }
      });
    }

    var observer = new MutationObserver(patchButtons);
    observer.observe(tabsContainer, { childList: true });
    setTimeout(patchButtons, 100);
  }

  function addFreeBadge() {
    var tabsContainer = document.getElementById('monthTabs');
    if (!tabsContainer) return;
    var badge = document.createElement('div');
    badge.style.cssText = 'display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:100px;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.25);font-size:11px;font-weight:600;color:#4ade80;margin-bottom:16px;';
    badge.innerHTML = '<i class="fas fa-gift" style="font-size:10px;"></i> September is free — unlock all months for full access';
    tabsContainer.parentNode.insertBefore(badge, tabsContainer);
  }

  // --- Force September for free users ---
  function forceSeptember() {
    // Override any stored month
    if (typeof selectMonth === 'function') {
      setTimeout(function() { selectMonth(FREE_MONTH); }, 150);
    }
    // Also override via loadContent if selectMonth wrapper didn't catch it
    if (typeof loadContent === 'function') {
      setTimeout(function() {
        var tabs = document.querySelectorAll('.month-tab');
        var months = typeof curriculumData !== 'undefined' ? Object.keys(curriculumData) : [];
        tabs.forEach(function(tab, i) {
          tab.classList.toggle('active', months[i] === FREE_MONTH);
        });
        loadContent(FREE_MONTH);
      }, 200);
    }
  }

  // --- Main init: runs AFTER auth.js is loaded ---
  function initPaywall() {
    initAuthUI();

    if (hasPaidAccess()) {
      // Paid user — no paywall, no badge
      return;
    }

    // Free/unauthenticated user — apply paywall
    patchSelectMonth();
    patchTabButtons();
    addFreeBadge();

    // Intercept loadContent if it exists
    if (typeof loadContent === 'function') {
      var origLoadContent = loadContent;
      window.loadContent = function(m) {
        if (!isFreeMonth(m)) { showPaywall(); return; }
        return origLoadContent(m);
      };
    }

    // Force September as the active month (overrides localStorage)
    forceSeptember();
  }

  // --- Boot sequence ---
  function boot() {
    if (typeof CuricaaAuth !== 'undefined') {
      // auth.js already loaded
      initPaywall();
    } else {
      // Load auth.js first, THEN decide
      var authScript = document.createElement('script');
      authScript.src = 'auth.js';
      authScript.onload = function() {
        initPaywall();
      };
      authScript.onerror = function() {
        // auth.js failed to load — treat as free user
        initPaywall();
      };
      document.head.appendChild(authScript);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(boot, 50); });
  } else {
    setTimeout(boot, 50);
  }

})();

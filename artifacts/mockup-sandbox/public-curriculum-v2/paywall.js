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

  // --- Paywall Modal HTML ---
  var modal = document.createElement('div');
  modal.id = 'paywallModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(14px);z-index:200;display:none;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = '\
    <div style="background:#0b0b1d;border:1px solid rgba(255,255,255,0.13);border-radius:24px;padding:30px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;animation:pwIn 0.25s cubic-bezier(.22,.68,0,1.2);color:rgba(255,255,255,0.85);">\
      <div style="text-align:center;margin-bottom:24px;">\
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#818cf8,#a78bfa);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">\
          <i class="fas fa-lock" style="font-size:22px;color:white;"></i>\
        </div>\
        <h3 style="font-size:20px;font-weight:700;margin-bottom:6px;">Unlock Full Curriculum</h3>\
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">September is free! To access all 10 months of lesson plans, projects, and assessments, choose a plan below.</p>\
      </div>\
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">\
        <div style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center;">\
          <div>\
            <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);">Single Grade</div>\
            <div style="font-size:12px;color:rgba(255,255,255,0.4);">One grade, all subjects, 40 weeks</div>\
          </div>\
          <div style="text-align:right;">\
            <div style="font-size:20px;font-weight:800;color:#a5b4fc;">$19</div>\
            <div style="font-size:10px;color:rgba(255,255,255,0.3);">one-time</div>\
          </div>\
        </div>\
        <div style="background:rgba(255,255,255,0.035);border:2px solid rgba(129,140,248,0.45);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 20px rgba(129,140,248,0.1);">\
          <div>\
            <div style="display:inline-block;background:linear-gradient(135deg,#818cf8,#c084fc);color:white;font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:2px 10px;border-radius:20px;margin-bottom:4px;">Best Value</div>\
            <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);">Full K-12 Bundle</div>\
            <div style="font-size:12px;color:rgba(255,255,255,0.4);">All 8 levels, lifetime access</div>\
          </div>\
          <div style="text-align:right;">\
            <div style="font-size:20px;font-weight:800;color:#a5b4fc;">$97</div>\
            <div style="font-size:10px;color:#4ade80;">save $55</div>\
          </div>\
        </div>\
      </div>\
      <button onclick="document.getElementById(\'paywallModal\').style.display=\'none\';document.body.style.overflow=\'\';" style="width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#818cf8,#c084fc);color:white;font-size:14px;font-weight:600;cursor:pointer;transition:opacity 0.2s;box-shadow:0 4px 16px rgba(129,140,248,0.25);font-family:\'Inter\',sans-serif;" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">\
        Get Full Access\
      </button>\
      <button onclick="document.getElementById(\'paywallModal\').style.display=\'none\';document.body.style.overflow=\'\';" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.4);font-size:12px;font-weight:500;cursor:pointer;margin-top:8px;font-family:\'Inter\',sans-serif;" onmouseover="this.style.color=\'rgba(255,255,255,0.6)\'" onmouseout="this.style.color=\'rgba(255,255,255,0.4)\'">\
        Continue with free preview\
      </button>\
      <div style="text-align:center;margin-top:16px;font-size:11px;color:rgba(255,255,255,0.25);">\
        <i class="fas fa-lock" style="margin-right:4px;"></i>Secure checkout · One-time payment · 30-day money back\
      </div>\
    </div>';
  document.body.appendChild(modal);

  // Add animation keyframes
  var pwStyle = document.createElement('style');
  pwStyle.textContent = '@keyframes pwIn{from{opacity:0;transform:scale(0.94) translateY(12px);}to{opacity:1;transform:scale(1) translateY(0);}}';
  document.head.appendChild(pwStyle);

  // --- Show paywall ---
  function showPaywall() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

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

  // ESC to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();

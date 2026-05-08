/*
 * Paywall Script — Curriculum Hub Premium
 * Free plan: September only, other months locked with upgrade prompt.
 * Paid plans (single/bundle): all months visible, worksheets gated to Pro.
 * Pro: full access to everything.
 */
(function(){
  // Don't run on hub pages
  if (!document.getElementById('monthTabs')) return;

  // --- Inject paywall styles ---
  var pwStyle = document.createElement('style');
  pwStyle.textContent = '@keyframes pwIn{from{opacity:0;transform:scale(0.94) translateY(12px);}to{opacity:1;transform:scale(1) translateY(0);}}' +
    '.month-tab.month-locked{opacity:0.35;cursor:not-allowed!important;position:relative;}' +
    '.month-tab.month-locked:hover{background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.35);}' +
    '.month-tab.month-free{position:relative;}' +
    '.month-tab.month-free::after{content:"FREE";position:absolute;top:-7px;right:-8px;font-size:7px;font-weight:700;letter-spacing:0.06em;background:#4ade80;color:#000;padding:1px 5px;border-radius:20px;line-height:1.4;}';
  document.head.appendChild(pwStyle);

  // --- Month restriction modal (Free users — months locked) ---
  var monthModal = document.createElement('div');
  monthModal.id = 'monthPaywallModal';
  monthModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(14px);z-index:200;display:none;align-items:center;justify-content:center;padding:20px;';
  monthModal.innerHTML = '\
    <div style="background:#0b0b1d;border:1px solid rgba(255,255,255,0.13);border-radius:24px;padding:30px;max-width:440px;width:100%;animation:pwIn 0.25s cubic-bezier(.22,.68,0,1.2);color:rgba(255,255,255,0.85);">\
      <div style="text-align:center;margin-bottom:24px;">\
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#d4a54a,#f97316);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">\
          <i class="fas fa-lock" style="font-size:22px;color:white;"></i>\
        </div>\
        <h3 style="font-size:20px;font-weight:700;margin-bottom:6px;">This Month Requires a Paid Plan</h3>\
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">The free plan includes <strong style="color:#4ade80;">September only</strong>. Upgrade to unlock all 10 months of lesson plans, activities, and projects.</p>\
      </div>\
      <a href="hub.html#pricing" style="display:block;width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#d4a54a,#f97316);color:white;font-size:14px;font-weight:600;cursor:pointer;transition:opacity 0.2s;box-shadow:0 4px 16px rgba(212,165,74,0.25);font-family:\'DM Sans\',system-ui,sans-serif;text-align:center;text-decoration:none;" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">\
        Upgrade to Unlock\
      </a>\
      <button onclick="document.getElementById(\'monthPaywallModal\').style.display=\'none\';document.body.style.overflow=\'\';" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.4);font-size:12px;font-weight:500;cursor:pointer;margin-top:8px;font-family:\'DM Sans\',system-ui,sans-serif;" onmouseover="this.style.color=\'rgba(255,255,255,0.6)\'" onmouseout="this.style.color=\'rgba(255,255,255,0.4)\'">\
        Stay on September\
      </button>\
      <div style="text-align:center;margin-top:16px;font-size:11px;color:rgba(255,255,255,0.25);">\
        <i class="fas fa-shield-alt" style="margin-right:4px;"></i>30-day money-back guarantee\
      </div>\
    </div>';
  document.body.appendChild(monthModal);

  monthModal.addEventListener('click', function(e) {
    if (e.target === monthModal) {
      monthModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // --- Worksheet upgrade modal (Bundle/Single users — worksheets locked) ---
  var wsModal = document.createElement('div');
  wsModal.id = 'wsPaywallModal';
  wsModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(14px);z-index:200;display:none;align-items:center;justify-content:center;padding:20px;';
  wsModal.innerHTML = '\
    <div style="background:#0b0b1d;border:1px solid rgba(255,255,255,0.13);border-radius:24px;padding:30px;max-width:440px;width:100%;animation:pwIn 0.25s cubic-bezier(.22,.68,0,1.2);color:rgba(255,255,255,0.85);">\
      <div style="text-align:center;margin-bottom:24px;">\
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#8b5cf6);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">\
          <i class="fas fa-file-alt" style="font-size:22px;color:white;"></i>\
        </div>\
        <h3 style="font-size:20px;font-weight:700;margin-bottom:6px;">Worksheets are a Pro Feature</h3>\
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">Your plan includes the first month\'s worksheets free. Upgrade to <strong style="color:#a78bfa;">Curicaa Pro</strong> to unlock printable worksheets, answer keys, and quizzes for all 10 months.</p>\
      </div>\
      <a href="hub.html#pricing" style="display:block;width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:white;font-size:14px;font-weight:600;cursor:pointer;transition:opacity 0.2s;box-shadow:0 4px 16px rgba(139,92,246,0.25);font-family:\'DM Sans\',system-ui,sans-serif;text-align:center;text-decoration:none;" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">\
        Upgrade to Pro\
      </a>\
      <button onclick="document.getElementById(\'wsPaywallModal\').style.display=\'none\';document.body.style.overflow=\'\';" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.4);font-size:12px;font-weight:500;cursor:pointer;margin-top:8px;font-family:\'DM Sans\',system-ui,sans-serif;" onmouseover="this.style.color=\'rgba(255,255,255,0.6)\'" onmouseout="this.style.color=\'rgba(255,255,255,0.4)\'">\
        Continue without worksheets\
      </button>\
      <div style="text-align:center;margin-top:16px;font-size:11px;color:rgba(255,255,255,0.25);">\
        <i class="fas fa-shield-alt" style="margin-right:4px;"></i>Includes worksheets, answer keys & quizzes\
      </div>\
    </div>';
  document.body.appendChild(wsModal);

  // --- Show modals ---
  function showMonthPaywall() {
    monthModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function showWsPaywall() {
    wsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  wsModal.addEventListener('click', function(e) {
    if (e.target === wsModal) {
      wsModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  var FREE_MONTH = 'September';

  // Month abbreviation map for worksheet URL generation
  var MONTH_ABBR = {
    'September':'sep','October':'oct','November':'nov','December':'dec',
    'January':'jan','February':'feb','March':'mar','April':'apr',
    'May':'may','June':'jun'
  };

  function isFreeMonth(name) {
    return name === FREE_MONTH;
  }

  // Parse grade and subject from the current page URL
  // e.g. "ages-5-7-math.html" → { grade:"ages-5-7", subject:"math" }
  // e.g. "age-14-social-studies.html" → { grade:"age-14", subject:"social-studies" }
  function parsePageInfo() {
    var path = window.location.pathname;
    var filename = path.split('/').pop().replace('.html', '');
    // Check longer subjects first to avoid partial matches
    var subjects = ['social-studies','math','english','science','art','pe'];
    for (var i = 0; i < subjects.length; i++) {
      if (filename.endsWith('-' + subjects[i])) {
        return {
          grade: filename.slice(0, -(subjects[i].length + 1)),
          subject: subjects[i]
        };
      }
    }
    return { grade: '', subject: '' };
  }

  // --- Check user plan tier ---
  function isFreeUser() {
    if (typeof CuricaaAuth === 'undefined') return true;
    var user = CuricaaAuth.getUser();
    return !user || user.plan === 'free';
  }

  function hasProAccess() {
    if (typeof CuricaaAuth === 'undefined') return false;
    var user = CuricaaAuth.getUser();
    if (!user) return false;
    return user.plan === 'pro';
  }

  // --- Get the currently active month name ---
  function getActiveMonth() {
    var activeTab = document.querySelector('.month-tab.active');
    return activeTab ? activeTab.textContent.trim() : FREE_MONTH;
  }

  // --- Free plan: force September, lock other tabs ---
  function lockMonthsForFreeUsers() {
    if (!isFreeUser()) return;

    var tabs = document.querySelectorAll('.month-tab');
    var needsForce = false;

    tabs.forEach(function(tab) {
      var monthName = tab.textContent.trim();
      if (monthName === FREE_MONTH) {
        // Mark the free tab
        tab.classList.add('month-free');
      } else {
        // Lock non-September tabs
        tab.classList.add('month-locked');
        // Remove existing onclick
        var origOnclick = tab.onclick;
        tab.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          showMonthPaywall();
          return false;
        };
        // Check if a non-free month is currently active (needs force to September)
        if (tab.classList.contains('active')) {
          needsForce = true;
        }
      }
    });

    // Force September if a locked month was active, or if no month was active
    if (needsForce || !document.querySelector('.month-tab.active:not(.month-locked)')) {
      var septTab = document.querySelector('.month-tab');
      if (septTab && !septTab.classList.contains('active')) {
        // Clear saved month preference that might point to a locked month
        septTab.click();
      }
    }
  }

  // --- Gate worksheets for non-Pro users ---
  function gateWorksheets() {
    if (hasProAccess()) return; // Pro sees everything

    // September worksheets are free for all users — don't gate them
    var currentMonth = getActiveMonth();
    if (isFreeMonth(currentMonth)) return;

    var contentEl = document.getElementById('monthContent');
    if (!contentEl) return;

    // Find worksheet links directly — they are <a> tags with target="_blank"
    var wsLinks = contentEl.querySelectorAll('a[target="_blank"]');
    wsLinks.forEach(function(link) {
      // Skip resources managed by injectResources()
      if (link.closest && link.closest('#pw-resources-card')) return;

      var textWrapper = link.parentElement;
      if (!textWrapper) return;
      var container = textWrapper.parentElement;
      if (!container) return;

      // Verify this is actually a worksheet container (must have fa-print nearby)
      if (!container.querySelector('i.fa-print')) return;
      if (container.dataset.wsGated) return;
      container.dataset.wsGated = 'true';

      var wsName = link.textContent.trim();

      // Replace only this specific worksheet row with a locked version
      container.style.background = 'rgba(139,92,246,0.08)';
      container.style.borderColor = 'rgba(139,92,246,0.15)';
      container.style.cursor = 'pointer';
      container.innerHTML = '<div style="width:24px;color:#a78bfa;text-align:center;margin-top:2px;"><i class="fas fa-lock" style="font-size:11px;"></i></div>' +
        '<div><span style="font-size:13px;font-weight:600;color:#a78bfa;">' + wsName + '</span>' +
        '<span style="font-size:11px;color:rgba(255,255,255,0.35);margin-left:8px;"><i class="fas fa-crown" style="font-size:9px;color:#a78bfa;margin-right:3px;"></i>Pro — unlock worksheets</span></div>';
      container.onclick = function(e) {
        e.stopPropagation();
        showWsPaywall();
      };
    });
  }

  // --- Inject worksheet links and monthly quiz into subject pages ---
  function injectResources() {
    // Worksheets & Quiz section disabled — no resources card is rendered.
    return;
    var contentEl = document.getElementById('monthContent');
    if (!contentEl) return;
    // Already injected for this render cycle
    if (document.getElementById('pw-resources-card')) return;

    var info = parsePageInfo();
    if (!info.grade || !info.subject) return;

    var month = getActiveMonth();
    var abbr = MONTH_ABBR[month];
    if (!abbr) return;

    // Determine access: September is free for everyone, other months require Pro
    var isSeptember = (month === FREE_MONTH);
    var isPro = hasProAccess();
    var showLinks = isSeptember || isPro;

    // Find the right column of the month-grid layout
    var grid = contentEl.querySelector('.month-grid');
    if (!grid) return;
    var cols = grid.children;
    var rightCol = cols.length >= 2 ? cols[1] : null;
    if (!rightCol) return;

    // Count weeks in current month view
    var weekRows = contentEl.querySelectorAll('.week-row');
    var weekCount = weekRows.length;
    if (weekCount === 0) return;

    var html = '';
    var prefix = info.grade + '-' + info.subject + '-' + abbr;

    // Worksheet link for each week
    for (var w = 1; w <= weekCount; w++) {
      var wsUrl = 'worksheets/' + info.grade + '/' + info.subject + '/' + prefix + '-w' + w + '.html';
      var akUrl = 'worksheets/' + info.grade + '/' + info.subject + '/answer-keys/' + prefix + '-w' + w + '-answers.html';

      if (showLinks) {
        html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">' +
          '<div style="width:24px;text-align:center;flex-shrink:0;"><i class="fas fa-print" style="font-size:11px;color:rgba(255,255,255,0.4);"></i></div>' +
          '<div style="flex:1;"><a href="' + wsUrl + '" target="_blank" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);text-decoration:none;">Week ' + w + ' Worksheet</a></div>' +
          '<a href="' + akUrl + '" target="_blank" style="font-size:11px;color:rgba(255,255,255,0.4);text-decoration:none;padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);" onmouseover="this.style.borderColor=\'rgba(255,255,255,0.2)\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.08)\'">Answers</a>' +
          '</div>';
      } else {
        html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);margin-bottom:8px;cursor:pointer;" onclick="document.getElementById(\'wsPaywallModal\').style.display=\'flex\';document.body.style.overflow=\'hidden\';">' +
          '<div style="width:24px;color:#a78bfa;text-align:center;flex-shrink:0;"><i class="fas fa-lock" style="font-size:11px;"></i></div>' +
          '<div><span style="font-size:13px;font-weight:600;color:#a78bfa;">Week ' + w + ' Worksheet</span>' +
          '<span style="font-size:11px;color:rgba(255,255,255,0.3);margin-left:8px;"><i class="fas fa-crown" style="font-size:9px;color:#a78bfa;margin-right:3px;"></i>Pro</span></div>' +
          '</div>';
      }
    }

    // Monthly Quiz
    html += '<div style="height:1px;background:rgba(255,255,255,0.06);margin:14px 0 12px;"></div>';
    var quizUrl = 'worksheets/' + info.grade + '/' + info.subject + '/' + prefix + '-quiz.html';

    if (showLinks) {
      html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);">' +
        '<div style="width:24px;color:#60a5fa;text-align:center;flex-shrink:0;"><i class="fas fa-clipboard-check" style="font-size:11px;"></i></div>' +
        '<div style="flex:1;"><a href="' + quizUrl + '" target="_blank" style="font-size:13px;font-weight:600;color:#93c5fd;text-decoration:none;">Monthly Quiz \u2014 ' + month + '</a></div>' +
        '</div>';
    } else {
      html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);cursor:pointer;" onclick="document.getElementById(\'wsPaywallModal\').style.display=\'flex\';document.body.style.overflow=\'hidden\';">' +
        '<div style="width:24px;color:#a78bfa;text-align:center;flex-shrink:0;"><i class="fas fa-lock" style="font-size:11px;"></i></div>' +
        '<div><span style="font-size:13px;font-weight:600;color:#a78bfa;">Monthly Quiz \u2014 ' + month + '</span>' +
        '<span style="font-size:11px;color:rgba(255,255,255,0.3);margin-left:8px;"><i class="fas fa-crown" style="font-size:9px;color:#a78bfa;margin-right:3px;"></i>Pro</span></div>' +
        '</div>';
    }

    // Create the resources card
    var card = document.createElement('div');
    card.id = 'pw-resources-card';
    card.className = 'sched-card';
    card.style.marginBottom = '16px';
    card.innerHTML = '<p class="section-label"><i class="fas fa-file-alt" style="color:rgba(255,255,255,0.4);margin-right:6px;"></i>Worksheets & Quiz</p>' +
      '<div style="margin-top:12px;">' + html + '</div>';

    // Insert after the first sched-card (Monthly Project) in the right column
    var firstCard = rightCol.querySelector('.sched-card');
    if (firstCard) {
      firstCard.insertAdjacentElement('afterend', card);
    } else {
      rightCol.insertBefore(card, rightCol.firstChild);
    }
  }

  // Observe DOM changes to re-gate worksheets AND re-lock tabs when month content is re-rendered
  function watchForChanges() {
    // Always watch content changes — all plan types need resource injection
    var contentEl = document.getElementById('monthContent');
    if (contentEl) {
      var wsObserver = new MutationObserver(function() {
        setTimeout(function() {
          injectResources();
          if (!hasProAccess()) gateWorksheets();
        }, 80);
      });
      wsObserver.observe(contentEl, { childList: true, subtree: true });
    }

    // Watch the tab container for re-renders — only free users need month locking
    if (isFreeUser()) {
      var tabsEl = document.getElementById('monthTabs');
      if (tabsEl) {
        var tabObserver = new MutationObserver(function() {
          setTimeout(lockMonthsForFreeUsers, 30);
        });
        tabObserver.observe(tabsEl, { childList: true });
      }
    }
  }

  // --- Main init ---
  function initPaywall() {
    // 1. Free users: lock months to September only
    if (isFreeUser()) {
      lockMonthsForFreeUsers();
    }
    // 2. Always watch for content changes and inject resources
    watchForChanges();
    setTimeout(function() {
      injectResources();
      if (!hasProAccess()) gateWorksheets();
    }, 300);
  }

  // --- Boot sequence ---
  function boot() {
    if (typeof CuricaaAuth !== 'undefined') {
      initPaywall();
    } else {
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

  // ESC to close any open modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (monthModal.style.display === 'flex') {
        monthModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      if (wsModal.style.display === 'flex') {
        wsModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });
})();

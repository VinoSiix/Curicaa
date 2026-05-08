        // Auth UI
        function openLoginModal() { document.getElementById('loginModal').classList.add('open'); document.getElementById('loginError').style.display='none'; document.body.style.overflow='hidden'; }
        function closeLoginModal() { document.getElementById('loginModal').classList.remove('open'); document.body.style.overflow=''; }
        function openSignupModal() { document.getElementById('signupModal').classList.add('open'); document.getElementById('signupError').style.display='none'; document.body.style.overflow='hidden'; }
        function closeSignupModal() { document.getElementById('signupModal').classList.remove('open'); document.body.style.overflow=''; }

        function handleLogin() {
            var email = document.getElementById('loginEmail').value;
            var password = document.getElementById('loginPassword').value;
            var result = CuricaaAuth.login(email, password);
            if (!result.ok) {
                document.getElementById('loginError').textContent = result.error;
                document.getElementById('loginError').style.display = 'block';
                return;
            }
            closeLoginModal();
            updateAuthUI();
        }

        function handleSignup() {
            var name = document.getElementById('signupName').value;
            var email = document.getElementById('signupEmail').value;
            var password = document.getElementById('signupPassword').value;
            var result = CuricaaAuth.signup(name, email, password);
            if (!result.ok) {
                document.getElementById('signupError').textContent = result.error;
                document.getElementById('signupError').style.display = 'block';
                return;
            }
            closeSignupModal();
            updateAuthUI();
        }

        function handleLogout() {
            CuricaaAuth.logout();
            updateAuthUI();
            closeUserMenu();
        }

        // Free plan start — opens signup if not logged in, then grants free access
        function handleFreeStart() {
            var user = CuricaaAuth.getUser();
            if (!user) {
                // Not logged in — open signup modal
                openSignupModal();
                return;
            }
            // Already logged in — grant free preview access
            if (user.plan === 'free' || !user.plan) {
                // Already on free plan, just scroll to pathways
                document.getElementById('pathways').scrollIntoView({behavior:'smooth'});
            } else {
                // Already on a paid plan
                document.getElementById('pathways').scrollIntoView({behavior:'smooth'});
            }
        }

        function toggleUserMenu() {
            var menu = document.getElementById('userMenu');
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        }
        function closeUserMenu() {
            document.getElementById('userMenu').style.display = 'none';
        }

        function updateAuthUI() {
            var user = CuricaaAuth.getUser();
            var loggedIn = document.getElementById('authLoggedIn');
            var loggedOut = document.getElementById('authLoggedOut');
            var mobileOut = document.getElementById('mobileAuthOut');
            var mobileIn = document.getElementById('mobileAuthIn');
            if (user) {
                loggedOut.style.display = 'none';
                loggedIn.style.display = 'flex';
                mobileOut.style.display = 'none';
                mobileIn.style.display = 'block';
                var initial = user.name.charAt(0).toUpperCase();
                var firstName = user.name.split(' ')[0];
                document.getElementById('userAvatar').textContent = initial;
                document.getElementById('userDisplayName').textContent = firstName;
                document.getElementById('menuUserName').textContent = user.name;
                document.getElementById('menuUserEmail').textContent = user.email;
                document.getElementById('mobileUserName').textContent = user.name;
                var badge = document.getElementById('menuPlanBadge');
                if (user.plan === 'bundle') {
                    badge.innerHTML = '<i class="fas fa-circle" style="font-size:5px;"></i> Full Bundle';
                    badge.style.background = 'rgba(245,158,11,0.15)';
                    badge.style.color = '#fbbf24';
                } else if (user.plan === 'single') {
                    var gradeCount = user.grades ? user.grades.length : 1;
                    badge.innerHTML = '<i class="fas fa-circle" style="font-size:5px;"></i> ' + gradeCount + ' Grade' + (gradeCount !== 1 ? 's' : '');
                    badge.style.background = 'rgba(74,222,128,0.15)';
                    badge.style.color = '#4ade80';
                } else {
                    badge.innerHTML = '<i class="fas fa-circle" style="font-size:5px;"></i> Free Plan';
                    badge.style.background = 'rgba(255,255,255,0.06)';
                    badge.style.color = 'var(--text-muted)';
                }
            } else {
                loggedOut.style.display = 'flex';
                loggedIn.style.display = 'none';
                mobileOut.style.display = 'block';
                mobileIn.style.display = 'none';
            }
            updateCardUI();
        }

        // Update pathway cards based on paid access
        function updateCardUI() {
            var user = CuricaaAuth.getUser();
            var cards = document.querySelectorAll('#pathways .card');
            cards.forEach(function(card) {
                var onclickStr = card.getAttribute('onclick') || '';
                var gradeMatch = onclickStr.match(/openSubjectModal\('([^']+)'\)/);
                if (!gradeMatch) return;
                var grade = gradeMatch[1];

                var hasAccess = false;
                if (user && user.plan === 'bundle') hasAccess = true;
                if (user && user.plan === 'single' && user.grades) {
                    for (var i = 0; i < user.grades.length; i++) {
                        if (user.grades[i] === grade) { hasAccess = true; break; }
                    }
                }

                // Lock icon
                var lock = card.querySelector('.card-lock');
                if (lock) lock.style.display = hasAccess ? 'none' : 'flex';

                // Free tag
                var freeTag = card.querySelector('.free-tag');
                if (freeTag && hasAccess) freeTag.remove();

                // Button text
                var btn = card.querySelector('.btn-cta');
                if (btn) {
                    btn.innerHTML = hasAccess
                        ? 'View Curriculum <i class="fas fa-arrow-right" style="font-size:10px;"></i>'
                        : 'Free Preview <i class="fas fa-arrow-right" style="font-size:10px;"></i>';
                }
            });
        }

        // Close user menu on outside click
        document.addEventListener('click', function(e) {
            var wrap = document.getElementById('userMenuWrap');
            if (wrap && !wrap.contains(e.target)) closeUserMenu();
        });

        // Init auth UI on load
        updateAuthUI();

        // --- Settings ---
        function openSettings() {
            closeUserMenu();
            document.getElementById('settingsModal').classList.add('open');
            document.body.style.overflow = 'hidden';
            // Populate account info
            var user = CuricaaAuth.getUser();
            var infoEl = document.getElementById('settingsAccountInfo');
            var nameSection = document.getElementById('changeNameSection');
            var cancelSection = document.getElementById('cancelSubSection');
            if (user) {
                nameSection.style.display = 'block';
                document.getElementById('newNameInput').placeholder = user.name;
                var planLabel = user.plan === 'bundle' ? 'Full K-12 Bundle' : user.plan === 'single' ? (user.grades ? user.grades.length : 1) + ' Grade' + ((user.grades ? user.grades.length : 1) !== 1 ? 's' : '') : 'Free Plan';
                infoEl.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><div style="width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;">' + user.name.charAt(0).toUpperCase() + '</div><div><div style="font-weight:600;color:var(--text-primary);">' + user.name + '</div><div style="font-size:11px;color:var(--text-muted);">' + user.email + '</div></div></div><div style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;background:rgba(245,158,11,0.12);color:#fbbf24;">' + planLabel + '</div>';
                // Show cancel section only for paid plans
                cancelSection.style.display = (user.plan === 'bundle' || user.plan === 'single') ? 'block' : 'none';
                document.getElementById('cancelConfirmStep').style.display = 'none';
                document.getElementById('cancelSuccessMsg').style.display = 'none';
                document.getElementById('cancelSubBtn').style.display = 'block';
                var badge = document.getElementById('cancelSubBadge');
                badge.style.background = 'rgba(74,222,128,0.12)';
                badge.style.color = '#4ade80';
                badge.innerHTML = '<i class="fas fa-circle" style="font-size:4px;"></i> Active';
            } else {
                nameSection.style.display = 'none';
                infoEl.innerHTML = '<span style="color:var(--text-muted);">Sign in to view account details</span>';
                cancelSection.style.display = 'none';
            }
            // Restore saved font size
            var savedFont = localStorage.getItem('curicaa-font') || 'medium';
            highlightFontBtn(savedFont);
            // Restore anim toggle
            var animOn = localStorage.getItem('curicaa-anim') !== 'off';
            updateAnimToggle(animOn);
        }
        function closeSettings() {
            document.getElementById('settingsModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        function showCancelConfirm() {
            document.getElementById('cancelConfirmStep').style.display = 'block';
            document.getElementById('cancelSubBtn').style.display = 'none';
        }

        function hideCancelConfirm() {
            document.getElementById('cancelConfirmStep').style.display = 'none';
            document.getElementById('cancelSubBtn').style.display = 'block';
        }

        function confirmCancelSub() {
            CuricaaAuth.updatePlan('free', []);
            document.getElementById('cancelConfirmStep').style.display = 'none';
            document.getElementById('cancelSuccessMsg').style.display = 'block';
            var badge = document.getElementById('cancelSubBadge');
            badge.style.background = 'rgba(255,255,255,0.06)';
            badge.style.color = 'var(--text-muted)';
            badge.innerHTML = '<i class="fas fa-circle" style="font-size:4px;"></i> Cancelled';
            // Refresh UI to reflect plan change
            updateAuthUI();
            // Also update the account info section to show Free Plan
            var user = CuricaaAuth.getUser();
            var infoEl = document.getElementById('settingsAccountInfo');
            if (user) {
                infoEl.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><div style="width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;">' + user.name.charAt(0).toUpperCase() + '</div><div><div style="font-weight:600;color:var(--text-primary);">' + user.name + '</div><div style="font-size:11px;color:var(--text-muted);">' + user.email + '</div></div></div><div style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.06);color:var(--text-muted);">Free Plan</div>';
            }
        }

        function setFont(btn) {
            var size = btn.dataset.size;
            localStorage.setItem('curicaa-font', size);
            applyFont(size);
            highlightFontBtn(size);
        }
        function highlightFontBtn(size) {
            document.querySelectorAll('.font-opt').forEach(function(b) {
                if (b.dataset.size === size) {
                    b.style.borderColor = 'rgba(245,158,11,0.6)';
                    b.style.background = 'rgba(245,158,11,0.12)';
                } else {
                    b.style.borderColor = 'var(--border-card)';
                    b.style.background = 'var(--bg-subtle)';
                }
            });
        }
        function applyFont(size) {
            var scale = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
            document.documentElement.style.fontSize = scale;
        }

        function toggleAnim() {
            var animOn = localStorage.getItem('curicaa-anim') !== 'off';
            animOn = !animOn;
            localStorage.setItem('curicaa-anim', animOn ? 'on' : 'off');
            updateAnimToggle(animOn);
            // Toggle reveal animations
            document.querySelectorAll('.reveal').forEach(function(el) {
                el.style.transition = animOn ? '' : 'none';
                if (!animOn) el.classList.add('visible');
            });
        }
        function updateAnimToggle(on) {
            var toggle = document.getElementById('animToggle');
            var dot = document.getElementById('animDot');
            if (on) {
                toggle.style.background = 'linear-gradient(135deg,#f59e0b,#f97316)';
                dot.style.right = '3px';
                dot.style.left = 'auto';
            } else {
                toggle.style.background = 'var(--bg-card)';
                dot.style.left = '3px';
                dot.style.right = 'auto';
            }
        }

        function changeName() {
            var newName = document.getElementById('newNameInput').value.trim();
            if (!newName) return;
            var user = CuricaaAuth.getUser();
            if (!user) return;
            // Update name in localStorage
            var accounts = JSON.parse(localStorage.getItem('curicaa_accounts') || '[]');
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].email === user.email) {
                    accounts[i].name = newName;
                    break;
                }
            }
            localStorage.setItem('curicaa_accounts', JSON.stringify(accounts));
            // Update session
            var session = JSON.parse(localStorage.getItem('curicaa_session') || '{}');
            session.name = newName;
            localStorage.setItem('curicaa_session', JSON.stringify(session));
            document.getElementById('newNameInput').value = '';
            document.getElementById('newNameInput').placeholder = newName;
            updateAuthUI();
            // Re-render account info in settings
            openSettings();
            document.getElementById('settingsModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        // Restore saved settings on load
        (function() {
            var savedFont = localStorage.getItem('curicaa-font');
            if (savedFont) applyFont(savedFont);
            if (localStorage.getItem('curicaa-anim') === 'off') {
                document.querySelectorAll('.reveal').forEach(function(el) {
                    el.style.transition = 'none';
                    el.classList.add('visible');
                });
            }
        })();

        // --- Confetti on purchase ---
        function launchConfetti() {
            var canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
            document.body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var particles = [];
            var colors = ['#f59e0b','#fb923c','#fbbf24','#4ade80','#22d3ee','#34d399','#f472b6','#60a5fa'];
            for (var i = 0; i < 150; i++) {
                particles.push({
                    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                    y: canvas.height / 2,
                    vx: (Math.random() - 0.5) * 18,
                    vy: Math.random() * -18 - 4,
                    w: Math.random() * 8 + 4,
                    h: Math.random() * 6 + 3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                    rotSpeed: (Math.random() - 0.5) * 12,
                    gravity: 0.35 + Math.random() * 0.2,
                    opacity: 1
                });
            }
            var frame = 0;
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var alive = false;
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.x += p.vx;
                    p.vy += p.gravity;
                    p.y += p.vy;
                    p.rotation += p.rotSpeed;
                    p.vx *= 0.99;
                    if (frame > 40) p.opacity -= 0.015;
                    if (p.opacity <= 0) continue;
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                }
                frame++;
                if (alive && frame < 180) {
                    requestAnimationFrame(animate);
                } else {
                    canvas.remove();
                }
            }
            requestAnimationFrame(animate);
        }

        // --- Hide pricing for annual bundle users ---
        function updatePricingVisibility() {
            var user = CuricaaAuth.getUser();
            var isAnnualBundle = user && user.plan === 'bundle';
            var pricingSection = document.getElementById('pricing');
            if (pricingSection) pricingSection.style.display = isAnnualBundle ? 'none' : '';

            // Nav pricing link
            var navPricing = document.getElementById('navPricingLink');
            if (navPricing) navPricing.style.display = isAnnualBundle ? 'none' : '';

            // Mobile nav pricing link
            var mobilePricing = document.getElementById('mobilePricingLink');
            if (mobilePricing) mobilePricing.style.display = isAnnualBundle ? 'none' : '';

            // Hero "See Pricing" button
            var heroPricing = document.getElementById('heroPricingBtn');
            if (heroPricing) heroPricing.style.display = isAnnualBundle ? 'none' : '';

            // Footer pricing link
            var footerPricing = document.getElementById('footerPricingLink');
            if (footerPricing) footerPricing.style.display = isAnnualBundle ? 'none' : '';

            // User menu "Upgrade Plan" link
            var upgradeLink = document.getElementById('upgradePlanLink');
            if (upgradeLink) upgradeLink.style.display = isAnnualBundle ? 'none' : '';

            // Remove card locks & update buttons for bundle users
            var cards = document.querySelectorAll('#pathways .card');
            cards.forEach(function(card) {
                var lock = card.querySelector('.card-lock');
                if (lock) lock.style.display = isAnnualBundle ? 'none' : 'flex';
                var freeTag = card.querySelector('.free-tag');
                if (freeTag && isAnnualBundle) freeTag.remove();
                var btn = card.querySelector('.btn-cta');
                if (btn && isAnnualBundle) {
                    btn.innerHTML = 'View Curriculum <i class="fas fa-arrow-right" style="font-size:10px;"></i>';
                }
            });
        }
        // Hook into existing updateAuthUI
        var origUpdateAuthUI = updateAuthUI;
        updateAuthUI = function() {
            origUpdateAuthUI();
            updatePricingVisibility();
        };
        // Also run on load
        updatePricingVisibility();

        // Enter key support for login/signup forms
        document.getElementById('loginPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') handleLogin(); });
        document.getElementById('signupPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') handleSignup(); });

        // Stars
        const starsEl = document.getElementById('stars');
        for (let i = 0; i < 90; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.left = Math.random() * 100 + '%';
            s.style.top = Math.random() * 100 + '%';
            s.style.setProperty('--dur', (2.5 + Math.random() * 4) + 's');
            s.style.setProperty('--delay', (Math.random() * 6) + 's');
            if (Math.random() > 0.7) { s.style.width = '3px'; s.style.height = '3px'; }
            starsEl.appendChild(s);
        }

        // Scroll reveal
        const observer = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90);
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Hero stat counter animation
        (function() {
            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
            var statsAnimated = false;

            function formatNumber(n, el) {
                if (el.hasAttribute('data-format') && el.getAttribute('data-format') === 'comma') {
                    return Math.round(n).toLocaleString();
                }
                if (el.hasAttribute('data-decimal')) {
                    var d = parseInt(el.getAttribute('data-decimal'));
                    return n.toFixed(d);
                }
                return Math.round(n).toString();
            }

            function animateCounter(el) {
                var target = parseFloat(el.getAttribute('data-count-to'));
                var duration = 1500;
                var startTime = null;
                var countSpan = el.querySelector('.stat-count');
                if (!countSpan) return;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    var current = eased * target;
                    countSpan.textContent = formatNumber(current, el);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        countSpan.textContent = formatNumber(target, el);
                    }
                }
                requestAnimationFrame(step);
            }

            function checkStats() {
                if (statsAnimated) return;
                var statNums = document.querySelectorAll('.hero-stat-num[data-count-to]');
                if (statNums.length === 0) return;

                if (prefersReduced && prefersReduced.matches) {
                    statNums.forEach(function(el) {
                        var countSpan = el.querySelector('.stat-count');
                        if (countSpan) countSpan.textContent = formatNumber(parseFloat(el.getAttribute('data-count-to')), el);
                    });
                    statsAnimated = true;
                    return;
                }

                var statObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            statObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                statNums.forEach(function(el) { statObserver.observe(el); });
                statsAnimated = true;
            }

            // Start after page load (coordinated with .reveal animation)
            if (document.readyState === 'complete') {
                checkStats();
            } else {
                window.addEventListener('load', checkStats);
            }
        })();

        // Mobile menu
        function toggleMobileMenu() {
            const overlay = document.getElementById('mobileNavOverlay');
            if (overlay.classList.contains('open')) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            } else {
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }

        // Subject modal
        let currentProgram = '';
        const labels = {
            'ages-5-7': 'Level 1 — Ages 5–7',
            'age-8': 'Level 2 — Age 8',
            'age-9': 'Level 3 — Age 9',
            'age-10': 'Level 4 — Age 10',
            'ages-11-12': 'Middle School — Ages 11–12',
            'age-14': 'High School — Age 14',
            'ages-15-16': 'GED — Ages 15–16',
            'ages-17-18': 'SAT — Ages 17–18'
        };

        function openSubjectModal(p) {
            currentProgram = p;
            document.getElementById('modalTitle').textContent = labels[p] || 'Choose a Subject';
            const isSocialStudies = p === 'ages-15-16' || p === 'age-14';
            const isSAT = p === 'ages-17-18';
            document.getElementById('fourthSubjectTitle').textContent = isSocialStudies ? 'Social Studies' : 'Art & PE';
            document.getElementById('fourthSubjectDesc').textContent = isSocialStudies ? 'History, civics, geography' : 'Creative arts, music, PE';
            document.getElementById('fourthSubjectIconEl').className = isSocialStudies ? 'fas fa-globe' : 'fas fa-palette';
            document.getElementById('fourthSubjectIconEl').style.color = isSocialStudies ? '#facc15' : '#f472b6';
            document.getElementById('fourthSubjectIcon').style.background = isSocialStudies ? 'rgba(234,179,8,0.14)' : 'rgba(236,72,153,0.14)';
            document.querySelector('.subject-btn[onclick="goToSubject(\'science\')"]').style.display = isSAT ? 'none' : '';
            document.getElementById('fourthSubjectBtn').style.display = isSAT ? 'none' : '';
            document.getElementById('subjectModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeSubjectModal() {
            document.getElementById('subjectModal').classList.remove('open');
            document.body.style.overflow = '';
            currentProgram = '';
        }
        function handleOverlayClick(e) {
            if (e.target === document.getElementById('subjectModal')) closeSubjectModal();
        }
        function goToSubject(subject) {
            if (!currentProgram) return;
            window.location.href = currentProgram + '-' + subject + '.html';
        }
        function goToFourthSubject() {
            if (!currentProgram) return;
            const subject = (currentProgram === 'ages-15-16' || currentProgram === 'age-14') ? 'social-studies' : 'art';
            window.location.href = currentProgram + '-' + subject + '.html';
        }

        // Checkout flow
        let selectedPlan = '';
        let selectedGrades = [];
        function selectGrade(btn) {
            var grade = btn.dataset.grade;
            var idx = selectedGrades.indexOf(grade);
            if (idx === -1) {
                selectedGrades.push(grade);
                btn.style.borderColor = 'rgba(245,158,11,0.6)';
                btn.style.background = 'rgba(245,158,11,0.12)';
            } else {
                selectedGrades.splice(idx, 1);
                btn.style.borderColor = 'var(--border-card)';
                btn.style.background = 'var(--bg-subtle)';
            }
            // Update price dynamically
            var unitPrice = billingPeriod === 'annual' ? 69 : 9;
            var periodLabel = billingPeriod === 'annual' ? '/yr' : '/mo';
            if (selectedPlan === 'single' && selectedGrades.length > 0) {
                var total = selectedGrades.length * unitPrice;
                document.getElementById('checkoutSummary').innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:13px;font-weight:600;">' + selectedGrades.length + ' Grade' + (selectedGrades.length > 1 ? 's' : '') + '</div><div style="font-size:11px;color:var(--text-muted);">$' + unitPrice + periodLabel + ' each · All 4 subjects per grade</div></div><div style="font-size:18px;font-weight:800;color:#fbbf24;">$' + total + '<span style="font-size:13px;font-weight:500;">' + periodLabel + '</span></div></div>';
            } else if (selectedPlan === 'single') {
                document.getElementById('checkoutSummary').innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:13px;font-weight:600;">Select Grade Levels</div><div style="font-size:11px;color:var(--text-muted);">Pick one or more below · $' + unitPrice + periodLabel + ' each</div></div><div style="font-size:18px;font-weight:800;color:#fbbf24;">$' + unitPrice + '<span style="font-size:13px;font-weight:500;">' + periodLabel + '</span></div></div>';
            }
        }
        function handleBuy(plan) {
            if (CuricaaAuth && CuricaaAuth.isLoggedIn()) {
                openCheckout(plan);
            } else {
                openSignupModal();
            }
        }
        function openCheckout(plan) {
            selectedPlan = plan;
            selectedGrades = [];
            var isBundle = plan === 'bundle';
            var periodLabel = billingPeriod === 'annual' ? '/yr' : '/mo';
            var bundlePrice = billingPeriod === 'annual' ? 129 : 19;
            var singlePrice = billingPeriod === 'annual' ? 69 : 9;
            document.getElementById('checkoutTitle').textContent = isBundle ? 'Full K-12 Bundle' : 'Single Grade Access';
            document.getElementById('gradeSelector').style.display = isBundle ? 'none' : 'block';
            // Reset grade selection
            document.querySelectorAll('.grade-opt').forEach(function(b) {
                b.style.borderColor = 'var(--border-card)';
                b.style.background = 'var(--bg-subtle)';
            });
            document.getElementById('checkoutSummary').innerHTML = isBundle
                ? '<div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:13px;font-weight:600;">Full K-12 Bundle</div><div style="font-size:11px;color:var(--text-muted);">All 8 levels · All subjects · Billed ' + billingPeriod + '</div></div><div style="font-size:18px;font-weight:800;color:#fbbf24;">$' + bundlePrice + '<span style="font-size:13px;font-weight:500;">' + periodLabel + '</span></div></div>'
                : '<div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-size:13px;font-weight:600;">Select Grade Levels</div><div style="font-size:11px;color:var(--text-muted);">Pick one or more below · $' + singlePrice + periodLabel + ' each</div></div><div style="font-size:18px;font-weight:800;color:#fbbf24;">$' + singlePrice + '<span style="font-size:13px;font-weight:500;">' + periodLabel + '</span></div></div>';
            document.getElementById('checkoutModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeCheckout() {
            document.getElementById('checkoutModal').classList.remove('open');
            document.body.style.overflow = '';
        }
        function handlePurchase() {
            // Must be logged in to purchase
            if (!CuricaaAuth || !CuricaaAuth.isLoggedIn()) {
                closeCheckout();
                openSignupModal();
                return;
            }
            // Validate grade selection for single plan
            if (selectedPlan === 'single' && selectedGrades.length === 0) {
                alert('Please select at least one grade level.');
                return;
            }
            // Update user plan
            if (CuricaaAuth && CuricaaAuth.isLoggedIn()) {
                // If buying additional grades on single plan, merge with existing
                var existingUser = CuricaaAuth.getUser();
                var existingGrades = (existingUser && existingUser.plan === 'single' && existingUser.grades) ? existingUser.grades : [];
                var mergedGrades = existingGrades.slice();
                for (var i = 0; i < selectedGrades.length; i++) {
                    if (mergedGrades.indexOf(selectedGrades[i]) === -1) {
                        mergedGrades.push(selectedGrades[i]);
                    }
                }
                CuricaaAuth.updatePlan(selectedPlan === 'bundle' ? 'bundle' : 'single', selectedPlan === 'bundle' ? [] : mergedGrades);
                updateAuthUI();
            }
            closeCheckout();
            launchConfetti();
            document.getElementById('successModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeSuccess() {
            document.getElementById('successModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        // --- Billing Toggle ---
        let billingPeriod = 'annual'; // default to annual

        function toggleBilling() {
            billingPeriod = billingPeriod === 'annual' ? 'monthly' : 'annual';
            updateBillingUI();
        }

        function updateBillingUI() {
            var dot = document.getElementById('billingDot');
            var labelM = document.getElementById('toggleLabelMonthly');
            var labelA = document.getElementById('toggleLabelAnnual');
            var savingsTag = document.getElementById('annualSavingsTag');
            var toggle = document.getElementById('billingToggle');

            if (billingPeriod === 'annual') {
                dot.style.left = '27px';
                labelA.style.color = '#fbbf24';
                labelM.style.color = 'var(--text-muted)';
                toggle.style.background = 'linear-gradient(135deg,#f59e0b,#f97316)';
                savingsTag.style.visibility = 'visible';
                savingsTag.style.opacity = '1';
            } else {
                dot.style.left = '3px';
                labelM.style.color = '#fbbf24';
                labelA.style.color = 'var(--text-muted)';
                toggle.style.background = 'var(--bg-card-hover)';
                savingsTag.style.visibility = 'hidden';
                savingsTag.style.opacity = '0';
            }

            // Animate price change
            var priceEls = document.querySelectorAll('.price-amount');
            priceEls.forEach(function(el) {
                el.classList.remove('price-flip-out', 'price-flip-in');
                // Force reflow to restart animation
                void el.offsetWidth;
                el.classList.add('price-flip-out');
            });

            setTimeout(function() {
                priceEls.forEach(function(el) {
                    var price = billingPeriod === 'annual' ? el.dataset.annual : el.dataset.monthly;
                    el.textContent = '$' + price;
                    el.classList.remove('price-flip-out');
                    void el.offsetWidth;
                    el.classList.add('price-flip-in');
                });

                // Animate period labels
                document.querySelectorAll('.price-period').forEach(function(el) {
                    el.textContent = billingPeriod === 'annual' ? '/year' : '/month';
                    el.classList.remove('price-flip-in');
                    void el.offsetWidth;
                    el.classList.add('price-flip-in');
                });

                // Animate savings tags
                document.querySelectorAll('.price-savings').forEach(function(el) {
                    if (billingPeriod === 'annual') {
                        el.style.display = '';
                        el.classList.remove('savings-slide-in');
                        void el.offsetWidth;
                        el.classList.add('savings-slide-in');
                    } else {
                        el.style.display = 'none';
                    }
                });
            }, 180);
        }

        // Init billing UI
        updateBillingUI();

        // Testimonial Carousel (seamless infinite loop)
        (function() {
            var track = document.getElementById('carouselTrack');
            if (!track) return;
            var originals = Array.from(track.querySelectorAll('.carousel-card'));
            var total = originals.length;
            if (total === 0) return;

            // Clone ALL cards: [clones of all originals] [originals] [clones of all originals]
            for (var i = 0; i < total; i++) {
                var clAfter = originals[i].cloneNode(true);
                clAfter.classList.add('carousel-clone');
                track.appendChild(clAfter);
            }
            for (var j = total - 1; j >= 0; j--) {
                var clBefore = originals[j].cloneNode(true);
                clBefore.classList.add('carousel-clone');
                track.insertBefore(clBefore, track.firstChild);
            }

            var allCards = track.querySelectorAll('.carousel-card');
            var realIndex = 0; // 0-based index into originals
            var isAnimating = false;
            var cardWidth = 0;

            function measure() {
                // Measure distance between first two cards
                if (allCards.length >= 2) {
                    cardWidth = allCards[1].offsetLeft - allCards[0].offsetLeft;
                }
                if (!cardWidth || cardWidth < 50) {
                    cardWidth = (allCards[0] && allCards[0].offsetWidth) ? allCards[0].offsetWidth + 16 : 320;
                }
            }

            function getRealLeft(idx) {
                // Position of real card at index idx (in the originals block)
                // The originals start at position total * cardWidth
                return (total + idx) * cardWidth;
            }

            function jumpInstant(idx) {
                measure();
                realIndex = ((idx % total) + total) % total;
                track.scrollLeft = getRealLeft(realIndex);
            }

            function smoothScroll(targetLeft, onDone) {
                isAnimating = true;
                // Animate using requestAnimationFrame
                var startLeft = track.scrollLeft;
                var distance = targetLeft - startLeft;
                var duration = 380; // ms
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var elapsed = timestamp - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    var ease = 1 - Math.pow(1 - progress, 3);
                    track.scrollLeft = startLeft + distance * ease;
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        track.scrollLeft = targetLeft;
                        isAnimating = false;
                        if (onDone) onDone();
                    }
                }
                requestAnimationFrame(step);
            }

            window.slideCarousel = function(dir) {
                if (isAnimating) return;
                measure();
                var targetIdx = realIndex + dir;
                var targetLeft = getRealLeft(targetIdx);
                realIndex = targetIdx;
                smoothScroll(targetLeft, function() {
                    // Normalize back into the originals zone instantly
                    var normalized = ((realIndex % total) + total) % total;
                    if (normalized !== realIndex) {
                        realIndex = normalized;
                        track.scrollLeft = getRealLeft(normalized);
                    }
                });
            };

            // Touch/swipe support
            var startX = 0;
            var touchStartLeft = 0;
            track.addEventListener('touchstart', function(e) {
                if (isAnimating) return;
                startX = e.touches[0].clientX;
                touchStartLeft = track.scrollLeft;
            }, { passive: true });
            track.addEventListener('touchmove', function(e) {
                var diff = startX - e.touches[0].clientX;
                track.scrollLeft = touchStartLeft + diff;
            }, { passive: true });
            track.addEventListener('touchend', function(e) {
                if (isAnimating) return;
                var diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    window.slideCarousel(diff > 0 ? 1 : -1);
                } else {
                    // Snap back to current position
                    measure();
                    smoothScroll(getRealLeft(realIndex));
                }
            }, { passive: true });

            // Initialize
            measure();
            jumpInstant(0);

            // Re-measure on resize
            window.addEventListener('resize', function() {
                measure();
                jumpInstant(realIndex);
            });
        })();

        // FAQ accordion
        function toggleFaq(el) {
            var wasOpen = el.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('open');
            });
            if (!wasOpen) el.classList.add('open');
        }

        // Lead magnet capture
        function handleLeadCapture() {
            var email = document.getElementById('leadEmail').value.trim();
            if (!email || email.indexOf('@') === -1) {
                alert('Please enter a valid email address.');
                return;
            }
            var leads = JSON.parse(localStorage.getItem('curicaa_leads') || '[]');
            leads.push({ email: email, date: new Date().toISOString() });
            localStorage.setItem('curicaa_leads', JSON.stringify(leads));
            var btn = document.querySelector('#leadmagnet button');
            btn.textContent = 'Sent! Check your inbox \u2713';
            btn.style.background = 'linear-gradient(135deg, #4ade80, #22d3ee)';
            btn.style.cursor = 'default';
            document.getElementById('leadEmail').value = '';
            setTimeout(function() {
                btn.textContent = 'Send Me Week 1';
                btn.style.background = 'linear-gradient(135deg,#f59e0b,#f97316)';
                btn.style.cursor = 'pointer';
            }, 4000);
        }



        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeSubjectModal();
                closeCheckout();
                closeSuccess();
                closeLoginModal();
                closeSignupModal();
                closeSettings();
            }
        });
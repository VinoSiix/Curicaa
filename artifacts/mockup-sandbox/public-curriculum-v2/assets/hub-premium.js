        // ===================== PAGE DATA =====================
        var PAGE_DATA = {
            pathways: [
                {
                    id: 'level-1', title: 'Level 1', ageRange: 'Ages 5\u20137', colorClass: 'card-purple',
                    iconClass: 'fas fa-child', gradientBg: 'linear-gradient(135deg,#a855f7,#ec4899)',
                    sectionLabel: 'Foundation building', onclickParam: 'ages-5-7',
                    titleColor: '#d8b4fe', ageBadgeColor: '#c4b5fd',
                    subjects: [
                        {text: 'Basic reading', dotColor: '#a855f7'},
                        {text: 'Number sense', dotColor: '#a855f7'},
                        {text: 'Science discovery', dotColor: '#a855f7'},
                        {text: 'Creative arts', dotColor: '#a855f7'}
                    ]
                },
                {
                    id: 'level-2', title: 'Level 2', ageRange: 'Age 8', colorClass: 'card-blue',
                    iconClass: 'fas fa-star', gradientBg: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                    sectionLabel: 'Skill development', onclickParam: 'age-8',
                    titleColor: '#93c5fd', ageBadgeColor: '#93c5fd',
                    subjects: [
                        {text: 'Fluent reading', dotColor: '#3b82f6'},
                        {text: 'Multiplication', dotColor: '#3b82f6'},
                        {text: 'Scientific method', dotColor: '#3b82f6'},
                        {text: 'Art techniques', dotColor: '#3b82f6'}
                    ]
                },
                {
                    id: 'level-3', title: 'Level 3', ageRange: 'Age 9', colorClass: 'card-green',
                    iconClass: 'fas fa-book', gradientBg: 'linear-gradient(135deg,#10b981,#34d399)',
                    sectionLabel: 'Knowledge expansion', onclickParam: 'age-9',
                    titleColor: '#6ee7b7', ageBadgeColor: '#6ee7b7',
                    subjects: [
                        {text: 'Comprehension', dotColor: '#10b981'},
                        {text: 'Division', dotColor: '#10b981'},
                        {text: 'Lab reports', dotColor: '#10b981'},
                        {text: 'Creative projects', dotColor: '#10b981'}
                    ]
                },
                {
                    id: 'level-4', title: 'Level 4', ageRange: 'Age 10', colorClass: 'card-orange',
                    iconClass: 'fas fa-rocket', gradientBg: 'linear-gradient(135deg,#f97316,#ef4444)',
                    sectionLabel: 'Advanced basics', onclickParam: 'age-10',
                    titleColor: '#fdba74', ageBadgeColor: '#fdba74',
                    subjects: [
                        {text: 'Essay writing', dotColor: '#f97316'},
                        {text: 'Fractions/decimals', dotColor: '#f97316'},
                        {text: 'Research skills', dotColor: '#f97316'},
                        {text: 'Art analysis', dotColor: '#f97316'}
                    ]
                },
                {
                    id: 'middle-school', title: 'Middle School', ageRange: 'Ages 11\u201312', colorClass: 'card-indigo',
                    iconClass: 'fas fa-brain', gradientBg: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    sectionLabel: 'Preparation focus', onclickParam: 'ages-11-12',
                    titleColor: '#a5b4fc', ageBadgeColor: '#a5b4fc',
                    subjects: [
                        {text: 'Research essays', dotColor: '#6366f1'},
                        {text: 'Pre-algebra', dotColor: '#6366f1'},
                        {text: 'Advanced labs', dotColor: '#6366f1'},
                        {text: 'Digital arts', dotColor: '#6366f1'}
                    ]
                },
                {
                    id: 'high-school', title: 'High School', ageRange: 'Age 14', colorClass: 'card-red',
                    iconClass: 'fas fa-graduation-cap', gradientBg: 'linear-gradient(135deg,#ef4444,#ec4899)',
                    sectionLabel: 'Critical thinking', onclickParam: 'age-14',
                    titleColor: '#fca5a5', ageBadgeColor: '#fca5a5',
                    subjects: [
                        {text: 'Algebra I', dotColor: '#ef4444'},
                        {text: '9th Grade English', dotColor: '#ef4444'},
                        {text: 'Biology', dotColor: '#ef4444'},
                        {text: 'Social Studies', dotColor: '#ef4444'}
                    ]
                },
                {
                    id: 'ged', title: 'GED', ageRange: 'Ages 15\u201316', colorClass: 'card-yellow',
                    iconClass: 'fas fa-certificate', gradientBg: 'linear-gradient(135deg,#eab308,#f97316)',
                    sectionLabel: 'GED preparation', onclickParam: 'ages-15-16',
                    titleColor: '#fde047', ageBadgeColor: '#fde047',
                    subjects: [
                        {text: 'English', dotColor: '#eab308'},
                        {text: 'Science', dotColor: '#eab308'},
                        {text: 'Math', dotColor: '#eab308'},
                        {text: 'Social Studies', dotColor: '#eab308'}
                    ]
                },
                {
                    id: 'sat', title: 'SAT', ageRange: 'Ages 17\u201318', colorClass: 'card-teal',
                    iconClass: 'fas fa-trophy', gradientBg: 'linear-gradient(135deg,#06b6d4,#22d3ee)',
                    sectionLabel: 'SAT preparation', onclickParam: 'ages-17-18',
                    titleColor: '#67e8f9', ageBadgeColor: '#67e8f9',
                    subjects: [
                        {text: 'SAT Math', dotColor: '#06b6d4'},
                        {text: 'Reading & Writing', dotColor: '#06b6d4'},
                        {text: 'Test Strategies & Pacing', dotColor: '#06b6d4'},
                        {text: 'Full Practice Tests', dotColor: '#06b6d4'}
                    ]
                }
            ],
            features: [
                {iconClass: 'fas fa-calendar-alt', iconColor: '#fbbf24', title: 'Done-For-You Lesson Plans', subtitle: '10 months, week by week'},
                {iconClass: 'fas fa-check-circle', iconColor: '#4ade80', title: 'Zero Prep Required', subtitle: 'Open and teach instantly'},
                {iconClass: 'fas fa-wifi', iconColor: '#22d3ee', title: 'Works Offline', subtitle: 'No internet needed to teach'},
                {iconClass: 'fas fa-mobile-alt', iconColor: '#fbbf24', title: 'Any Device, Anywhere', subtitle: 'Phone, tablet, or laptop'},
                {iconClass: 'fas fa-chalkboard-teacher', iconColor: '#f59e0b', title: 'Parent-Friendly Guides', subtitle: 'Step-by-step for non-teachers'},
                {iconClass: 'fas fa-dollar-sign', iconColor: '#fb923c', title: 'Household Materials Only', subtitle: 'No expensive supplies to buy'},
                {iconClass: 'fas fa-chart-line', iconColor: '#22d3ee', title: 'Track Your Child\'s Growth', subtitle: 'Built-in progress & assessments'},
                {iconClass: 'fas fa-layer-group', iconColor: '#f472b6', title: 'Adapts to Every Learner', subtitle: 'Easier & harder options included'},
                {iconClass: 'fas fa-flask', iconColor: '#fbbf24', title: 'Hands-On Science Experiments', subtitle: 'Real learning, real fun'},
                {iconClass: 'fas fa-book-open', iconColor: '#60a5fa', title: 'Curated Reading Lists', subtitle: 'Age-matched book suggestions'},
                {iconClass: 'fas fa-music', iconColor: '#f87171', title: 'Art & Music Integrated', subtitle: 'Creativity in every unit'},
                {iconClass: 'fas fa-award', iconColor: '#2dd4bf', title: 'Celebrate Every Milestone', subtitle: 'Badges & achievements'}
            ],
            testimonials: [
                {stars: 5, quote: 'We\u2019ve tried so many curriculum options and this is the first one that actually feels designed for real families. My daughter asks to do her lessons now.', name: 'Sarah Mitchell', location: 'Austin, TX', detail: 'Homeschooling 2 kids, ages 6 & 9'},
                {stars: 5, quote: 'The weekly breakdowns are a lifesaver. I open the page on Monday morning and everything is laid out. No prep stress, no guessing.', name: 'David Ramirez', location: 'Denver, CO', detail: 'Dad of a 10-year-old'},
                {stars: 5, quote: 'As a single mom on a tight budget, the fact that this uses household materials for science experiments means everything. Quality education without breaking the bank.', name: 'Maria Lopez', location: 'Miami, FL', detail: 'Homeschooling since 2023'},
                {stars: 4, quote: 'I pulled my son out of public school mid-year and was panicking about curriculum. This gave me everything I needed from day one. The parent guides are incredible \u2014 I just wish there were more video lessons.', name: 'Jessica Thompson', location: 'Portland, OR', detail: 'Mom of a 7th grader'},
                {stars: 5, quote: 'My kids love the science experiments. Last week we built a volcano with baking soda and vinegar \u2014 they talked about it for three days. Real learning, real fun.', name: 'Marcus Williams', location: 'Atlanta, GA', detail: 'Dad of twins, age 8'},
                {stars: 5, quote: 'We\u2019re a military family and move a lot. Having a complete curriculum that works offline and doesn\u2019t depend on a school district has been a game-changer for us.', name: 'Angela Patterson', location: 'Fort Bragg, NC', detail: 'Military spouse, 2 kids ages 5 & 11'},
                {stars: 5, quote: 'The SAT prep section alone is worth the price. My son\u2019s practice scores went up 120 points in six weeks. The pacing strategies really work.', name: 'Linda Chen', location: 'Chicago, IL', detail: 'Son preparing for college'}
            ],
            faq: [
                {question: 'Is this a subscription?', answer: 'Yes \u2014 but with no long-term commitment. Choose monthly or annual billing. You can cancel anytime, and you\u2019ll keep access through the end of your billing period. No hidden fees, no contracts.'},
                {question: 'What happens if I cancel?', answer: 'You keep full access through the end of your current billing period. No partial charges, no penalties. Your progress is saved in case you want to come back later.'},
                {question: 'What if I have multiple children in different grades?', answer: 'The Full K\u201312 Bundle is perfect for families with multiple kids. You get access to all 8 grade levels, so each child can work at their own pace.'},
                {question: 'Can I switch from monthly to annual?', answer: 'Absolutely. You can upgrade to annual billing at any time from your account settings. We\u2019ll prorate the difference so you never overpay.'},
                {question: 'Do I need to be a teacher to use this?', answer: 'Not at all. Every lesson includes step-by-step parent guides, warm-up activities, and assessment tips. If you can read, you can teach with this.'},
                {question: 'What materials do I need?', answer: 'Most activities use common household items like paper, pencils, measuring cups, and kitchen supplies. We specifically design for low-budget, accessible learning.'},
                {question: 'Is there a money-back guarantee?', answer: 'Yes. We offer a full 30-day money-back guarantee. If you\u2019re not satisfied for any reason, just let us know and we\u2019ll refund your purchase.'}
            ],
            stats: [
                {iconClass: 'fas fa-calendar-week', iconColor: '#fbbf24', number: '320', suffix: '+', label: 'Weeks of Lessons', iconBg: 'rgba(251,191,36,0.12)'},
                {iconClass: 'fas fa-book-open', iconColor: '#67e8f9', number: '32', suffix: '', label: 'Subjects Covered', iconBg: 'rgba(103,232,249,0.12)'},
                {iconClass: 'fas fa-graduation-cap', iconColor: '#4ade80', number: '8', suffix: '', label: 'Grade Levels', iconBg: 'rgba(74,222,128,0.12)'},
                {iconClass: 'fas fa-sync-alt', iconColor: '#fbbf24', number: '2', suffix: '', label: 'Flexible Plans', iconBg: 'rgba(251,191,36,0.12)'},
                {iconClass: 'fas fa-wifi', iconColor: '#f472b6', number: '100', suffix: '%', label: 'Offline Ready', iconBg: 'rgba(244,114,182,0.12)'}
            ],
            grades: [
                {dataGrade: 'ages-5-7', title: 'Level 1', ageLabel: 'Ages 5\u20137'},
                {dataGrade: 'age-8', title: 'Level 2', ageLabel: 'Age 8'},
                {dataGrade: 'age-9', title: 'Level 3', ageLabel: 'Age 9'},
                {dataGrade: 'age-10', title: 'Level 4', ageLabel: 'Age 10'},
                {dataGrade: 'ages-11-12', title: 'Middle School', ageLabel: 'Ages 11\u201312'},
                {dataGrade: 'age-14', title: 'High School', ageLabel: 'Age 14'},
                {dataGrade: 'ages-15-16', title: 'GED Prep', ageLabel: 'Ages 15\u201316'},
                {dataGrade: 'ages-17-18', title: 'SAT Prep', ageLabel: 'Ages 17\u201318'}
            ]
        };
        // ===================== END PAGE DATA =====================

        // ===================== RENDER FUNCTIONS =====================
        function esc(str) { var d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

        // T7: Render pathway cards
        function renderPathwayCards() {
            var grid1 = document.getElementById('pathwayGrid1');
            var grid2 = document.getElementById('pathwayGrid2');
            if (!grid1 || !grid2) return;
            PAGE_DATA.pathways.forEach(function(p, i) {
                var card = document.createElement('div');
                card.className = 'card ' + p.colorClass;
                card.setAttribute('onclick', "openSubjectModal('" + p.onclickParam + "')");
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', p.title + ' ' + p.ageRange);
                card.onkeydown = function(e) { if (e.key === 'Enter') this.click(); };
                var subjectsHtml = p.subjects.map(function(s) {
                    return '<li><span class="dot" style="background:' + s.dotColor + ';"></span>' + esc(s.text) + '</li>';
                }).join('');
                card.innerHTML =
                    '<div class="card-lock"><i class="fas fa-lock" style="font-size:10px;color:rgba(255,255,255,0.35);"></i></div>' +
                    '<div class="icon-ring" style="background:' + p.gradientBg + ';">' +
                        '<i class="' + p.iconClass + '" style="font-size:19px;"></i>' +
                    '</div>' +
                    '<div style="text-align:center;">' +
                        '<h3 style="font-size:15px;font-weight:700;margin-bottom:4px;color:' + p.titleColor + ';">' + esc(p.title) + '</h3>' +
                        '<div class="age-badge" style="color:' + p.ageBadgeColor + ';">' + esc(p.ageRange) + '</div>' +
                        '<div class="subject-list">' +
                            '<p style="font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-section-subject);margin-bottom:7px;">' + esc(p.sectionLabel) + '</p>' +
                            '<ul>' + subjectsHtml + '</ul>' +
                        '</div>' +
                        '<p class="free-tag"><i class="fas fa-gift" style="margin-right:4px;color:#4ade80;"></i>First month free</p>' +
                        '<button class="btn-cta" style="background:' + p.gradientBg + ';color:white;">Free Preview <i class="fas fa-arrow-right" style="font-size:10px;"></i></button>' +
                    '</div>';
                if (i < 4) grid1.appendChild(card);
                else grid2.appendChild(card);
            });
        }

        // T8: Render feature pills
        function renderFeaturePills() {
            var grid = document.getElementById('featureGrid');
            if (!grid) return;
            PAGE_DATA.features.forEach(function(f) {
                var pill = document.createElement('div');
                pill.className = 'feature-pill';
                pill.innerHTML =
                    '<div class="feature-icon" style="background:var(--bg-mini-card);">' +
                        '<i class="' + f.iconClass + '" style="color:' + f.iconColor + ';font-size:15px;"></i>' +
                    '</div>' +
                    '<div>' +
                        '<div style="font-size:13px;font-weight:600;margin-bottom:2px;">' + esc(f.title) + '</div>' +
                        '<div style="font-size:11.5px;color:var(--text-muted);">' + esc(f.subtitle) + '</div>' +
                    '</div>';
                grid.appendChild(pill);
            });
        }

        // T9: Render testimonials carousel
        function renderTestimonials() {
            var track = document.getElementById('carouselTrack');
            if (!track) return;
            PAGE_DATA.testimonials.forEach(function(t) {
                var card = document.createElement('div');
                card.className = 'carousel-card';
                var starsHtml = '';
                for (var s = 0; s < 5; s++) {
                    starsHtml += s < t.stars
                        ? '<i class="fas fa-star" style="color:#fbbf24;font-size:12px;"></i>'
                        : '<i class="far fa-star" style="color:#fbbf24;font-size:12px;"></i>';
                }
                card.innerHTML =
                    '<div style="margin-bottom:16px;">' + starsHtml + '</div>' +
                    '<p style="color:var(--text-secondary);font-size:13.5px;line-height:1.65;font-style:italic;margin-bottom:0;">\u201C' + esc(t.quote) + '\u201D</p>' +
                    '<div style="height:1px;background:var(--border-faint);margin:16px 0;"></div>' +
                    '<div style="font-size:13px;font-weight:600;color:var(--text-primary);">' + esc(t.name) + '</div>' +
                    '<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">' + esc(t.location) + ' \u00B7 ' + esc(t.detail) + '</div>';
                track.appendChild(card);
            });
        }

        // T10: Render FAQ
        function renderFAQ() {
            var container = document.getElementById('faqContainer');
            if (!container) return;
            PAGE_DATA.faq.forEach(function(item) {
                var el = document.createElement('div');
                el.className = 'faq-item';
                el.setAttribute('onclick', 'toggleFaq(this)');
                el.innerHTML =
                    '<div class="faq-question">' +
                        '<span>' + esc(item.question) + '</span>' +
                        '<i class="fas fa-chevron-down faq-chevron"></i>' +
                    '</div>' +
                    '<div class="faq-answer">' + esc(item.answer) + '</div>';
                container.appendChild(el);
            });
        }

        // T11: Render stat cards
        function renderStatCards() {
            var grid = document.getElementById('statsGrid');
            if (!grid) return;
            PAGE_DATA.stats.forEach(function(s) {
                var card = document.createElement('div');
                card.className = 'stat-card-hover';
                card.style.cssText = 'background:var(--bg-card);border:1px solid var(--border-card);border-radius:18px;padding:28px 16px;text-align:center;transition:transform 0.3s ease,border-color 0.3s ease;';
                card.innerHTML =
                    '<div style="width:40px;height:40px;border-radius:11px;background:' + s.iconBg + ';display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">' +
                        '<i class="' + s.iconClass + '" style="color:' + s.iconColor + ';font-size:15px;"></i>' +
                    '</div>' +
                    '<div style="font-size:36px;font-weight:800;letter-spacing:-0.04em;color:' + s.iconColor + ';">' + esc(s.number) + '<span style="font-size:20px;">' + esc(s.suffix) + '</span></div>' +
                    '<div style="font-size:11px;font-weight:500;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-top:6px;">' + esc(s.label) + '</div>';
                grid.appendChild(card);
            });
        }

        // T12: Render grade selectors
        function renderGradeSelectors() {
            var grid = document.getElementById('gradeSelectorGrid');
            if (!grid) return;
            PAGE_DATA.grades.forEach(function(g) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'grade-opt';
                btn.setAttribute('data-grade', g.dataGrade);
                btn.setAttribute('onclick', 'selectGrade(this)');
                btn.style.cssText = "padding:10px;border-radius:10px;border:1px solid var(--border-card);background:var(--bg-subtle);color:var(--text-secondary);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;font-family:'Inter',sans-serif;text-align:left;";
                btn.innerHTML = '<div style="font-size:13px;color:var(--text-primary);">' + esc(g.title) + '</div>' +
                    '<div style="font-size:10px;color:var(--text-muted);margin-top:2px;">' + esc(g.ageLabel) + '</div>';
                grid.appendChild(btn);
            });
        }

        // Initialize all renders on page load
        function initRenders() {
            renderPathwayCards();
            renderFeaturePills();
            renderTestimonials();
            renderFAQ();
            renderStatCards();
            renderGradeSelectors();
        }

        // ===================== END RENDER FUNCTIONS =====================

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
                // Build DOM safely — no innerHTML with user data (XSS prevention)
                var infoWrap = document.createElement('div');
                infoWrap.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:8px;';
                var avatarDiv = document.createElement('div');
                avatarDiv.style.cssText = 'width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;';
                avatarDiv.textContent = user.name.charAt(0).toUpperCase();
                var textDiv = document.createElement('div');
                var nameDiv = document.createElement('div');
                nameDiv.style.cssText = 'font-weight:600;color:var(--text-primary);';
                nameDiv.textContent = user.name;
                var emailDiv = document.createElement('div');
                emailDiv.style.cssText = 'font-size:11px;color:var(--text-muted);';
                emailDiv.textContent = user.email;
                textDiv.appendChild(nameDiv);
                textDiv.appendChild(emailDiv);
                infoWrap.appendChild(avatarDiv);
                infoWrap.appendChild(textDiv);
                var planBadge = document.createElement('div');
                planBadge.style.cssText = 'display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;background:rgba(245,158,11,0.12);color:#fbbf24;';
                planBadge.textContent = planLabel;
                infoEl.innerHTML = '';
                infoEl.appendChild(infoWrap);
                infoEl.appendChild(planBadge);
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
                // Build DOM safely — no innerHTML with user data
                var infoWrap = document.createElement('div');
                infoWrap.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:8px;';
                var avatarDiv = document.createElement('div');
                avatarDiv.style.cssText = 'width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;';
                avatarDiv.textContent = user.name.charAt(0).toUpperCase();
                var textDiv = document.createElement('div');
                var nameDiv = document.createElement('div');
                nameDiv.style.cssText = 'font-weight:600;color:var(--text-primary);';
                nameDiv.textContent = user.name;
                var emailDiv = document.createElement('div');
                emailDiv.style.cssText = 'font-size:11px;color:var(--text-muted);';
                emailDiv.textContent = user.email;
                textDiv.appendChild(nameDiv);
                textDiv.appendChild(emailDiv);
                infoWrap.appendChild(avatarDiv);
                infoWrap.appendChild(textDiv);
                var planBadge = document.createElement('div');
                planBadge.style.cssText = 'display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;background:rgba(255,255,255,0.06);color:var(--text-muted);';
                planBadge.textContent = 'Free Plan';
                infoEl.innerHTML = '';
                infoEl.appendChild(infoWrap);
                infoEl.appendChild(planBadge);
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

        // Initialize data-driven renders
        initRenders();

        // Re-init auth UI after renders (cards are now dynamic)
        updateAuthUI();

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
            var grade = document.getElementById('leadGrade').value;
            if (!email || email.indexOf('@') === -1) {
                alert('Please enter a valid email address.');
                return;
            }
            var leads = JSON.parse(localStorage.getItem('curicaa_leads') || '[]');
            leads.push({ email: email, grade: grade, date: new Date().toISOString() });
            localStorage.setItem('curicaa_leads', JSON.stringify(leads));
            var btn = document.querySelector('#leadmagnet button');
            btn.textContent = 'Got it! We\'ll be in touch \u2713';
            btn.style.background = 'linear-gradient(135deg, #4ade80, #22d3ee)';
            btn.style.cursor = 'default';
            document.getElementById('leadEmail').value = '';
            setTimeout(function() {
                btn.textContent = 'Send Me Week 1';
                btn.style.background = 'linear-gradient(135deg,#f59e0b,#f97316)';
                btn.style.cursor = 'pointer';
            }, 4000);
        }

        // ===== ANNOUNCEMENT BAR =====
        function closeAnnounce() {
            var bar = document.getElementById('announceBar');
            bar.classList.add('hidden');
            localStorage.setItem('curicaa_announce_closed', '1');
        }
        (function() {
            if (localStorage.getItem('curicaa_announce_closed') === '1') {
                var bar = document.getElementById('announceBar');
                if (bar) bar.classList.add('hidden');
            }
        })();

        // ===== SAVINGS CALCULATOR =====
        var calcKidsCount = 1;
        function calcKids(delta) {
            calcKidsCount = Math.max(1, Math.min(6, calcKidsCount + delta));
            document.getElementById('calcKidsNum').textContent = calcKidsCount;
            var tradCost = calcKidsCount * 1000;
            var curicaaCost = 129;
            var savings = tradCost - curicaaCost;
            document.getElementById('calcTrad').textContent = '$' + tradCost.toLocaleString();
            document.getElementById('calcCuricaa').textContent = '$' + curicaaCost;
            document.getElementById('calcSave').textContent = '$' + savings.toLocaleString();
        }

        // ===== STICKY MOBILE CTA =====
        (function() {
            var sticky = document.getElementById('stickyMobileCta');
            if (!sticky) return;
            var heroSection = document.querySelector('.hero-badge');
            window.addEventListener('scroll', function() {
                if (!heroSection) return;
                var heroBottom = heroSection.getBoundingClientRect().bottom;
                if (heroBottom < -200) {
                    sticky.classList.add('visible');
                } else {
                    sticky.classList.remove('visible');
                }
            }, { passive: true });
        })();

        // ===== NEWSLETTER =====
        function handleNewsletter() {
            var email = document.getElementById('newsletterEmail').value.trim();
            if (!email || email.indexOf('@') === -1) {
                alert('Please enter a valid email address.');
                return;
            }
            var leads = JSON.parse(localStorage.getItem('curicaa_newsletter') || '[]');
            leads.push({ email: email, date: new Date().toISOString() });
            localStorage.setItem('curicaa_newsletter', JSON.stringify(leads));
            var btn = document.querySelector('footer button');
            btn.textContent = 'Subscribed \u2713';
            document.getElementById('newsletterEmail').value = '';
            setTimeout(function() { btn.textContent = 'Subscribe'; }, 3000);
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
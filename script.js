
        // Global Variables
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        let experiences = JSON.parse(localStorage.getItem('experiences')) || [];
        let educations = JSON.parse(localStorage.getItem('educations')) || [];
        let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        let resumeDownloads = JSON.parse(localStorage.getItem('resumeDownloads')) || [];

        // Social Media Links for QR Generation and Footer
        const socialLinks = [
            { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/yourprofile', color: '#0077b5' },
            { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/yourusername', color: '#333333' },
            { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/yourusername', color: '#1da1f2' },
            { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/yourusername', color: '#e4405f' },
            { name: 'Portfolio', icon: 'fas fa-globe', url: 'https://yourportfolio.com', color: '#3b82f6' },
            { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:your.email@example.com', color: '#ea4335' }
        ];

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            showLoadingScreen();
            setTimeout(() => {
                hideLoadingScreen();
                initializeCursor();
                initializeTheme();
                initializeMobileMenu();
                initializeScrollEffects();
                initializeAnimations();
                initializeParticles();
                initializeMagneticEffect();
                generateQRCodes();
                generateFooterSocial();
                loadProjects();
                loadExperienceEducation();
                setupResumeUpload();
                setupContactForm();
                setupProfileUpload();
                loadSavedAccentColor();
                createBackgroundElements();
            }, 1500);
        });

        // Loading Screen
        function showLoadingScreen() {
            document.getElementById('loadingScreen').style.display = 'flex';
        }

        function hideLoadingScreen() {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }

        // Custom Cursor - Only for Desktop
        function initializeCursor() {
            if (window.innerWidth > 768) {
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                
                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                });

                function animateCursor() {
                    cursorX += (mouseX - cursorX) * 0.1;
                    cursorY += (mouseY - cursorY) * 0.1;
                    
                    cursor.style.left = mouseX - 10 + 'px';
                    cursor.style.top = mouseY - 10 + 'px';
                    
                    cursorFollower.style.left = cursorX - 4 + 'px';
                    cursorFollower.style.top = cursorY - 4 + 'px';
                    
                    requestAnimationFrame(animateCursor);
                }
                animateCursor();

                // Cursor hover effects
                const hoverElements = document.querySelectorAll('a, button, .card, .magnetic, input, textarea');
                hoverElements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.classList.add('hover');
                    });
                    el.addEventListener('mouseleave', () => {
                        cursor.classList.remove('hover');
                    });
                });

                // Click effect
                document.addEventListener('mousedown', () => {
                    cursor.classList.add('click');
                });
                document.addEventListener('mouseup', () => {
                    cursor.classList.remove('click');
                });
            }
        }

        // Theme Toggle
        function initializeTheme() {
            const themeToggle = document.querySelector('.theme-toggle');
            const body = document.body;
            
            const savedTheme = localStorage.getItem('theme') || 'dark';
            body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
                generateQRCodes(); // Regenerate QR codes for new theme
            });
        }
        
        function updateThemeIcon(theme) {
            const icon = document.querySelector('.theme-toggle i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Mobile Menu
        function initializeMobileMenu() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                });
            });
        }

        // Scroll Effects
        function initializeScrollEffects() {
            window.addEventListener('scroll', () => {
                const scrollProgress = document.querySelector('.scroll-progress');
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                scrollProgress.style.width = scrollPercent + '%';

                // Header background effect
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.background = 'var(--blur-bg)';
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = 'var(--blur-bg)';
                    header.style.boxShadow = 'none';
                }
            });
        }

        // Scroll Animations with Intersection Observer
        function initializeAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add staggered animation for cards
                        const cards = entry.target.querySelectorAll('.card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        }

        // Particles System
        function initializeParticles() {
            const particlesContainer = document.querySelector('.particles-container');
            if (!particlesContainer) return;
            
            const particleCount = window.innerWidth > 768 ? 50 : 20;

            function createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                particlesContainer.appendChild(particle);

                particle.addEventListener('animationend', () => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                });
            }

            // Create initial particles
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => createParticle(), i * 200);
            }

            // Continuously create new particles
            setInterval(createParticle, 600);
        }

        // Create Background Elements
        function createBackgroundElements() {
            const animatedBg = document.querySelector('.animated-bg');
            if (!animatedBg) return;
            
            const particleCount = window.innerWidth > 768 ? 15 : 8;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'bg-particle';
                
                const sizeClass = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
                particle.classList.add(sizeClass);
                
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                animatedBg.appendChild(particle);
            }
        }

        // Magnetic Effect - Desktop Only
        function initializeMagneticEffect() {
            if (window.innerWidth > 768) {
                const magneticElements = document.querySelectorAll('.magnetic');
                
                magneticElements.forEach(element => {
                    element.addEventListener('mousemove', (e) => {
                        const rect = element.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        
                        const moveX = x * 0.15;
                        const moveY = y * 0.15;
                        
                        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    });
                    
                    element.addEventListener('mouseleave', () => {
                        element.style.transform = 'translate(0, 0)';
                    });
                });
            }
        }

        // Color Picker Functions
        function toggleColorPicker() {
            const picker = document.getElementById('colorPicker');
            picker.classList.toggle('active');
        }

        function changeAccentColor(color) {
            document.documentElement.style.setProperty('--accent', color);
            
            // Calculate hover color (slightly darker)
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            const hoverColor = `rgb(${Math.max(0, r-20)}, ${Math.max(0, g-20)}, ${Math.max(0, b-20)})`;
            
            document.documentElement.style.setProperty('--accent-hover', hoverColor);
            localStorage.setItem('accentColor', color);
            
            // Regenerate QR codes and update elements with new color
            generateQRCodes();
            generateFooterSocial();
        }

        function loadSavedAccentColor() {
            const savedColor = localStorage.getItem('accentColor');
            if (savedColor) {
                changeAccentColor(savedColor);
                document.getElementById('customColorPicker').value = savedColor;
            }
        }

        // Profile Photo Management
        function setupProfileUpload() {
            const profileInput = document.getElementById('profileInput');
            const profileImage = document.getElementById('profileImage');
            const uploadOverlay = document.querySelector('.upload-overlay');
            const removeBtn = document.getElementById('removePhotoBtn');

            uploadOverlay.addEventListener('click', () => {
                profileInput.click();
            });

            profileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profileImage.src = e.target.result;
                        localStorage.setItem('profileImage', e.target.result);
                        removeBtn.style.display = 'inline-block';
                        showMessage('Profile photo updated!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Load saved profile image
            const savedImage = localStorage.getItem('profileImage');
            if (savedImage) {
                profileImage.src = savedImage;
                removeBtn.style.display = 'inline-block';
            } else {
                removeBtn.style.display = 'none';
            }
        }

        function removeProfilePhoto() {
            if (confirm('Remove profile photo?')) {
                localStorage.removeItem('profileImage');
                document.getElementById('profileImage').src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAwIiBmaWxsPSIjMmEyYTJhIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzY2NjY2NiIvPgo8cGF0aCBkPSJNNjAgMTYwYzAtMzAgMjAtNTAgNDAtNTBzNDAgMjAgNDAgNTB2MTBINjB2LTEweiIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4=";
                document.getElementById('removePhotoBtn').style.display = 'none';
                showMessage('Profile photo removed!', 'success');
            }
        }

        // QR Code Generation
        function generateQRCodes() {
            const qrGrid = document.getElementById('qrGrid');
            qrGrid.innerHTML = '';

            socialLinks.forEach(link => {
                const qrCard = document.createElement('div');
                qrCard.className = 'qr-card magnetic';
                
                qrCard.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <i class="${link.icon}" style="font-size: 1.5rem; color: ${link.color}; margin-right: 0.5rem;"></i>
                        <h4 style="color: var(--text-primary);">${link.name}</h4>
                    </div>
                    <div class="qr-code" id="qr-${link.name.toLowerCase().replace(/\s+/g, '-')}"></div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 1rem;">
                        Scan to visit my ${link.name}
                    </p>
                    <button onclick="copyToClipboard('${link.url}')" class="cta-button secondary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">
                        <i class="fas fa-copy"></i> Copy Link
                    </button>
                `;
                
                qrGrid.appendChild(qrCard);
                
                // Generate QR code
                try {
                    const qr = qrcode(0, 'M');
                    qr.addData(link.url);
                    qr.make();
                    
                    const qrContainer = document.getElementById(`qr-${link.name.toLowerCase().replace(/\s+/g, '-')}`);
                    if (qrContainer) {
                        qrContainer.innerHTML = qr.createImgTag(4);
                    }
                } catch (error) {
                    console.error('QR Code generation failed for', link.name, error);
                }
            });
        }

        // Generate Footer Social Media Icons
        function generateFooterSocial() {
            const footerSocial = document.getElementById('footerSocial');
            footerSocial.innerHTML = '';

            socialLinks.forEach(link => {
                const socialLink = document.createElement('a');
                socialLink.href = link.url;
                socialLink.target = '_blank';
                socialLink.title = link.name;
                socialLink.className = 'magnetic';
                socialLink.innerHTML = `<i class="${link.icon}"></i>`;
                
                footerSocial.appendChild(socialLink);
            });
        }

        // Project Management
        function openProjectModal() {
            document.getElementById('projectModal').classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        function addProject(projectData) {
            const project = {
                id: Date.now(),
                ...projectData,
                createdAt: new Date().toISOString()
            };
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjects();
            showMessage('Project added successfully!', 'success');
        }

        function deleteProject(id) {
            if (confirm('Delete this project?')) {
                projects = projects.filter(p => p.id !== id);
                localStorage.setItem('projects', JSON.stringify(projects));
                loadProjects();
                showMessage('Project deleted!', 'success');
            }
        }

        function clearAllProjects() {
            if (confirm('Are you sure you want to delete all projects?')) {
                projects = [];
                localStorage.setItem('projects', JSON.stringify(projects));
                loadProjects();
                showMessage('All projects cleared!', 'success');
            }
        }

        function loadProjects() {
            const container = document.getElementById('projectsContainer');
            container.innerHTML = '';

            if (projects.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <h3><i class="fas fa-folder-open"></i> No Projects Yet</h3>
                        <p>Click "Add New Project" to showcase your amazing work!</p>
                    </div>
                `;
                return;
            }

            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card magnetic';
                
                projectCard.innerHTML = `
                    <button class="delete-project" onclick="deleteProject(${project.id})" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${project.image ? `<img src="${project.image}" class="project-image" alt="${project.name}">` : ''}
                    <h3><i class="fas fa-project-diagram"></i> ${project.name}</h3>
                    <p style="margin-bottom: 1rem;">${project.description}</p>
                    ${project.technologies ? `<p style="color: var(--accent); margin-bottom: 1rem;"><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
                    <div class="project-actions">
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="cta-button"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank" class="cta-button secondary"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                `;
                
                container.appendChild(projectCard);
            });
        }

        // Experience & Education Management
        function openExperienceModal() {
            document.getElementById('experienceModal').classList.add('active');
        }

        function openEducationModal() {
            document.getElementById('educationModal').classList.add('active');
        }

        function addExperience(expData) {
            const experience = {
                id: Date.now(),
                type: 'experience',
                ...expData
            };
            experiences.push(experience);
            localStorage.setItem('experiences', JSON.stringify(experiences));
            loadExperienceEducation();
            showMessage('Experience added successfully!', 'success');
        }

        function addEducation(eduData) {
            const education = {
                id: Date.now(),
                type: 'education',
                ...eduData
            };
            educations.push(education);
            localStorage.setItem('educations', JSON.stringify(educations));
            loadExperienceEducation();
            showMessage('Education added successfully!', 'success');
        }

        function loadExperienceEducation() {
            const timeline = document.getElementById('experienceTimeline');
            timeline.innerHTML = '';

            const allItems = [...experiences, ...educations].sort((a, b) => {
                const aDate = new Date(a.startDate || a.startYear + '-01-01');
                const bDate = new Date(b.startDate || b.startYear + '-01-01');
                return bDate - aDate;
            });

            if (allItems.length === 0) {
                timeline.innerHTML = `
                    <div class="card" style="text-align: center; padding: 3rem; width: 100%; margin: 0;">
                        <h3><i class="fas fa-user-clock"></i> No Experience or Education Added</h3>
                        <p>Add your professional experience and educational background to showcase your journey!</p>
                    </div>
                `;
                return;
            }

            allItems.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
                if (item.type === 'experience') {
                    const startDate = new Date(item.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                    const endDate = item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present';
                    
                    timelineItem.innerHTML = `
                        <h4 style="color: var(--accent); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-briefcase"></i> ${item.position}
                        </h4>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.1rem;">${item.company}</h5>
                        <p style="color: var(--text-muted); margin-bottom: 1rem; font-weight: 500;">${startDate} - ${endDate}</p>
                        <p style="line-height: 1.6;">${item.description}</p>
                        <button onclick="deleteExperience(${item.id})" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer; opacity: 0.7; transition: opacity 0.3s ease;" title="Delete Experience">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                } else {
                    const endYear = item.endYear || 'Present';
                    
                    timelineItem.innerHTML = `
                        <h4 style="color: var(--accent); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-graduation-cap"></i> ${item.degree}
                        </h4>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.1rem;">${item.institution}</h5>
                        <p style="color: var(--text-muted); margin-bottom: 1rem; font-weight: 500;">${item.startYear} - ${endYear}</p>
                        ${item.field ? `<p style="margin-bottom: 0.5rem;"><strong>Field:</strong> ${item.field}</p>` : ''}
                        ${item.grade ? `<p><strong>Grade:</strong> ${item.grade}</p>` : ''}
                        <button onclick="deleteEducation(${item.id})" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; padding: 0.5rem; border-radius: 50%; cursor: pointer; opacity: 0.7; transition: opacity 0.3s ease;" title="Delete Education">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                }
                
                timeline.appendChild(timelineItem);
            });
        }

        function deleteExperience(id) {
            if (confirm('Delete this experience?')) {
                experiences = experiences.filter(exp => exp.id !== id);
                localStorage.setItem('experiences', JSON.stringify(experiences));
                loadExperienceEducation();
                showMessage('Experience deleted!', 'success');
            }
        }

        function deleteEducation(id) {
            if (confirm('Delete this education entry?')) {
                educations = educations.filter(edu => edu.id !== id);
                localStorage.setItem('educations', JSON.stringify(educations));
                loadExperienceEducation();
                showMessage('Education deleted!', 'success');
            }
        }

        // Resume Management
        function setupResumeUpload() {
            const resumeInput = document.getElementById('resumeInput');
            const resumeDisplay = document.getElementById('resumeDisplay');
            const resumeFileName = document.getElementById('resumeFileName');

            resumeInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validate file size (max 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                        showMessage('File size too large! Please choose a file under 10MB.', 'error');
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const resumeData = {
                            name: file.name,
                            data: e.target.result,
                            uploadDate: new Date().toISOString(),
                            size: file.size
                        };
                        localStorage.setItem('resume', JSON.stringify(resumeData));
                        resumeFileName.textContent = file.name;
                        resumeDisplay.style.display = 'block';
                        showMessage('Resume uploaded successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Load existing resume
            const savedResume = localStorage.getItem('resume');
            if (savedResume) {
                const resumeData = JSON.parse(savedResume);
                resumeFileName.textContent = resumeData.name;
                resumeDisplay.style.display = 'block';
            }
        }

        function downloadResume() {
            const savedResume = localStorage.getItem('resume');
            if (savedResume) {
                const resumeData = JSON.parse(savedResume);
                const link = document.createElement('a');
                link.href = resumeData.data;
                link.download = resumeData.name;
                link.click();

                // Track download
                const download = {
                    timestamp: new Date().toISOString(),
                    fileName: resumeData.name,
                    userAgent: navigator.userAgent.substring(0, 100), // Truncate for storage
                    ipHash: 'visitor-' + Math.random().toString(36).substr(2, 9)
                };
                resumeDownloads.push(download);
                localStorage.setItem('resumeDownloads', JSON.stringify(resumeDownloads));
                
                showMessage('Resume downloaded!', 'success');
            } else {
                showMessage('No resume available!', 'error');
            }
        }

        function removeResume() {
            if (confirm('Remove uploaded resume?')) {
                localStorage.removeItem('resume');
                document.getElementById('resumeDisplay').style.display = 'none';
                showMessage('Resume removed successfully!', 'success');
            }
        }

        // Contact Form
        function setupContactForm() {
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    id: Date.now(),
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim(),
                    timestamp: new Date().toISOString()
                };

                // Validate form
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    showMessage('Please fill in all fields!', 'error');
                    return;
                }

                // Store message
                contactMessages.push(formData);
                localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

                // Send email (open email client)
                sendEmail(formData);
                
                // Reset form
                contactForm.reset();
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            });
        }

        function sendEmail(formData) {
            // Create mailto link
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from your portfolio website`);
            const mailtoLink = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.open(mailtoLink);
        }

        // Admin Panel
        function toggleAdmin() {
            const panel = document.getElementById('adminPanel');
            const overlay = document.querySelector('.admin-overlay');
            panel.classList.toggle('active');
            overlay.classList.toggle('active');
            
            if (panel.classList.contains('active')) {
                loadAdminData();
            }
        }

        function closeAdmin() {
            document.getElementById('adminPanel').classList.remove('active');
            document.querySelector('.admin-overlay').classList.remove('active');
        }

        function loadAdminData() {
            // Load messages
            const messagesList = document.getElementById('messagesList');
            const messageCount = document.getElementById('messageCount');
            const downloadCount = document.getElementById('downloadCount');
            
            messageCount.textContent = contactMessages.length;
            messagesList.innerHTML = '';
            
            if (contactMessages.length === 0) {
                messagesList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No messages received yet.</p>';
            } else {
                // Show latest 5 messages
                contactMessages.slice(-5).reverse().forEach((msg, index) => {
                    const msgElement = document.createElement('div');
                    msgElement.className = 'message-item';
                    msgElement.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h5 style="color: var(--accent); margin: 0;">${msg.name}</h5>
                            <small style="color: var(--text-muted);">${new Date(msg.timestamp).toLocaleDateString()}</small>
                        </div>
                        <p style="margin: 0.3rem 0; font-size: 0.9rem;"><strong>Email:</strong> ${msg.email}</p>
                        <p style="margin: 0.3rem 0; font-size: 0.9rem;"><strong>Subject:</strong> ${msg.subject}</p>
                        <p style="margin: 0.5rem 0; line-height: 1.4;"><strong>Message:</strong><br>${msg.message}</p>
                        <button onclick="deleteMessage(${msg.id})" style="background: #dc3545; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 5px; font-size: 0.8rem; cursor: pointer; margin-top: 0.5rem;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    `;
                    messagesList.appendChild(msgElement);
                });

                if (contactMessages.length > 5) {
                    const showMoreBtn = document.createElement('button');
                    showMoreBtn.className = 'add-project-btn';
                    showMoreBtn.style.cssText = 'width: 100%; margin-top: 1rem; background: var(--bg-primary);';
                    showMoreBtn.innerHTML = '<i class="fas fa-eye"></i> View All Messages';
                    showMoreBtn.onclick = showAllMessages;
                    messagesList.appendChild(showMoreBtn);
                }
            }

            // Load download stats
            const downloadsList = document.getElementById('downloadsList');
            downloadCount.textContent = resumeDownloads.length;
            downloadsList.innerHTML = '';
            
            if (resumeDownloads.length === 0) {
                downloadsList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No resume downloads yet.</p>';
            } else {
                const recentDownloads = resumeDownloads.slice(-5).reverse();
                recentDownloads.forEach(download => {
                    const downloadElement = document.createElement('div');
                    downloadElement.className = 'message-item';
                    downloadElement.style.padding = '1rem';
                    downloadElement.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="margin: 0; color: var(--accent);"><strong>${download.fileName}</strong></p>
                                <small style="color: var(--text-muted);">${new Date(download.timestamp).toLocaleString()}</small>
                            </div>
                            <i class="fas fa-download" style="color: var(--accent);"></i>
                        </div>
                    `;
                    downloadsList.appendChild(downloadElement);
                });
            }
        }

        function deleteMessage(id) {
            if (confirm('Delete this message?')) {
                contactMessages = contactMessages.filter(msg => msg.id !== id);
                localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
                loadAdminData();
                showMessage('Message deleted!', 'success');
            }
        }

        function showAllMessages() {
            // Create a modal to show all messages
            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <button onclick="this.closest('.modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer;">&times;</button>
                    <h3 style="margin-bottom: 2rem; color: var(--accent);">All Messages (${contactMessages.length})</h3>
                    <div style="max-height: 60vh; overflow-y: auto;">
                        ${contactMessages.map(msg => `
                            <div class="message-item" style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                    <h5 style="color: var(--accent); margin: 0;">${msg.name}</h5>
                                    <small style="color: var(--text-muted);">${new Date(msg.timestamp).toLocaleString()}</small>
                                </div>
                                <p style="margin: 0.3rem 0; font-size: 0.9rem;"><strong>Email:</strong> ${msg.email}</p>
                                <p style="margin: 0.3rem 0; font-size: 0.9rem;"><strong>Subject:</strong> ${msg.subject}</p>
                                <p style="margin: 0.5rem 0; line-height: 1.4;"><strong>Message:</strong><br>${msg.message}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        function exportMessages() {
            if (contactMessages.length === 0) {
                showMessage('No messages to export!', 'error');
                return;
            }

            // Create CSV content
            let csvContent = "Name,Email,Subject,Message,Timestamp\n";
            contactMessages.forEach(msg => {
                const row = [
                    `"${msg.name.replace(/"/g, '""')}"`,
                    `"${msg.email}"`,
                    `"${msg.subject.replace(/"/g, '""')}"`,
                    `"${msg.message.replace(/"/g, '""')}"`,
                    `"${new Date(msg.timestamp).toLocaleString()}"`
                ].join(',');
                csvContent += row + "\n";
            });

            // Download CSV
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `portfolio_messages_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            
            showMessage('Messages exported successfully!', 'success');
        }

        // Utility Functions
        function showMessage(text, type) {
            // Remove existing messages
            document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
            
            const messageDiv = document.createElement('div');
            messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
            messageDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span>${text}</span>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; margin-left: 1rem; cursor: pointer; font-size: 1.2rem;">×</button>
                </div>
            `;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showMessage('Link copied to clipboard!', 'success');
            }).catch(() => {
                showMessage('Failed to copy link!', 'error');
            });
        }

        // Form Handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Project Form
            document.getElementById('projectForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const imageFile = document.getElementById('projectImage').files[0];
                
                const projectData = {
                    name: document.getElementById('projectName').value.trim(),
                    description: document.getElementById('projectDescription').value.trim(),
                    technologies: document.getElementById('projectTech').value.trim(),
                    demo: document.getElementById('projectDemo').value.trim(),
                    github: document.getElementById('projectGithub').value.trim()
                };

                if (!projectData.name || !projectData.description) {
                    showMessage('Please fill in required fields!', 'error');
                    return;
                }
                
                if (imageFile) {
                    if (imageFile.size > 5 * 1024 * 1024) {
                        showMessage('Image size too large! Please choose an image under 5MB.', 'error');
                        return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        projectData.image = e.target.result;
                        addProject(projectData);
                        closeModal('projectModal');
                        document.getElementById('projectForm').reset();
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    addProject(projectData);
                    closeModal('projectModal');
                    document.getElementById('projectForm').reset();
                }
            });

            // Experience Form
            document.getElementById('experienceForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const expData = {
                    company: document.getElementById('expCompany').value.trim(),
                    position: document.getElementById('expPosition').value.trim(),
                    startDate: document.getElementById('expStartDate').value,
                    endDate: document.getElementById('expEndDate').value,
                    description: document.getElementById('expDescription').value.trim()
                };

                if (!expData.company || !expData.position || !expData.startDate || !expData.description) {
                    showMessage('Please fill in all required fields!', 'error');
                    return;
                }
                
                addExperience(expData);
                closeModal('experienceModal');
                document.getElementById('experienceForm').reset();
            });

            // Education Form
            document.getElementById('educationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const eduData = {
                    institution: document.getElementById('eduInstitution').value.trim(),
                    degree: document.getElementById('eduDegree').value.trim(),
                    field: document.getElementById('eduField').value.trim(),
                    startYear: document.getElementById('eduStartYear').value,
                    endYear: document.getElementById('eduEndYear').value,
                    grade: document.getElementById('eduGrade').value.trim()
                };

                if (!eduData.institution || !eduData.degree || !eduData.startYear) {
                    showMessage('Please fill in all required fields!', 'error');
                    return;
                }
                
                addEducation(eduData);
                closeModal('educationModal');
                document.getElementById('educationForm').reset();
            });
        });

        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Close color picker when clicking outside
        document.addEventListener('click', function(e) {
            const colorPicker = document.getElementById('colorPicker');
            const colorToggle = document.querySelector('.color-picker-toggle');
            
            if (!colorPicker.contains(e.target) && !colorToggle.contains(e.target)) {
                colorPicker.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or panels
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
                closeAdmin();
                document.getElementById('colorPicker').classList.remove('active');
            }
            
            // Admin panel shortcut (Ctrl+Shift+A)
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                toggleAdmin();
            }
        });

        // Initialize demo data (you can remove this after adding your own)
        function initializeDemoData() {
            if (projects.length === 0) {
                const demoProject = {
                    id: Date.now(),
                    name: "Dynamic Portfolio Website",
                    description: "A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring dynamic content management, QR code generation, admin panel, and mobile-first design.",
                    technologies: "HTML5, CSS3, JavaScript, QR.js, LocalStorage",
                    demo: window.location.href,
                    github: "#",
                    createdAt: new Date().toISOString()
                };
                projects.push(demoProject);
                localStorage.setItem('projects', JSON.stringify(projects));
            }

            if (experiences.length === 0) {
                const demoExperience = {
                    id: Date.now(),
                    type: 'experience',
                    company: "Tech Company Inc.",
                    position: "Frontend Developer",
                    startDate: "2023-01-01",
                    endDate: "",
                    description: "Developing modern web applications using React, TypeScript, and modern CSS frameworks. Collaborating with cross-functional teams to deliver exceptional user experiences and maintaining high code quality standards."
                };
                experiences.push(demoExperience);
                localStorage.setItem('experiences', JSON.stringify(experiences));
            }

            if (educations.length === 0) {
                const demoEducation = {
                    id: Date.now(),
                    type: 'education',
                    institution: "University of Technology",
                    degree: "Bachelor of Computer Science",
                    field: "Software Engineering",
                    startYear: "2020",
                    endYear: "2024",
                    grade: "8.5 CGPA"
                };
                educations.push(demoEducation);
                localStorage.setItem('educations', JSON.stringify(educations));
            }
        }

        // Initialize demo data on first load (remove this in production)
        if (localStorage.getItem('firstLoad') !== 'false') {
            initializeDemoData();
            localStorage.setItem('firstLoad', 'false');
        }

        // Performance optimization and responsive handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Reinitialize components that need responsive updates
                generateQRCodes();
                if (window.innerWidth > 768) {
                    initializeMagneticEffect();
                    initializeCursor();
                } else {
                    // Remove magnetic effects on mobile
                    document.querySelectorAll('.magnetic').forEach(el => {
                        el.style.transform = 'translate(0, 0)';
                    });
                }
            }, 250);
        });

        // Smooth scroll to sections
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add interactive hover effects to cards on desktop
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', function(e) {
                document.querySelectorAll('.card').forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = (y - centerY) / 10;
                        const rotateY = (centerX - x) / 10;
                        
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                    }
                });
            });
            
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        }

        // Service Worker for offline functionality (optional)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // You can add service worker registration here for offline support
                console.log('Service Worker support detected');
            });
        }

        // Console messages
        console.log('🚀 Dynamic Portfolio Website Loaded Successfully!');
        console.log('✨ Features Active:');
        console.log('- Responsive Design (Mobile & Desktop)');
        console.log('- Dynamic Color Theming');
        console.log('- QR Code Generation');
        console.log('- Project Management System');
        console.log('- Experience & Education Timeline');
        console.log('- Resume Upload & Download Tracking');
        console.log('- Contact Form with Message Storage');
        console.log('- Secret Admin Panel (Ctrl+Shift+A)');
        console.log('- Floating WhatsApp Integration');
        console.log('- Beautiful Animations & Effects');
        console.log('- Profile Photo Management');
        console.log('- Social Media Footer');
        console.log('- Loading Screen');
        console.log('- Custom Cursor (Desktop)');
        console.log('- Magnetic Effects (Desktop)');
        console.log('- Particle System');
        console.log('- Scroll Animations');
        console.log('🎯 Ready for customization!');

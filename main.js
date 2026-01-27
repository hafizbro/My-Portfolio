document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. SCROLL REVEAL ANIMATION
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


    // =============================================
    // 2. TYPEWRITER EFFECT
    // =============================================
    const typewriterElement = document.getElementById('typewriter-text');
    const words = ['Innovation.', 'Scalable Systems.', 'Digital Growth.', 'the Future.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500;
        }

        setTimeout(typeWriter, delay);
    }

    if (typewriterElement) {
        typeWriter();
    }


    // =============================================
    // 3. LIVE TIME WIDGET (Dhaka Time)
    // =============================================
    const timeText = document.getElementById('time-text');

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const dhakaTime = now.toLocaleTimeString('en-US', options);
        if (timeText) {
            timeText.textContent = dhakaTime;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);


    // =============================================
    // 4. SCROLL PROGRESS BAR
    // =============================================
    const progressBar = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);


    // =============================================
    // 5. BACK TO TOP BUTTON
    // =============================================
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);


    // =============================================
    // 6. MOUSE SPOTLIGHT EFFECT ON CARDS
    // =============================================
    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const cards = target.querySelectorAll(".card");

        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    const grids = [
        document.getElementById("skills-grid"),
        document.getElementById("work-grid"),
        document.getElementById("services-grid"),
        document.getElementById("refs-grid")
    ];

    grids.forEach(grid => {
        if (grid) grid.onmousemove = handleMouseMove;
    });





    // =============================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // 9. GITHUB GRAPH SIMULATION
    // =============================================
    const githubGraph = document.getElementById('github-graph');
    if (githubGraph) {
        const days = 140; // Number of days to show approx
        for (let i = 0; i < days; i++) {
            const day = document.createElement('div');
            day.classList.add('gh-day');

            // Randomly assign contribution levels (0-4)
            // Weight it towards 0 and 1-2 for realism
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.7) level = 3;
            else if (rand > 0.5) level = 2;
            else if (rand > 0.3) level = 1;

            day.setAttribute('data-level', level);
            day.setAttribute('title', `${level === 0 ? 'No' : level * 3} contributions`);
            githubGraph.appendChild(day);
        }
    }


    // =============================================
    // 10. PROJECT MODAL LOGIC
    // =============================================
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-project-btn');

    // Project Data Object
    const projectData = {
        'networx': {
            title: 'Networx Agency',
            tag: 'AI Agents & Automation',
            desc: 'A futuristic digital agency specializing in AI Agents and Business Automation. We build autonomous systems that handle client outreach, lead qualification, and customer support, allowing business owners to step back from daily operations. Our stack includes custom LLM integrations and automated CRM pipelines.',
            tech: ['AI Agents', 'LLMs', 'Automation', 'React', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            liveLink: 'https://networx.agency',
            codeLink: '#'
        },
        'blue-ocean': {
            title: 'Blue Ocean Labs',
            tag: 'Venture Research',
            desc: 'A strategic research initiative focused on identifying high-demand, low-competition business models. I use data-driven analysis to find "Blue Ocean" opportunities that yield high profit margins with simplified operational complexity. Current focus: Micro-SaaS and Specialized Service Arbitrage.',
            tech: ['Market Analysis', 'Python Scrapers', 'Financial Modeling', 'Strategy'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'alpha': {
            title: 'R&D Lab (Alpha)',
            tag: 'Autonomous Systems',
            desc: 'My experimental playground for breaking things and building them back better. Currently focused on "Project Alpha" - a suite of autonomous web agents capable of performing complex browser tasks without human intervention. Features include auto-research and data summarization.',
            tech: ['Python', 'Selenium', 'LangChain', 'OpenAI'],
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            codeLink: 'https://github.com/hafizbro/project-alpha'
        },
        'media-network': {
            title: 'Digital Landlord (Media)',
            tag: 'Content & Attention Assets',
            desc: 'A network of niche-focused Facebook pages and YouTube channels (News & AI Hubs) that drive organic traffic. This "Digital Real Estate" strategy leverages content algorithms to build audience retention and monetize through ad revenue and affiliate partnerships.',
            tech: ['Content Strategy', 'Video Editing', 'Adobe Premiere', 'Social Algorithms'],
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'beta': {
            title: 'Project Beta (Podcast)',
            tag: 'Audio Engineering',
            desc: 'An immersive audio experience showcasing high-fidelity sound design and storytelling. Produced using Adobe Audition and OBS Studio, this project highlights my ability to craft compelling narratives through sound.',
            tech: ['Adobe Audition', 'OBS Studio', 'Sound Design', 'Storytelling'],
            image: 'https://images.unsplash.com/photo-1478737270239-2f63b86236b9?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'b2b-sales': {
            title: 'B2B Sales Automation',
            tag: 'Sales Tech',
            desc: 'A full-stack automated outreach system designed for high-ticket service providers. This tool scrapes qualified leads, enriches data, and sends hyper-personalized emails and LinkedIn messages using AI-generated hooks. It includes a dashboard for tracking open rates and reply sentiment.',
            tech: ['Python', 'Selenium', 'OpenAI', 'LinkedIn API', 'SMTP'],
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'ai-ethics': {
            title: 'The Ethics of AGI',
            tag: 'Thought Piece',
            desc: 'An exploration into the alignment problem of Artificial General Intelligence. This article discusses the implications of autonomous agents in financial markets and the potential risks of unaligned objective functions in business automation.',
            tech: ['Philosophy', 'AI Safety', 'Research'],
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'custom-loop': {
            title: 'Custom Loop Gallery',
            tag: 'Hardware Engineering',
            desc: 'A visual showcase of my water-cooled PC builds. Features hardline tubing, custom distro plates, and thermal benchmark data for overclocked Ryzen and Threadripper systems. Demonstrates understanding of thermodynamics and fluid mechanics.',
            tech: ['Hardware Modding', 'Thermodynamics', 'Overclocking'],
            image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1974&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'c-python': {
            title: 'From C to Python',
            tag: 'Learning Journey',
            desc: 'Documenting my transition from manual memory management in C to high-level abstractions in Python. Key takeaways include the trade-offs between execution speed and development velocity, and how understanding pointers made me a better Python developer.',
            tech: ['C', 'Python', 'Systems Programming'],
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            codeLink: '#'
        },
        'default': {
            title: 'TapFlow Solutions',
            tag: 'Featured Startup',
            desc: 'Replacing paper menus with NFC Smart Cards in Dhaka restaurants. This solution includes a mobile-friendly menu interface, an admin dashboard for restaurant owners to update prices in real-time, and analytics tracking for customer engagement.',
            tech: ['Next.js', 'Firebase', 'NFC', 'Stripe', 'Tailwind'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
            liveLink: 'https://tapflowsolutions.netlify.app',
            codeLink: '#'
        }
    };

    function openModal(projectId) {
        if (!modal) return;

        const data = projectData[projectId] || projectData['default'];

        // Populate Data
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-tag').textContent = data.tag;
        modal.querySelector('.modal-desc').textContent = data.desc;

        // Image
        const imgContainer = modal.querySelector('.modal-image-container');
        imgContainer.innerHTML = `<img src="${data.image}" alt="${data.title}">`;

        // Tech Pills
        const techContainer = modal.querySelector('.modal-tech-stack');
        techContainer.innerHTML = data.tech.map(t => `<span class="pill" style="border:1px solid rgba(255,255,255,0.2)">${t}</span>`).join('');

        // Links
        const liveBtn = document.getElementById('modal-live-link');
        const codeBtn = document.getElementById('modal-code-link');

        if (liveBtn) liveBtn.href = data.liveLink;
        if (codeBtn) codeBtn.href = data.codeLink;

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock Request
    }

    function closeModalFunc() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Click might bubble
            const pid = btn.getAttribute('data-project');
            openModal(pid);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunc();
        });
    }

    // Connect 'View Live Site' on TapFlow card to also open modal? 
    // Maybe better to leave it as direct link. 
    // But let's add a button to TapFlow card for consistency if needed.
    // For now, only the buttons with .view-project-btn trigger it.

    // =============================================
    // 11. MOBILE MENU TOGGLE
    // =============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }



    // =============================================
    // 12. VISION ROADMAP MODAL
    // =============================================
    const roadmapBtn = document.getElementById('view-roadmap-btn');
    const roadmapModal = document.getElementById('roadmap-modal');
    const closeRoadmap = document.getElementById('close-roadmap');
    const roadmapItems = document.querySelectorAll('.fade-in-step');

    if (roadmapBtn && roadmapModal && closeRoadmap) {
        roadmapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            roadmapModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Trigger animations with staggered delay
            setTimeout(() => {
                roadmapItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200 + 300); // 300ms base delay + 200ms per item
                });
            }, 100);
        });

        const closeRoadmapModal = () => {
            roadmapModal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset animations
            roadmapItems.forEach(item => {
                item.classList.remove('visible');
            });
        };

        closeRoadmap.addEventListener('click', closeRoadmapModal);

        roadmapModal.addEventListener('click', (e) => {
            if (e.target === roadmapModal) {
                closeRoadmapModal();
            }
        });
    }

});

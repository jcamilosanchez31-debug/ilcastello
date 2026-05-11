document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-up, .card, .timeline-item, .team-member').forEach(el => {
        el.classList.add('animate-up'); // Ensure class is present for animation
        observer.observe(el);
    });

    // Export Simulator Logic
    const startBtn = document.getElementById('start-simulation');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const cantidad = parseInt(document.getElementById('cantidad').value) || 0;
            const tipo = document.getElementById('tipo').value;
            const icon = document.getElementById('transport-icon');
            const statusText = document.getElementById('status-text');
            
            // Calculations
            const costoUnitario = 5;
            const costoProducto = cantidad * costoUnitario;
            const costoTrans = tipo === 'congelada' ? cantidad * 2 : cantidad * 0.5;
            const aranceles = (costoProducto + costoTrans) * 0.10;
            const total = costoProducto + costoTrans + aranceles;
            
            // Update Results
            document.getElementById('res-producto').innerText = `$${costoProducto.toLocaleString()}`;
            document.getElementById('res-transporte').innerText = `$${costoTrans.toLocaleString()}`;
            document.getElementById('res-aranceles').innerText = `$${aranceles.toLocaleString()}`;
            document.getElementById('res-total').innerText = `$${total.toLocaleString()}`;
            
            // Animation Sequence (Coordinates for Map)
            let steps = [
                { bottom: '25%', right: '35%', left: 'auto', top: 'auto', text: 'Saliendo de la planta en Colombia... 🚛', icon: '🚛' },
                { bottom: '45%', right: '45%', left: 'auto', top: 'auto', text: 'Consolidando en Puerto de Cartagena... 🏗️', icon: '🚛' },
                { bottom: 'auto', right: 'auto', left: '30%', top: '40%', text: 'Navegando por el Caribe... 🚢', icon: '🚢' },
                { bottom: 'auto', right: 'auto', left: '20%', top: '30%', text: 'Llegada a Puerto de Acajutla (El Salvador)! 📦', icon: '📦' }
            ];
            
            let currentStep = 0;
            const runStep = () => {
                if (currentStep < steps.length) {
                    const step = steps[currentStep];
                    
                    // Reset all positional props
                    icon.style.bottom = 'auto';
                    icon.style.right = 'auto';
                    icon.style.left = 'auto';
                    icon.style.top = 'auto';
                    
                    // Apply new props
                    if (step.bottom) icon.style.bottom = step.bottom;
                    if (step.right) icon.style.right = step.right;
                    if (step.left) icon.style.left = step.left;
                    if (step.top) icon.style.top = step.top;
                    
                    icon.innerText = step.icon;
                    statusText.innerText = step.text;
                    currentStep++;
                    setTimeout(runStep, 3000); 
                }
            };
            
            // Reset and Start
            icon.style.transition = 'none';
            icon.style.bottom = '25%';
            icon.style.right = '35%';
            icon.style.left = 'auto';
            icon.style.top = 'auto';
            
            setTimeout(() => {
                icon.style.transition = 'all 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
                runStep();
            }, 100);
        });
    }

    // Analysis Module: Intersection Observer for Section Navigation
    const analysisLinks = document.querySelectorAll('.sec-nav a');
    if (analysisLinks.length > 0) {
        const analysisObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.id;
                    analysisLinks.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-20% 0px -60% 0px' });
        
        document.querySelectorAll('.analysis-module .section').forEach(s => analysisObserver.observe(s));
    }
});

// Country Switcher for Analysis Module
function switchCountry(country, el) {
    document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.country-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    const panel = document.getElementById('panel-' + country);
    if (panel) panel.classList.add('active');
    const nav = document.getElementById('sec-nav');
    if (nav) nav.style.display = (country === 'compare') ? 'none' : 'flex';
}

function navClick(el) {
    document.querySelectorAll('.sec-nav a').forEach(a => a.classList.remove('active'));
    el.classList.add('active');
}

// Matrix Switcher for Environment Module
function switchMatrix(panelId, el) {
    document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.m-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    const panel = document.getElementById('m-' + panelId);
    if (panel) panel.classList.add('active');
}

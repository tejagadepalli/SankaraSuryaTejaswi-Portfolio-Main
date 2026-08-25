var typed = new Typed('.typing', {
    strings: ["ServiceNow Developer", "ITSM & Service Catalog Specialist", "Flow Designer & App Engine Studio"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});


const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href').substring(1) === entry.target.id) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


// --- Contact form via Web3Forms ---
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formResult.textContent = '';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                formResult.style.color = '#2ecc71';
                formResult.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                contactForm.reset();
            } else {
                formResult.style.color = '#e74c3c';
                formResult.textContent = 'Something went wrong. Please try again or email me directly.';
            }
        } catch (err) {
            formResult.style.color = '#e74c3c';
            formResult.textContent = 'Network error. Please check your connection and try again.';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
}

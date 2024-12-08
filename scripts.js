document.getElementById('loanCalculator').addEventListener('submit', function(e) {
    e.preventDefault();
    showLoader();
    
    setTimeout(() => {
        const amount = parseFloat(document.getElementById('loanAmount').value);
        const months = parseInt(document.getElementById('loanTerm').value);
        const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
        
        const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        
        document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2) + ' €';
        hideLoader();
        showToast('successToast', 'Calcul effectué avec succès !');
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close the mobile navbar if open
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }

        // Get the target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('nav').offsetHeight;
            
            // Calculate position to scroll to
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            // Smooth scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active link highlighting
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Investment button click handler
document.querySelector('.hero .btn-light').addEventListener('click', function() {
    const modal = new bootstrap.Modal(document.getElementById('investModal'));
    modal.show();
});

// Loan button click handler
document.querySelector('.hero .btn-outline-light').addEventListener('click', function() {
    const modal = new bootstrap.Modal(document.getElementById('loanModal'));
    modal.show();
});

// Form validation
(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate file upload
    const fileInput = document.getElementById('fileUpload');
    const documentType = document.getElementById('documentType');
    
    if (fileInput.files.length > 0) {
        // Show upload success message
        alert('Document uploadé avec succès! Notre équipe l\'examinera dans les plus brefs délais.');
        this.reset();
    }
});

// Enhanced contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (this.checkValidity()) {
        showLoader();
        setTimeout(() => {
            hideLoader();
            showToast('successToast', 'Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
            this.reset();
            this.classList.remove('was-validated');
        }, 1500);
    }
    this.classList.add('was-validated');
});

// Function to handle investment profile selection
function selectProfile(card, profile) {
    // Remove active class from all cards
    document.querySelectorAll('#investModal .card').forEach(c => {
        c.style.borderColor = '';
        c.style.backgroundColor = '';
    });
    
    // Add active class to selected card
    card.style.borderColor = 'var(--primary)';
    card.style.backgroundColor = '#f8f9fa';
    
    // Store selected profile
    document.querySelector('#investForm').dataset.profile = profile;
}

// Investment form submission handler
document.querySelector('#investForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (this.checkValidity()) {
        showLoader();
        const projectTitle = 'Votre projet'; // Replace with the actual project title
        const amount = parseFloat(this.querySelector('input[type="number"]').value).toFixed(2);
        handleInvestmentContact(projectTitle, amount);
    }
    this.classList.add('was-validated');
});

// Function to handle loan type selection
function selectLoanType(card, type) {
    // Remove active class from all cards
    document.querySelectorAll('#loanModal .card').forEach(c => {
        c.style.borderColor = '';
        c.style.backgroundColor = '';
    });
    
    // Add active class to selected card
    card.style.borderColor = 'var(--primary)';
    card.style.backgroundColor = '#f8f9fa';
    
    // Store selected loan type
    document.querySelector('#loanForm').dataset.loanType = type;
}

// Add loan form submission handler
document.querySelector('#loanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (this.checkValidity()) {
        showLoader();
        setTimeout(() => {
            hideLoader();
            showToast('successToast', 'Votre demande de prêt a été enregistrée avec succès !');
            bootstrap.Modal.getInstance(document.getElementById('loanModal')).hide();
            this.reset();
        }, 1500);
    }
    this.classList.add('was-validated');
});

// Initialize cookie consent check on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
});

// Cookie consent management
function checkCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookieConsent').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').style.display = 'none';
    showToast('successToast', 'Préférences cookies enregistrées !');
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.getElementById('cookieConsent').style.display = 'none';
    showToast('successToast', 'Préférences cookies enregistrées !');
}

// Toast notification function
function showToast(toastId, message) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl);
    toastEl.querySelector('.toast-body').textContent = message;
    toast.show();
}

// Loading indicator functions
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// WhatsApp contact handling
function openWhatsAppContact() {
    const phoneNumber = "+33123456789"; // Replace with actual WhatsApp business number
    const message = encodeURIComponent("Bonjour, je souhaite plus d'informations sur les opportunités d'investissement.");
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

// Investment contact handling
function handleInvestmentContact(projectTitle, amount) {
    // WhatsApp configuration
    const phoneNumber = "+22945510322"; // Replace with actual WhatsApp business number
    const projectInfo = encodeURIComponent(`Je suis intéressé(e) par le projet: ${projectTitle}\nMontant de l'investissement: ${amount}€`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${projectInfo}`;

    // EmailJS configuration
    const templateParams = {
        project_title: projectTitle,
        investment_amount: amount,
        to_name: "Gestionnaire d'investissement",
        message: `Nouvelle demande d'information pour le projet: ${projectTitle}`
    };

    // Send email notification
    emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
    )
    .then(function(response) {
        console.log('Email sent successfully:', response);
        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    }, function(error) {
        console.error('Email sending failed:', error);
        // Still redirect to WhatsApp even if email fails
        window.location.href = whatsappUrl;
    });
}

// Utility function for sharing content
function compartilhar(nome, id) {
    const texto = `Confira o perfil de ${nome} no Solicitar Orçamento: https://solicitarorcamento.com/perfil/${id}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Solicitar Orçamento - Profissional',
            text: texto,
            url: `https://solicitarorcamento.com/perfil/${id}`,
        })
        .then(() => showToast('Conteúdo compartilhado com sucesso!'))
        .catch((error) => showToast('Erro ao compartilhar', 'error'));
    } else {
        // Fallback for browsers that don't support the Web Share API
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add smooth scrolling to all links
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

// Add animation to cards when they come into view
const observeCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.profissional-card').forEach(card => {
        observer.observe(card);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeCards();
});

// Add responsive navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}
// ==================== LOADING SCREEN ====================
(function initLoading() {
    const bar = document.getElementById('loadingBar');
    const percent = document.getElementById('loadingPercent');
    const screen = document.getElementById('loadingScreen');
    let progress = 0;
    const messages = ['INITIALIZING...', 'LOADING ASSETS...', 'BOOTING SYSTEM...', 'READY!'];
    const msgEl = document.querySelector('.loading-text');

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (msgEl) msgEl.textContent = messages[3];
            setTimeout(() => screen.classList.add('hidden'), 400);
        } else if (progress > 70 && msgEl) {
            msgEl.textContent = messages[2];
        } else if (progress > 35 && msgEl) {
            msgEl.textContent = messages[1];
        }
        bar.style.width = progress + '%';
        percent.textContent = Math.floor(progress) + '%';
    }, 180);
})();

// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
}

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==================== COUNTER ANIMATION ====================
function animateCounter(elementId, target, duration, suffix = '+') {
    const el = document.getElementById(elementId);
    if (!el) return;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter('counterReviews', 100, 2000);
                animateCounter('counterYears', 5, 1500);
                animateCounter('counterClients', 500, 2500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

// ==================== TRANSPORT CALCULATOR ====================
function calculateTransport() {
    const distance = parseFloat(document.getElementById('distanceInput').value) || 0;
    const servicePrice = parseInt(document.getElementById('calcService').value) || 0;
    const resultDiv = document.getElementById('calcResult');
    const totalEl = document.getElementById('calcTotal');
    const breakdownEl = document.getElementById('calcBreakdown');

    if (distance <= 0 || servicePrice <= 0) {
        resultDiv.classList.remove('show');
        return;
    }

    let transportCost = 0;
    if (distance > 1) {
        transportCost = 10000 + Math.ceil(distance - 1) * 2500;
    }

    const total = servicePrice + transportCost;
    totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');

    let breakdown = 'Layanan: Rp ' + servicePrice.toLocaleString('id-ID') + '<br>';
    if (distance <= 1) {
        breakdown += 'Transport: GRATIS (≤ 1 KM)<br>';
    } else {
        breakdown += 'Transport: Rp ' + transportCost.toLocaleString('id-ID') + ' (' + distance + ' KM)<br>';
        breakdown += '  Base: Rp 10.000 + ' + Math.ceil(distance - 1) + ' x Rp 2.500<br>';
    }
    breakdown += 'Jarak: ' + distance + ' KM dari Sinduadi, Jogja';
    breakdownEl.innerHTML = breakdown;
    resultDiv.classList.add('show');
}

// ==================== SERVICE CARD CLICK ====================
function selectService(type) {
    const serviceMap = {
        'basic': 'BASIC CUT (Rp 80.000)',
        'keratin': 'KERATIN (Rp 350.000)',
        'smoothing': 'SMOOTHING (Rp 350.000)',
        'perming': 'PERMING (Rp 350.000)',
        'rontok': 'ANTI RONTOK (Rp 100.000)',
        'ketombe': 'ANTI KETOMBE (Rp 100.000)'
    };
    const bookService = document.getElementById('bookService');
    if (serviceMap[type]) bookService.value = serviceMap[type];
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    showToast('Layanan dipilih! Lengkapi form booking di bawah.');
}

// ==================== BOOKING FORM ====================
function handleBooking(e) {
    e.preventDefault();
    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const service = document.getElementById('bookService').value;
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const location = document.getElementById('bookLocation').value.trim();

    if (!name || !phone || !service || !date || !time || !location) {
        showToast('Mohon lengkapi semua field yang wajib!', true);
        return;
    }

    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay();
    if (dayOfWeek !== 2) {
        const hour = parseInt(time.split(':')[0]);
        if (hour >= 10 && hour < 22) {
            showToast('Jam ' + time + ' tidak tersedia. Pilih 08:00, 09:00, atau 22:00+', true);
            return;
        }
    }

    const btn = e.target.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'MEMPROSES...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast('BOOKING BERHASIL! Invoice QRIS dikirim via WhatsApp ke ' + phone);
        e.target.reset();
    }, 2000);
}

// ==================== TOAST ====================
function showToast(message, isError) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast' + (isError ? ' error' : '');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ==================== SET MIN DATE ====================
(function setMinDate() {
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
        const today = new Date();
        dateInput.setAttribute('min', today.toISOString().split('T')[0]);
    }
})();

// ==================== PIXEL PARTICLES ====================
(function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const colors = ['#D4A843', '#F0D078', '#2E5A27', '#4A8C3F', '#8B5E3C'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'pixel-float';
        p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*6}s;animation-duration:${4+Math.random()*4}s;width:${4+Math.floor(Math.random()*8)}px;height:${4+Math.floor(Math.random()*8)}px;position:absolute;`;
        hero.appendChild(p);
    }
})();

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==================== PARALLAX ON HERO IMAGES ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && scrolled < 800) {
        heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
});

// Projects page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    initializeProjectFilters();
    
    // Initialize lightbox
    initializeLightbox();
    
    // Initialize gallery animations
    initializeGalleryAnimations();
});

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryViewBtns = document.querySelectorAll('.gallery-view-btn');

    if (!lightbox) return;

    let currentImageIndex = 0;
    let images = [];

    // Collect all images
    galleryViewBtns.forEach((btn, index) => {
        const imageUrl = btn.getAttribute('data-image');
        images.push(imageUrl);

        btn.addEventListener('click', () => {
            currentImageIndex = index;
            showLightboxImage(imageUrl);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function showLightboxImage(imageUrl) {
        lightboxImage.src = imageUrl;
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
        }, 100);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightboxImage(images[currentImageIndex]);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightboxImage(images[currentImageIndex]);
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
            }
        }
    });
}

function initializeGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach((item, index) => {
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        observer.observe(item);

        // Hover effects
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Loading animation for images
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease, transform 0.3s ease';

        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}
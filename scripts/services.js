// Services page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Service modal functionality
    initializeServiceModal();
    
    // Service card animations
    initializeServiceCardAnimations();
});

function initializeServiceModal() {
    const serviceCards = document.querySelectorAll('.service-card-detailed');
    const modal = document.getElementById('serviceModal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const modalPrice = document.getElementById('modalPrice');

    if (!modal) return;

    const serviceData = {
        stage: {
            title: 'Stage Decoration',
            description: 'Our stage decoration services create stunning mandap and ceremony setups that serve as the perfect backdrop for your special moments. We specialize in both traditional and contemporary designs, incorporating elements like rich fabrics, fresh flowers, lighting, and custom backdrops that reflect your personal style and cultural traditions.',
            features: [
                'Traditional mandap designs with authentic elements',
                'Contemporary stage setups with modern aesthetics',
                'Custom backdrop creation tailored to your theme',
                'Professional lighting integration for ambiance',
                'Comfortable seating arrangements for the couple',
                'Decorative props and accessories',
                'Setup and breakdown services included'
            ],
            price: 'Starting from ₹50,000 - Customizable packages available based on size and complexity',
            image: 'https://images.pexels.com/photos/1464230/pexels-photo-1464230.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        floral: {
            title: 'Floral Arrangements',
            description: 'Transform your wedding venue with our exquisite floral arrangements using the finest fresh blooms. Our expert florists create stunning centerpieces, bridal bouquets, ceremonial garlands, and venue decorations that add natural beauty, fragrance, and elegance to every aspect of your celebration.',
            features: [
                'Premium fresh flower arrangements',
                'Bridal and bridesmaids bouquets',
                'Elegant table centerpieces',
                'Ceremonial garlands and malas',
                'Floral archways and entrance decorations',
                'Venue-specific floral installations',
                'Seasonal flower selection and sourcing'
            ],
            price: 'Starting from ₹30,000 - Varies based on flower types and arrangement complexity',
            image: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        lighting: {
            title: 'Lighting Design',
            description: 'Create the perfect ambiance with our professional lighting design services. From romantic fairy lights to dramatic uplighting, we use various lighting techniques to enhance the mood, highlight key areas, and create magical moments throughout your wedding celebration.',
            features: [
                'Ambient lighting for romantic atmosphere',
                'Fairy light installations and canopies',
                'LED uplighting in custom colors',
                'Candle arrangements and luminaries',
                'Spotlighting for key ceremony moments',
                'Dance floor and reception lighting',
                'Energy-efficient and safe lighting solutions'
            ],
            price: 'Starting from ₹25,000 - Pricing depends on venue size and lighting complexity',
            image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        theme: {
            title: 'Theme Decoration',
            description: 'Bring your wedding vision to life with our custom theme decoration services. Whether you envision a vintage romance, modern minimalism, royal elegance, or cultural celebration, we create cohesive designs that reflect your personality and style throughout your entire wedding.',
            features: [
                'Custom theme design and conceptualization',
                'Color coordination and palette development',
                'Themed props and decorative accessories',
                'Complete styling for all wedding events',
                'Cultural and traditional theme expertise',
                'Modern and contemporary design options',
                'Coordination with other vendors for consistency'
            ],
            price: 'Starting from ₹40,000 - Customized pricing based on theme complexity and scope',
            image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        venue: {
            title: 'Venue Decoration',
            description: 'Complete venue transformation services for both indoor and outdoor wedding celebrations. We adapt our designs to work with any space, from intimate garden parties to grand ballroom receptions, ensuring every corner of your venue reflects the beauty and elegance of your special day.',
            features: [
                'Indoor venue decoration and styling',
                'Outdoor wedding setup and weatherproofing',
                'Entrance and welcome area decoration',
                'Guest seating arrangement and styling',
                'Ceremony and reception space coordination',
                'Restroom and auxiliary area decoration',
                'Vendor coordination and space management'
            ],
            price: 'Starting from ₹60,000 - Pricing varies by venue size and decoration scope',
            image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        complete: {
            title: 'Complete Wedding Package',
            description: 'Our comprehensive wedding decoration package covers every aspect of your multi-day celebration. From engagement to reception, we provide end-to-end services including planning, design, setup, and coordination, ensuring a seamless and stress-free experience for you and your family.',
            features: [
                'Full event planning and timeline management',
                'Multiple event coverage (engagement, mehendi, sangam, wedding, reception)',
                'Complete setup and cleanup services',
                'Dedicated team and project manager',
                'Vendor coordination and management',
                'Emergency support and backup plans',
                'Post-event cleanup and equipment removal'
            ],
            price: 'Starting from ₹1,50,000 - Comprehensive packages with flexible payment plans',
            image: 'https://images.pexels.com/photos/1464230/pexels-photo-1464230.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        }
    };

    serviceCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', () => {
                const serviceType = card.getAttribute('data-service');
                const service = serviceData[serviceType];
                
                if (service) {
                    modalImage.src = service.image;
                    modalTitle.textContent = service.title;
                    modalDescription.textContent = service.description;
                    modalPrice.textContent = service.price;
                    
                    // Clear and populate features list
                    modalFeaturesList.innerHTML = '';
                    service.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        modalFeaturesList.appendChild(li);
                    });
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Get Quote button functionality
    const modalCtaBtn = document.querySelector('.modal-cta-btn');
    if (modalCtaBtn) {
        modalCtaBtn.addEventListener('click', () => {
            closeModal();
            window.location.href = 'contact.html';
        });
    }
}

function initializeServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card-detailed');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}
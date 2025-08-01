// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initializeContactForm();
    
    // Initialize FAQ accordion
    initializeFAQ();
    
    // Initialize form animations
    initializeContactFormAnimations();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateForm(data)) {
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for your inquiry! We\'ll contact you within 24 hours to discuss your wedding plans.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove focused class from form groups
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 2000);
        }
    });
}

function validateForm(data) {
    const errors = [];
    
    // Required field validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'weddingDate', 'eventType', 'guestCount', 'message'];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Guest count validation
    if (data.guestCount && (parseInt(data.guestCount) < 50 || parseInt(data.guestCount) > 2000)) {
        errors.push('Guest count should be between 50 and 2000');
    }
    
    // Wedding date validation (should be in future)
    if (data.weddingDate) {
        const selectedDate = new Date(data.weddingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Wedding date should be in the future');
        }
    }
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return false;
    }
    
    return true;
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                faqItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Open clicked item if it wasn't already open
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
    });
}

function initializeContactFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Handle focus events
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    group.classList.remove('focused');
                }
            });
            
            // Handle input events
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    group.classList.add('focused');
                } else {
                    group.classList.remove('focused');
                }
                
                // Real-time validation feedback
                validateField(input);
            });
            
            // Check initial state
            if (input.value.trim()) {
                group.classList.add('focused');
            }
        }
    });
    
    // Submit button glow effect
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            const glow = submitBtn.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            const glow = submitBtn.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    }
}

function validateField(input) {
    const formGroup = input.closest('.form-group');
    const fieldName = input.name;
    const value = input.value.trim();
    
    // Remove previous error states
    formGroup.classList.remove('error', 'success');
    
    // Field-specific validation
    switch(fieldName) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && emailRegex.test(value)) {
                formGroup.classList.add('success');
            } else if (value) {
                formGroup.classList.add('error');
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (value && phoneRegex.test(value) && value.length >= 10) {
                formGroup.classList.add('success');
            } else if (value) {
                formGroup.classList.add('error');
            }
            break;
            
        case 'guestCount':
            const count = parseInt(value);
            if (value && count >= 50 && count <= 2000) {
                formGroup.classList.add('success');
            } else if (value) {
                formGroup.classList.add('error');
            }
            break;
            
        case 'weddingDate':
            if (value) {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate >= today) {
                    formGroup.classList.add('success');
                } else {
                    formGroup.classList.add('error');
                }
            }
            break;
            
        default:
            if (value) {
                formGroup.classList.add('success');
            }
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 5000);
}
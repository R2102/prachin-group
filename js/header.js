// Header Management Script
class HeaderManager {
    constructor() {
        this.headerLoaded = false;
        this.init();
    }

    async init() {
        await this.loadHeader();
        this.setupEventListeners();
        this.initializeProductsDropdown();
    }

    async loadHeader() {
        try {
            const response = await fetch('header.html');
            const headerHTML = await response.text();
            
            // Insert header at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
            this.headerLoaded = true;
            
            // Ensure page scrolls to top after header is loaded
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }



    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const productsToggle = document.getElementById('products-toggle');
        const productsSubmenu = document.getElementById('products-submenu');
        const productsChevron = document.getElementById('products-chevron');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        if (productsToggle && productsSubmenu && productsChevron) {
            productsToggle.addEventListener('click', () => {
                productsSubmenu.classList.toggle('hidden');
                productsChevron.style.transform = productsSubmenu.classList.contains('hidden') 
                    ? 'rotate(0deg)' 
                    : 'rotate(180deg)';
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Scroll to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.getElementById(targetId.substring(1));
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    initializeProductsDropdown() {
        // Full width products dropdown (hover-based)
        const productsTrigger = document.getElementById('products-trigger');
        const productsOverlay = document.getElementById('products-overlay');

        if (productsTrigger && productsOverlay) {
            // Add group class to make hover work
            productsTrigger.parentElement.classList.add('group');
            
            // Category switching functionality
            const categoryTabs = document.querySelectorAll('.category-tab');
            const categoryContents = document.querySelectorAll('.category-content');
            
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetCategory = this.getAttribute('data-category');
                    
                    // Update tab styles
                    categoryTabs.forEach(t => {
                        t.classList.remove('bg-blue-50', 'text-blue-800', 'border-blue-200', 'shadow-sm');
                        t.classList.remove('bg-red-50', 'text-red-700', 'border-red-200', 'shadow-sm');
                        t.classList.add('bg-blue-50', 'text-blue-800', 'border-blue-200', 'shadow-sm');
                    });
                    // Add active styles (red) to the clicked tab
                    this.classList.remove('bg-blue-50', 'text-blue-800', 'border-blue-200');
                    this.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
                    
                    // Show/hide content
                    categoryContents.forEach(content => {
                        content.classList.add('hidden');
                    });
                    
                    const targetContent = document.getElementById(targetCategory + '-content');
                    if (targetContent) {
                        targetContent.classList.remove('hidden');
                    }
                });
            });
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
});

// Export for use in other scripts
window.HeaderManager = HeaderManager; 
/**
 * Dynamic Header Loader for Prachin Group
 * Include this script on any page to load the header dynamically
 * 
 * Usage:
 * 1. Add <div id="header-container"></div> where you want the header
 * 2. Include header styles: <link rel="stylesheet" href="header-styles.css">
 * 3. Include this script: <script src="header-loader.js"></script>
 * 4. Make sure header-template.html is accessible from your page
 */

// Initialize mobile menu functionality
function initializeMobileMenu() {
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
}

// Initialize mega menu functionality
function initializeMegaMenu() {
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

// Initialize scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Auto-initialize immediately (don't wait for DOMContentLoaded)
(function() {
    const headerContainer = document.getElementById('header-container');
    
    if (headerContainer) {
        // Add immediate loading placeholder
        headerContainer.innerHTML = `
            <header class="bg-white shadow-sm sticky top-0 z-50" style="height: 80px;">
                <nav class="w-full flex items-center justify-between px-4 xl:px-12 py-3" style="height: 80px;">
                    <a href="index.html" class="flex items-center">
                        <img src="assets/images/company/Prachin INC Logo.png" alt="Prachin Group Logo" class="h-8 w-auto">
                    </a>
                    <div class="hidden md:flex items-center space-x-6">
                        <div class="animate-pulse flex space-x-4">
                            <div class="h-4 bg-gray-200 rounded w-16"></div>
                            <div class="h-4 bg-gray-200 rounded w-20"></div>
                            <div class="h-4 bg-gray-200 rounded w-16"></div>
                            <div class="h-4 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <div class="animate-pulse h-6 bg-gray-200 rounded w-6"></div>
                    </div>
                </nav>
            </header>
        `;
        
        // Function to load and initialize header
        function loadHeader(headerData) {
            headerContainer.innerHTML = headerData;
            
            // Initialize all functions immediately after DOM insertion
            requestAnimationFrame(() => {
                // Initialize mobile menu
                if (typeof initializeMobileMenu === 'function') {
                    initializeMobileMenu();
                }
                // Initialize mega menu after header is loaded
                if (typeof initializeMegaMenu === 'function') {
                    initializeMegaMenu();
                }
                // Initialize scroll effects after header content is loaded
                if (typeof initializeScrollEffects === 'function') {
                    initializeScrollEffects();
                }
            });
        }
        
        // Load header immediately
        fetch('assets/Templates/header-template.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => loadHeader(data))
            .catch(error => {
                console.error('Error loading header:', error);
                // Keep the placeholder if loading fails
            });
    }
})();

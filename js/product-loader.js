/**
 * Product Template System
 * This script enables dynamic loading of product data into the product template page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get product and variant from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const variantId = urlParams.get('variant');
    
    if (productId) {
        loadProductData(productId, variantId);
    }
});

/**
 * Load product data based on product ID
 * @param {string} productId - The product identifier
 * @param {string} variantId - Optional variant identifier
 */
function loadProductData(productId, variantId) {
    // Fetch the product data JSON file
    fetch(`assets/data/products/${productId}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Product data not found');
            }
            return response.json();
        })
        .then(productData => {
            // Populate the page with product data
            populateProductPage(productData, variantId);
        })
        .catch(error => {
            console.error('Error loading product data:', error);
            // You could show an error message on the page here
        });
}

/**
 * Populate the product page with the product data
 * @param {Object} productData - The product data object
 * @param {string} variantId - Optional variant identifier
 */
function populateProductPage(productData, variantId) {
    // Set page title
    document.title = productData.title;
    
    // Update page header
    const headerTitle = document.getElementById('product-title');
    if (headerTitle) {
        headerTitle.textContent = productData.title;
    }
    
    const headerBrand = document.getElementById('product-brand');
    if (headerBrand) {
        if (productData.brandName && productData.brandName.toLowerCase() !== 'n/a') {
            headerBrand.textContent = productData.brandName;
            headerBrand.style.display = 'block';
        } else {
            headerBrand.style.display = 'none';
        }
    }
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-product-name');
    if (breadcrumb) {
        breadcrumb.textContent = productData.title;
    }
    
    // Update overview section
    const overviewParagraph = document.getElementById('product-overview');
    if (overviewParagraph && productData.overview) {
        overviewParagraph.innerHTML = productData.overview;
    }
    
    // Update gallery images
    if (productData.gallery && productData.gallery.length > 0) {
        const img1 = document.getElementById('carousel-image');
        const img2 = document.getElementById('carousel-image-2');

        if(img1) {
            img1.src = productData.gallery[0].url;
            img1.alt = productData.gallery[0].alt;
        }
        if(img2) {
            if(productData.gallery.length > 1 && productData.gallery[1]) {
                img2.src = productData.gallery[1].url;
                img2.alt = productData.gallery[1].alt;
                img2.style.opacity = '0';
                img2.style.display = '';
            } else {
                img2.style.display = 'none'; // hide second image if not present
            }
        }
        
        // Carousel functionality
        const images = productData.gallery.map(item => item.url);
        let currentIndex = 0;

        function showImage(index) {
          if (index === 0) {
            img1.style.opacity = '1';
            if(img2) img2.style.opacity = '0';
          } else {
            img1.style.opacity = '0';
            if(img2) img2.style.opacity = '1';
          }
        }

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if(prevBtn && nextBtn){
            // Clone and replace to remove old event listeners
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

            newPrevBtn.addEventListener('click', () => {
              currentIndex = (currentIndex - 1 + images.length) % images.length;
              showImage(currentIndex);
            });

            newNextBtn.addEventListener('click', () => {
              currentIndex = (currentIndex + 1) % images.length;
              showImage(currentIndex);
            });
        }

        showImage(currentIndex);
    }
    
    // Update variants in sidebar
    if (productData.variants && productData.variants.length > 0) {
        const variantsList = document.getElementById('variants-list');
        if(variantsList) {
            variantsList.innerHTML = ''; // Clear existing
            productData.variants.forEach((variant, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<button id="variant-${variant.id}" class="flex items-center gap-2 border border-[#d9d9d9] rounded-md px-3 py-3 w-full text-left hover:bg-[#f0f4f9]" type="button"><span aria-hidden="true" class="w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-[#b71c1c]' : 'bg-[#144a75]'} inline-block flex-shrink-0"></span>${variant.name}</button>`;
                variantsList.appendChild(li);
            });
        }

        // Update specification tabs
        const specTabsNav = document.getElementById('spec-tabs-nav');
        const specTabsContent = document.getElementById('spec-tabs-content');
        
        if (specTabsNav && specTabsContent) {
            specTabsNav.innerHTML = '';
            specTabsContent.innerHTML = '';
            
            productData.variants.forEach((variant, index) => {
                // Create tab button
                const tabButton = document.createElement('button');
                tabButton.className = `tab-btn ${index === 0 ? 'border-b-2 border-[#144a75] pb-1 font-semibold' : 'opacity-60'} px-3 py-1`;
                tabButton.setAttribute('data-tab', `tab${index + 1}`);
                tabButton.setAttribute('type', 'button');
                tabButton.textContent = variant.name;
                if(index === 0) tabButton.setAttribute('aria-current', 'true');
                specTabsNav.appendChild(tabButton);
                
                // Create content table
                const table = document.createElement('table');
                table.className = `min-w-[340px] w-full text-xs sm:text-sm border-collapse tab-content ${index > 0 ? 'hidden' : ''}`;
                table.id = `tab${index + 1}`;
                
                let tableHTML = `
                    <thead>
                        <tr class="bg-[#144a75] text-white text-left text-[11px] sm:text-xs">
                            <th class="py-2 px-3 font-semibold uppercase w-1/2">Parameter</th>
                            <th class="py-2 px-3 font-semibold uppercase w-1/2">Specification</th>
                        </tr>
                    </thead>
                    <tbody class="text-[#0f3a5f]">
                `;
                
                variant.specifications.forEach(spec => {
                    tableHTML += `<tr class="border-b border-[#e6e9f0]"><td class="py-2 px-3">${spec.parameter}</td><td class="py-2 px-3">${spec.value}</td></tr>`;
                });
                
                tableHTML += `</tbody>`;
                table.innerHTML = tableHTML;
                specTabsContent.appendChild(table);
            });

            // Re-initialize tab switching logic
            const tabs = document.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => {
              tab.addEventListener('click', () => {
                tabs.forEach(t => {
                  t.classList.remove('border-b-2', 'border-[#144a75]', 'pb-1', 'font-semibold');
                  t.classList.add('opacity-60');
                  t.removeAttribute('aria-current');
                });
                contents.forEach(c => c.classList.add('hidden'));
                tab.classList.add('border-b-2', 'border-[#144a75]', 'pb-1', 'font-semibold');
                tab.classList.remove('opacity-60');
                tab.setAttribute('aria-current', 'true');
                const target = tab.getAttribute('data-tab');
                document.getElementById(target).classList.remove('hidden');
              });
            });

            // Link sidebar variants to tabs
            productData.variants.forEach((variant, index) => {
                const variantButton = document.getElementById(`variant-${variant.id}`);
                if (variantButton) {
                    variantButton.addEventListener('click', () => {
                        // Activate the corresponding tab
                        const tabButton = document.querySelector(`.tab-btn[data-tab="tab${index + 1}"]`);
                        if (tabButton) {
                            tabButton.click();
                        }
                        // Scroll to the specifications section
                        const specSection = document.getElementById('product-specifications');
                        if (specSection) {
                            specSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                }
            });
        }
    }
    
    // Update features
    if (productData.features && productData.features.length > 0) {
        const featuresList = document.getElementById('features-list');
        if (featuresList) {
            featuresList.innerHTML = '';
            productData.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }
    }
    
    // Update applications
    if (productData.applications && productData.applications.length > 0) {
        const appGrid = document.getElementById('applications-grid');
        if (appGrid) {
            appGrid.innerHTML = '';
            productData.applications.forEach(application => {
                const appCard = document.createElement('div');
                appCard.className = 'bg-white border border-[#e6e9f0] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center text-[#144a75] shadow hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer min-h-[180px] sm:min-h-[210px]';
                
                let iconHtml = '';
                if (application.iconType === 'image' && application.iconUrl) {
                    iconHtml = `<img src="${application.iconUrl}" alt="${application.title}" class="w-12 h-12 mb-3 sm:mb-4 object-contain">`;
                } else if (application.iconClass) {
                    iconHtml = `<i aria-hidden="true" class="${application.iconClass} text-[#a9b9c9] text-3xl sm:text-4xl mb-3 sm:mb-4"></i>`;
                }

                appCard.innerHTML = `
                    ${iconHtml}
                    <strong class="text-sm sm:text-base mb-2 font-bold">${application.title}</strong>
                    <p class="text-xs sm:text-sm leading-tight max-w-[220px]">${application.description}</p>
                `;
                appGrid.appendChild(appCard);
            });
        }
    }
    
    // Update brochure links
    if (productData.brochures) {
        const productButton = document.getElementById('download-brochure-product');
        const companyButton = document.getElementById('download-brochure-company');

        if(productButton && productData.brochures.product) {
            productButton.onclick = () => window.open(productData.brochures.product, '_blank');
        }
        if(companyButton && productData.brochures.company) {
            companyButton.onclick = () => window.open(productData.brochures.company, '_blank');
        }
    }
    
    // Update certifications
    if (productData.certifications && productData.certifications.length > 0) {
        const certificationsList = document.getElementById('certifications-list');
        if (certificationsList) {
            certificationsList.innerHTML = '';
            productData.certifications.forEach(cert => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <button class="flex items-center gap-2 border border-[#d9d9d9] rounded-md px-3 py-3 w-full text-left hover:bg-[#f0f4f9]" type="button">
                        <img alt="${cert.name} certification icon" class="w-4 h-4 object-contain" height="16" loading="lazy" src="${cert.iconUrl}" width="16"/>
                        ${cert.name}
                    </button>
                `;
                certificationsList.appendChild(li);
            });
        }
    }
}

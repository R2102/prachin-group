// Footer interactivity for dynamic injection
(function() {
  function onFooterReady(callback) {
    const check = () => {
      if (
        document.getElementById('tab-plant') &&
        document.getElementById('tab-office') &&
        document.getElementById('panel-plant') &&
        document.getElementById('panel-office')
      ) {
        // Ensure all footer columns are visible
        document.querySelectorAll('.footer-col').forEach(col => {
          col.style.display = 'flex';
          col.style.visibility = 'visible';
          col.style.opacity = '1';
        });
        
        // Ensure all footer lists are visible
        document.querySelectorAll('.footer-list').forEach(list => {
          list.style.display = 'flex';
          list.style.visibility = 'visible';
          list.style.opacity = '1';
        });
        
        callback();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  }

  onFooterReady(function() {
    // Tab logic for Plant/Corporate Office
    const tabPlant = document.getElementById('tab-plant');
    const tabOffice = document.getElementById('tab-office');
    const panelPlant = document.getElementById('panel-plant');
    const panelOffice = document.getElementById('panel-office');

    function activateTab(tab) {
      if (tab === 'plant') {
        tabPlant.classList.add('active');
        tabPlant.setAttribute('aria-selected', 'true');
        tabPlant.tabIndex = 0;
        tabOffice.classList.remove('active');
        tabOffice.setAttribute('aria-selected', 'false');
        tabOffice.tabIndex = -1;
        panelPlant.hidden = false;
        panelOffice.hidden = true;
        // Remove focus to prevent scrolling to footer
        // panelPlant.focus();
      } else {
        tabOffice.classList.add('active');
        tabOffice.setAttribute('aria-selected', 'true');
        tabOffice.tabIndex = 0;
        tabPlant.classList.remove('active');
        tabPlant.setAttribute('aria-selected', 'false');
        tabPlant.tabIndex = -1;
        panelOffice.hidden = false;
        panelPlant.hidden = true;
        // Remove focus to prevent scrolling to footer
        // panelOffice.focus();
      }
    }

    tabPlant.addEventListener('click', function() { activateTab('plant'); });
    tabOffice.addEventListener('click', function() { activateTab('office'); });

    tabPlant.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Prevent focus to avoid scrolling to footer
        // tabOffice.focus();
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        activateTab('plant');
      }
    });
    tabOffice.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // Prevent focus to avoid scrolling to footer
        // tabPlant.focus();
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        activateTab('office');
      }
    });

    // Set initial state
    activateTab('office');
    
    // Prevent any automatic scrolling to footer elements
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Scroll to top button functionality
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      function toggleScrollBtn() {
        if(window.scrollY > 300) {
          scrollBtn.style.display = 'flex';
        } else {
          scrollBtn.style.display = 'none';
        }
      }
      toggleScrollBtn();
      window.addEventListener('scroll', toggleScrollBtn);
    }

    // Dropdown for brochure
    const btn = document.getElementById('brochureDropdownBtn');
    const dropdown = document.getElementById('brochureDropdown');
    if (btn && dropdown) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        dropdown.style.display = expanded ? 'none' : 'block';
      });
      document.addEventListener('click', function(e) {
        dropdown.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
      });
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
})();
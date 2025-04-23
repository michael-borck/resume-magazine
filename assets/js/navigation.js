// navigation.js - Handle page transitions and navigation

/**
 * Navigation Manager
 * Handles page transitions and URL management
 */
class NavigationManager {
  constructor() {
    this.app = null;
    this.contentContainer = null;
    this.transitionDuration = 600; // milliseconds
    this.baseTitle = 'Magazine Resume';
  }

  /**
   * Initialize the navigation manager
   * @param {MagazineResume} app - Reference to the main application
   */
  init(app) {
    this.app = app;
    this.contentContainer = app.contentContainer;
    this._handleInitialNavigation();
  }

  /**
   * Handle the initial navigation based on URL
   * @private
   */
  _handleInitialNavigation() {
    // Parse the current URL to determine the initial page
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'cover';
    
    // Parse any additional parameters
    const params = {};
    for (const [key, value] of urlParams.entries()) {
      if (key !== 'page') {
        params[key] = value;
      }
    }

    // Store initial state
    history.replaceState(
      { page, params }, 
      `${this.baseTitle} - ${this._getPageTitle(page)}`,
      this._createURL(page, params)
    );
  }

  /**
   * Get a human-readable title for a page
   * @private
   */
  _getPageTitle(page) {
    const titles = {
      'cover': 'Home',
      'experience': 'Experience',
      'skills': 'Skills & Expertise',
      'education': 'Education',
      'projects': 'Projects & Portfolio',
      'contact': 'Contact'
    };
    return titles[page] || page.charAt(0).toUpperCase() + page.slice(1);
  }

  /**
   * Create a URL for a page with parameters
   * @private
   */
  _createURL(page, params = {}) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    
    // Add any additional parameters
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    
    return url.toString();
  }

  /**
   * Update the browser URL without navigating
   * @param {string} page - The page name
   * @param {Object} params - Additional parameters
   */
  updateURL(page, params = {}) {
    const url = this._createURL(page, params);
    const title = `${this.baseTitle} - ${this._getPageTitle(page)}`;
    
    // Update browser history
    history.pushState({ page, params }, title, url);
    
    // Update document title
    document.title = title;
  }

  /**
   * Transition to new content with animation
   * @param {string} newContent - The HTML content to transition to
   * @returns {Promise} - Resolves when the transition is complete
   */
  transitionTo(newContent) {
    return new Promise((resolve) => {
      // Create a temporary container for the new content
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = newContent;
      tempContainer.style.position = 'absolute';
      tempContainer.style.top = '0';
      tempContainer.style.left = '0';
      tempContainer.style.width = '100%';
      tempContainer.style.opacity = '0';
      tempContainer.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
      
      // Add the new content to the DOM (but hidden)
      this.contentContainer.appendChild(tempContainer);
      
      // Force reflow to ensure the transition works
      tempContainer.getBoundingClientRect();
      
      // Fade out the current content
      const currentContent = this.contentContainer.querySelector(':not([style*="position: absolute"])');
      if (currentContent) {
        currentContent.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
        currentContent.style.opacity = '0';
      }
      
      // Fade in the new content
      tempContainer.style.opacity = '1';
      
      // After transition completes, clean up
      setTimeout(() => {
        // Remove the old content
        if (currentContent) {
          this.contentContainer.removeChild(currentContent);
        }
        
        // Move the new content out of the temporary container
        const newNode = tempContainer.firstElementChild;
        if (newNode) {
          this.contentContainer.appendChild(newNode);
          this.contentContainer.removeChild(tempContainer);
        } else {
          // If there's no first element child, just use the content as is
          tempContainer.style.position = '';
        }
        
        resolve();
      }, this.transitionDuration);
    });
  }

  /**
   * Handle page-specific transitions
   * @param {string} fromPage - The page transitioning from
   * @param {string} toPage - The page transitioning to
   * @returns {string} - CSS class for the transition
   */
  getTransitionClass(fromPage, toPage) {
    // Add special transition classes for specific page combinations
    if (fromPage === 'cover' && toPage === 'experience') {
      return 'slide-left';
    } else if (fromPage === 'experience' && toPage === 'cover') {
      return 'slide-right';
    } else if (toPage === 'cover') {
      return 'fade-up';
    } else {
      return 'fade';
    }
  }
}

// Create and export an instance
const navigationManager = new NavigationManager();
export default navigationManager;
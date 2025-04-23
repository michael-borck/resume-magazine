// main.js - Core functionality for the magazine resume

import templateEngine from './templates.js';
import navigationManager from './navigation.js';

/**
 * Magazine Resume Application
 * Handles the core functionality of the interactive resume
 */
class MagazineResume {
  constructor() {
    this.currentPage = 'cover';
    this.loadedTemplates = new Set();
    this.loadedData = new Set();
    this.config = null;
    this.contentContainer = null;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Find the content container
      this.contentContainer = document.getElementById('magazine-content');
      if (!this.contentContainer) {
        throw new Error('Content container not found');
      }

      // Load global configuration
      this.config = await this._loadConfig();

      // Load the navigation manager
      navigationManager.init(this);

      // Preload essential templates
      await this._preloadEssentials();

      // Load and display the cover page
      await this.navigateTo('cover');

      // Set up event listeners
      this._setupEventListeners();

      console.log('Magazine Resume initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Magazine Resume:', error);
    }
  }

  /**
   * Load the global configuration
   * @private
   */
  async _loadConfig() {
    try {
      await templateEngine.loadData('config', './data/config.json');
      await templateEngine.loadData('profile', './data/profile.json');
      return templateEngine.data.config;
    } catch (error) {
      console.error('Error loading configuration:', error);
      return { defaultTemplate: 'cover' };
    }
  }

  /**
   * Preload essential templates and data
   * @private
   */
  async _preloadEssentials() {
    // Load essential templates
    const essentialTemplates = ['cover', 'navigation'];
    for (const template of essentialTemplates) {
      await this._loadTemplateIfNeeded(template);
    }

    // Load essential data
    const essentialData = ['skills', 'experience'];
    for (const data of essentialData) {
      await this._loadDataIfNeeded(data);
    }
  }

  /**
   * Load a template if it hasn't been loaded yet
   * @private
   */
  async _loadTemplateIfNeeded(templateName) {
    if (!this.loadedTemplates.has(templateName)) {
      await templateEngine.loadTemplate(
        templateName, 
        `./templates/${templateName}.html`
      );
      this.loadedTemplates.add(templateName);
    }
  }

  /**
   * Load data if it hasn't been loaded yet
   * @private
   */
  async _loadDataIfNeeded(dataName) {
    if (!this.loadedData.has(dataName)) {
      await templateEngine.loadData(
        dataName, 
        `./data/${dataName}.json`
      );
      this.loadedData.add(dataName);
    }
  }

  /**
   * Navigate to a specific page
   * @param {string} pageName - The name of the page to navigate to
   * @param {Object} params - Additional parameters for rendering
   */
  async navigateTo(pageName, params = {}) {
    try {
      // Load the template if needed
      await this._loadTemplateIfNeeded(pageName);

      // Load related data if needed
      if (pageName !== 'cover') {
        await this._loadDataIfNeeded(pageName);
      }

      // Update current page
      this.currentPage = pageName;

      // Render the page
      const renderedContent = templateEngine.render(pageName, {
        ...templateEngine.data,
        params,
        currentPage: pageName
      });

      // Apply page transition
      await navigationManager.transitionTo(renderedContent);

      // Set up page-specific event listeners
      this._setupPageEventListeners(pageName);

      // Update URL (for deep linking)
      navigationManager.updateURL(pageName, params);

      console.log(`Navigated to page: ${pageName}`);
    } catch (error) {
      console.error(`Failed to navigate to ${pageName}:`, error);
    }
  }

  /**
   * Set up global event listeners
   * @private
   */
  _setupEventListeners() {
    // Handle navigation link clicks
    document.addEventListener('click', (event) => {
      // Check if the clicked element is a navigation link
      const navLink = event.target.closest('[data-nav-link]');
      if (navLink) {
        event.preventDefault();
        const targetPage = navLink.getAttribute('data-page');
        const paramsString = navLink.getAttribute('data-params');
        const params = paramsString ? JSON.parse(paramsString) : {};
        this.navigateTo(targetPage, params);
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.page) {
        this.navigateTo(event.state.page, event.state.params || {});
      }
    });
  }

  /**
   * Set up page-specific event listeners
   * @private
   */
  _setupPageEventListeners(pageName) {
    // Clear any existing page-specific listeners
    // (Implementation would depend on how you're tracking these)

    // Set up page-specific listeners based on the page
    if (pageName === 'cover') {
      this._setupCoverPageListeners();
    } else if (pageName === 'experience') {
      this._setupExperiencePageListeners();
    } else if (pageName === 'skills') {
      this._setupSkillsPageListeners();
    } else if (pageName === 'projects') {
      this._setupProjectsPageListeners();
    }
  }

  /**
   * Set up event listeners for the cover page
   * @private
   */
  _setupCoverPageListeners() {
    // Example: Animate elements when they come into view
    const animateItems = document.querySelectorAll('.animate-on-view');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });

    animateItems.forEach(item => observer.observe(item));
  }

  /**
   * Set up event listeners for the experience page
   * @private
   */
  _setupExperiencePageListeners() {
    // Example: Handle timeline navigation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        const experienceId = item.getAttribute('data-experience-id');
        this._showExperienceDetail(experienceId);
      });
    });
  }

  /**
   * Set up event listeners for the skills page
   * @private
   */
  _setupSkillsPageListeners() {
    // Example: Handle skill category filtering
    const categoryButtons = document.querySelectorAll('.skill-category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        this._filterSkillsByCategory(category);
      });
    });
  }

  /**
   * Set up event listeners for the projects page
   * @private
   */
  _setupProjectsPageListeners() {
    // Example: Handle project gallery interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        this._showProjectDetail(projectId);
      });
    });
  }

  /**
   * Show detailed view of a specific experience
   * @private
   */
  _showExperienceDetail(experienceId) {
    // Implementation would depend on your design
    console.log(`Showing detail for experience: ${experienceId}`);
    // Example: Open a modal or change content section
  }

  /**
   * Filter skills by category
   * @private
   */
  _filterSkillsByCategory(category) {
    // Implementation would depend on your design
    console.log(`Filtering skills by category: ${category}`);
    // Example: Show/hide elements with data-category attributes
  }

  /**
   * Show detailed view of a specific project
   * @private
   */
  _showProjectDetail(projectId) {
    // Implementation would depend on your design
    console.log(`Showing detail for project: ${projectId}`);
    // Example: Navigate to a project detail page
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new MagazineResume();
  app.init();
  
  // Make the app available globally for debugging
  window.magazineResume = app;
});

export default MagazineResume;
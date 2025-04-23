// templates.js - Simple templating system for magazine resume

/**
 * Simple template rendering engine
 * Replaces {{variable}} with actual data
 * Handles conditionals with {{#if condition}}content{{/if}}
 * Handles loops with {{#each items}}content with {{this}}{{/each}}
 */
class TemplateEngine {
  constructor() {
    this.templates = {};
    this.data = {};
  }

  /**
   * Load a template from a file
   * @param {string} name - Template name
   * @param {string} path - Template file path
   */
  async loadTemplate(name, path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${path}`);
    }
    const template = await response.text();
    this.templates[name] = template;
    return template;
  }

  /**
   * Load JSON data from a file
   * @param {string} name - Data name
   * @param {string} path - JSON file path
   */
  async loadData(name, path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load data: ${path}`);
    }
    const data = await response.json();
    this.data[name] = data;
    return data;
  }

  /**
   * Render a template with data
   * @param {string} templateName - Name of the template to render
   * @param {Object} data - Data to render the template with
   * @returns {string} - Rendered template
   */
  render(templateName, data = {}) {
    let template = this.templates[templateName];
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    // Combine with any cached data
    const combinedData = { ...this.data, ...data };

    // Process conditionals
    template = this._processConditionals(template, combinedData);

    // Process loops
    template = this._processLoops(template, combinedData);

    // Replace variables
    template = this._replaceVariables(template, combinedData);

    return template;
  }

  /**
   * Process conditional blocks in the template
   * @private
   */
  _processConditionals(template, data) {
    const conditionalRegex = /\{\{#if\s+(.+?)\}\}([\s\S]*?)\{\{\/if\}\}/g;
    return template.replace(conditionalRegex, (match, condition, content) => {
      // Evaluate the condition
      const conditionParts = condition.trim().split('.');
      let value = data;
      for (const part of conditionParts) {
        if (value === undefined || value === null) {
          return '';
        }
        value = value[part];
      }
      return value ? content : '';
    });
  }

  /**
   * Process loop blocks in the template
   * @private
   */
  _processLoops(template, data) {
    const loopRegex = /\{\{#each\s+(.+?)\}\}([\s\S]*?)\{\{\/each\}\}/g;
    return template.replace(loopRegex, (match, arrayPath, itemTemplate) => {
      // Get the array
      const pathParts = arrayPath.trim().split('.');
      let array = data;
      for (const part of pathParts) {
        if (array === undefined || array === null) {
          return '';
        }
        array = array[part];
      }

      if (!Array.isArray(array)) {
        return '';
      }

      // Process each item in the array
      return array.map(item => {
        let itemContent = itemTemplate;
        
        // Replace {{this}} with the current item
        if (typeof item === 'string' || typeof item === 'number') {
          itemContent = itemContent.replace(/\{\{this\}\}/g, item);
        } else if (typeof item === 'object') {
          // Replace {{this.property}} with the property value
          const thisRegex = /\{\{this\.(.+?)\}\}/g;
          itemContent = itemContent.replace(thisRegex, (m, prop) => {
            return item[prop] !== undefined ? item[prop] : '';
          });
          
          // Replace regular variables
          itemContent = this._replaceVariables(itemContent, item);
        }
        
        return itemContent;
      }).join('');
    });
  }

  /**
   * Replace variables in the template
   * @private
   */
  _replaceVariables(template, data) {
    return template.replace(/\{\{(.+?)\}\}/g, (match, path) => {
      // Skip special syntax we've already processed
      if (path.startsWith('#') || path === '/if' || path === '/each' || path === 'this') {
        return match;
      }

      // Navigate the path
      const pathParts = path.trim().split('.');
      let value = data;
      for (const part of pathParts) {
        if (value === undefined || value === null) {
          return '';
        }
        value = value[part];
      }

      return value !== undefined ? value : '';
    });
  }
}

// Initialize the template engine
const templateEngine = new TemplateEngine();

// Export for use in other modules
export default templateEngine;
import { DuneCSSRule, DuneCSSVariables, DuneStyleSheet } from '@core/types';

/**
 * The `styleSheet` object provides methods for creating, finding, deleting, and updating stylesheets and CSS rules in the document.
 */
export const styleSheet: DuneStyleSheet = {
  create: {
    /**
     * Creates a <style> element and appends it to the document's <head> if a stylesheet with the specified id doesn't exist.
     *
     * @param {string} id - The ID of the <style> element to be created. Default value is 'theme-style'.
     */
    sheet: (id = 'theme-style'): void => {
      if (typeof document !== 'undefined') {
        if (!document.getElementById(id)) {
          const head = document.head || document.getElementsByTagName('head')[0];
          const style = document.createElement('style');

          style.id = id;
          head.appendChild(style);
        }
      }
    },
  },

  find: {
    /**
     * Searches for a stylesheet with the specified id among the document's style sheets.
     *
     * @param {string} id - The ID of the <style> element to search for.
     * @returns {CSSStyleSheet | null} The found CSSStyleSheet object or null if not found.
     */
    sheet: (id: string): CSSStyleSheet | null => {
      if (typeof document !== 'undefined') {
        const { styleSheets } = document;

        for (const styleSheet of styleSheets as unknown as CSSStyleSheet[]) {
          const node = styleSheet.ownerNode as HTMLElement;
          if (node?.id === id) {
            return styleSheet;
          }
        }
      }
      return null;
    },
  },

  delete: {
    /**
     * Deletes CSS rules at the specified indices within the given styleSheet.
     * Ensures that the styleSheet contains rules before attempting to delete.
     *
     * @param {CSSStyleSheet} styleSheet - The CSSStyleSheet object from which rules will be deleted.
     * @param {number[]} indices - An array of indices representing the positions of rules to be deleted.
     */
    rules: (styleSheet: CSSStyleSheet, indices: number[]): void => {
      // Check if the stylesheet contains rules before attempting to delete
      if (styleSheet.cssRules.length > 0) {
        for (let i = indices.length - 1; i >= 0; i--) {
          // Ensure the index is within the bounds of the stylesheet's rules
          if (indices[i] < styleSheet.cssRules.length) {
            try {
              styleSheet.deleteRule(indices[i]);
            } catch (e) {
              console.error(`Failed to delete rule at index ${indices[i]}:`, e);
            }
          }
        }
      } else {
        console.warn('Attempted to delete rules from an empty stylesheet.');
      }
    },

    /**
     * Removes specified CSS variables from the stylesheet identified by the specified id.
     * Ensures that the appropriate CSS rules are deleted safely.
     *
     * @param {string[]} variableNames - An array of CSS variable names to be removed.
     * @param {string} id - The ID of the stylesheet from which variables will be removed. Default value is 'theme-style'.
     */
    variables: (variableNames: string[], id = 'theme-style'): void => {
      const sheet = styleSheet.find.sheet(id);
      if (sheet) {
        const ruleIndicesToDelete: number[] = [];
        for (let i = 0; i < sheet.cssRules.length; i++) {
          const cssRule = sheet.cssRules[i] as DuneCSSRule;
          if (
            cssRule &&
            cssRule?.selectorText === ':root' &&
            variableNames.some((name) => cssRule.cssText.includes(`--${name}:`))
          ) {
            ruleIndicesToDelete.push(i);
          }
        }

        if (ruleIndicesToDelete.length > 0) {
          styleSheet.delete.rules(sheet, ruleIndicesToDelete);
        }
      }
    },
  },

  /**
   * Generates a CSS rule text for defining CSS variables from the provided object.
   *
   * @param {DuneCSSVariables} obj - An object containing CSS variable names and their values.
   * @param {boolean} transform - A boolean flag indicating whether to transform variable names to CSS custom property syntax.
   * @returns {string} A string representing the CSS rule text.
   */
  generateCSSRuleText: (obj: DuneCSSVariables, transform: boolean): string => {
    let cssRules = '';

    Object.keys(obj).forEach((key) => {
      const variableName = transform ? `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}` : key;
      cssRules += `${variableName}:${obj[key]};\n`;
    });

    return `:root{${cssRules}}`;
  },

  /**
   * Inserts a CSS rule text into the stylesheet identified by the specified ID.
   *
   * @param {string} ruleText - The CSS rule text to be inserted.
   * @param {string} id - The ID of the stylesheet where the rule text will be inserted. Default value is 'theme-style'.
   */
  insertCSSRuleText: (ruleText: string, id = 'theme-style'): void => {
    styleSheet.create.sheet(id);

    const sheet = styleSheet.find.sheet(id);
    if (sheet) {
      sheet.insertRule(ruleText);
    }
  },

  /**
   * Creates or updates CSS variables in the stylesheet identified by the specified ID.
   * Safely deletes existing :root rules before inserting the new ones.
   *
   * @param {DuneCSSVariables} variables - An object containing CSS variable names and their values.
   * @param {boolean} transform - A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is true.
   * @param {string} id - The ID of the stylesheet where variables will be created or updated. Default value is 'theme-style'.
   */
  insertCSSVariables: (variables: DuneCSSVariables, transform = true, id = 'theme-style'): void => {
    styleSheet.create.sheet(id);

    const sheet = styleSheet.find.sheet(id);
    if (sheet) {
      const ruleIndicesToDelete: number[] = [];
      for (let i = 0; i < sheet.cssRules.length; i++) {
        const cssRule = sheet.cssRules[i];
        if ((cssRule as DuneCSSRule)?.selectorText === ':root') {
          ruleIndicesToDelete.push(i);
        }
      }

      if (ruleIndicesToDelete.length > 0) {
        styleSheet.delete.rules(sheet, ruleIndicesToDelete);
      }

      const ruleText = styleSheet.generateCSSRuleText(variables, transform);
      sheet.insertRule(ruleText);
    }
  },

  /**
   * Updates or adds CSS variables to the stylesheet identified by the specified ID.
   * Ensures that existing :root rules are safely deleted before updating with the new ones.
   *
   * @param {DuneCSSVariables} variables - An object containing CSS variable names and their updated values.
   * @param {boolean} transform - A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is true.
   * @param {string} id - The ID of the stylesheet to be updated. Default value is 'theme-style'.
   */
  updateCSSVariables: (variables: DuneCSSVariables, transform = true, id = 'theme-style'): void => {
    styleSheet.create.sheet(id);

    const sheet = styleSheet.find.sheet(id);
    if (sheet) {
      const ruleIndicesToDelete: number[] = [];
      for (let i = 0; i < sheet.cssRules.length; i++) {
        const cssRule = sheet.cssRules[i] as DuneCSSRule;
        if (cssRule?.selectorText === ':root') {
          ruleIndicesToDelete.push(i);
        }
      }

      if (ruleIndicesToDelete.length > 0) {
        styleSheet.delete.rules(sheet, ruleIndicesToDelete);
      }

      const ruleText = styleSheet.generateCSSRuleText(variables, transform);
      sheet.insertRule(ruleText);
    }
  },
};

export default styleSheet;

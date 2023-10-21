"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleSheet = void 0;
/**
 * Creates a <style> element and appends it to the document's <head> if a stylesheet with the specified id doesn't exist.
 *
 * @param {string} id - The ID of the <style> element to be created. Default value is 'theme-style'.
 */
exports.styleSheet = {
    create: {
        /**
         * Creates a <style> element and appends it to the document's <head> if a stylesheet with the specified id doesn't exist.
         *
         * @param {string} id - The ID of the <style> element to be created. Default value is 'theme-style'.
         */
        sheet: (id = 'theme-style') => {
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
        sheet: (id) => {
            if (typeof document !== 'undefined') {
                const { styleSheets } = document;
                for (const styleSheet of styleSheets) {
                    const node = styleSheet.ownerNode;
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
         *
         * @param {CSSStyleSheet} styleSheet - The CSSStyleSheet object from which rules will be deleted.
         * @param {number[]} indices - An array of indices representing the positions of rules to be deleted.
         */
        rules: (styleSheet, indices) => {
            for (let i = indices.length - 1; i >= 0; i--) {
                styleSheet.deleteRule(indices[i]);
            }
        },
        /**
         * Removes specified CSS variables from the stylesheet identified by the specified id.
         *
         * @param {string[]} variableNames - An array of CSS variable names to be removed.
         * @param {string} id - The ID of the stylesheet from which variables will be removed. Default value is 'theme-style'.
         */
        variables: (variableNames, id = 'theme-style') => {
            const sheet = exports.styleSheet.find.sheet(id);
            if (sheet) {
                const ruleIndicesToDelete = [];
                for (let i = 0; i < sheet.cssRules.length; i++) {
                    const cssRule = sheet.cssRules[i];
                    if (cssRule &&
                        cssRule?.selectorText === ':root' &&
                        variableNames.some((name) => cssRule.cssText.includes(`--${name}:`))) {
                        ruleIndicesToDelete.push(i);
                    }
                }
                exports.styleSheet.delete.rules(sheet, ruleIndicesToDelete);
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
    generateCSSRuleText: (obj, transform) => {
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
    insertCSSRuleText: (ruleText, id = 'theme-style') => {
        exports.styleSheet.create.sheet(id);
        const sheet = exports.styleSheet.find.sheet(id);
        if (sheet) {
            sheet.insertRule(ruleText);
        }
    },
    /**
     * Creates or updates CSS variables in the stylesheet identified by the specified ID.
     *
     * @param {DuneCSSVariables} variables - An object containing CSS variable names and their values.
     * @param {boolean} transform - A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is true.
     * @param {string} id - The ID of the stylesheet where variables will be created or updated. Default value is 'theme-style'.
     */
    insertCSSVariables: (variables, transform = true, id = 'theme-style') => {
        exports.styleSheet.create.sheet(id);
        const sheet = exports.styleSheet.find.sheet(id);
        if (sheet) {
            const ruleIndicesToDelete = [];
            for (let i = 0; i < sheet.cssRules.length; i++) {
                const cssRule = sheet.cssRules[i];
                if (cssRule?.selectorText === ':root') {
                    ruleIndicesToDelete.push(i);
                }
            }
            exports.styleSheet.delete.rules(sheet, ruleIndicesToDelete);
            const ruleText = exports.styleSheet.generateCSSRuleText(variables, transform);
            sheet.insertRule(ruleText);
        }
    },
    /**
     * Updates or adds CSS variables to the stylesheet identified by the specified ID.
     *
     * @param {DuneCSSVariables} variables - An object containing CSS variable names and their updated values.
     * @param {boolean} transform - A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is true.
     * @param {string} id - The ID of the stylesheet to be updated. Default value is 'theme-style'.
     */
    updateCSSVariables: (variables, transform = true, id = 'theme-style') => {
        exports.styleSheet.create.sheet(id);
        const sheet = exports.styleSheet.find.sheet(id);
        if (sheet) {
            const ruleIndicesToDelete = [];
            for (let i = 0; i < sheet.cssRules.length; i++) {
                const cssRule = sheet.cssRules[i];
                if (cssRule?.selectorText === ':root') {
                    ruleIndicesToDelete.push(i);
                }
            }
            exports.styleSheet.delete.rules(sheet, ruleIndicesToDelete);
            const ruleText = exports.styleSheet.generateCSSRuleText(variables, transform);
            sheet.insertRule(ruleText);
        }
    },
};
exports.default = exports.styleSheet;
//# sourceMappingURL=index.js.map
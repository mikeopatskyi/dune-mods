# CSS Manipulation

The `styleSheet` module provides functions for creating, managing, and manipulating CSS styles dynamically. This documentation will guide you through the features and usage of the `styleSheet` module.

## Table of Contents

- [CSS Manipulation](#css-manipulation)

  - [Create StyleSheet](#create-stylesheet)
    - [`styleSheet.create.sheet(id?)`](#styleSheet-create-sheet)
  - [Find StyleSheet](#find-stylesheet)
    - [`styleSheet.find.sheet(id)`](#styleSheet-find-sheet)
  - [Delete CSS Rules](#delete-css-rules)
    - [`styleSheet.delete.rules(styleSheet, indices)`](#styleSheet-delete-rules)
  - [Generate CSS Rule Text](#generate-css-rule-text)
    - [`styleSheet.generateCSSRuleText(obj, transform)`](#styleSheet-generate-css-rule-text)
  - [Insert CSS Rule Text](#insert-css-rule-text)
    - [`styleSheet.insertCSSRuleText(ruleText, id)`](#stylesheet-insertcssruletext)
  - [Insert CSS Variables](#insert-css-variables)
    - [`styleSheet.insertCSSVariables(variables, transform?, id?)`](#styleSheet-insert-css-variables)
  - [Update CSS Variables](#update-css-variables)
    - [`styleSheet.updateCSSVariables(variables, transform?, id?)`](#styleSheet-update-css-variables)
  - [Delete CSS Variables](#delete-css-variables)
    - [`styleSheet.delete.variables(variableNames, id?)`](#styleSheet-delete-variables)

### Create StyleSheet

#### `styleSheet.create.sheet(id?)`

Creates a `<style>` element and appends it to the document's `<head>` if a stylesheet with the specified ID doesn't exist.

**Parameters:**

- `id` (string, optional): The ID of the `<style>` element to be created. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

styleSheet.create.sheet('custom-style');
```

<span id="styleSheet-find-sheet"></span>

### Find StyleSheet

#### `styleSheet.find.sheet(id)`

Searches for a stylesheet with the specified ID among the document's style sheets.

**Parameters:**

- `id` (string): The ID of the `<style>` element to search for.

**Returns:**

- `CSSStyleSheet | null`: The found `CSSStyleSheet` object or `null` if not found.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const sheet = styleSheet.find.sheet('custom-style');
if (sheet) {
  // Found the stylesheet
}
```

<span id="styleSheet-delete-rules"></span>

### Delete CSS Rules

#### `styleSheet.delete.rules(styleSheet, indices)`

Deletes CSS rules at the specified indices within the given `CSSStyleSheet`.

**Parameters:**

- `styleSheet` (CSSStyleSheet): The `CSSStyleSheet` object from which rules will be deleted.
- `indices` (number[]): An array of indices representing the positions of rules to be deleted.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const sheet = styleSheet.find.sheet('custom-style');
if (sheet) {
  styleSheet.delete.rules(sheet, [0, 1]);
}
```

<span id="styleSheet-generate-css-rule-text"></span>

### Generate CSS Rule Text

#### `styleSheet.generateCSSRuleText(obj, transform)`

Generates a CSS rule text for defining CSS variables from the provided object.

**Parameters:**

- `obj` (DuneCSSVariables): An object containing CSS variable names and their values.
- `transform` (boolean): A boolean flag indicating whether to transform variable names to CSS custom property syntax.

**Returns:**

- `string`: A string representing the CSS rule text.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const variables = {
  primaryColor: '#ff0000',
  fontSize: '16px',
};

const ruleText = styleSheet.generateCSSRuleText(variables, true);
console.log(ruleText);
```

<span id="stylesheet-insertcssruletext"></span>

### Insert CSS Rule Text

#### `styleSheet.insertCSSRuleText(ruleText: string, id?: string): void` <!-- New method -->

Inserts the provided CSS rule text into the stylesheet identified by the specified ID. If the stylesheet does not exist, it will be created.

##### Parameters

- `ruleText` (string): The CSS rule text to be inserted.
- `id` (string, optional): The ID of the stylesheet where the rule text will be inserted. Default value is `'theme-style'`.

##### Example

```javascript
import { styleSheet } from '@modules/style-sheet';

const customRule = `
  .custom-class {
    background-color: red;
    color: white;
  }
`;

styleSheet.insertCSSRuleText(customRule, 'custom-styles');
```

<span id="styleSheet-insert-css-variables"></span>

### Insert CSS Variables

#### `styleSheet.insertCSSVariables(variables, transform?, id?)`

Creates or updates CSS variables in the stylesheet identified by the specified ID.

**Parameters:**

- `variables` (DuneCSSVariables): An object containing CSS variable names and their values.
- `transform` (boolean, optional): A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is `true`.
- `id` (string, optional): The ID of the stylesheet where variables will be created or updated. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const variables = {
  primaryColor: '#ff0000',
  fontSize: '16px',
};

styleSheet.insertCSSVariables(variables);
```

<span id="styleSheet-update-css-variables"></span>

### Update CSS Variables

#### `styleSheet.updateCSSVariables(variables, transform?, id?)`

Updates or adds CSS variables to the stylesheet identified by the specified ID.

**Parameters:**

- `variables` (DuneCSSVariables): An object containing CSS variable names and their updated values.
- `transform` (boolean, optional): A boolean flag indicating whether to transform variable names to CSS custom property syntax. Default value is `true`.
- `id` (string, optional): The ID of the stylesheet to be updated. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const updatedVariables = {
  primaryColor: '#00ff00',
  fontSize: '18px',
};

styleSheet.updateCSSVariables(updatedVariables);
```

<span id="styleSheet-delete-variables"></span>

### Delete CSS Variables

#### `styleSheet.delete.variables(variableNames, id?)`

Removes specified CSS variables from the stylesheet identified by the specified ID.

**Parameters:**

- `variableNames` (string[]): An array of CSS variable names to be removed.
- `id` (string, optional): The ID of the stylesheet from which variables will be removed. Default value is `'theme-style'`.

**Example:**

```javascript
import { styleSheet } from 'dune-mods';

const variablesToDelete = ['primaryColor', 'fontSize'];
styleSheet.delete.variables(variablesToDelete);
```

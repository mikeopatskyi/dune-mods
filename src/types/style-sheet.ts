export interface DuneCSSVariables {
  [key: string]: string | number;
}

export interface DuneCSSRule extends CSSRule {
  selectorText?: string;
}

export interface DuneStyleSheet {
  create: {
    sheet(id?: string): void;
  };
  find: {
    sheet(id: string): CSSStyleSheet | null;
  };
  delete: {
    rules(styleSheet: CSSStyleSheet, indices: number[]): void;
    variables(variableNames: string[], id?: string): void;
  };
  generateCSSRuleText(obj: DuneCSSVariables, transform: boolean): string;
  insertCSSRuleText(ruleText: string, id?: string): void;
  insertCSSVariables(variables: DuneCSSVariables, transform?: boolean, id?: string): void;
  updateCSSVariables(variables: DuneCSSVariables, transform?: boolean, id?: string): void;
}

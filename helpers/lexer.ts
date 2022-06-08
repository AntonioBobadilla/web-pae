/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
class Lexer {
  tokenRegExp: any = undefined;

  // Perform validation and freeze rules so there are no side-effects.
  rules: any = [];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(newRules: any) {
    if (!newRules || !newRules.length) {
      console.log('Rules must be of type Array.');
    } else {
      for (let i = 0, ii = newRules.length; i < ii; i += 1) {
        const rule = newRules[i];
        if (!rule || !rule.length || rule.length > 3) {
          console.log(`Invalid rule at index ${i}.`);
        }
        let expression = rule[0];
        if (!(expression instanceof RegExp || expression instanceof String)) {
          console.log(
            `${
              'Expression must be an instance of RegExp or String' +
              ' for rule at index '
            }${i}.`
          );
        }
        // Prevent side-effects by taking string copy of RegExp. This also has
        // the benefit of stripping all modifiers from the RegExp.
        if (expression.source) {
          expression = expression.source;
        } else {
          expression = expression.replace(/[-*+?.,^$|#[\]{}()\\]/g, '\\$1');
        }

        const type = rule[1];
        if ((typeof type !== 'string' || type.length === 0) && type !== null) {
          console.log(
            `Expected String or null instead found ${JSON.stringify(
              String(type)
            )} for type of rule at index ${i}.`
          );
        }
        const action = rule[2];
        if (action !== undefined && !(action instanceof Function)) {
          console.log(
            `${
              'Constructor is defined, but is not a function for ' +
              'rule at index '
            }${i}.`
          );
        }
        this.rules[i] = [expression, type, action];
      }
    }
  }

  compile(): any {
    if (!this.tokenRegExp) {
      const tokenExpressions = [];
      const { rules } = this;
      let captureCount = 0;
      for (let i = 0, ii = rules.length; i < ii; i += 1) {
        const rule = rules[i];
        let expression = rule[0];

        // How many captures does this expression have?
        const CAPTURE_EXP = /\\.|\[(?:\\.|[^\]])*\]|(\((?!\?[!:=]))|./g;
        const captures = expression.replace(CAPTURE_EXP, (match: any, p: any) =>
          p ? '.' : ''
        ).length;
        rule[3] = captures + 1;

        // Increment backreferences.
        const BACK_REF_EXP = /\\\D|\[(?:\\.|[^\]])*\]|\\(\d+)|./g;
        expression = expression.replace(
          BACK_REF_EXP,
          // eslint-disable-next-line no-loop-func
          (match: any, d: string) => {
            if (d) {
              const n = parseInt(d, 10);
              if (n > 0 && n <= captures) {
                return `\\${n + captureCount + 1}`;
              }
              return parseInt(d, 8); // Assume this was an escape sequence?
            }
            return match;
          }
        );

        captureCount += captures + 1;

        tokenExpressions.push(expression);
      }
      this.tokenRegExp = new RegExp(`(${tokenExpressions.join(')|(')})`, 'g');
    }

    return this.tokenRegExp;
  }

  lex(text: string): any {
    if (typeof text !== 'string') {
      console.log('Attempt to lex an Object that is not a String.');
    }

    const tokens = [];
    let tokenMatch;
    const tokenRegExp = this.compile();

    // eslint-disable-next-line no-cond-assign
    while ((tokenMatch = tokenRegExp.exec(text))) {
      // Throw if character is skipped.
      const token = {
        type: '',
        value: tokenMatch[0]
      };

      // Do a linear search for the group that matched then look up its
      // corresponding token.
      let i = 1;
      let r = 0;
      const { rules } = this;
      let rule = rules[r];
      while (!tokenMatch[i]) {
        i += rule[3];
        // eslint-disable-next-line no-plusplus
        rule = rules[++r];
      }
      // eslint-disable-next-line prefer-destructuring
      token.type = rule[1];

      // Throw an exception rather than enter an infinite loop.
      if (tokenMatch[0].length === 0) {
        console.log(`Rule at index ${i} matched the empty string.`);
      }

      // If the type is null then token will be thrown away.
      if (token.type) {
        tokens.push(token);
      }
      //   console.log(token);
    }

    return tokens;
  }
}

export default Lexer;

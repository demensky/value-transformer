import type {MatcherHintOptions} from 'jest-matcher-utils';
import {matcherHint, printReceived} from 'jest-matcher-utils';

import type {ValueTransformer} from '../base/value-transformer.js';
import {IncompatibleLiteralError} from '../error/incompatible-literal-error.js';

expect.extend({
  toThrowIncompatibleLiteral<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    literal: T,
  ): jest.CustomMatcherResult {
    const options: MatcherHintOptions = {
      comment: 'transformer.fromLiteral(literal)',
      isNot: this.isNot,
    };

    const hint: string = matcherHint(
      'toThrowIncompatibleLiteral',
      'transformer',
      'literal',
      options,
    );

    let thrown: boolean;
    let result: unknown;

    try {
      result = transformer.fromLiteral(literal);
      thrown = false;
    } catch (fromLiteralError) {
      result = fromLiteralError;
      thrown = true;
    }

    let pass: jest.CustomMatcherResult['pass'];
    let message: jest.CustomMatcherResult['message'];

    if (thrown) {
      if (result instanceof IncompatibleLiteralError) {
        pass = true;

        message = () => {
          return [
            hint,
            '',
            `Expected error: not [${IncompatibleLiteralError.name}]`,
            `Received error: ${printReceived(result)}`,
          ].join('\n');
        };
      } else {
        pass = false;

        message = () => {
          return [
            hint,
            '',
            `Expected error: [${IncompatibleLiteralError.name}]`,
            `Received error: ${printReceived(result)}`,
          ].join('\n');
        };
      }
    } else {
      pass = false;

      message = () => {
        return [
          hint,
          '',
          `Expected error: [${IncompatibleLiteralError.name}]`,
          `Received data: ${printReceived(result)}`,
        ].join('\n');
      };
    }

    return {pass, message};
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toThrowIncompatibleLiteral(value: unknown): R;
    }
  }
}

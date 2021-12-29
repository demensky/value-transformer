import type {ValueTransformer} from '../base/value-transformer';
import {IncompatibleLiteralError} from '../error/incompatible-literal-error';

expect.extend({
  toThrowIncompatibleLiteral<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    literal: T,
  ): jest.CustomMatcherResult {
    const options: jest.MatcherHintOptions = {
      comment: 'transformer.fromLiteral(literal)',
      isNot: this.isNot,
    };

    const hint: string = this.utils.matcherHint(
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
            `Received error: ${this.utils.printReceived(result)}`,
          ].join('\n');
        };
      } else {
        pass = false;

        message = () => {
          return [
            hint,
            '',
            `Expected error: [${IncompatibleLiteralError.name}]`,
            `Received error: ${this.utils.printReceived(result)}`,
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
          `Received data: ${this.utils.printReceived(result)}`,
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

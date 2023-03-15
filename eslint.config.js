import * as typescriptPlugin from '@typescript-eslint/eslint-plugin';
import * as typeScriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import * as unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default [
  {ignores: ['coverage/*', 'dist/*', '**/*.js']},
  {
    files: ['**/*.ts'],
    languageOptions: {ecmaVersion: 2022},
    linterOptions: {reportUnusedDisableDirectives: true},
    plugins: {
      import: importPlugin,
      simpleImportSort: simpleImportSortPlugin,
      unusedImports: unusedImportsPlugin,
    },
    rules: {
      'for-direction': 'error',
      'no-async-promise-executor': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-inner-declarations': 'error',
      'no-misleading-character-class': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'use-isnan': 'error',
      curly: 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-constructor-return': 'error',
      'no-div-regex': 'error',
      'no-else-return': ['error', {allowElseIf: false}],
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-label': 'error',
      'no-global-assign': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-octal': 'error',
      'no-param-reassign': 'error',
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': ['error', {allowInParentheses: false}],
      'no-unused-labels': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-with': 'error',
      'prefer-regex-literals': 'error',
      radix: 'error',
      yoda: 'error',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-class-assign': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-yield': 'error',
      'symbol-description': 'error',

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',

      'simpleImportSort/imports': [
        'error',
        {groups: [['^\\u0000'], ['^'], ['^\\.\\.'], ['^\\.']]},
      ],
      'simpleImportSort/exports': 'error',

      'unusedImports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typeScriptParser,
      parserOptions: {project: ['./tsconfig.json']},
    },
    plugins: {'@typescript-eslint': typescriptPlugin},
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-types': [
        'error',
        {types: {object: false}, extendDefaults: true},
      ],
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {assertionStyle: 'never'},
      ],
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: false,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'signature',

              '#private-static-field',
              'protected-static-field',
              'public-static-field',

              '#private-static-method',
              'protected-static-method',
              'public-static-method',

              '#private-field',
              'protected-field',
              'public-field',

              'constructor',

              '#private-method',
              'protected-method',
              'public-method',
            ],
            order: 'natural',
          },
        },
      ],
      // TODO typescript/naming-convention
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-type-alias': [
        'error',
        {
          allowAliases: 'always',
          allowCallbacks: 'always',
          allowConditionalTypes: 'always',
          allowLiterals: 'in-unions-and-intersections',
          allowMappedTypes: 'always',
          allowTupleTypes: 'always',
          allowGenerics: 'always',
        },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'block-like'},
      ],
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      // TODO typescript/promise-function-async
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {checkCompoundAssignments: true},
      ],
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/sort-type-union-intersection-members': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
        },
      ],
      // TODO typescript/typedef
      '@typescript-eslint/unbound-method': 'error',
      '@typescript-eslint/unified-signatures': 'error',

      '@typescript-eslint/lines-between-class-members': 'error',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-loss-of-precision': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {ignoreEnums: true, ignore: [0, 1, '0n', '1n']},
      ],
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          ignoreTypeValueShadow: false,
          ignoreFunctionTypeParameterNameValueShadow: false,
        },
      ],
      '@typescript-eslint/no-throw-literal': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
  {
    files: ['**/*.config.js', '**/*.config.ts'],
    rules: {'import/no-default-export': 'off'},
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
  {
    files: ['test-util/**/*.ts'],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
];

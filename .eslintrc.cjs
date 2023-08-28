// https://eslint.org/docs/user-guide/configuring

const rulesJavascript = {
    quotes: ['error', 'single'],
    'max-classes-per-file': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 0,
    'no-console': ['error'],
    'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
    ],
    'import/order': [
        'error',
        {
            groups: [
                ['builtin', 'external'], // Built-in types and external modules are first. They can be mingled together.
                'internal', // Then internal modules
                ['sibling', 'parent'], // Then sibling and parent modules. They can be mingled together.
            ],
            alphabetize: {
                order: 'asc', // sort in ascending order within each group based on import path.
                caseInsensitive: true, // ignore case.
            },
        },
    ],
    'import/newline-after-import': 'error',

    // Don't require these extension when importing.
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            // Override airbnb.
            cjs: 'never',
            ts: 'never',
        },
    ],
    // Allow specific optionalDependencies.
    'import/no-extraneous-dependencies': [
        'error',
        {
            optionalDependencies: ['test/unit/index.js'],
        },
    ],

    // Avoid slow lint caused by eslint-plugin-import:
    // Disabled rules to avoid double parsing because the plugin does its own parsing.
    // - TS provides the same checks as part of standard type checking:
    'import/default': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-named-as-default-member': 0,
    // - No TS equivalent
    'import/no-named-as-default': 0,
    'import/no-cycle': 0,
    'import/no-unused-modules': 0,
    'import/no-deprecated': 0,
    'import/prefer-default-export': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // You're not the boss of me
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 0,
    'func-names': ['error', 'as-needed'],
    'function-paren-newline': 0,
    indent: 'off',
    'implicit-arrow-linebreak': 0,
    'newline-per-chained-call': 0,
    'no-continue': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'prefer-destructuring': ['error', { object: false, array: false }],

    'sort-imports': [
        'error',
        {
            // ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            // memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: true,
        },
    ],
};

const rulesTypescript = {
    // Ignore unused function args.
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],

    // Disable ES6, use typescript rule due to false positives on enums.
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 'error',

    // Enforces that types will not to be used (ban-types).
    '@typescript-eslint/ban-types': [
        'error',
        {
            types: {
                // Report misuse of these types using the default error message.
                Boolean: null,
                Number: null,
                String: null,

                // JF: TODO: Enabled and address these misuses.
                Function: false,
                Object: false,
                '{}': false,
            },
        },
    ],
};

const rulesLit = {
    'lit/binding-positions': 0, // conflicts with usage of literal directive
};

module.exports = {
    parserOptions: {
        // Sets the ECMAScript syntax.
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    ignorePatterns: ['**/node_modules/**'],
    overrides: [
        {
            files: ['*.cjs'],
            parser: 'espree',
            plugins: ['import'],
            extends: ['eslint:recommended', 'airbnb-base'],
            rules: rulesJavascript,
        },
        {
            files: ['*.js', '*.ts'],
            parser: '@typescript-eslint/parser',
            settings: {
                'import/resolver': {
                    // Reads tsconfig.json for resolver configuration.
                    typescript: {},
                },
            },
            plugins: ['lit', 'import', '@typescript-eslint', 'prettier'],
            extends: [
                'plugin:lit/recommended',
                'eslint:recommended',
                'airbnb-base',
                'plugin:@typescript-eslint/recommended',
                'prettier', // keep it the last
            ],
            rules: {
                ...rulesJavascript,
                ...rulesTypescript,
                ...rulesLit,
            },
        },
    ],
};

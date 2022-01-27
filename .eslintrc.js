module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['temp', 'lib'],
    rules: {
        semi: ['error', 'never'],
        // we use 4 spaces to indent our code
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        'no-use-before-define': ['error', { functions: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-continue': 'off',
        'import/extensions': 'off',
        'func-names': 'off',
        'no-param-reassign': 'off',
        'import/no-unresolved': 'off',
    },
}

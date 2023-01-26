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
    ignorePatterns: ['dev', 'lib', 'dist', 'snowpack'],
    rules: {
        semi: ['error', 'never'],
        // we use 4 spaces to indent our code
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        'no-use-before-define': ['error', { functions: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-continue': 'off',
        'import/extensions': ['error', 'ignorePackages'],
        'func-names': 'off',
        'import/no-unresolved': 'off',
        'no-bitwise': 'off',
        'max-len': 'off',
        'object-curly-newline': ['error', {
            ObjectPattern: { consistent: true },
        }],
    },
}

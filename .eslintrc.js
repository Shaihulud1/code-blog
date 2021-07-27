module.exports = {
    root: true,
    //parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        //extraFileExtensions: ['.vue'],
    
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
        jsx: true
        }
    },

    extends: [
        //'plugin:vue/recommended',
        '@vue/typescript/recommended',
        // add more generic rulesets here, such as:
        // 'plugin:@typescript-eslint/eslint-recommended'
        //'eslint:recommended',
        'plugin:vue/vue3-recommended',
        //"plugin:@typescript-eslint/eslint-recommended",
        //"plugin:@typescript-eslint/recommended"
    ],
    rules: {
    },
    
  }
  
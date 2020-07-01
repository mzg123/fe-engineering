const path = require('path');

module.exports = {
    //parser: "babel-eslint",
    //parser: 'typescript-eslint-parser',
    parserOptions: {
        //parser: "babel-eslint",
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    extends: [
        //"airbnb",
        //"plugin:vue/recommended",

        'plugin:vue/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript',
    ],
    plugins: ['import', 'vue', '@typescript-eslint'],
    globals: {
      window: true,
      API_DOMAIN: '',
      document: false
    },
    "settings": {
        "import/resolver": {
          "alias": {
            "map": [
              ["@libjs", path.resolve(__dirname, "../src/comp/lib/lib.js")],
              ["@commjs", path.resolve(__dirname, "../src/comp/comm/commJs.js")],
              ["@BaseLogicObj", path.resolve(__dirname, "../src/comp/BaseReact/BaseLogic.js")],
              ["@BaseComponent", path.resolve(__dirname, "../src/comp/BaseReact/BaseComponent.js")],
              ["@ErrorComponent", path.resolve(__dirname, "../src/comp/BaseReact/ErrorComponent.js")],
              ["@BasePureComponent", path.resolve(__dirname, "../src/comp/BaseReact/BasePureComponent.js")],
            ],
            "extensions": [".js", ".ts", ".json", ".jsx", ".tsx"]
          }
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "react/jsx-indent": [
            4
        ],
        "semi": 0,
        "comma-dangle": 0,
        "space-before-function-paren": 0,
        "react/jsx-indent-props": 0,
        "@typescript-eslint/no-inferrable-types": 0,
        "react/destructuring-assignment":0,
        "react/forbid-prop-types": 0,
        "class-methods-use-this": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/media-has-caption": 0,
        "react/no-access-state-in-setstate": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "react/jsx-filename-extension": 0,
        "no-debugger": 0,
        "spaced-comment": 0
     }
}

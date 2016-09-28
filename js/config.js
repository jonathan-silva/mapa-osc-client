require.config({
  baseUrl: "js/",
  paths: {
    "react": "libs/react-15.3.1/react-with-addons.min",
    "jsx": "libs/jsxcompiler/jsx",
    "text": "libs/require-2.3.2/text",
    "JSXTransformer": "libs/jsxcompiler/JSXTransformer",
    "babel": "libs/babel-core/5.8.24/browser.min",
    "jquery": "libs/jquery-3.1.0/jquery-3.1.0.min",
    "jquery-ui": "libs/jquery-ui-1.12.0/jquery-ui",
    "bootstrap" :"libs/bootstrap-3.3.7/bootstrap.min",
  },
  shim: {
          'jquery-ui': ['jquery'],
          'bootstrap': ['jquery-ui']
      },
  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

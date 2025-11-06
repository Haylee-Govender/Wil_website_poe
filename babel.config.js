module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "react-native-web",
        {
          "commonjs": true,
          "css": [
            "html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden; }"
          ]
        }
      ]
    ]
  };
};
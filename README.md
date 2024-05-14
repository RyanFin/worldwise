# worldwise

## Manually Configure ESLint

1. Run this command: `$ npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev`
   2.Create `eslintrc.json` file:

```
{
  "extends": "react-app"
}
```

3. Add `import eslint from "vite-plugin-eslint";` and `plugins: [react(), eslint()],` to `vite.config.js`

4. Retrieve a single object: http://localhost:9000/cities/73930385

# Map with leaflet

- installation: `$ npm install react react-dom leaflet` then `$ npm install react-leaflet`

# Date Picker

- installation: `$ npm i react-datepicker`

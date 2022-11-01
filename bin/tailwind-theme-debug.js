#!/usr/bin/env node

const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const resolveConfig = require('tailwindcss/resolveConfig');
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');
const path = require('path');
const config = require('../tailwind.config');

(() => {
  try {
    const { theme } = resolveConfig(config);
    const themeStr = JSON.stringify(theme);
    const js = `

/* 
-- DO NOT EDIT --
This is the generated file corresponding to current project tailwind.config.js  
Please re-run script in /bin folder to refresh it 
*/

      const theme  = ${themeStr}
      
      export default theme
      `;

    fs.writeFileSync(
      path.resolve(process.cwd(), './tailwind.debug.js'),
      prettier.format(js, { singleQuote: true, printWidth: 50, parser: 'babel' }),
      'utf-8'
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    process.exit(1);
  }
})();

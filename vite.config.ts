import { defineConfig } from 'vite';
import viteSvgLoader from 'vite-svg-loader';

const bundleFilename = 'design-system.es.js';
const cssFilename = 'style.css';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: './dist',
      },
    },
  },
  plugins: [
    viteSvgLoader({
      defaultImport: 'raw',
    }),
    {
      apply: 'build',
      enforce: 'post',
      name: 'pack-css',
      generateBundle(opts, bundle) {
        if (!bundle[bundleFilename]) return;
        const jsCode = bundle[bundleFilename]?.code;
        const cssCode = bundle[cssFilename]?.source;

        const IIFEcss = `
        (function() {
          try {
              var elementStyle = document.createElement('style');
              elementStyle.innerText = ${JSON.stringify(cssCode)}
              document.head.appendChild(elementStyle)
          } catch(error) {
            console.error(error, 'unable to concat style inside the bundled file')
          }
        })();`;

        const newJsCode = IIFEcss + jsCode;
        bundle[bundleFilename].code = newJsCode;

        // remove from final bundle
        delete bundle[cssFilename];
      },
    },
  ],
});

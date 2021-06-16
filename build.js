const esbuild = require('esbuild')
const fs = require('fs')
const [flag] = process.argv.slice(2)
const watch = flag === '--watch'

esbuild.build({
  entryPoints: ['src/plugin.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/plugin.js',
  watch,
})

esbuild
  .build({
    entryPoints: ['src/ui.tsx'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/ui.js',
    write: false,
    watch: watch && {
      onRebuild(error, result) {
        if (error) {
          console.error('watch build failed:', error)
        } else {
          writeHTMLFile(result)
        }
      },
    },
  })
  .then(writeHTMLFile)

function writeHTMLFile(result) {
  const [html, css] = result.outputFiles
  fs.writeFileSync(
    'dist/ui.html',
    [
      `<style>${css.text}</style>`,
      `<div id="app">`,
      `<script>${html.text}</script>`,
    ].join('\n')
  )
}

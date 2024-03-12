const { defineConfig } = require('tsup')
const execSync = require('child_process').execSync

module.exports = defineConfig({
  entry: ['src/index.ts', 'src/get.ts', 'src/set.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  target: 'node12.22',
  onSuccess() {
    const out = execSync('node scripts/generate-package.js')
    console.log(out.toString())

    const outSize = execSync('npm run size')
    console.log(outSize.toString())
  },
})

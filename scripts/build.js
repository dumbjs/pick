import { CONSTANTS, createContext } from 'esbuild-multicontext'
import { execSync } from 'node:child_process'

const context = createContext({
  format: 'esm',
  bundle: true,
  splitting: true,
  platform: 'neutral',
  outdir: 'dist',
  logLevel: 'info',
})

context.add('base', {
  entryPoints: ['./src/index.ts', './src/get.ts', './src/set.ts'],
})

const args = process.argv.slice(2)
const isDev = args.includes('--dev')

context.hook(CONSTANTS.BUILD_COMPLETE, () => {
  console.log('Build complete')
  if (!isDev) {
    execSync('tsc')
    process.exit(0)
  }
})

if (isDev) {
  await context.watch()
}

await context.build()

if (!isDev) {
  await context.dispose()
}

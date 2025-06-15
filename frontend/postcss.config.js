export default {
  plugins: [
    // Note: For ESM, use 'import' or dynamic import if needed,
    // but PostCSS config often allows require here as well.
    // To be fully ESM, you can do this:

    (await import('@tailwindcss/postcss')).default,
    (await import('autoprefixer')).default,
  ]
}

const mix = require('laravel-mix')

mix.disableNotifications()

mix.setPublicPath('dist')

mix.options({
    processCssUrls: false
})

mix.copy('src/templates', 'dist')
mix.copy('src/images', 'dist/images')
mix.copy('src/fonts', 'dist/fonts')

mix.js('src/scripts/app.js', 'dist/scripts')
    .sass('src/styles/app.scss', 'dist/styles')

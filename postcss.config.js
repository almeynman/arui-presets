const MQ = require('./mq.json');

module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-url')({
            url: 'rebase'
        }),
        require('postcss-mixins')(),
        require('postcss-for')(),
        require('postcss-each')(),
        require('postcss-custom-media')({
            extensions: MQ
        }),
        require('postcss-custom-properties')(),
        require('postcss-calc')(),
        require('postcss-nested')(),
        require('autoprefixer')({
            browsers: [
                'last 2 versions',
                'ie >= 9',
                'android >= 4',
                'ios >= 8'
            ]
        })
    ]
};

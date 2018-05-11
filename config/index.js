if (process.env.node_env === 'production') {
    module.exports = require('./config.propd.js')
} else {
    module.exports = require('./config.dev.js')
}
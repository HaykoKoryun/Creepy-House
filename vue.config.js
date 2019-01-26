const path = require('path');

module.exports = {
  pluginOptions: {
    'resolve-alias': {
      alias: {
        assets: path.resolve(__dirname, './assets')
      }
    }
  }
}

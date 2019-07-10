# gatsby-plugin-sftp-cache

[![npm](https://img.shields.io/npm/v/gatsby-plugin-sftp-cache.svg?label=npm@latest)](https://www.npmjs.com/package/gatsby-plugin-sftp-cache)
[![npm](https://img.shields.io/npm/v/gatsby-plugin-sftp-cache/canary.svg)](https://www.npmjs.com/package/gatsby-plugin-sftp-cache)
[![npm](https://img.shields.io/npm/dm/gatsby-plugin-sftp-cache.svg)](https://www.npmjs.com/package/gatsby-plugin-sftp-cache)

[![Maintainability](https://api.codeclimate.com/v1/badges/fc81fa5e535561c0a6ff/maintainability)](https://codeclimate.com/github/axe312ger/gatsby-plugin-sftp-cache/maintainability)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

Cache directories in your gatsby project to a remote server to preserve files and speed up deployments via [https://github.com/axe312ger/sftp-cache](sftp-cache)

Works well with https://github.com/axe312ger/gatsby-plugin-netlify-cache, make sure to enable the netlify-cache plugin before the sftp-cache plugin.

## Features

* Download from cache directory and refill it again
* Compare file by missing on other end, modification date, file size and md5 hash
* Keeps file modification date
* Client: Windows, Linux, OSX
* Server: Any host supporting sftp. MD5 hash comparision also needs `md5` or `md5sum` installed on the server.

## Installation

```sh
npm i gatsby-plugin-sftp-cache@canary
```

## Usage

Pass your server connection credentials, the remote cache directory and the directories you want to cache to the plugin options in your `gatsby-config.js`:

```js
const { join } = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sftp-cache`,
      options: {
        connection: {
          // All options: https://github.com/mscdex/ssh2#client-methods
          host: 'your.host.io',
          username: 'your-sft-user',
          password: process.env.SFTP_CACHE_PW
        },
        remoteDir: '/home/your-sftp-user/sftp-cache-storage/assets',
        dirsToCache: [
          // Relative to your gatsby root directory
          join('.cache'),
          join('public', 'assets'),
          join('node_modules', '.cache', 'gatsby-transformer-video')
        ]
      }
    }
  ]
}
```

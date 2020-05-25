const sftpCache = require('sftp-cache')

exports.onPreInit = async function (
  { store },
  { connection, remoteDir, dirsToCache, concurrency = 2 }
) {
  const program = store.getState().program
  const localDir = program.directory
  try {
    await sftpCache({
      connection,
      remoteDir,
      dirsToCache,
      localDir,
      concurrency,
      syncDirection: 'download'
    })
  } catch (err) {
    console.log(`Failed to download files from SFTP server.`)
    console.error(err)
  }
}

exports.onPostBuild = async function (
  { store },
  { connection, remoteDir, dirsToCache, concurrency = 2 }
) {
  const program = store.getState().program
  const localDir = program.directory
  try {
    await sftpCache({
      connection,
      remoteDir,
      dirsToCache,
      localDir,
      concurrency,
      syncDirection: 'cache'
    })
  } catch (err) {
    console.log(`Failed to cache files to SFTP server.`)
    console.error(err)
  }
}

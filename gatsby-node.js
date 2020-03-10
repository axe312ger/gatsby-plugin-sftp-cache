const sftpCache = require('sftp-cache')

exports.onPreInit = async function(
  { store },
  { connection, remoteDir, dirsToCache, concurrency = 2 }
) {
  const program = store.getState().program
  const localDir = program.directory
  await sftpCache({
    connection,
    remoteDir,
    dirsToCache,
    localDir,
    concurrency,
    syncDirection: 'download'
  })
}

exports.onPostBuild = async function(
  { store },
  { connection, remoteDir, dirsToCache, concurrency = 2 }
) {
  const program = store.getState().program
  const localDir = program.directory
  await sftpCache({
    connection,
    remoteDir,
    dirsToCache,
    localDir,
    concurrency,
    syncDirection: 'cache'
  })
}

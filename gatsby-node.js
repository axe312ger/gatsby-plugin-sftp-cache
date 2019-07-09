const sftpCache = require('sftp-cache')

exports.onPreInit = async function(
  { store },
  { connection, remoteDir, dirsToCache }
) {
  const program = store.getState().program
  const localDir = program.directory
  await sftpCache({
    connection,
    remoteDir,
    dirsToCache,
    localDir,
    syncDirection: 'download'
  })
}

exports.onPostBuild = async function(
  { store },
  { connection, remoteDir, dirsToCache }
) {
  const program = store.getState().program
  const localDir = program.directory
  await sftpCache({
    connection,
    remoteDir,
    dirsToCache,
    localDir,
    syncDirection: 'cache'
  })
}

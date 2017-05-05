var spawnSync = require('child_process').spawnSync
var version = require('./package.json').version
var action = process.argv.slice(2).pop()

if (!/\d+\.\d+\.\d+/.test(version)) {
    return console.log('\x1b[31m', 'package version非法')
}
switch (action) {

    case 'add:local':
        addLocalTag(version)
        break

    case 'add:remote':
        addRemoteTag(version)
        break
        
    case 'delete:local':
        deleteLocalTag(version)
        break

    case 'delete:remote':
        deleteRemoteTag(version)
        break

    default:
        addLocalTag(version)
        addRemoteTag(version)
}

function addLocalTag(tag) {
    let local = spawnSync('git', ['tag', tag])
    logInfo(local.stdout.toString())
    logErr(local.stderr.toString())
}

function addRemoteTag(tag) {
    let remote = spawnSync('git', ['push', 'origin', tag])
    logInfo(remote.stdout.toString())
    logErr(remote.stderr.toString())
}

function deleteLocalTag(tag) {
    let local = spawnSync('git', ['tag', '-d', tag])
    logInfo(local.stdout.toString())
    logErr(local.stderr.toString())
}

function deleteRemoteTag(tag) {
    let remote = spawnSync('git', ['push', 'origin', `:refs/tags/${tag}`])
    logInfo(remote.stdout.toString())
    logErr(remote.stderr.toString())
}

// http://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
function logInfo(msg) {
    console.log('\x1b[34m', msg)
}

function logErr(msg) {
    console.log('\x1b[1m', msg)
}
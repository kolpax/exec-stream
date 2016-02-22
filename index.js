'use strict';

var util = require('util');
var stream = require('stream');
var child_process = require('child_process');

function ExecStream(command, args) {
  var execStream = this;
  stream.Duplex.call(execStream);
  var proc = child_process.spawn(command, args);
  proc.stderr.setEncoding('utf-8').on('data', function onStderrData(data) {
    console.log(data);
  }).on('error', function onStdErrError(err) {
    execStream.emit('error', err);
  });

  proc.on('exit', function onChildProcessExit(code) {
    execStream.emit('close');
  }).on('error', function onChildProcessError(err) {
    execStream.emit('error', err);
  });

  proc.stdout.on('end', function onStdoutEnd() {
    execStream.emit('end');
  }).on('data', function onStdoutData(data) {
    execStream.push(data);
  }).on('error', function onStdoutError(err) {
    execStream.emit('error', err);
  });

  proc.stdin.on('error', function onStdinError(err) {
    execStream.emit('error', err);
  });
  this.proc = proc;
}
util.inherits(ExecStream, stream.Duplex);

ExecStream.prototype._read = function onRead(size) {
  return this.proc.stdout.read(size);
};

ExecStream.prototype._write = function onWrite(chunk, encoding, callback) {
  return this.proc.stdin.write(chunk, encoding, callback);
};

ExecStream.prototype.end = function onEnd() {
  return this.proc.stdin.end();
};

module.exports = function createExecStream(command, args) {
  return new ExecStream(command, args);
};

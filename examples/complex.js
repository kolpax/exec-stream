import execStream from '../index'

execStream('ls', ['-lah'])
  .pipe(execStream('tail', ['-n+2']))
  .pipe(execStream('awk', [`{print $1}`]))
  .pipe(execStream('grep', ['x']))
  .pipe(execStream('wc', ['-l']))
  .pipe(execStream('xz', ['-9', '-T', '0', '-z']))
  .pipe(execStream('xz', ['-d']))
  .pipe(process.stdout)

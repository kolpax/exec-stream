# ExecStream

Spawn a child process and expose stdin and stdout as a single duplex stream.

## Usage

This example prints out all `*.txt` files in current directory to stdout.

```js
import execStream from '@kolpax/exec-stream'

// Reading
execStream('ls', ['-lah'])
  // Writing and reading
  .pipe(execStream('grep', ['.txt']))
  // Writing
  .pipe(process.stdout)
```

## License

See `LICENSE.md`.

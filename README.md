# ExecStream

Spawn a child process and expose stdin and stdout as a single duplex stream.

## Usage

```js
execStream(command, arrayOfArguments)
execStream('ls', ['-l', '-a', '-h'])
```

## Example

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

The MIT License (MIT)

Copyright (c) 2016 Martin Daniel Kolpak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

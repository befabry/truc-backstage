import { spawn } from 'child_process';
import { join } from 'path';
import { type Request, type Response } from 'express';

const HTTP_OK = 200;
const HTTP_INTERNAL_ERROR = 500;
const CODE_OK = 0;

export function handleScript(_request: Request, response: Response) {
  try {
    console.log('calling script');

    const scriptPath = join(process.cwd(), 'src', 'script.sh');
    const child = spawn('bash', [scriptPath]);

    response.writeHead(HTTP_OK, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no', // Disable buffering for nginx proxies
    });

    child.stdout.on('data', (data: Buffer) => {
      console.log(data.toString());
      response.write(data.toString());
    });

    child.stderr.on('data', (data: Buffer) => {
      console.log(data.toString());
      response.write(data.toString());
    });

    child.on('close', (code) => {
      console.log(code, 'close file');
      if (code === CODE_OK) {
        response.write(`The script finished with an OK code (${code})`);
      } else {
        response.status(HTTP_INTERNAL_ERROR).write(`The script finished with an error code (${code})`);
      }
      response.end();
    });
  } catch (error: unknown) {
    console.log(error);
    response.status(HTTP_INTERNAL_ERROR).send(error);
  }
}

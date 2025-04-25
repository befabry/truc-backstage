import app from './app.js';

const DEFAULT_PORT = 3000;
const EXPRESS_PORT = Number(process.env['EXPRESS_PORT']) || DEFAULT_PORT;

app.listen({ port: EXPRESS_PORT });

console.log(`🚀  Express server running on port http://localhost:${EXPRESS_PORT}`);
console.log(`Route index: /`);

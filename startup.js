import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Server } from 'node-static';

const currentFileName = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFileName);

const PORT = 8080;

const staticFileServer = new Server(currentDirectory);

createServer(function (request, response) {
    staticFileServer.serve(request, response);
}).listen(PORT);

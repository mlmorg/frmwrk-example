import {createServer} from 'http';
import parseUrl from 'parseurl';
import send from 'send';
import codes from 'statuses/codes.json';

export default class Server {
  constructor() {
    this.logger = console;
    this.server = createServer(this.handleRequest.bind(this));

    this.server.on('error', (err) => this.onError(err));
    this.server.on('listening', () => this.onListen());
  }

  handleRequest(req, res) {
    req.urlParts = req.url.split('/');

    // Static Assets
    if (req.urlParts[1] === '_assets') {
      return this.handleAsset(req, res);
    }

    // API
    if (req.urlParts[1] === '_api') {
      return this.handleApi(req, res);
    }

    // Application
    this.handleApp(req, res);
  }

  handleAsset(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const methodError = new Error('Method not allowed for assets');
      methodError.statusCode = 405;
      return this.handleError(methodError, req, res);
    }

    const pathname = parseUrl(req).pathname;
    const stream = send(req, pathname);

    stream.on('error', (err) => this.handleError(err, req, res));
    stream.pipe(res);
  }

  handleApi(req, res) {
    const NotFound = new Error('API Not Implemented Yet');
    NotFound.statusCode = 404;
    this.handleError(NotFound);
  }

  handleApp(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  }

  handleError(err, req, res) {
    const statusCode = err.statusCode || 500;
    const errorMessage = codes[statusCode];
    this.logger.log(err);
    res.writeHead(statusCode, {'Content-Type': 'text/plain'});
    res.end(errorMessage);
  }

  listen() {
    this.server.listen(3000);
  }

  onError(err) {
    console.log(err.statusCode);
    throw err;
  }

  onListen() {
    this.logger.log(`listening at http://localhost:3000`);
  }
}

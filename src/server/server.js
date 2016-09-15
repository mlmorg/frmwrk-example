import {createServer} from 'http';
import parseUrl from 'parseurl';
import send from 'send';
import codes from 'statuses/codes.json';

export default class Server {
  constructor() {
    this.logger = console;
    this.server = createServer(this.handleRequest.bind(this));

    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListen.bind(this));
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
      return this.handleStatusCode(methodError, req, res);
    }
  }

  handleApi(req, res) {

  }

  handleApp(req, res) {

  }

  handleError(err, req, res) {
    const statusCode = err.statusCode || 500;

  }

  handleStatusCode(statusCode, req, res) {
    const statusError = new Error(codes[statusCode]);
    statusError.statusCode = statusCode;
    this.handleError(statusError, req, res);
  }

  listen() {
    this.server.listen(3000);
  }

  onError(err) {
    throw err;
  }

  onListen() {
    this.logger.log(`listening at http://localhost:3000`);
  }
}

import * as debug from 'debug';

export const debugInit = debug('erxes-insights:init');
export const debugDb = debug('erxes-insights:db');
export const debugBase = debug('erxes-insights:base');

export const debugRequest = (debugInstance, req) =>
  debugInstance(`
        Receiving ${req.path} request from ${req.headers.origin}
        body: ${JSON.stringify(req.body || {})}
        queryParams: ${JSON.stringify(req.query)}
    `);

export const debugResponse = (debugInstance, req, data = 'success') =>
  debugInstance(`Responding ${req.path} request to ${req.headers.origin} with ${data}`);

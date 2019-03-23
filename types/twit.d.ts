export = twitter;
declare class twitter {
  constructor(config: any);
  config: any;
  get(path: any, params: any, callback: any): any;
  getAuth(): any;
  normalizeParams(params: any): any;
  post(path: any, params: any, callback: any): any;
  postMediaChunked(params: any, cb: any): void;
  request(method: any, path: any, params: any, callback: any): any;
  setAuth(auth: any): void;
  stream(path: any, params?: any): any;
}

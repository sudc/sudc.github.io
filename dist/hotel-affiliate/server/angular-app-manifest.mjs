
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6480, hash: '0e2dd111d553b3457c474a06a9a79fdc6cee4e8c0de1ac7a073b4de57ebb766e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6581, hash: 'b099a17d56bee62356a232e4993dcf3842fe1305980b749fb3d5ef536d730042', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8655, hash: '54fd7035de3d159edc3db53f4822212be25c38410ab2c9937056450d85547db2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IHIQQMQY.css': {size: 440, hash: 'ktoOf0lqMag', text: () => import('./assets-chunks/styles-IHIQQMQY_css.mjs').then(m => m.default)}
  },
};

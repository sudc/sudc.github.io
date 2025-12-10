
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
    'index.csr.html': {size: 841, hash: 'ae0a84008f284da60dddb485fbb26181cad58bd724d6ddccc624d3cf52b43b81', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 952, hash: '814ed76ab5b0ec2dd1f4875c30586a89e6d1b94b7e26d70359b68ec095c20994', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8110, hash: '10cd44a4286035b0346ed55bcfd8eae7cd61a70075f5796df7dbc2624c6d5501', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZT36SWQW.css': {size: 2868, hash: 'pc5HZjyL6tQ', text: () => import('./assets-chunks/styles-ZT36SWQW_css.mjs').then(m => m.default)}
  },
};

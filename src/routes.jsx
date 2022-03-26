import { lazy } from 'react';


// lazy load check
const retry = (fn, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  })
}
  

const routes = [
  {
    path: '',
    component: lazy(() => retry(() => import('./pages/connect.wallet') )),
    exact: true
  },
  {
    path: 'admin',
    component: lazy(() => retry(() => import('./pages/landing') )),
    exact: true
  },
  {
    path: 'admin/create',
    component: lazy(() => retry(() => import('./pages/create_item') )),
    exact: true
  },
  {
    path: 'admin/detail',
    component: lazy(() => import('./pages/item_detail')),
    exact: true
  },
];

export default routes;
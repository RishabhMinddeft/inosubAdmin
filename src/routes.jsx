
import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


// lazy load check
function retry(fn, retriesLeft = 5, interval = 1000) {
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
  });
}


const Connect = lazy(() => retry(() => import('./pages/connect.wallet')));
const Landing = lazy(() => retry(() => import('./pages/landing')));
const Profile = lazy(() => retry(() => import('./pages/profile')));
const Create = lazy(() => retry(() => import('./pages/create.item')));
const Detail = lazy(() => retry(() => import('./pages/item.detail')));
const NotFound = lazy(() => retry(() => import('./pages/not.found')));


const routes = (isLoggedIn) => [
  {
    path: '',
    element: isLoggedIn ? <Navigate to='/admin' /> : <Connect />,
  },
  {
    path: 'admin',
    element: isLoggedIn ? <Outlet /> : <Navigate to='/' />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'create', element: <Create /> },
      { path: 'detail', element: <Detail />},
      { path: 'profile', element: <Profile /> },
      // { path: 'update', element: <EditProfile /> },
    ]
  },
  { path: '404', element: <NotFound /> },
];

export default routes;

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';


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
const UpdateProfile = lazy(() => retry(() => import('./pages/profile/update.profile')));
const Create = lazy(() => retry(() => import('./pages/create.item')));
const Mint = lazy(() => retry(() => import('./pages/mint.item')));
const NotFound = lazy(() => retry(() => import('./pages/not.found')));
const Register = lazy(() => retry(() => import('./pages/register')));


const routes = (isLoggedIn) => [
  {
    path: '',
    breadcrumb: isLoggedIn ? 'Home': 'Connect Wallet',
    element: isLoggedIn ? <Navigate to='/admin' /> : <Connect />,
    privateRoute: false,
  },
  {
    path: 'register',
    breadcrumb: 'Register',
    element: isLoggedIn ? <Navigate to='/admin' /> : <Register />,
    privateRoute: false,
  },
  {
    path: 'admin',
    breadcrumb: 'Admin',
    element: isLoggedIn ? <Landing /> : <Navigate to='/' />,
    privateRoute: true,
  },
  {
    path: 'create',
    breadcrumb: 'Create NFT',
    element: isLoggedIn ? <Create /> : <Navigate to='/' />,
    privateRoute: true,
  },
  {
    path: 'profile',
    breadcrumb: 'My Profile',
    element: isLoggedIn ? <Profile /> : <Navigate to='/' />,
    privateRoute: true,
  },
  {
    path: 'update',
    breadcrumb: 'Profile Update',
    element: isLoggedIn ? <UpdateProfile /> : <Navigate to='/' />,
    privateRoute: true,
  },
  {
    path: 'mint',
    breadcrumb: 'Mint NFT',
    element: isLoggedIn ? <Mint /> : <Navigate to='/' />,
    privateRoute: true,
  },
  // {
  //   path: 'admin',
  //   element: isLoggedIn ? <Outlet /> : <Navigate to='/' />,
  //   children: [
  //     { path: '', element: <Landing /> },
  //     { path: 'create', element: <Create /> },
  //     { path: 'detail', element: <Detail />},
  //     { path: 'profile', element: <Profile />, name: 'My Profile' },
  //     // { path: 'update', element: <EditProfile /> },
  //   ]
  // },
  { path: '*', breadcrumb: 'Page Not Found' ,element: <NotFound />, privateRoute: false, },
];

export default routes;
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css';
// import Home from "./pages/homepage";
import withClearCache from './ClearCache';
import Header from './components/header';
import Footer from './components/footer';
import BreadCrumb from './components/breadcrumb';
import { BrowserRouter as Router,  Route, Routes} from "react-router-dom";
import Gs from './theme/globalStyles';

const ClearCacheComponent = withClearCache(MainApp);
const ConnectWallet = lazy(() => import('./pages/connect_wallet'));
const Home = lazy(() => retry(() => import('./pages/homepage')));
const CreateItem = lazy(() => retry(() => import('./pages/create_item')));
const ItemDetail = lazy(() => retry(() => import('./pages/item_detail')));

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
function App() {
  return <ClearCacheComponent />;
}

function MainApp() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img className='loader-img' src={""} alt='' />
        </div>
      }
    >
    <Router>
      <section className='MainBox clearfix'>
          <Gs.GlobalStyle />
          <Header />
          <BreadCrumb />
          <Routes>
            <Route path='/connect' element={<ConnectWallet/>} />
            <Route path='/create' element={<CreateItem/>} />

            <Route path='/detail' element={<ItemDetail/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
          <Footer />
        </section>
        <ToastContainer autoClose={8000}
          theme={'colored'}
          position='bottom-right'
          pauseOnHover />
    </Router>
    </Suspense>
  );
}

export default App;

import { lazy, Suspense } from 'react';
import './App.css';
// import Home from "./pages/homepage";
import withClearCache from './ClearCache';
// import HexagonLoader from './assets/loader.gif';
import { BrowserRouter as Router,  Route, Routes} from "react-router-dom";

const ClearCacheComponent = withClearCache(MainApp);
const Home = lazy(() => retry(() => import('./pages/homepage')));

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
    ><Router>
    <Routes >
    <Route path='/' element={<Home/>} />
      </Routes>
      </Router>
    </Suspense>
  );
}

export default App;

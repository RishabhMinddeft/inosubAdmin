import { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import './App.css';
import 'react-toastify/dist/ReactToastify.css'

import { actions } from './actions';
import routes from './routes';
import Gs from './theme/globalStyles';
import withClearCache from './ClearCache';
import Header from './components/header';
import Footer from './components/footer';
import BreadCrumb from './components/breadcrumb';


const Routes = () => {
  const isLoggedIn = localStorage.getItem('liquidToken') ? true : false ;
  const routing = useRoutes(routes(isLoggedIn));
  return routing
};


function App(props) {

  const { getWeb3, authenticated } = props

  useEffect(() => {
    getWeb3()
    // eslint-disable-next-line
  }, [])

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
        <BrowserRouter>
          <section className='MainBox clearfix'>
            <Gs.GlobalStyle />
              <Header />
              <BreadCrumb />
                <Routes />
              <Footer />
          </section>
          <ToastContainer autoClose={8000}
            theme={'colored'}
            position='bottom-right'
            pauseOnHover />
        </BrowserRouter>
      </Suspense>
    )
}

const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(actions.getWeb3()),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(withClearCache(App))
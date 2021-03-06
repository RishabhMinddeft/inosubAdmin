import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { connect } from 'react-redux';
import Media from '../theme/media-breackpoint';

import { actions } from '../actions';
import Gs from '../theme/globalStyles';
import routes from '../routes';
import { capitalizeFirstLetter } from '../helper/functions';

import BcrumbFrame from '../assets/images/breadcrumb-frame.png';


const Breadcrumbs = (props) => {

  const { getWeb3, authenticated, user } = props

  useEffect(() => {
    if (!authenticated.accounts[0] && Number(localStorage.getItem('isDisconnect')) === 0)
      getWeb3()

    // eslint-disable-next-line
  }, [authenticated])

  const isLoggedIn = localStorage.getItem('liquidToken') ? true : false;
  const role = localStorage.getItem("inoRole");
  const breadcrumbs = useBreadcrumbs(routes(isLoggedIn, role));

  let lastIndex = breadcrumbs[breadcrumbs.length - 1]
  let title = lastIndex.breadcrumb.props.children


  return (
    <BCrumbMain>
      <Gs.Container>
        <BTitle>{title}</BTitle>
        <Blinklist>

          {breadcrumbs.map(({
            match,
            breadcrumb
          }) => (
            <span key={match.pathname}>
              <NavLink to={match.pathname}>
                {breadcrumb.key === '/' ? (user ? capitalizeFirstLetter(user.role) : 'Admin') : breadcrumb}</NavLink>
            </span>
          ))}

        </Blinklist>
      </Gs.Container>
    </BCrumbMain >
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const BCrumbMain = styled.div`
  background: url(${BcrumbFrame}) no-repeat; padding:24px 0px; background-size: 100% 100%; position:relative; left:0; right:0; top:102px; margin-bottom:132px;
  ${Media.md} {
   background:none; border:1px solid #7BF5FB; top:88px;
  }
`;

const BTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 24px; color: #FFFFFF; margin:0px 0px 10px;
`;

const Blinklist = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-style: normal; font-weight: 500; font-size: 15px; line-height: 18px; color: rgba(255, 255, 255, 0.7); margin-right:15px; position:relative; z-index:0;
    :after{content:'/'; position:absolute; right:-10px; top:1px; }
    :hover{ color: rgba(255, 255, 255, 1);
      :after{color: rgba(255, 255, 255, 0.7);}
    }
    &.active{pointer-events:none; color: rgba(255, 255, 255, 1);
      :after{display:none;}
    }
  }
`;


const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(actions.getWeb3()),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    user: state.fetchUser,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Breadcrumbs)
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import Media from '../theme/media-breackpoint';
import Collapse from '@kunukn/react-collapse';

import utility from '../utility';
import { actions } from '../actions';
import DropDown from '../components/drop.down';
import LogoImg from '../assets/images/logo.png';
import SearchImg from '../assets/images/search.png';
import { _explore, _activity, _community, _account } from '../constant/header.const';
import BarIcon from '../assets/images/bar-icon.png';
import CloseIcon from '../assets/images/close-icon.png';

function Header(props) {

  const { authenticated } = props;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear()
    props.clearNonce()
    props.web3Logout()
    navigate('/')
  }

  useEffect(() => {
    if (authenticated.isLoggedIn)
      props.getUser()
    // eslint-disable-next-line
  }, [authenticated])

  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpenMobileMenu(false);
  };

  return (
    <HeaderMain>
      <Gs.Container>
        <HeaderInner>
          <HeaderLeft>
            <img onClick={() => navigate('/')} src={LogoImg} alt="" className='logo' />
            <SearchBar className='desktop-div'>
              <img src={SearchImg} alt="" />
              <input type="text" placeholder='Search' />
            </SearchBar>
          </HeaderLeft>
          <HeaderRight>
            <MMenu>
              <Bars className={isOpenMobileMenu ? 'menu-active' : null} onClick={() => setIsOpenMobileMenu(state => !state)} />
              <Collapse onInit={onInit} isOpen={isOpenMobileMenu}>
                <div className='m-menu-outer'>
                  <SearchBar className='mobile-div'>
                    <img src={SearchImg} alt="" />
                    <input type="text" placeholder='Search' />
                  </SearchBar>
                  {authenticated.isLoggedIn &&
                    <div className='menu-outer'>
                      <NavLink to='/create' >Create</NavLink>
                    </div>
                  }

                  <DropDown childs={_explore.childs} name={_explore.name} href={_explore.href} />
                  <DropDown childs={_activity.childs} name={_activity.name} href={_activity.href} />
                  <DropDown childs={_community.childs} name={_community.name} href={_community.href} />
                  {authenticated.isLoggedIn &&
                    <DropDown childs={_account.childs} name={_account.name} href={_account.href} logout={logout} />
                  }

                  {authenticated.isLoggedIn && <CWBtn className='mobile-div'>{utility.getCompactAddress(authenticated.accounts[0])}</CWBtn>}
                  {!authenticated.isLoggedIn && <CWBtn onClick={() => navigate('/register')} className='mobile-div'>{'Register'}</CWBtn>}
                </div>
              </Collapse>
            </MMenu>
            <DMenu>
              {authenticated.isLoggedIn &&
                <div className='menu-outer'>
                  <NavLink to='/create' >Create</NavLink>
                </div>
              }

              <DropDown childs={_explore.childs} name={_explore.name} href={_explore.href} />
              <DropDown childs={_activity.childs} name={_activity.name} href={_activity.href} />
              <DropDown childs={_community.childs} name={_community.name} href={_community.href} />
              {authenticated.isLoggedIn &&
                <DropDown childs={_account.childs} name={_account.name} href={_account.href} logout={logout} />
              }

            </DMenu>

            {authenticated.isLoggedIn && <CWBtn className='desktop-div'>{utility.getCompactAddress(authenticated.accounts[0])}</CWBtn>}
            {!authenticated.isLoggedIn && <CWBtn onClick={() => navigate('/register')} className='desktop-div'>{'Register'}</CWBtn>}
          </HeaderRight>
        </HeaderInner>
      </Gs.Container>
    </HeaderMain >
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const HeaderMain = styled(FlexDiv)`
  background: rgba(83, 65, 198, 0.5); backdrop-filter: blur(60px); min-height:100px; position:relative; z-index:99;
  ${Media.sm} {
    min-height:80px;
  }
`;

const HeaderInner = styled(FlexDiv)`
  justify-content:space-between; 
`;

const HeaderLeft = styled(FlexDiv)`
  justify-content:flex-start;
  .logo{margin-right:42px;}
`;

const SearchBar = styled(FlexDiv)`
  justify-content:flex-start;
  img{opacity:0.6; margin-right:10px; cursor:pointer;}
  input{font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 16px; line-height: 22px; background-color:transparent; border:none; color:#fff;
    :focus{outline:none;}
    ::placeholder{opacity: 0.5; color:#fff;}
    ${Media.lg} {
      font-size:14px; 
    }
  }
  &.desktop-div{
    ${Media.sm} {
      display:none;
    } 
  }
  &.mobile-div{ display:none;
    ${Media.sm} {
      display: flex;
      margin-bottom: 10px;
    } 
  }
`;

const HeaderRight = styled(FlexDiv)``;

const DMenu = styled(FlexDiv)`
  .menu-outer{position:relative;
    a{font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color:#fff; margin:0px 20px; display:flex; align-items:center; 
      &.active, :hover{color:#6BFCFC;}
      svg{margin-left:5px; font-size:20px;
        ${Media.lg} {
          font-size:15px;
        }
      }
      ${Media.xl} {
        margin:0px 10px;
      }
      ${Media.lg} {
        font-size:15px; margin:0px 7px;
      }
    }
  }
  ${Media.md3} {
    display:none;
  }
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 33px; border:none; margin-left:15px; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
  ${Media.lg} {
    font-size:14px; padding:15px; margin-left:0px;
  }
  ${Media.md} {
    margin-top:10px;
  } 
  &.desktop-div{
    ${Media.md3} {
      display:none;
    } 
  }
  &.mobile-div{ display:none;
    ${Media.md3} {
      display:block;
    } 
  }
`;

const Bars = styled.div`
  background: url(${BarIcon}) no-repeat; width: 26px; height: 18px;
  &.menu-active {
    width: 26px; height: 18px; background: url(${CloseIcon}) no-repeat;
  }
`;

const MMenu = styled.div`
  display:none;
  ${Media.md3} {
    display:block;
  }
  .collapse-css-transition{position:absolute; top:101px; left:0px; right:0px; z-index:9999; transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color:#13141e;
    ${Media.sm} {
      top:81px;
    }
    .m-menu-outer{
      background: linear-gradient(0deg,rgba(123,245,251,0.1) 36.89%,rgba(18,19,28,0) 100%); padding:20px; box-shadow:0px 5px 5px 1px #000;
      .menu-outer{position:relative;
        a{font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color:#fff; padding:10px 0px; margin:0px 20px; display:flex; align-items:center; 
          &.active, :hover{color:#6BFCFC;}
          svg{margin-left:5px; font-size:20px;
            ${Media.lg} {
              font-size:15px;
            }
          }
          ${Media.xl} {
            margin:0px 10px;
          }
          ${Media.lg} {
            font-size:15px; margin:0px 7px;
          }
          ${Media.md3} {
            margin:0px;
          }
        }
      }
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actions.getUser()),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
    clearNonce: () => dispatch({ type: 'GENERATE_NONCE', data: null }),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Header)
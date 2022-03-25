import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import { FiChevronDown } from 'react-icons/fi';
import Collapse from "@kunukn/react-collapse";

import LogoImg from '../assets/images/logo.png';
import SearchImg from '../assets/images/search.png';
import utility from '../utility';


function Header(props) {

  const { authenticated } = props;
  const navigate = useNavigate();

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isActive, setActive] = useState(false);

  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  const toggleClass = () => {
    setActive(!isActive);
  };

  const logout = () => {
    props.web3Logout()
  }

  useEffect(() => {
    if (!authenticated.isLoggedIn) navigate('/')
  }, [authenticated.isLoggedIn])

  useEffect(() => {
    if (!authenticated.isLoggedIn) navigate('/')
  }, [])

  return (
    <HeaderMain>
      <Gs.Container>
        <HeaderInner>
          <HeaderLeft>
            <img src={LogoImg} alt="" className='logo' />
            <SearchBar>
              <img src={SearchImg} alt="" />
              <input type="text" placeholder='Search' />
            </SearchBar>
          </HeaderLeft>
          <HeaderRight>
            <DMenu>
              {authenticated.isLoggedIn &&
                <Link to='/super/create' className={isActive ? 'active' : null} onClick={toggleClass} >Create</Link>
              }
              <div className='menu-outer'>
                <Link to='#' onClick={() => setIsOpen1(state => !state)}>Explore <FiChevronDown /></Link>
                <SubMenuLinks>
                  <Collapse onInit={onInit} isOpen={isOpen1}>
                    <SubMenuOuter>
                      <Link to='#'>Explore 1</Link>
                      <Link to='#'>Explore 2</Link>
                      <Link to='#'>Explore 3</Link>
                      <Link to='#'>Explore 4</Link>
                      <Link to='#'>Explore 5</Link>
                    </SubMenuOuter>
                  </Collapse>
                </SubMenuLinks>
              </div>
              <div className='menu-outer'>
                <Link to='#' onClick={() => setIsOpen2(state => !state)}>Activity <FiChevronDown /></Link>
                <SubMenuLinks>
                  <Collapse onInit={onInit} isOpen={isOpen2}>
                    <SubMenuOuter>
                      <Link to='#'>Activity 1</Link>
                      <Link to='#'>Activity 2</Link>
                      <Link to='#'>Activity 3</Link>
                    </SubMenuOuter>
                  </Collapse>
                </SubMenuLinks>
              </div>
              <div className='menu-outer'>
                <Link to='#' onClick={() => setIsOpen3(state => !state)}>Community <FiChevronDown /></Link>
                <SubMenuLinks>
                  <Collapse onInit={onInit} isOpen={isOpen3}>
                    <SubMenuOuter>
                      <Link to='#'>Community 1</Link>
                      <Link to='#'>Community 2</Link>
                      <Link to='#'>Community 3</Link>
                    </SubMenuOuter>
                  </Collapse>
                </SubMenuLinks>
              </div>
              {authenticated.isLoggedIn &&
                <Link to='#' onClick={() => setIsOpen4(state => !state)}>Profile <FiChevronDown />
                  <SubMenuLinks>
                    <Collapse onInit={onInit} isOpen={isOpen4}>
                      <SubMenuOuter>
                        <Link to='#' onClick={logout}>Log Out</Link>
                      </SubMenuOuter>
                    </Collapse>
                  </SubMenuLinks>
                </Link>}
            </DMenu>
            {authenticated.isLoggedIn && <CWBtn>{utility.getCompactAddress(authenticated.accounts[0])}</CWBtn>}
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
  background: rgba(83, 65, 198, 0.5); backdrop-filter: blur(60px); min-height:100px;
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
  }
`;

const HeaderRight = styled(FlexDiv)``;

const DMenu = styled(FlexDiv)`
  .menu-outer{position:relative;
    a{font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color:#fff; margin:0px 20px; display:flex; align-items:center; 
      &.active, :hover{color:#6BFCFC;}
      svg{margin-left:5px; font-size:20px;}
    }
  }
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 33px; border:none; margin-left:15px; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

const SubMenuLinks = styled.div`
  .collapse-css-transition{position:absolute; top:35px; left:20px; right:auto; transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); min-width:187px; background-color:#1e1f2d;}
`;

const SubMenuOuter = styled.div`
  background: linear-gradient(0deg, rgba(123, 245, 251, 0.1) 36.89%, rgba(18, 19, 28, 0) 100%); border:1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 2px;
  a{padding:12px 16px; font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF; margin:0px !important; border-bottom:1px solid #7BF5FB;
    :last-child{border-bottom:0px;}
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Header)
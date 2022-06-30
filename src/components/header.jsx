import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import Media from '../theme/media-breackpoint';
import Collapse from '@kunukn/react-collapse';
import { useAccess } from "react-access-control";
import { Modal } from 'react-responsive-modal';
import { FaTwitter, FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import utility from '../utility';
import { actions } from '../actions';
import { useWeb3Auth } from '../hooks';
import { SUPERADMIN } from '../config';
import {
  super_admin_permissions,
  sub_admin_permissions
} from '../config/permissions';
import DropDown from '../components/drop.down';
import { FiUser } from 'react-icons/fi';
import LogoImg from '../assets/images/logo.png';
import SearchImg from '../assets/images/search.png';
import { _explore, _activity, _community, _account } from '../constant/header.const';
import BarIcon from '../assets/images/bar-icon.png';
import CloseIcon from '../assets/images/close-icon.png';
import ProfileFrame from '../assets/images/profile-frame.png';
import ProfileFrame2 from '../assets/images/profile-frame-hover.png';
import BTNBG1 from '../assets/images/btn-bg.png';
import BTNBGHover from '../assets/images/h-btn-bg.png';
import HeaderScrollBGImage from '../assets/images/heade.jpg';
import { getContractInstance } from '../helper/web3Functions';
import IconTwitter from '../assets/images/twitter33.png';
import IconMedium from '../assets/images/medium.svg';
import Icontelegram from '../assets/images/telegram33.png';
import NavHABg from '../assets/images/nav-before.png';
import GlobeIcon from '../assets/images/eng.png';

const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)

function Header(props) {
  const { authenticated, user } = props;
  const navigate = useNavigate();
  const { disconnect } = useWeb3Auth({
    logout: () => logout()
  })

  const { define, hasPermission } = useAccess()
  const createProject = hasPermission("create_project")
  const showCreatedProject = hasPermission("view_created_projects")
  const logout = () => {
    localStorage.clear()
    props.clearUserDetails()
    props.clearNonce()
    props.web3Logout()
    navigate('/')
  }
  // useEffect(()=>{
  //   const checkIsSuperAdmin = async()=>{
  //     const nftContractInstance = getContractInstance('nft');
  //     const sAddress = await nftContractInstance.methods.owner().call();
  //     console.log("saddress", sAddress)
  //   }
  //   checkIsSuperAdmin();
  // },[])
  const _isLoggeddIn = authenticated.isLoggedIn
  useEffect(() => {
    if (authenticated.isLoggedIn) {
      props.getUser()
    }
    // eslint-disable-next-line
  }, [_isLoggeddIn])

  useEffect(() => {
    if (user) define({
      permissions: user.role === SUPERADMIN
        ? super_admin_permissions : sub_admin_permissions
    })
    // eslint-disable-next-line
  }, [user])

  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenLangBox, setIsOpenLangBox] = useState(false);

  const onInit = ({ state, style, node }) => {
    setIsOpenMobileMenu(false);
    setIsOpenLangBox(false);
  };

  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0)
    })
  }, [])
  console.log("scroll", scroll)


  return (
    <HeaderMain className={scroll ? "scrolled" : ""}>
      <Gs.Container className='nav-container'>
        <HeaderInner>
          <HeaderLeft>
            <img onClick={() => navigate('/')} src={LogoImg} alt="" className='logo' />
            {/* <SearchBar className='desktop-div'>
              <img src={SearchImg} alt="" />
              <input type="text" placeholder='Search' />
            </SearchBar> */}
            <DMenu>
              {/* {authenticated.isLoggedIn && <>
                <div className='menu-outer'>
                  {user?.status !== 'pending' && <NavLink to='/create' >Create</NavLink>}
                </div>
                {showCreatedProject && <div className='menu-outer'><NavLink to='/list-project' >Projects</NavLink></div>}
              </>
              } */}
              {/* {authenticated.isLoggedIn &&
                <div className='menu-outer'>
                  {user?.status !== 'pending' && <NavLink to='' >Activity</NavLink>}
                </div>
              } */}
              <div className='menu-outer'>
                <NavLink to='/' >Home</NavLink>
              </div>
              <div className='menu-outer'>
                <NavLink to='https://launchpad.seedify.fund/' >IGO Launchpad</NavLink>
              </div>
              <div className='menu-outer'>
                <NavLink to='https://staking.seedify.fund/' >Staking/Farming</NavLink>
              </div>
              <div className='menu-outer'>
                <NavLink to='https://claim.seedify.fund/' >Claims</NavLink>
              </div>
              {authenticated.isLoggedIn &&
                <DropDown childs={_activity.childs} name={_activity.name} href={_activity.href} subAdmin={createProject} />
              }
              {/* <DropDown childs={_explore.childs} name={_explore.name} href={_explore.href} />
              <DropDown childs={_community.childs} name={_community.name} href={_community.href} /> */}
              {authenticated.isLoggedIn &&
                <DropDown childs={_account.childs} name={_account.name} href={_account.href} logout={logout} />}

            </DMenu>
          </HeaderLeft>
          <HeaderRight>
            <MMenu>
              <Bars className={isOpenMobileMenu ? 'menu-active' : null} onClick={() => setIsOpenMobileMenu(state => !state)} />
              <Collapse onInit={onInit} isOpen={isOpenMobileMenu} >
                <div className='m-menu-outer'>
                  {/* <SearchBar className='mobile-div'>
                    <img src={SearchImg} alt="" />
                    <input type="text" placeholder='Search' />
                  </SearchBar> */}

                  {/* {authenticated.isLoggedIn && <>
                    <div className='menu-outer'>
                      {user?.status !== 'pending' && <NavLink to='/create' >Create</NavLink>}
                    </div>
                    {showCreatedProject && <div className='menu-outer'><NavLink to='/list-project' >Projects</NavLink></div>}
                  </>
                  } */}
                  <div className='menu-outer'>
                    <NavLink to='https://seedify.fund/' >Home</NavLink>
                  </div>
                  <div className='menu-outer'>
                    <NavLink to='https://launchpad.seedify.fund/' >IGO Launchpad</NavLink>
                  </div>
                  <div className='menu-outer'>
                    <NavLink to='https://staking.seedify.fund/' >Staking/Farming</NavLink>
                  </div>
                  <div className='menu-outer'>
                    <NavLink to='https://claim.seedify.fund/' >Claims</NavLink>
                  </div>
                  {authenticated.isLoggedIn &&
                    <DropDown name={_activity.name} href={_activity.href} subAdmin={createProject} />
                  }

                  {/* <DropDown childs={_explore.childs} name={_explore.name} href={_explore.href} />
                  <DropDown childs={_community.childs} name={_community.name} href={_community.href} /> */}
                  {authenticated.isLoggedIn &&
                    <DropDown childs={_account.childs} name={_account.name} href={_account.href} logout={logout} />}

                  {authenticated.isLoggedIn && <CWBtn className='mobile-div'>{utility.getCompactAddress(authenticated.accounts[0])}</CWBtn>}
                  {!authenticated.isLoggedIn && <CWBtn onClick={() => navigate('/register')} className='mobile-div'>{'Register'}</CWBtn>}

                  <LangConversion className='mobile-div'>
                    <img src={GlobeIcon} alt="" />
                    <p>EN <AiFillCaretDown onClick={() => setIsOpenLangBox(state => !state)} /></p>
                    <div className='lang-box'>
                      <Collapse onInit={onInit} isOpen={isOpenLangBox}>
                        <ul>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> ENGLISH</a></li>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> TURKISH</a></li>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> RUSSIAN</a></li>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> PORTUGUESE</a></li>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> SPANISH</a></li>
                          <li><a href="#"><img src={GlobeIcon} alt="" /> FRENCH</a></li>
                        </ul>
                      </Collapse>
                    </div>
                  </LangConversion>

                  <SocialList className='mobile-div'>
                    <a href="https://twitter.com/SeedifyFund" target="blank"><img src={IconTwitter} alt='' /></a>
                    <a href="https://blog.seedify.fund/" target="blank"><img src={IconMedium} alt='' /></a>
                    <a href="https://t.me/seedifyfund" target="blank"><img src={Icontelegram} alt='' /></a>
                  </SocialList>
                </div>
              </Collapse>
            </MMenu>

            <LangConversion className='desktop-div'>
              <img src={GlobeIcon} alt="" />
              <p>EN <AiFillCaretDown onClick={() => setIsOpenLangBox(state => !state)} /></p>
              <div className='lang-box'>
                <Collapse onInit={onInit} isOpen={isOpenLangBox}>
                  <ul>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> ENGLISH</a></li>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> TURKISH</a></li>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> RUSSIAN</a></li>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> PORTUGUESE</a></li>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> SPANISH</a></li>
                    <li><a href="#"><img src={GlobeIcon} alt="" /> FRENCH</a></li>
                  </ul>
                </Collapse>
              </div>
            </LangConversion>

            <SocialList className='desktop-div'>
              <a href="https://twitter.com/SeedifyFund" target="blank"><img src={IconTwitter} alt='' /></a>
              <a href="https://blog.seedify.fund/" target="blank"><img src={IconMedium} alt='' /></a>
              <a href="https://t.me/seedifyfund" target="blank"><img src={Icontelegram} alt='' /></a>
            </SocialList>

            {authenticated.isLoggedIn && <CWBtn className='desktop-div'>{utility.getCompactAddress(authenticated.accounts[0])}</CWBtn>}
            {!authenticated.isLoggedIn && <CWBtn onClick={() => navigate('/register')} className='desktop-div'>{'Register'}</CWBtn>}

            <ProfileBox>
              <FiUser />
            </ProfileBox>
          </HeaderRight>
        </HeaderInner>
      </Gs.Container>
    </HeaderMain >
  );
};

Gs.Container = styled(Gs.Container)`
  &.nav-container{max-width:1342px; padding:0px 4px;}
`;

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const HeaderMain = styled(FlexDiv)`
  background: rgba(83, 65, 198, 0.5); min-height:102px; position:fixed; top:0; left:0; right:0; z-index:99;
  background-image: url(${HeaderScrollBGImage}); background-repeat-y: repeat; background-repeat-x: no-repeat; background-size: 100% 100%; 
  :after {
    background-image: url(${NavHABg}); width: 100%; background-repeat-x: repeat; background-size: 100% 100%; position: absolute; height: 5px;
    content: ""; left: 0; right: 0; margin: 0 auto; bottom: 0;
}
  &.scrolled{
    background-image: url(${HeaderScrollBGImage}); background-size: cover;
  }
  ${Media.md} {
    min-height:88px;
  }
`;

const HeaderInner = styled(FlexDiv)`
  justify-content:space-between; 
`;

const HeaderLeft = styled(FlexDiv)`
  justify-content:flex-start;
  .logo{margin-right:70px; max-width:130px; padding-left:15px; cursor:pointer;
    ${Media.md2} {
      margin-right:28px;
    } 
  }
`;

const ProfileBox = styled(FlexDiv)`
  background-image: url(${ProfileFrame}); background-repeat: no-repeat; min-height: 60px; width: 60px;
  background-size: 100% 100%; transition: all 0.5s ease; color: #7bf5fb; margin-left: 20px; cursor:pointer;
  // :hover{
  //   background-image: url(${ProfileFrame2}); color: #fff;
  // }
  svg{font-size:24px;
    ${Media.md3} {
      font-size:16px;
    }
  }
  ${Media.md2} {
    margin-left:8px;
  } 
  ${Media.md3} {
    width:37px; min-height:37px; margin-left:0px; margin-right:20px;
  }
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

const HeaderRight = styled(FlexDiv)`
  padding-right:5px;
  ${Media.md3} {
    flex-direction: row-reverse; padding-right:0px;
  }
`;

const DMenu = styled(FlexDiv)`
  margin-top:1px;
  .menu-outer{position:relative;
    a{font-style: normal; font-weight: 500; font-size: 18px; line-height: 23px; color:#fff; margin:0px 15px; display:flex; align-items:center; 
      &.active, :hover{color:#6BFCFC;}
      svg{margin-left:4px; margin-top:2px; font-size:20px;
        ${Media.lg} {
          font-size:15px;
        }
      }
      ${Media.lg2} {
        font-size:14px; margin:0px 9px;
      } 
    }
  }
  ${Media.md3} {
    display:none;
  }
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background-color:transparent; letter-spacing: -1px;
  border-radius: 4px; width:200px; height:60px; border:none; margin-left:30px; transition: all .4s ease-in-out; background-image: url(${BTNBG1}); background-repeat: no-repeat;
  :hover{
    background-image: url(${BTNBGHover});
  }
  ${Media.lg2} {
    font-size:14px;
  } 
  ${Media.md2} {
    width:160px; background-size:100% 100%; margin-left:18px;
  } 
  ${Media.md3} {
    margin:20px auto 0px; font-size:16px; width:200px;
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
    width: 22px; height: 22px; background: url(${CloseIcon}) no-repeat;
  }
  ${Media.md3} {
    margin-right:24px;
  } 
`;

const MMenu = styled.div`
  display:none;
  ${Media.md3} {
    display:block;
  }
  .collapse-css-transition{position:fixed; top:101px; height: calc(100vh - 101px); left:0px; right:0px; z-index:9999; transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color:rgba(0,0,0,.9);
    ${Media.sm} {
      top:88px; height: calc(100vh - 88px);
    }
    .m-menu-outer{
      .collapse-css-transition{position:absolute; height:auto; top:70px;}
      padding:20px; box-shadow:0px 5px 5px 1px #000; height:100%; overflow-y:auto;
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
            margin:0px; font-size:32px; font-weight:500; justify-content:center; padding:3vh 0px;
          }
        }
      }
    }
  }
`;

const SocialList = styled(FlexDiv)`
  justify-content:flex-end;
  a{margin-right:20px; display:flex;
    svg{font-size:22px; color:#7BF5FB;}
    :last-child{margin-right:0px;}
  }
  &.desktop-div{
    ${Media.md3} {
      display:none;
    }
  }
  &.mobile-div{
    ${Media.md3} {
      display:flex;
      position: absolute;
      right: 19px;
      bottom: 32px;
    }
  }
  ${Media.md} {
    justify-content:flex-start;
  }
`;

const LangConversion = styled(FlexDiv)`
  margin-right: 27px; margin-top: 2px;
  &.desktop-div{
    ${Media.md} {
      display:none;
    }
  }
  &.mobile-div{
    ${Media.md} {
      display:flex; margin:0px; position: absolute; left: 27px; bottom: 32px;
    }
  }
  p{color: #ffffff; font-size: 18px; font-family: 'Rajdhani', sans-serif; line-height: 20px; font-weight: 500; margin: 0px 0px 0px 5px; 
    svg{ position: relative; top: 0px; left: -2px; cursor: pointer; font-size: 14px;
      ${Media.lg2} {
        font-size:11px;
      }
      ${Media.md} {
        font-size:18px;
      }
    }
    ${Media.lg2} {
     font-size:14px;
    }
    ${Media.md} {
      font-size:22px; font-weight:700;
    }
  }
  .lang-box {
    position: relative;
    .collapse-css-transition{ position: absolute; top: 32px; left: -70px; right: 0; width: 160px; z-index: 9;
      ul {
        list-style-type: none; padding: 0; margin: 0; background-color: #13141e; border: 1px solid #7bf5fb; border-radius: 5px; 
        li{text-align: left; padding: 6px 16px; border-bottom: 1px solid #7bf5fb;
          a {
            color: #fff; font-size: 16px; font-family: 'Rajdhani', sans-serif; line-height: 20px; font-weight: 400; display: flex; align-items: center;
            img{ margin-right: 5px; }
          }
          :hover{background-color: #000;} 
        }
      }
    }
    ${Media.md} {
      top:-250px; bottom:auto;
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actions.getUser()),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
    clearNonce: () => dispatch({ type: 'GENERATE_NONCE', data: null }),
    clearUserDetails: () => dispatch({ type: 'USER_FETCHED', data: null }),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    user: state.fetchUser,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Header)
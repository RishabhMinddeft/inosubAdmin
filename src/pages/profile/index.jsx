import 'react-tabs/style/react-tabs.css';
import React from 'react';
import Gs from '../../theme/globalStyles';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useAccess } from "react-access-control";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} from 'react-share';
import Media from '../../theme/media-breackpoint';

import { actions } from '../../actions';
import { useAuth } from '../../hooks';
import { getImageURL } from '../../helper/functions';
import ProgressiveImage from '../../helper/progressive.image';
import { nftList } from '../../config';
import { _nftConstTabs } from '../../constant/profile.const';
import utility from '../../utility';
import NFTList from './nft.list';
import MintedNFT from './minted.nft';
import ListedNFT from './listed.nft';
import DraftedNFT from './drafted.nft';
import ProfilePicture from '../../assets/images/dummy3.jpg';
import CopyIcon from '../../assets/images/copy.png';
import FBIcon from '../../assets/images/s-facebook.png';
import TWIcon from '../../assets/images/s-twitter.png';
import TSIcon from '../../assets/images/translate.png';
import GIcon from '../../assets/images/google.png';


const Profile = (props) => {

  const { loggedUser } = props

  const navigate = useNavigate()
  const { hasPermission } = useAccess()
  const { isloggedIn } = useAuth({ route: 'profile' }) // route should be same mentioned in routes file without slash
  const showMintedNFT = hasPermission("show_minted_nft")

  const copyToClipboard = () => {
    copy(loggedUser?.walletAddress)
    setTimeout(ReactTooltip.hide, 2000)
  }

  console.log('user ', loggedUser)


  return (
    <>
      <Gs.Container>
        <ProfileBox>
          <ProfileLeft>
            <div className='img-outer'>
              <ProgressiveImage className=''
                src={loggedUser?.image ? getImageURL(loggedUser.image) : ProfilePicture}
              />
            </div>
          </ProfileLeft>
          <ProfileRight>
            <PRTop>
              <PRName>{loggedUser?.name}</PRName>
              <SocialList>
                <FacebookShareButton
                  url={window.location.href}
                  quote={'Share Profile On FaceBook'} >
                  <Link to='#'><img src={FBIcon} alt='' /></Link>
                </FacebookShareButton>

                <TwitterShareButton
                  url={window.location.href}
                  title={'Share Profile On Twitter'}>
                  <Link to='#'><img src={TWIcon} alt='' /></Link>
                </TwitterShareButton>

                <EmailShareButton
                  url={window.location.href}
                  title={'Share Profile On Twitter'}>
                  <Link to='#'><img src={GIcon} alt='' /></Link>
                </EmailShareButton>

                <Link to='#'><img src={TSIcon} alt='' /></Link>
              </SocialList>
            </PRTop>

            <PRDesc>
              {loggedUser?.email}
            </PRDesc>

            <PRBottom>
              <CopyInputOuter>
                <input type={'text'} placeholder={utility.getCompactProfileAddress(loggedUser?.walletAddress)} />
                <img src={CopyIcon} alt=''
                  data-tip data-for="addressCopied"
                  data-event={"click"}
                  onClick={() => copyToClipboard(loggedUser?.walletAddress)}
                />
              </CopyInputOuter>
              <EditProfile onClick={() => navigate('/update')}>Edit Profile</EditProfile>
            </PRBottom>
          </ProfileRight>
        </ProfileBox>

        <CustomHTabs>
          <Tabs>

            <TabList>
              {_nftConstTabs.map((tab, key) => {
                if (tab.code === 'mintedNFT' && !showMintedNFT) return ''
                else return <Tab key={key}><div className='inner'>{tab.name}</div></Tab>
              })}
            </TabList>

            <TabPanel>
              <NFTList url={nftList} />
            </TabPanel>

            <TabPanel>
              <ListedNFT url={nftList} />
            </TabPanel>

            <TabPanel>
              <DraftedNFT url={nftList} />
            </TabPanel>

            {showMintedNFT && <TabPanel>
              <MintedNFT />
            </TabPanel>}

          </Tabs>
        </CustomHTabs>


      </Gs.Container>
      <ReactTooltip
        id="addressCopied"
        globalEventOff={"click"}
        afterShow={copyToClipboard}
        className='TT-design' place="top">
        <div className='lc-outer'>
          Link Copied <BsCheckCircleFill />
        </div>
      </ReactTooltip>
    </>
  )
}


const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;


const ProfileBox = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start; margin:32px 0px 0px; padding:50px; background: linear-gradient(180deg, rgba(26, 35, 42, 0) 30.5%, rgba(123, 245, 251, 0.1) 42.43%), #13141E; border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(60px);
  ${Media.sm} {
    display:block; padding:15px;
  }
`;

const ProfileLeft = styled.div`
  .img-outer{ border-radius: 2px; border: 1px solid #7BF5FB; backdrop-filter: blur(60px); width:201px; height:185px; overflow:hidden; display:flex; align-items:center; justify-content:center;
    // img{width:100%; height:100%; object-fit:cover; }
    ${Media.sm} {
      margin:0 auto 20px;
    }
  }
`;

const ProfileRight = styled.div`
  margin-left:32px; width: calc(100% - 235px);
  ${Media.sm} {
    width:100%; margin-left:0px; text-align:center;
  }
`;

const PRName = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 19px;
  ${Media.md} {
    margin:0px 0px 10px;
  }
`;

const PRDesc = styled.div`
  max-width:528px; font-style: normal; font-weight: 500; font-size: 17px; line-height: 25px; color: #FFFFFF; opacity: 0.8; margin-bottom:23px; word-break:break-word;
  ${Media.md} {
    max-width:100%; margin-bottom:15px;
  }
`;

const PRBottom = styled(FlexDiv)`
  justify-content:space-between;
`;

const CopyInputOuter = styled.div`
  position:relative; max-width:218px; margin:0px; width:100%;
  img{position:absolute; top:12px; right:12px; cursor:pointer;}
  input{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
  ${Media.md} {
    max-width:100%;
  }
`;

const EditProfile = styled.button`
  border: 1px solid #6BFCFC; background:none; box-sizing: border-box; border-radius: 4px; padding:14px 60px; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB;
  :hover{background:#6BFCFC; color:#1D2A34;}
  ${Media.md} {
    margin-top:20px;
  }
  ${Media.sm} {
    width:100%;
  }
`;

const PRTop = styled(FlexDiv)`
  justify-content:space-between;
  ${Media.md} {
    display:block;
  }
`;

const SocialList = styled(FlexDiv)`
  a{background: #1D2A34; border: 1.5px solid #7BF5FB; box-sizing: border-box; border-radius: 2px; width:37.5px; height:37.5px; margin:0px 6px; display:flex; align-items:center; justify-content:center;
    :hover{opacity:0.8;}
    ${Media.md} {
      margin:0px 12px 0px 0px;
    }
  }
  ${Media.md} {
    justify-content:flex-start; margin-bottom:10px;
  }
  ${Media.sm} {
    justify-content:center;
  }
`;

const CustomHTabs = styled.div`
  margin-bottom:32px;
  .react-tabs__tab-list{ display:flex; align-items:center; justify-content:center; margin-bottom:0px; border-bottom:0px; margin-top: -1px;
    .react-tabs__tab{width:100%; text-align:center; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #6BFCFC; min-height:67px;
      display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box; border-top:0px;
      &.react-tabs__tab--selected{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px;
        .inner{opacity:1;}
      }
      :after{display:none;}
      .inner{opacity:0.5;}
      ${Media.sm} {
        width:50%;
      }
    }
    ${Media.sm} {
      flex-wrap:wrap;
    }
  }
  .react-tabs__tab-panel{padding:24px 0px 0px; box-sizing: border-box;}
`;


const mapDipatchToProps = (dispatch) => {
  return {
    getNFTList: () => dispatch(actions.getNFTList()),
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.fetchUser,
    allNFTs: state.fetchNFTList,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Profile)
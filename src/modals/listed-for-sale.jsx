import React, { useState } from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import { Link } from 'react-router-dom';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  EmailShareButton,
  TelegramShareButton,
} from 'react-share';
import Media from '../theme/media-breackpoint';

import ProfileIMG from '../assets/images/dummy1.jpg';
import FBIcon from '../assets/images/b-facebook.png';
import TWIcon from '../assets/images/b-twitter.png';
import TLIcon from '../assets/images/b-telegram.png';
import ITIcon from '../assets/images/b-instagram.png';
import EIcon from '../assets/images/b-email.png';
import CopyIcon from '../assets/images/copy.png';

const ListedForSale = () => {

  const [shareURL, setShareURL] = useState(window.location.href);

  return (
    <>
      <ModalContentOuter>
        <SCTop>
          <div className='img-outer'>
            <img src={ProfileIMG} alt='' />
          </div>
          <div className='s-detail'>
            <CDTitle>Your item is now listed for sale!</CDTitle>
            <LDesc>Enter your email address in your account settings so we can let you know when your listing sells or receives offers.</LDesc>
            <CopyInputOuter className='ver2'>
              <input type='text' placeholder='Your mail address' />
            </CopyInputOuter>
          </div>
        </SCTop>
        <LFSOuter>
          <SCBottom>
            <SocialTitle>Share this with your social community.</SocialTitle>
            <SocialList>
                <FacebookShareButton  
                  url={shareURL}
                  quote={'Share NFT On FaceBook'} >
                  <Link to='#'><img src={FBIcon} alt='' /></Link>
                </FacebookShareButton>

                <TwitterShareButton  
                  url={shareURL}
                  quote={'Share NFT On Twitter'} >
                  <Link to='#'><img src={TWIcon} alt='' /></Link>
                </TwitterShareButton>

                <EmailShareButton  
                  url={shareURL}
                  quote={'Share NFT On Email'} >
                  <Link to='#'><img src={EIcon} alt='' /></Link>
                </EmailShareButton>

                <TelegramShareButton  
                  url={shareURL}
                  quote={'Share NFT On Telegram'} >
                  <Link to='#'><img src={TLIcon} alt='' /></Link>
                </TelegramShareButton>
                
              {/* <Link to='#'><img src={ITIcon} alt='' /></Link> */} 
              </SocialList>
            <div className='sc-b-area'>
              <CopyText>
                <div className='line'></div>
                <p>or copy link</p>
              </CopyText>
              <CopyInputOuter>
                <input type='text' placeholder='https://seedify.6789ndms/' />
                <img src={CopyIcon} alt='' />
              </CopyInputOuter>
            </div>
          </SCBottom>
          <CWBtn>View Item</CWBtn>
        </LFSOuter>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)`
  
`;

const LFSOuter = styled.div`
  overflow-y:auto; text-align:center;
`;

const CDTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 28px; line-height: 34px; color: #FFFFFF; margin-bottom:16px; width:100%;
`;

const LDesc = styled.div`
  font-style: normal; font-weight: 500; font-size: 21px; line-height: 33px; color: rgba(255, 255, 255, 0.9); margin:0px 0px 22px;
`;

const SocialTitle = styled.div`
  font-style: normal; font-weight: 600; font-size: 21px; line-height: 33px; text-align: center; color: #FFFFFF; margin-top:32px;
`;

const SCBottom = styled.div`
   width:100%;
  .sc-b-area{margin:30px 35px 50px;
    ${Media.xs} {
      margin:30px 15px 50px;
    }
  }
`;

const SocialList = styled(FlexDiv)`
  margin:30px 0px;
  a{margin:0px 16px;
    :hover{opacity:0.9;}
    ${Media.sm} {
      margin:0px 5px;
    }
    img{
      ${Media.xs} {
        width:40px;
      } 
    }
  }
`;

const CopyText = styled.div`
  margin:35px 0px; position:relative;
  .line{max-width: 472px; margin:0 auto; height:1px; background: rgba(255, 255, 255, 0.24);}
  p{position:absolute; top:-12px; left:calc(50% - 63px); background-color:#141620; margin:0px; padding:0px 18px; font-family: 'Urbanist', sans-serif; font-style: normal; font-weight: 600; font-size: 14px; line-height: 26px; text-transform: uppercase; color: rgba(255, 255, 255, 0.33);}
`;

const CopyInputOuter = styled.div`
  position:relative; max-width:332px; margin:0 auto 32px; width:100%;
  img{position:absolute; top:12px; right:12px; cursor:pointer;}
  input{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
  &.ver2{margin:0px;
    ${Media.sm} {
      margin:0px auto 0px;
    }
  }
  ${Media.sm} {
    max-width:initial;
  }
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; letter-spacing:0.5px; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 55px 20px 55px; border:none; transition: all .4s ease-in-out; margin-bottom:45px;
  :hover{opacity:0.9;}
`;

const SCTop = styled(FlexDiv)`
  align-items:flex-start; padding:35px 50px; border-bottom:1px solid #7BF5FB;
  ${Media.sm} {
    padding:35px 30px;
  }
  .img-outer{ background: linear-gradient(0deg, rgba(26, 35, 42, 0) 84.72%, rgba(123, 245, 251, 0.1) 98.82%), #13151C; padding:8px;
    border: 1px solid #7BF5FB; box-sizing: border-box; width:218px; height:218px; overflow:hidden; border-radius: 2px;
    img{width:100%; height:100%; object-fit:cover; border-radius:2px;}
    ${Media.sm} {
      margin:0px auto 30px;
    }
  }
  .s-detail{text-align:left; width:calc(100% - 251px); margin-left:33px;
    ${Media.sm} {
      width:100%; margin-left:0px; text-align:center;
    }
  }
  ${Media.sm} {
    display:block;
  }
`;

export default ListedForSale;

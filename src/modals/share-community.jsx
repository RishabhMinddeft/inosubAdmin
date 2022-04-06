import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';

import FBIcon from '../assets/images/facebook.png';
import TWIcon from '../assets/images/twitter.png';
import TLIcon from '../assets/images/telegram.png';
import ITIcon from '../assets/images/instagram.png';
import EIcon from '../assets/images/email.png';
import CopyIcon from '../assets/images/copy.png';
import Spinner from './spinner';

const CreateItem = (props) => {
const {name , id} = props 
  return (
    <>
      <ModalContentOuter>
        <>
        <SCTop>
          <SCTitle>You Created<br />
            <span>{name}</span>
          </SCTitle>
          <SCDesc>Share this with your social community.</SCDesc>
        </SCTop>
        <SCBottom>
          <SocialList>
            <Link to='#'><img src={FBIcon} alt='' /></Link>
            <Link to='#'><img src={ITIcon} alt='' /></Link>
            <Link to='#'><img src={TLIcon} alt='' /></Link>
            <Link to='#'><img src={TWIcon} alt='' /></Link>
            <Link to='#'><img src={EIcon} alt='' /></Link>
          </SocialList>
          <div className='sc-b-area'>
            <CopyText>
              <div className='line'></div>
              <p>or copy link</p>
            </CopyText>
            <CopyInputOuter>
              <input type='text' placeholder='' value={`https://seedify.6789ndms/${id}`} />
              <img src={CopyIcon} alt='' />
            </CopyInputOuter>
          </div>
        </SCBottom></>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)`
  background: linear-gradient(0deg, rgba(26, 35, 42, 0) 73.33%, rgba(123, 245, 251, 0.1) 101.58%), #13151C;
`;

const SCTop = styled.div`
  background: linear-gradient(180deg, rgba(123, 245, 251, 0.1) 11.95%, rgba(18, 19, 28, 0) 100%); backdrop-filter: blur(60px); width:100%; border-bottom:1px solid #7BF5FB;
`;

const SCTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 24px; line-height: 29px; color: #FFFFFF; margin:30px 15px 10px; text-align:center;
  span{color:#7BF5FB;}
`;

const SCDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF; max-width:300px; margin:0px auto 30px; text-align:center;
`;

const SCBottom = styled.div`
  background: linear-gradient(0deg, rgba(26, 35, 42, 0) 73.33%, rgba(123, 245, 251, 0.1) 101.58%), #13151C; width:100%;
  .sc-b-area{margin:30px 35px 50px;
    ${Media.xs} {
      margin:30px 15px 50px;
    }
  }
`;

const SocialList = styled(FlexDiv)`
  margin:30px 0px;
  a{margin:0px 12px;
    :hover{opacity:0.9;}
    ${Media.xs} {
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
  margin:30px 0px; position:relative;
  .line{width:100%; height:1px; background: rgba(255, 255, 255, 0.5);}
  p{position:absolute; top:-12px; left:calc(50% - 44.2px); background-color:#13151c; margin:0px; padding:0px 12px; font-family: 'Urbanist', sans-serif; font-style: normal; font-weight: 600; font-size: 10px; line-height: 26px; text-transform: uppercase; color: rgba(255, 255, 255, 0.5);}
`;

const CopyInputOuter = styled.div`
  position:relative;
  img{position:absolute; top:12px; right:12px; cursor:pointer;}
  input{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
`;

export default CreateItem;

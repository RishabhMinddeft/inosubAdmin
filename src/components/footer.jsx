import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { FaTwitter, FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import Media from '../theme/media-breackpoint';

import LogoImg from '../assets/images/logo.png';
import FooterBG from '../assets/images/footer-bg.jpg';
import SendIcon from '../assets/images/send.png';

function Footer() {

  return (
    <FooterMain>
      <Gs.Container>
        <FooterOuter>
          <FBox1>
            <img src={LogoImg} alt="" className='logo' />
            <p>Seedify.fund is a Blockchain Gaming focused Incubator and Launchpad. Through staking $SFUND, become eligible to buy game tokens before everyone else, and have an edge in the play to earn era!</p>
          </FBox1>
          <FBox2>
            <LLTitle>My Account</LLTitle>
            <Link to="#">Profile</Link>
            <Link to="#">My Collection</Link>
            <Link to="#">Profile Settings</Link>
            <Link to="#">Favorites</Link>
          </FBox2>
          <FBox2>
            <LLTitle>Resources</LLTitle>
            <Link to="#">Help & support</Link>
            <Link to="#">Live INOs</Link>
            <Link to="#">Game Close-ups</Link>
            <Link to="#">Explore</Link>
          </FBox2>
          <FBox2>
            <LLTitle>Company</LLTitle>
            <Link to="#">Seedify Home Page</Link>
            <Link to="#">About Us</Link>
            <Link to="#">Our Blog</Link>
            <Link to="#">Contact Us</Link>
          </FBox2>
          <FBox3>
            <LLTitle>Never Miss Updates.</LLTitle>
            <div className='input-outer'>
              <input type="text" placeholder='Enter your mail address' />
              <button type='button'><img src={SendIcon} alt="" /></button>
            </div>
            <SocialList>
              <Link to="#"><FaTwitter /></Link>
              <Link to="#"><FaTelegramPlane /></Link>
              <Link to="#"><FaMediumM /></Link>
            </SocialList>
          </FBox3>
        </FooterOuter>
      </Gs.Container>
    </FooterMain >
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const FooterMain = styled.div`
  background: url(${FooterBG}) no-repeat; padding:80px 0px; background-size: cover;
  ${Media.md} {
    background-size: auto; background-color: #1a1c29;
  }
`;

const FooterOuter = styled(FlexDiv)`
  justify-content:space-between; align-items:flex-start;
  ${Media.md} {
    display:block;
  }
`;

const FBox1 = styled.div`
  img{margin-bottom:22px; max-width:145px;}
  p{margin:0px; font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 14px; line-height: 21px; color: #FFFFFF; opacity: 0.5; max-width:304px;
    ${Media.md} {
      max-width:100%;
    }
  }
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const FBox2 = styled.div`
  a{font-style: normal; font-weight: 300; font-size: 14px; line-height: 18px; color: #FFFFFF; display:block; margin-bottom:16px;
    :hover{opacity:0.8;}
    :last-child{margin-bottom:0px;}
  }
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const FBox3 = styled.div`
  .input-outer{position:relative; margin-bottom:58px;
    input{background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; font-style: normal; font-weight: 400; font-size: 16px; 
    line-height:22px; font-family: 'Adrianna Rg'; padding:14px 15px; color:#fff; min-width:274px; height:50px;
      ${Media.md} {
        min-width:auto; width:100%;
      }
    }
    button{position:absolute; top:6px; right:6px; transition: all .4s ease-in-out; background: rgba(123, 245, 251, 0.2); border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 2px; width:38px; height:38px; display:flex; align-items:center; justify-content:center;
      svg{font-size:30px; color:#7BF5FB;}
      :hover{background: rgba(123, 245, 251, 0.4);}
    }
    ${Media.md} {
      margin-bottom:20px;
    }
  }
`;

const LLTitle = styled.div`
  font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF; margin-bottom:20px;
`;

const SocialList = styled(FlexDiv)`
  justify-content:flex-end;
  a{margin-right:20px;
    svg{font-size:24px; color:#7BF5FB;}
    :last-child{margin-right:0px;}
    :hover{opacity:0.8;}
  }
  ${Media.md} {
    justify-content:flex-start;
  }
`;

export default Footer;

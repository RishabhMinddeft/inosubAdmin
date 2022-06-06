import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { FaTwitter, FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import Media from '../theme/media-breackpoint';

import LogoImg from '../assets/images/logo.png';
import FooterBG from '../assets/images/footer-bg.png';
import SendIcon from '../assets/images/send.png';

import NewFBIcon from '../assets/images/head_face.png';
import NewTWIcon from '../assets/images/head_t.png';
import NewTGIcon from '../assets/images/head_tele.png';
import NewMDIcon from '../assets/images/head_m.png';

function Footer() {

  return (
    <FooterMain>
      <Gs.Container className='foot-container'>
        <FooterOuter>
          <FBox1>
            <img src={LogoImg} alt="" className='logo' />
            <p>Seedify is a Blockchain Gaming focused Incubator and Launchpad. By staking $SFUND, you become eligible to buy game tokens before everyone else, giving you the edge in the play-to-earn era!</p>
          </FBox1>
          <MiddlePart>
            <FBox2>
              {/* <LLTitle>My Account</LLTitle>
            <Link to="#">Profile</Link>
            <Link to="#">My Collection</Link>
            <Link to="#">Profile Settings</Link>
            <Link to="#">Favorites</Link> */}
            </FBox2>
            <FBox2>
              {/* <LLTitle>Resources</LLTitle>
            <Link to="#">Help & support</Link>
            <Link to="#">Live INOs</Link>
            <Link to="#">Game Close-ups</Link>
            <Link to="#">Explore</Link> */}
            </FBox2>
            <FBox2>
              {/* <LLTitle>Company</LLTitle> */}
              {/* <Link to="#">Seedify Home Page</Link> */}
              <Link to="https://launchpad.seedify.fund/termsofservices" target="blank">Terms of Services</Link>
              <Link to="https://launchpad.seedify.fund/privacypolicy" target="blank">Privacy Policy</Link>
              <Link to="https://launchpad.seedify.fund/whitepaper/" target="blank">Whitepaper</Link>
            </FBox2>
          </MiddlePart>
          <FBox3>
            {/* <LLTitle>Never Miss Updates.</LLTitle>
            <div className='input-outer'>
              <input type="text" placeholder='Enter your mail address' />
              <button type='button'><img src={SendIcon} alt="" /></button>
            </div> */}
            <SocialList>
              <Link to="https://www.facebook.com/seedifyfund" target="blank"><img src={NewFBIcon} alt='' /></Link>
              <Link to="https://twitter.com/SeedifyFund" target="blank"><img src={NewTWIcon} alt='' /></Link>
              <Link to="https://t.me/seedifyfund" target="blank"><img src={NewTGIcon} alt='' /></Link>
              <Link to="https://blog.seedify.fund/" target="blank"><img src={NewMDIcon} alt='' /></Link>
            </SocialList>
          </FBox3>
        </FooterOuter>
      </Gs.Container>
    </FooterMain >
  );
};

Gs.Container = styled(Gs.Container)`
  &.foot-container{
    ${Media.lg2} {
      max-width:1110px;
    }
    ${Media.md2} {
      max-width:930px;
    }
    ${Media.md} {
      max-width:690px;
    }
    ${Media.sm} {
      max-width:100%; width:auto;
    }
  }
`;

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const FooterMain = styled.div`
  padding:60px 0px; background: #1A1C29; position:relative; border-top: 1px solid #36394F;
  :after {
    content: ""; position: absolute; width: 100%; height: 20px; background: url(${FooterBG}) no-repeat; top: 0; left:0; right:0;
  }
  ${Media.md} {
    background-size: auto; background-color: #1a1c29; text-align:center;
  }
  ${Media.sm} {
    padding:60px 0px 10px;
  }
`;

const FooterOuter = styled.div`
  display: grid; grid-template-columns: 25% auto 25%; grid-gap: 20px; align-items:flex-start;
  ${Media.md} {
    display:block;
  }
`;

const MiddlePart = styled.div`
  display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 20px;
  ${Media.md} {
    display:block;
  }
`;

const FBox1 = styled.div`
  img{margin-bottom:20px; max-width:98px; }
  p{margin:0px 0px 16px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF; opacity: 0.8;
    ${Media.md} {
      max-width:100%;
    }
  }
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const FBox2 = styled.div`
  margin-top:2px;
  a{font-style: normal; font-weight: 400; font-size: 14px; line-height: 18px; color: #FFFFFF; display:block; margin-bottom:6px;
    :hover{opacity:0.8;}
    :last-child{margin-bottom:0px;}
    ${Media.xs} {
      font-size:12px; line-height:17px;
    }
  }
  ${Media.md} {
    margin:38px 0px;
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
    justify-content:center;
  }
`;

export default Footer;

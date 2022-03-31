import React from 'react';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import ProfileIMG from '../assets/images/dummy1.jpg';
import ProfileIMG2 from '../assets/images/dummy2.jpg';
import Calender2 from '../assets/images/calender2.png';


const NFT = ({ nft }) => {

  return (
    <LeftInner>
      <LeftBox>
        <LeftTop>
          <div className='img-outer'>
            <img src={ProfileIMG} alt='' />
          </div>
          <Timer>
            <img src={Calender2} alt='' />
            <p>05 : 12 : 07 : 45</p>
          </Timer>
        </LeftTop>
        <CILHeader>
          <CILTitle>{nft._id}</CILTitle>
        </CILHeader>
        <OtherDetail>
          <ODLeft>
            <div className='img-outer'>
              <img src={ProfileIMG2} alt='' />
            </div>
            <div>
              <PName>CREATOR</PName>
              <PDetail>GAME NAME</PDetail>
            </div>
          </ODLeft>
          <ODRight>
            <EditBtn>Edit Item</EditBtn>
          </ODRight>
        </OtherDetail>
      </LeftBox>
      <LeftBottom>
        <OtherDetail>
          <ODRight className='text-left'>
            <PName className='ver2'>OFFER</PName>
            <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
          </ODRight>
          <GreyBadge>10X</GreyBadge>
        </OtherDetail>
      </LeftBottom>
    </LeftInner>
  )
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const LeftInner = styled.div`
  width:calc(25% - 24px); margin:0px 12px 24px 12px;
  ${Media.md2} {
    width:calc(33.33% - 24px);
  }
  ${Media.md} {
    width:calc(50% - 24px);
  }
  ${Media.sm} {
    width:100%;
  }
`;

const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px 16px 20px; border-bottom-left-radius:0px; border-bottom-right-radius:0px; border-bottom:0px;
  .img-outer{ border-radius: 2px; margin-bottom:21px;
    width:100%; height:246px; overflow:hidden; border: 1px solid #7BF5FB; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const LeftTop = styled.div`
  position:relative;
`;

const Timer = styled(FlexDiv)`
  background: rgba(0, 0, 0, 0.2); border: 1px solid #7BF5FB; backdrop-filter: blur(30px); border-radius: 40px; position:absolute; top:auto; bottom:16px; left: 0px;
  right: 0px; width: max-content; margin: 0 auto; padding:3px 10px 1px;
  img{margin-right:8px;}
  p{font-style: normal; font-weight: 600; font-size: 16px; line-height: 20px; margin:0px; color: #7BF5FB;}
`;

const CILHeader = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:24px;
`;

const CILTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 21px; line-height: 25px; color: #FFFFFF;  white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis; 
`;

const GreyBadge = styled(FlexDiv)`
  font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #D7E1E9; background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(60px); border-radius: 69px; padding: 0px 8px;
`;

const OtherDetail = styled(FlexDiv)`
  justify-content:space-between; 
`;

const ODLeft = styled(FlexDiv)`
  .img-outer{ border-radius: 2px; width:40px; height:40px; overflow:hidden; border:none; margin-right:8px; margin-bottom:0px; 
    img{width:100%; height:100%; object-fit:cover; }
  }
`;

const PName = styled.div`
  font-style: normal; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF; opacity: 0.8; margin:0px 0px 3px;
  &.ver2{font-size: 15px; line-height: 19px;}
  &.ver3{margin:0px; display:inline-block;}
`;

const PDetail = styled.div`
  font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #FFFFFF;
`;

const ODRight = styled.div`
  text-align:right;
  &.text-left{text-align:left;}
`;

const SValue = styled.div`
  font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF;
`;

const EditBtn = styled.button`
  background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%); border:none; padding:15px; font-family: 'Rajdhani', sans-serif; letter-spacing:0.5px; 
  transition: all .4s ease-in-out; border-radius: 4px; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB;
  :hover{opacity:0.9;}
`;

const LeftBottom = styled.div`
  border: 1px solid #7BF5FB; border-radius: 4px; padding:20px 16px 16px; border-top-left-radius:0px; border-top-right-radius:0px;
`;


export default NFT;
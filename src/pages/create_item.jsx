import React from 'react';
import Gs from '../theme/globalStyles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProfileIMG from '../assets/images/dummy1.jpg';
import ProfileIMG2 from '../assets/images/dummy2.jpg';

const CreateItem = () => {

  return (
    <Gs.Container>
      <CIOuter>
        <CILeft>
          <CITitle>Preview Item</CITitle>
          <LeftBox>
            <div className='img-outer'>
              <img src={ProfileIMG} alt='' />
            </div>
            <CILHeader>
              <CILTitle>Game Asset Name</CILTitle>
              <GreyBadge>10X</GreyBadge>
            </CILHeader>
            <OtherDetail>
              <ODLeft>
                <div className='img-outer'>
                  <img src={ProfileIMG2} alt='' />
                </div>
                <div>
                  <PName>PROJECT NAME</PName>
                  <PDetail>SIDUS</PDetail>
                </div>
              </ODLeft>
              <ODRight>
                <PName>PRICE</PName>
                <SValue>0.001 SFUND</SValue>
              </ODRight>
            </OtherDetail>
          </LeftBox>
        </CILeft>
        <CIRight>
          jkshkg
        </CIRight>
      </CIOuter>
    </Gs.Container>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
`;

const CILeft = styled.div`
  width:278px;
`;

const CIRight = styled.div`
  width:calc(100%b - 323px); margin-left:45px;
`;

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px;
  .img-outer{ border-radius: 2px; margin-bottom:21px;
    width:100%; height:246px; overflow:hidden; border: 1px solid #7BF5FB; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const CILHeader = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:24px;
`;

const CILTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 21px; line-height: 25px; color: #FFFFFF;
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
`;

const PDetail = styled.div`
  font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #FFFFFF;
`;

const ODRight = styled.div`
  text-align:right;
`;

const SValue = styled.div`
  font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF;
`;

export default CreateItem;

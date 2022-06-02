import React from 'react';
import { useNavigate } from 'react-router';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import FZF from '../assets/images/404.png';

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <Gs.Container>
      <CWOuter>
        <img src={FZF} alt='' />
        <CWTitle>Page Not Found!</CWTitle>
        <CWBtn onClick={() => navigate('/')}>Go Back to Home</CWBtn>
      </CWOuter>
    </Gs.Container>
  )
}


const CWOuter = styled.div`
  padding:130px 0px; text-align:center;
  ${Media.sm} {
    padding:0px 0px 70px;
  }
`;

const CWTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 24px; text-align:center;
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 68px 20px 69px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

export default NotFound;
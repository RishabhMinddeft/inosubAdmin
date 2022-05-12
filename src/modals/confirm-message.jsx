import React from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';

const ConfirmMessage = (props) => {

  const confirm = () => {
    console.log('prform the action of confirm button here.!')
  }

  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <CDDesc>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem exercitationem pariatur soluta non commodi? Animi repellat at, aut tempora odit quam ducimus alias maiores expedita debitis consequatur vero corrupti dolor.</CDDesc>
          <div style={{ textAlign: "center" }}>
            <CWBtn onClick={() => confirm()}>Confirm</CWBtn>
            <CWBtn onClick={() => props.close()}>Cancel</CWBtn>
          </div>
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const USHOuter = styled.div`
  padding:30px; width:100%;
`;

const CDDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #FFFFFF; width:100%; margin-bottom:30px; text-align:center;
  b{font-family: 'Adrianna Bd';}
`;

const CWBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:15px 30px; border:none; transition: all .4s ease-in-out; margin-bottom:40px; margin:0px 5px;
  :hover{opacity:0.9;}
  svg{font-size:24px; margin-right:5px;}
  ${Media.xs} {
    padding:15px 20px;
  }
`;

export default ConfirmMessage;

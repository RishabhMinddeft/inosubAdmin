import React from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';
import { MdOutlineFindReplace } from 'react-icons/md';
import { ImUpload } from 'react-icons/im';

const SnapshotHash = () => {
  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <CDDesc><b>Info :</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem exercitationem pariatur soluta non commodi? Animi repellat at, aut tempora odit quam ducimus alias maiores expedita debitis consequatur vero corrupti dolor.</CDDesc>
          <CWBtn><MdOutlineFindReplace /> Fetch Snapshot Registered User Data</CWBtn>
          <InputOuter>
            <input type="text" placeholder='' />
          </InputOuter>
          <GBtn>Generate User Data Hash</GBtn>
          <div style={{ textAlign: "center" }}>
            <CWBtn style={{ marginBottom: "0px" }}><ImUpload /> Upload</CWBtn>
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
  padding:50px 30px 30px; width:100%;
`;

const CDDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #FFFFFF; width:100%; margin-bottom:20px;
  b{font-family: 'Adrianna Bd';}
`;

const GBtn = styled.button`
  font-size:14px; font-family: 'Rajdhani', sans-serif; color:#7BF5FB; background-color:transparent; border:none; padding:0px; text-decoration:underline; margin-bottom:40px; width:100%; text-align:right;
  :hover{opacity:0.8;}
`;

const CWBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 15px 20px 15px; width:100%; border:none; transition: all .4s ease-in-out; margin-bottom:40px; display:flex; align-items:center; justify-content:center;
  :hover{opacity:0.9;}
  svg{font-size:24px; margin-right:5px;}
`;

const InputOuter = styled.div` 
  input,textarea,select{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
  textarea{min-height:116px; resize:none;}
  select{-webkit-appearance: none; -moz-appearance: none; appearance: none; background:none; cursor:pointer;
    option{background: rgba(54, 57, 79, 1);}
  }
  &.mb-0{margin-bottom:0px;}
  .select-outer{position:relative; z-index:0; background: rgba(54, 57, 79, 0.5);}
`;

export default SnapshotHash;

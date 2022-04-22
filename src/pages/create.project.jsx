import React, { useEffect, useState } from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import DateModal from '../modals/choose-date';
import ProfileIMG from '../assets/images/dummy4.jpg';
import UBorder from '../assets/images/dotted-border.png';
import UploadIcon from '../assets/images/upload.png';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CalenderIcon from '../assets/images/calender.png';
import { FaPlusCircle } from 'react-icons/fa';

const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)

const CreateProject = (props) => {

  const [openDateModal, setOpenDateModal] = useState(false);

  return (
    <>
      <Gs.Container>
        <CIOuter>
          <CIRight>
            <CITitle>Enter Project Detail</CITitle>
            <hr />
            <label className='mb-5'>Project Name </label>
            <InputOuter>
              <input type='text' placeholder='Enter the name of your Project here.' />
            </InputOuter>
            <label className='mb-5'>DESCRIPTION</label>
            <InputOuter>
              <textarea placeholder='Give detailed information and the story behind your Project and create a context for the potential owner!'></textarea>
            </InputOuter>
            <label className='mb-5'>Project/Website Link</label>
            <InputOuter>
              <input type='text' placeholder='Add the link about the project to provide detailed information about the project and direct the user to link.' />
            </InputOuter>
            <label>Upload project image <span>(File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB)</span></label>
            <UploadBorder>
              <div className="upload-btn-wrapper">
                <CWBtn2><img src={UploadIcon} alt='' /> Add File(s)</CWBtn2>
                <input
                  type="file"
                  name="myfile"
                />
              </div>
              <p>or drop it right here</p>
            </UploadBorder>
            <CITitle >Social Links</CITitle>
            <hr />
            <W50Outer>
              <W50>
                <label className='mb-5'>YouTube </label>
                <InputOuter>
                  <input type='text' placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Telegram </label>
                <InputOuter>
                  <input type='text' placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Twitter </label>
                <InputOuter>
                  <input type='text' placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Instagram </label>
                <InputOuter>
                  <input type='text' placeholder='Enter URL' />
                </InputOuter>
              </W50>
            </W50Outer>
            <CITitle >User Registration Time</CITitle>
            <hr />
            <W50Outer className='mb-40'>
              <W50>
                <label>Start time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>Apr 04, 2019</DateText>
                  </div>
                </DateOuter>
              </W50>
              <W50>
                <label>End time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>Apr 08, 2019</DateText>
                  </div>
                </DateOuter>
              </W50>
            </W50Outer>
            <CITitle >In Game Features</CITitle>
            <hr />
            <label className='mb-5'>Feature Name </label>
            <PriceOuter>
              <InputOuter className='w90 mb-0'>
                <input type='text' placeholder='Enter the name of the Feature here.' />
              </InputOuter>
              <InputOuter className='w10 mb-0'>
                <CWBtn2 className='ver3'><FaPlusCircle /></CWBtn2>
              </InputOuter>
            </PriceOuter>
            <label className='mb-5'>Feature Description</label>
            <PriceOuter>
              <InputOuter className='w90 mb-0'>
                <textarea placeholder='Give detailed information of the Feature here.'></textarea>
              </InputOuter>
              <InputOuter className='w10 mb-0'>
                <CWBtn2 className='ver3'><FaPlusCircle /></CWBtn2>
              </InputOuter>
            </PriceOuter>
            <InfoBadge>
              <label className='mb-5'>Feature 1</label>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aspernatur inventore asperiores non autem? Quo recusandae excepturi veritatis in est magnam perspiciatis consequuntur, officia quisquam, earum ipsa, quaerat alias itaque.</p>
            </InfoBadge>
            <InfoBadge>
              <label className='mb-5'>Feature 2</label>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. perspiciatis consequuntur, officia quisquam, earum ipsa, quaerat alias itaque.</p>
            </InfoBadge>
            <div className='s-row'>
              <CWBtn>Submit</CWBtn>
            </div>
          </CIRight>
          <CILeft>
            <CITitle >Preview Item</CITitle>
            <LeftBox>
              <div className='img-outer'>
                <img src={ProfileIMG} alt='' />
              </div>
            </LeftBox>
          </CILeft>
        </CIOuter>
      </Gs.Container>
      <Modal open={openDateModal} closeIcon={closeIcon} onClose={() => setOpenDateModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        <DateModal setOpenDateModal={setOpenDateModal} />
      </Modal>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const W50Outer = styled(FlexDiv)`
  justify-content: space-between; 
  &.mb-40{margin-bottom:40px;
    ${Media.sm} {
     margin-bottom:0px;
    }
  }
`;

const W50 = styled.div`
  width:calc(50% - 10px); 
  ${Media.sm} {
    width:100%;
  }
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
  ${Media.md} {
    flex-direction:column-reverse;
  }
`;

const InfoBadge = styled.div`
  background: rgba(54,57,79,0.5); border: 1px solid rgba(255,255,255,0.15); box-sizing: border-box; padding: 13px 16px; margin-bottom:40px;
  p{margin-bottom:0px; line-height:22px; color:#fff; opacity: 0.7;}
  label{color: #7BF5FB !important;}
`;

const CILeft = styled.div`
  width:40%;
  ${Media.md} {
    margin-bottom:50px; width:100%;
  }
`;

const CIRight = styled.div`
  width:calc(60% - 45px); margin-right:45px;
  label{font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #FFFFFF; margin-bottom:25px; display:block;
    span{margin-left:8px; opacity: 0.7; font-weight: 500; font-size: 15px; line-height: 19px;}
    &.mb-5{margin-bottom:5px;}
    &.ver2{opacity:0.5; font-weight: 300; font-size: 14px; line-height: 18px;}
  }
  hr{margin:0px 0px 40px; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); border-top:0px;}
  .s-row{text-align:right;}
  ${Media.md} {
    width:100%; margin-left:0px;
  }
`;

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const DateOuter = styled(FlexDiv)`
  justify-content:flex-start; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; min-height:50px; padding:15px 16px 15px 17px; width: max-content;
  .ar-bg{width:30px; height:30px; border-radius:50%; background-color: #3D3E53; display:flex; align-items:center; justify-content:center; margin:0px 20px;
    img{margin-right:0px;}
    ${Media.xs} {
      margin:10px auto; transform:rotate(90deg);
    }
  }
  img{margin-right:10px; cursor:pointer;}
  &.ver2{width:100%;
    ${Media.sm} {
      margin-bottom:40px;
    }
  }
  ${Media.sm} {
    width:auto;
  }
  ${Media.xs} {
    display:block;
  }
  .date-inner{display:flex; align-items:center;
    ${Media.xs} {
      justify-content:center;
    }
  }
`;

const DateText = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
`;

const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px;
  .img-outer{ border-radius: 2px;
    width:100%; height:532px; overflow:hidden; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
    ${Media.md} {
      height:auto;
    }
  }
`;

const UploadBorder = styled(FlexDiv)`
  flex-direction: column; background: url(${UBorder}) no-repeat; background-size:100% 100%; padding:50px 0px 40px; margin-bottom:40px;
  p{font-style: normal; font-weight: 500; font-size: 16px; line-height: 20px; color: #FFFFFF; opacity: 0.7; margin:0px; text-align:center; margin-top:15px; }
  .upload-btn-wrapper{ position: relative; overflow: hidden; display: inline-block;
    input[type=file]{ font-size: 100px; position: absolute; left: 0; top: 0; opacity: 0; right:0; bottom:0; 
      ::-webkit-file-upload-button {
        -webkit-appearance: button; cursor: pointer;
      }
    }
  }
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 68px 20px 69px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

const CWBtn2 = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 600; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:14px 50px 14px 51px; border:none; transition: all .4s ease-in-out; 
  :hover{opacity:0.9;}
  img{margin-right:7px;}
  &.add-more{display:flex; align-items:center;
    svg{margin-right:10px; font-size:16px;}
  }
  &.ver2{display:flex; align-items:center; justify-content:center; min-height:50px;
    svg{margin-right:5px;}
  }
  &.ver3{ min-width:50px; min-height:50px; padding:0px;}
`;

const InputOuter = styled.div`
  margin-bottom:40px; 
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

const PriceOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:space-between; margin-bottom:40px;
  .w10{width:auto; text-align:right;
    ${Media.sm} {
      width:20%;
    }
  }
  .w90{width:90%;
    ${Media.sm} {
      width:80%;
    }
  }
  .w20{width:20%;
    ${Media.sm} {
      width:30%;
    }
    ${Media.xs} {
      width:40%;
    }
  }
  .w80{width:calc(80% - 15px);
    ${Media.sm} {
      width:calc(70% - 15px);
    }
    ${Media.xs} {
      width:calc(60% - 15px);
    }
  }
`;

export default CreateProject;
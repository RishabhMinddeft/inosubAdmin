import React, { useEffect, useState } from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Media from '../theme/media-breackpoint';
import DateModal from '../modals/choose-date';
import { useAccess } from "react-access-control";
import ProfileIMG from '../assets/images/dummy4.jpg';
import UBorder from '../assets/images/dotted-border.png';
import UploadIcon from '../assets/images/upload.png';
import 'react-responsive-modal/styles.css';
import ipfs from '../config/ipfs';
import { actions } from '../actions';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';
import PleaseWait from '../modals/please-wait';
import { Toast } from '../helper/toastify.message';
import CalenderIcon from '../assets/images/calender.png';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { TimeStampToDateString } from '../helper/functions';

const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)

const CreateProject = (props) => {

  const { projectCreated, user } = props;
  const navigate = useNavigate();
  const { hasPermission } = useAccess();
  const [openDateModal, setOpenDateModal] = useState(false);
  const createProject = hasPermission("create_project");

  const [image, setImage] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [webUrl, setWebUrl] = useState('');
  const [socialUrl, setSocialUrl] = useState({
    "facebook": "",
    "tiwitter": "",
    "instagram": "",
    "youtube": "",
    "linkedin": ""
  })
  const [inGameFeatures, setInGameFeatures] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [inoLaunchDate, setLnoLaunchDate] = useState(0);
  const [dateType, setDateType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState({ name: '', description: '' });

  useEffect(() => {
    if (!createProject) navigate('/')
  }, [])


  useEffect(() => {
    if (projectCreated) {
      Toast.success('Project Created Successfully.')
      navigate('/')
    }
  }, [projectCreated])

  const onSubmit = async () => {
    if (!projectName || !image || !description || !webUrl
      || !startTime || !endTime) {
      Toast.error('Please enter all the required fields.')
    } else if (inGameFeatures.length === 0) {
      Toast.error('Please add game fetures.')
    } else {
      setLoading(true)
      let ipfsHash = await ipfs.add(image, {
        pin: true,
        progress: (bytes) => {
          // setUploadRatio(bytes);
        },
      })
      let params = {
        "projectName": projectName,
        "description": description,
        "image": ipfsHash.path,
        "video": "",
        "webUrl": webUrl,
        "createdBy": user._id,
        "socialUrl": socialUrl,
        "inGameFeatures": inGameFeatures,
        "startTime": startTime,
        "endTime": endTime,
        "inoLaunchDate": inoLaunchDate,
      }
      props.createProject(params)
    }
  }

  const setDuration = (time) => {
    if(dateType === "INOLaunchTime"){
      setLnoLaunchDate(Math.floor(new Date(time).getTime() / 1000))
    }
    else if (dateType === "registrationEnd") {
      setEndTime(Math.floor(new Date(time).getTime() / 1000))
    } else {
      setStartTime(Math.floor(new Date(time).getTime() / 1000))
    }
  }

  return (
    <>
      <Gs.Container>
        <CIOuter>
          <CIRight>
            <CITitle>Enter Project Detail</CITitle>
            <hr />
            <label className='mb-5'>Project Name </label>
            <InputOuter>
              <input type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder='Enter the name of your Project here.' />
            </InputOuter>
            <label className='mb-5'>DESCRIPTION</label>
            <InputOuter>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Give detailed information and the story behind your Project and create a context for the potential owner!'></textarea>
            </InputOuter>
            <label className='mb-5'>Project/Website Link</label>
            <InputOuter>
              <input type='text' value={webUrl} onChange={(e) => setWebUrl(e.target.value)} placeholder='Add the link about the project to provide detailed information about the project and direct the user to link.' />
            </InputOuter>
            <label>Upload project image <span>(File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB)</span></label>
            <UploadBorder>
              <div className="upload-btn-wrapper">
                <CWBtn2><img src={UploadIcon} alt='' /> Add File(s)</CWBtn2>
                <input
                  type="file"
                  name="myfile"
                  accept='video/*, image/*'
                  onChange={(e) => setImage(e.target.files[0])} />
              </div>
              <p>or drop it right here</p>
            </UploadBorder>
            <CITitle >Social Links</CITitle>
            <hr />
            <W50Outer>
              <W50>
                <label className='mb-5'>YouTube </label>
                <InputOuter>
                  <input type='text' value={socialUrl.youtube} onChange={(e) => setSocialUrl({ ...socialUrl, "youtube": e.target.value })} placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Facebook </label>
                <InputOuter>
                  <input type='text' value={socialUrl.facebook} onChange={(e) => setSocialUrl({ ...socialUrl, "facebook": e.target.value })} placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Twitter </label>
                <InputOuter>
                  <input type='text' value={socialUrl.tiwitter} onChange={(e) => setSocialUrl({ ...socialUrl, "tiwitter": e.target.value })} placeholder='Enter URL' />
                </InputOuter>
              </W50>
              <W50>
                <label className='mb-5'>Instagram </label>
                <InputOuter>
                  <input type='text' value={socialUrl.instagram} onChange={(e) => setSocialUrl({ ...socialUrl, "instagram": e.target.value })} placeholder='Enter URL' />
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
                    <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setDateType('registrationStart'); }} />
                    <DateText>{TimeStampToDateString(startTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
              <W50>
                <label>End time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setDateType('registrationEnd'); }} />
                    <DateText>{TimeStampToDateString(endTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
            </W50Outer>
            <CITitle >INO Launch Time</CITitle>
            <hr />
            <W50Outer className='mb-40'>
              <W50>
                <label>Start time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setDateType('INOLaunchTime'); }} />
                    <DateText>{TimeStampToDateString(startTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
            </W50Outer>
            <CITitle >In Game Features</CITitle>
            <hr />
            <label className='mb-5'>Feature Name </label>
            <PriceOuter>
              <InputOuter className='w100 mb-0'>
                <input type='text' value={feature.name} onChange={(e) => setFeature({ ...feature, name: e.target.value })} placeholder='Enter the name of the Feature here.' />
              </InputOuter>
              {/* <InputOuter className='w10 mb-0'>
                <CWBtn2 className='ver3' ><FaPlus /></CWBtn2>
              </InputOuter> */}
            </PriceOuter>
            <label className='mb-5'>Feature Description</label>
            <PriceOuter>
              <InputOuter className='w100 mb-0'>
                <textarea value={feature.description} onChange={(e) => setFeature({ ...feature, description: e.target.value })} placeholder='Give detailed information of the Feature here.'></textarea>
              </InputOuter>
              <InputOuter className='mb-0'>
                <CWBtn2 className='ver3'
                  onClick={() => {
                    console.log(feature)
                    if (feature.name && feature.description) {
                      setInGameFeatures([...inGameFeatures, feature])
                      setFeature({ name: '', description: '' })
                    }
                  }}><FaPlus /> Add More</CWBtn2>
              </InputOuter>
            </PriceOuter>

            {inGameFeatures.map((feature, key) =>
              <InfoBadge key={key}>
                <label className='mb-5'>{feature.name}</label>
                <p>{feature.description}</p>
                <FaTrashAlt onClick={() => {
                  let newList = inGameFeatures.filter((item) => item.name !== feature.name || item.description !== feature.description)
                  setInGameFeatures(newList);
                }} />
              </InfoBadge>
            )}

            <div className='s-row'>
              <CWBtn onClick={() => onSubmit()}>Submit</CWBtn>
            </div>


          </CIRight>
          <CILeft>
            <CITitle >Preview Item</CITitle>
            <LeftBox>
              <div className='img-outer'>
                <img src={image ? URL.createObjectURL(image) : ProfileIMG} alt='' />
              </div>
            </LeftBox>
          </CILeft>
        </CIOuter>
      </Gs.Container>
      <Modal open={openDateModal} closeIcon={closeIcon} onClose={() => setOpenDateModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        {/* <DateModal setOpenDateModal={setOpenDateModal} setDuration={setDuration} /> */}
        <DateModal setOpenDateModal={setOpenDateModal} setDuration={setDuration} dateType={dateType} />
      </Modal>
      <Modal open={loading} closeIcon={closeIcon} onClose={() => setLoading(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}>
        <PleaseWait isLoading={loading} title={'Loading'} description={'Creating a project, please wait for a moment.'} />
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
  background: rgba(54,57,79,0.5); border: 1px solid rgba(255,255,255,0.15); box-sizing: border-box; padding: 13px 16px; margin-bottom:40px; position:relative;
  p{margin-bottom:0px; line-height:22px; color:#fff; opacity: 0.7;}
  label{color: #7BF5FB !important;}
  svg{position:absolute; top:10px; right:10px; color:#FC6B74; cursor:pointer;}
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
    ${Media.xl} {
      height:470px;
    }
    ${Media.md2} {
      height:350px;
    }
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
  &.ver3{ background:none; padding:0px; display:flex; align-items:center; font-weight:normal;
    svg{margin-right:5px; font-size:12px;}
  }
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
  .w100{width:100%;}
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

const mapStateToProps = (state) => {
  return {
    user: state.fetchUser,
    projectCreated: state.createProject,
  }
}

const mapDipatchToProps = (dispatch) => {
  return {
    createProject: (data) => dispatch(actions.createProject(data)),
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(CreateProject)
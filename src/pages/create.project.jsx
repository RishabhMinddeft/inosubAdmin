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
import { useNavigate, useParams } from 'react-router-dom';
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
  let { id } = useParams();
  const { projectCreated, projectUpdated, singleProjectDetail, getSingleProject, user } = props;
  const navigate = useNavigate();

  const { hasPermission } = useAccess();
  const [openDateModal, setOpenDateModal] = useState(false);
  const createProject = hasPermission("create_project");
  const editProject = hasPermission("edit_project");

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
  const [teams, setTeams] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [inoLaunchDate, setLnoLaunchDate] = useState(0);
  const [dateType, setDateType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState({ name: '', description: '' });
  const [team, setTeam] = useState({ name: '', designation: '', image: '' });
  const [imageUpdate, setImageUpdate] = useState(false);
  const [teamImageUpdate, setTeamImageUpdate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [idStatus, setIdStatus] = useState(false);
  
  useEffect(() => {
    if (id) {
      getSingleProject(id);
    }
    else{
      if (!createProject) navigate("/");
      else {
        newCreateProject();
      };
    }
  }, []);
  console.log(idStatus);
  const newCreateProject = () => {setImage(null);
    setProjectName('');
    setDescription('');
    setWebUrl('');
    setVideo('');
    setSocialUrl({
      "facebook": "",
      "tiwitter": "",
      "instagram": "",
      "youtube": "",
      "linkedin": ""
    });
    setInGameFeatures([]);
    setTeams([]);
    setStartTime(null);
    setEndTime(null);
    setLnoLaunchDate(0);
  };
  useEffect(() => {
    console.log(singleProjectDetail);
    if (singleProjectDetail) {
      setImage(singleProjectDetail.image);
      setProjectName(singleProjectDetail.projectName);
      setDescription(singleProjectDetail.description);
      setWebUrl(singleProjectDetail.webUrl);
      setVideo(singleProjectDetail.video);
      setSocialUrl({
        "facebook": singleProjectDetail.socialUrl.facebook,
        "tiwitter": singleProjectDetail.socialUrl.tiwitter,
        "instagram": singleProjectDetail.socialUrl.instagram,
        "youtube": singleProjectDetail.socialUrl.youtube,
        "linkedin": singleProjectDetail.socialUrl.linkedin
      });
      setInGameFeatures(singleProjectDetail.inGameFeatures);
      setTeams(singleProjectDetail.teams);
      setStartTime(singleProjectDetail.startTime);
      setEndTime(singleProjectDetail.endTime);
      setLnoLaunchDate(singleProjectDetail.inoLaunchDate);
      setImageUpdate(false);
    }
    // else{
    //   newCreateProject();
    // }
  }, [singleProjectDetail]);


  useEffect(() => {
    console.log(projectUpdated);
    if (projectUpdated) {
      Toast.success('Project Updated Successfully.')
      navigate('/')
    }
  }, [projectUpdated])
  useEffect(() => {
    console.log(projectCreated);
    if (projectCreated) {
      Toast.success('Project Created Successfully.')
      navigate('/')
    }
  }, [projectCreated,projectUpdated])


  const onUpdate = async () => {
    if (!checked && (!projectName || !image || !description || !webUrl
        || !startTime || !endTime || !inoLaunchDate) ){
        Toast.error('Please enter all the required fields.')
      }
      else if(checked && (!projectName || !image || !description || !webUrl) ){
        Toast.error('Please enter all the required fields.')
      }
    else if (inGameFeatures.length === 0) {
      Toast.error('Please add game fetures.')
    } else {
      setLoading(true)
      let ipfsHash = await ipfs.add(image, {
        pin: true,
        progress: (bytes) => {
          // setUploadRatio(bytes);
        }
      })
      
      
      let teamsDetail = [];
      await Promise.all(
        teams.map(async (team) => {
          let hash = await ipfs.add(team.image, {
            pin: true,
            progress: (bytes) => {
              // setUploadRatio(bytes);
            },
          })
          teamsDetail.push({ name: team.name, designation: team.designation, image: hash.path })
        }))
        
        console.log("teamsdeatail", teamsDetail)
        let params = {
          "projectId": id,
          "projectName": projectName,
          "description": description,
          "image": !imageUpdate ? image : ipfsHash.path,
          "video": "",
          "webUrl": webUrl,
          "createdBy": user._id,
          "socialUrl": socialUrl,
          "inGameFeatures": inGameFeatures,
          "startTime": startTime,
          "endTime": endTime,
          "inoLaunchDate": inoLaunchDate,
          teams: teamsDetail,
        }
      console.log("reached")
      props.editProject(params)
      setImageUpdate(false);
      setTeamImageUpdate(false);
    }
  }
  const onSubmit = async () => {
    if (!checked && (!projectName || !image || !description || !webUrl
      || !startTime || !endTime || !inoLaunchDate) ){
      Toast.error('Please enter all the required fields.')
    }
    else if(checked && (!projectName || !image || !description || !webUrl) ){
      Toast.error('Please enter all the required fields.')
    }
    else if (inGameFeatures.length === 0) {
      Toast.error('Please add game fetures.')
    } else {
      setLoading(true)
      let ipfsHash = await ipfs.add(image, {
        pin: true,
        progress: (bytes) => {
          // setUploadRatio(bytes);
        },
      })
      let teamsDetail = [];
      await Promise.all(
        teams.map(async (team) => {
          let hash = await ipfs.add(team.image, {
            pin: true,
            progress: (bytes) => {
              // setUploadRatio(bytes);
            },
          })
          teamsDetail.push({ name: team.name, designation: team.designation, image: hash.path })
        }))

      console.log("teamsdeatail", teamsDetail)
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
        teams: teamsDetail,
      }
      console.log("reached")
      props.createProject(params)
    }
  }
  const handleChange = () => {
    setChecked(!checked);
  }
  const setDuration = (time) => {
    if (dateType === "INOLaunchTime") {
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
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImageUpdate(true);
                  }} />
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
            <hr />
            <BigInputOuter>
              <div className="big-input-box">
                <CustomSwitch>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={()=>setChecked(!checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </CustomSwitch>
                Check this if you add INO launch pad project without Start Date
              </div>
            </BigInputOuter>
            {/* <CITitle >Check this if you add INO launch pad project without start date {' '}
            <input type="checkbox" style={{height:"20px", width:"20px" , marginLeft:"10px",}} checked={checked} onChange={handleChange} />
            </CITitle> */}
              <hr />
            {!checked && <CITitle >User Registration Time</CITitle>}
            {!checked && <hr />}
            {!checked && <W50Outer className='mb-40'>
              <W50>
                <label>Start time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => { !checked && setOpenDateModal(true); setDateType('registrationStart'); }} />
                    <DateText>{TimeStampToDateString(startTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
              <W50>
                <label>End time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => { !checked && setOpenDateModal(true); setDateType('registrationEnd'); }} />
                    <DateText>{TimeStampToDateString(endTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
            </W50Outer>
            }
            {!checked && <CITitle >INO Launch Time</CITitle> }
            {!checked && <hr /> }
            {!checked && <W50Outer className='mb-40'>
              <W50>
                <label>Start time</label>
                <DateOuter className="ver2">
                  <div className='date-inner'>
                    <img src={CalenderIcon} alt='' onClick={() => { !checked && setOpenDateModal(true); setDateType('INOLaunchTime'); }} />
                    <DateText>{TimeStampToDateString(startTime)}</DateText>
                  </div>
                </DateOuter>
              </W50>
            </W50Outer>}

            <CITitle>Teams</CITitle>
            <hr />
            <label className='mb-5'>Name </label>
            <PriceOuter>
              <InputOuter className='w100 mb-0'>
                <input type='text' value={team.name} onChange={(e) => setTeam({ ...team, name: e.target.value })} placeholder='Enter the Team name here.' />
              </InputOuter>
            </PriceOuter>
            <label className='mb-5'>Designation</label>
            <PriceOuter>
              <InputOuter className='w100 mb-0'>
                <input type='text' value={team.designation} onChange={(e) => setTeam({ ...team, designation: e.target.value })} placeholder='Enter the Team designation here.' />
              </InputOuter>
            </PriceOuter>
            <label className='mb-5'>Profile Image</label>
            <PriceOuter>
              <InputOuter className='w100 mb-0'>
                <UploadBtnWrapper>
                  <button className="btn">Choose File</button>
                  <p>Chosen file name here</p>
                  <input type='file' accept='image/*'
                    onChange={(e) => {
                      setTeam({ ...team, image: e.target.files[0] });
                      setTeamImageUpdate(true)
                    }} placeholder='Enter the Team profile image here.' />
                </UploadBtnWrapper>
                {/* <input type='file' accept='image/*'
                  onChange={(e) => setTeam({ ...team, image: e.target.files[0] })} placeholder='Enter the Team profile image here.' /> */}
              </InputOuter>
              <InputOuter className='mb-0'>
                <CWBtn2 style={{ marginTop: "5px" }} className='ver3'
                  onClick={() => {
                    console.log(team)
                    if (team.name && team.designation && team.image) {
                      setTeams([...teams, team])
                      setTeam({ name: '', designation: '', image: '' })
                      // setTeamImageUpdate(false)
                    }
                  }}><FaPlus /> Add Team Member</CWBtn2>
              </InputOuter>
            </PriceOuter>

            {teams.map((team, key) =>
              <InfoBadge key={key}>
                <InfoBadgeDetail>
                {console.log(team.image)}
                  <div className='img-outer'>
                    {id && <img src={!teamImageUpdate ? `https://ipfs.io/ipfs/${team.image}` : URL.createObjectURL(team.image)} alt='' />}
                    {!id && <img src={team.image ? URL.createObjectURL(team.image) : ProfileIMG} alt='' />}
                  </div>
                  <div>
                    <label className='mb-5'>{team.name}</label>
                    <p>{team.designation}</p>
                  </div>
                </InfoBadgeDetail>
                <FaTrashAlt onClick={() => {
                  let newList = teams.filter((item) => item.name !== team.name || item.designation !== team.designation)
                  setTeams(newList);
                }} />
              </InfoBadge>)}


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
              {id ? <CWBtn onClick={() => onUpdate()}>Update</CWBtn> : <CWBtn onClick={() => onSubmit()}>Submit</CWBtn>}
            </div>


          </CIRight>
          <CILeft>
            <CITitle >Preview Item</CITitle>
            <LeftBox>
              <div className='img-outer'>
              {console.log(image)}
                {id && <img src={!imageUpdate ? `https://ipfs.io/ipfs/${image}` : URL.createObjectURL(image)} alt='' />}
                { }
                {!id && <img src={image ? URL.createObjectURL(image) : ProfileIMG} alt='' />}
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
        {id ? <PleaseWait isLoading={loading} title={'Loading'} description={'Updating the project, please wait for a moment.'} /> : <PleaseWait isLoading={loading} title={'Loading'} description={'Creating the project, please wait for a moment.'} />}

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

const InfoBadgeDetail = styled(FlexDiv)`
  justify-content:flex-start;
  .img-outer{
    width:80px; height:80px; overflow:hidden; margin-right:20px; border:1px solid rgba(255,255,255,0.2); padding:5px;
    img{width:100%; height:100%; object-fit: cover; }
  }
`;

const UploadBtnWrapper = styled(FlexDiv)`
  justify-content:flex-start; position: relative; overflow: hidden; width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:10px 16px; min-height:50px;
    input[type=file] {
       position: absolute; left: 0; top: 0; opacity: 0; height:100%;
    }
    p{margin:0px 0px 0px 10px; opacity:0.7; font-family: 'Adrianna Rg';}
    .btn{font-size: 16px; color: #7BF5FB; background: linear-gradient(263.59deg,#343FA1 0%,#6350BB 100%); border-radius: 4px; border:none; padding:5px 10px; font-family: 'Adrianna Bd'; font-style: normal;}
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
const BigInputOuter = styled.div`
  margin-bottom: 25px;
  input {
    width: 100%;
    background: rgba(54, 57, 79, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
    padding: 24px;
    min-height: 76px;
    font-style: normal;
    font-family: "Adrianna Rg";
    font-weight: 400;
    font-size: 17px;
    line-height: 24px;
    color: #ffffff;
    ::placeholder {
      color: #ffffff;
      opacity: 0.7;
    }
  }
  &.mb-50 {
    margin-bottom: 50px;
  }
  .big-input-box {
    width: 100%;
    background: rgba(54, 57, 79, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
    padding: 24px;
    min-height: 76px;
    font-style: normal;
    font-family: "Adrianna Rg";
    font-weight: 400;
    font-size: 17px;
    line-height: 24px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .react-switch-bg {
    margin-right: 12px !important;
  }
`;
const CustomSwitch = styled.div`
  .switch {
    position: relative;
    width: 46px;
    height: 29px;
    margin-bottom: 0px;
    margin-right: 12px;
    span {
      opacity: 1;
      margin-left: 0px;
    }
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #585a7a;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 6px;
    bottom: 6px;
    background-color: #8485a7;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slider {
    background: linear-gradient(263.59deg, #343fa1 0%, #6350bb 100%);
  }
  input:checked + .slider:before {
    background-color: #7bf5fb;
  }
  input:focus + .slider {
    box-shadow: none;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(17px);
    -ms-transform: translateX(17px);
    transform: translateX(17px);
  }
  .slider.round {
    border-radius: 56px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
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
const mapDipatchToProps = (dispatch) => {
  return {
    getSingleProject: (id) => dispatch(actions.getSingleProject(id)),
    createProject: (data) => dispatch(actions.createProject(data)),
    editProject: (data) => dispatch(actions.editProject(data))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.fetchUser,
    singleProjectDetail: state.singleProjectDetail,
    projectCreated: state.createProject,
    projectUpdated: state.editProject,
  }
}


export default connect(mapStateToProps, mapDipatchToProps)(CreateProject)
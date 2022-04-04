import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Media from '../theme/media-breackpoint';
import { connect } from 'react-redux';
import { actions } from '../actions';
import { useForm } from '../hooks';
import ipfs from '../config/ipfs';
import { subAdminRole } from '../config';
import { compressImage } from '../helper/functions';
import { Toast } from '../helper/toastify.message';
import PleaseWait from '../modals/please-wait';

import ProfileIMG from '../assets/images/dummy3.jpg';
import UBorder from '../assets/images/dotted-border.png';
import UploadIcon from '../assets/images/upload.png';


const Register = (props) => {

  let { register } = props
  const imageRef = useRef()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [callAPI, setCallAPI] = useState(false)
  const [params, setParams] = useState(null)
  const [image, setImage] = useState({ file: null, url: null, buffer: null })

  const closeIcon = (
    <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
      <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokemiterlimitit="16"></line>
      <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokemiterlimitit="16"></line>
    </svg>
  )

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      image: {
        required: true,
      },
      walletAddress: {
        required: true,
      },
      name: {
        pattern: {
          value: '^[A-Za-z -]+[A-Za-z]*$',
          message: "You're not allowed to add number...",
        },
      },
    },
    onSubmit: () => onRegister(),
  })

  useEffect(() => {
    /* revert the state */
    if (register) {
      console.log('register ', register)
      props.revertRegister()
      setIsLoading(false) // stop loader
      navigate('/')
      if (register.message) Toast.error(register.message)
      else Toast.success('User Register Successfully. Please login to see further details.')
    }
    // eslint-disable-next-line
  }, [register])

  useEffect(() => {
    if (callAPI) {
      props.profileRegister(params)
      setCallAPI(false)
    }
    // eslint-disable-next-line
  }, [callAPI])

  const onRegister = async () => {
    setIsLoading(true) // start loader
    let params = {
      username: data.name,
      name: data.name,
      email: data.email,
      description: data.description,
      walletAddress: data.walletAddress,
      role: subAdminRole,
    }
    /* upload image on IPFS */
    let ipfsHash = false
    if (image.buffer) {
      console.log('file change uploading on ipfs')
      ipfsHash = await ipfs.add(image.buffer, { // get buffer IPFS hash
        pin: true, progress: (bytes) => {
          // console.log('File upload progress ', Math.floor(bytes * 100 / (profile.file.size)))
        }
      })
      params.image = ipfsHash.path
    }
    setParams(params)
    setCallAPI(true)
  }

  const onImageChange = async () => {
    let file = imageRef.current.files[0];
    let url = URL.createObjectURL(file);
    if (file.size > 1572864) {
      // check file size
      file = await compressImage(file); // compress image
    }
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, url, file);
  }

  const convertToBuffer = async (reader, url = null, file = null) => {
    //file is converted to a buffer to prepare for uploading to IPFS`
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    setImage({ buffer: buffer, url: url, file: file })
  }

  return (
    <>
      <Gs.Container>
        <form onSubmit={handleSubmit}>
          <CIOuter>
            <CILeft>
              <CITitle>Preview</CITitle>
              <LeftBox>
                <div className='img-outer'>
                  <img src={image.url ? image.url : ProfileIMG} alt='' />
                </div>
              </LeftBox>
            </CILeft>
            <CIRight>
              <label>Upload File <span>(File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB)</span></label>
              <UploadBorder>
                <div className="upload-btn-wrapper">
                  <CWBtn2><img src={UploadIcon} alt='' /> Add File(s)</CWBtn2>
                  <input type="file" name='image'
                    accept="image/*"
                    ref={imageRef}
                    id='profile_file'
                    onChange={() => onImageChange()}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                {/* <p>or drop it right here</p> */}
              </UploadBorder>

              <label className='mb-5'>Wallet Address</label>
              <InputOuter>
                <input type='text' onChange={handleChange('walletAddress')} required 
                  placeholder='User Wallet Address...' />
              </InputOuter>

              <label className='mb-5'>Project Name</label>
              <InputOuter>
                <input type='text' onChange={handleChange('projectName')} required 
                  placeholder='Enter project name here...' />
              </InputOuter>

              <label className='mb-5'>Name</label>
              <InputOuter>
                <input type='text' placeholder='Enter the name here.'
                  onChange={handleChange('name')} required />
                {errors.name && <p className="error">{errors.name}</p>}
              </InputOuter>

              <label className='mb-5'>Email</label>
              <InputOuter>
                <input type='email'placeholder='Enter the email here.'
                  onChange={handleChange('email')} required />
                {errors.email && <p className="error">{errors.email}</p>}
              </InputOuter>

              <label className='mb-5'>DESCRIPTION</label>
              <InputOuter>
                <textarea onChange={handleChange('description')}
                  required
                  placeholder='Give detailed information and the story behind your NFTs and create a context for the potential owner!' ></textarea>
                {errors.description && <p className="error">{errors.description}</p>}
              </InputOuter>

              <div className='s-row'>
                <CWBtn type='submit'>Register</CWBtn>
              </div>

            </CIRight>
          </CIOuter>
        </form>
      </Gs.Container>

      {/* loader model */}
      <Modal open={isLoading} closeIcon={closeIcon} onClose={() => setIsLoading(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}>
        <PleaseWait description={'registering...'} />
      </Modal>
    </>
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
  ${Media.md} {
    margin-bottom:50px;
  }
`;

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const CIRight = styled.div`
  width:calc(100% - 323px); margin-left:45px;
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


const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px;
  .img-outer{ border-radius: 2px; 
    width:100%; height:246px; overflow:hidden; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const UploadBorder = styled(FlexDiv)`
  flex-direction: column; background: url(${UBorder}) no-repeat; background-size:100% 100%; padding:50px 0px; margin-bottom:40px;
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
  .error { color: red; }
  &.mb-0{margin-bottom:0px;}
  .select-outer{position:relative; z-index:0; background: rgba(54, 57, 79, 0.5);}
`;

const mapDipatchToProps = (dispatch) => {
  return {
    revertRegister: () => dispatch({ type: 'PROFILE_REGISTERED', data: null }),
    profileRegister: (params) => dispatch(actions.profileRegister(params)),
  }
}

const mapStateToProps = (state) => {
  return {
    register: state.registerProfile,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Register);
import React, { useRef, useState } from 'react';
import Gs from '../../theme/globalStyles';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { actions } from '../../actions';
import { useForm } from '../../hooks';
import ipfs from '../../config/ipfs'
import { compressImage } from '../../helper/functions';

import ProfileIMG from '../../assets/images/dummy1.jpg';
import UBorder from '../../assets/images/dotted-border.png';
import UploadIcon from '../../assets/images/upload.png';


const UpdateProfile = (props) => {

  const user = props.loggedUser
  const imageRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState({ file: null, url: null, buffer: null })

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      image: {
        required: true,
      },
      name: {
        pattern: {
          value: '^[A-Za-z -]+[A-Za-z]*$',
          message: "You're not allowed to add number...",
        },
      },
      email: {
        pattern: {
          value: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
          message: "You're not allowed to add...",
        },
      },
      // age: {
      //   custom: {
      //     isValid: (value) => parseInt(value, 10) > 17,
      //     message: 'You have to be at least 18 years old.',
      //   },
      // },
      // description: {
      //   pattern: {
      //     // value: '^[a-zA-Z0-9+_.-]*$',
      //     value: '^[A-Za-z -]+[A-Za-z]*$',
      //     message: "You're not allowed to add...",
      //   },
      // },
      facebook: {
        pattern: {
          value: 'https://.*',
          message: "You're not allowed to this...",
        }
      },
      twitter: {
        pattern: {
          value: 'https://.*',
          message: "You're not allowed to this...",
        }
      },
      // password: {
      //   required: {
      //     value: true,
      //     message: 'This field is required',
      //   },
      //   custom: {
      //     isValid: (value) => value.length > 6,
      //     message: 'The password needs to be at...',
      //   },
      // },
    },
    onSubmit: () => onUpdate(),
    // initialValues: { // used to initialize the data
    //   name: user?.username,
    //   email: user?.email,
    //   walletAddress: user?.walletAddress,
    // },
  })

  const onUpdate = async () => {
    setIsLoading(true) // start loader
    let params = {
      ...data,
    }
    /* upload image on IPFS */
    let ipfsHash = false
    if (image.buffer) {
      ipfsHash = await ipfs.add(image.buffer, { // get buffer IPFS hash
        pin: true, progress: (bytes) => {
          // console.log('File upload progress ', Math.floor(bytes * 100 / (profile.file.size)))
        }
      })
      params.image = ipfsHash.path
    }
    console.log('- params ? ', params)
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

  const convertToBuffer = async (reader, url=null, file=null) => {
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
              <LeftBox>
                <div className='img-outer'>
                  <img src={image.url ? image.url : ProfileIMG} alt='' />
                  {/* <img src={image ? URL.createObjectURL(image?.file) : ProfileIMG} alt=''  /> */}
                </div>
              </LeftBox>
            </CILeft>

            <CIRight>

              <label>Upload File <span>(File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB)</span></label>
              <UploadBorder>
                <div className="upload-btn-wrapper">
                  <CWBtn2><img src={UploadIcon} alt='' /> Add File(s)</CWBtn2>
                  <input type="file" name='image' required
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
                <input type='text' disabled value={user?.walletAddress || ''}  placeholder='User Wallet Address...' />
              </InputOuter>
              
              <label className='mb-5'>Name</label>
              <InputOuter>
                <input type='text' value={user?.username || ''}  placeholder='Enter the name here.' 
                    onChange={handleChange('name')} required />
                {errors.name && <p className="error">{errors.name}</p>}
              </InputOuter>

              <label className='mb-5'>Email</label>
              <InputOuter>
                <input type='email' value={user?.email || ''}  placeholder='Enter the email here.' 
                    onChange={handleChange('email')} required />
                {errors.email && <p className="error">{errors.email}</p>}
              </InputOuter>

              <label className='mb-5'>DESCRIPTION</label>
              <InputOuter>
                <textarea value={user?.description || ''} onChange={handleChange('description')}
                  required
                  placeholder='Give detailed information and the story behind your NFTs and create a context for the potential owner!' ></textarea>
                {errors.description && <p className="error">{errors.description}</p>}
              </InputOuter>

              <label className='mb-5'>Social Media</label>
              <hr />

              <label className='mb-5'>Facebook</label>
              <InputOuter>
                <input type='url' value={user?.facebook || ''} onChange={handleChange('facebook')}
                  placeholder='Enter the facebook url here.' />
                  {errors.facebook && <p className="error">{errors.facebook}</p>}
              </InputOuter>

              <label className='mb-5'>Twitter</label>
              <InputOuter>
                <input type='url' value={user?.twitter || ''} onChange={handleChange('twitter')}
                    placeholder='Enter the twitter url here.' />
                    {errors.twitter && <p className="error">{errors.twitter}</p>}
              </InputOuter>
              
              <div className='s-row'>
                <CWBtn type='submit'>Update</CWBtn>
              </div>

            </CIRight>
          </CIOuter>
        </form>
      </Gs.Container>
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
`;


const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px;
  .img-outer{ border-radius: 2px; 
    width:100%; height:246px; overflow:hidden; border: 1px solid #7BF5FB; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
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
      profileUpdate: (params) => dispatch(actions.profileUpdate(params)),
      getNFTList: () => dispatch(actions.getNFTList()),
    }
}
  
const mapStateToProps = (state) => {
    return {
        loggedUser: state.fetchUser,
        updated: state.profileUpdated,
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(UpdateProfile);
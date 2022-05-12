import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';
import ClipLoader from "react-spinners/ClipLoader";
import { ImUpload } from 'react-icons/im';

import UBorder from '../assets/images/dotted-border.png';
import { actions } from '../actions';
import { connect } from 'react-redux';
import { Toast } from '../helper/toastify.message';


const DragAndDrop = (props) => {
  
  const {selectedProjectId ,uploadSocialCSV, socialCSVData, onClose } = props
  const [socialTicketsCSV , setSocialTicketsCSV ] = useState();
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    if (socialCSVData) {
      Toast.success('CSV has been uploaded.!')
      onClose() // close the modal
    }
  }, [socialCSVData])

  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <InputOuter>
            <UploadBorder>
              <div className="upload-btn-wrapper">
                <CWBtn2>Add CSV File here</CWBtn2>
                <input
                  type="file"
                  accept=".csv"
                  name="myfile"
                  onChange ={(e)=>{setSocialTicketsCSV(e.target.files[0])}} />
              </div>
              {!socialTicketsCSV&& <p>or drop it right here</p>}
              {socialTicketsCSV && <p>{socialTicketsCSV.name}</p>}
            </UploadBorder>
          </InputOuter>
          {socialTicketsCSV && !loading &&
            <div style={{ textAlign: "center" }}>
              <CWBtn style={{ marginBottom: "0px" }} 
              onClick={()=>{uploadSocialCSV(socialTicketsCSV , selectedProjectId); setLoading(true);}}><ImUpload /> Upload</CWBtn>
            </div> }
          {loading && <div style={{ textAlign: "center" }}>
              <CWBtn style={{ marginBottom: "0px" }} disabled={true} >
                <ClipLoader loading={true} size={24} />uploading...</CWBtn>
            </div>}
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    uploadSocialCSV:(csvData,selectedProjectId)=>dispatch(actions.uploadSocialCSV(csvData,selectedProjectId)),
  }
}

const mapStateToProps = (state) => {
  return {
    web3Data: state.isAuthenticated,
    projects: state.allProjects,
    socialCSVData: state.socialCSVData,
    singleNFTDetails: state.singeNFTDetails,
    unapprovedSubAdmins: state.unapprovedSubAdmins
  }
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const USHOuter = styled.div`
  padding:50px 30px 30px; width:100%;
`;

const CWBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 15px 20px 15px; width:100%; border:none; transition: all .4s ease-in-out; margin-bottom:40px; display:flex; align-items:center; justify-content:center;
  :hover{opacity:0.9;}
  svg{font-size:24px; margin-right:5px;}
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
  ${Media.md} {
    width:500px;
  }
  ${Media.sm} {
    width:400px;
  }
  ${Media.xs} {
    width:275px;
  }
  ${Media.xs2} {
    width:200px;
  }
`;

const CWBtn2 = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 600; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:14px 50px 14px 51px; border:none; transition: all .4s ease-in-out; 
  ${Media.md} {
    padding:14px;
  }
  :hover{opacity:0.9;}
  img{margin-right:7px;}
  &.add-more{display:flex; align-items:center;
    svg{margin-right:10px; font-size:16px;}
  }
  &.ver2{width:100%; display:flex; align-items:center; justify-content:center; min-height:50px; padding:0px;
    svg{margin-right:5px;}
  }
`;

export default connect(mapStateToProps, mapDipatchToProps)(DragAndDrop);

import React, { useEffect, useState } from 'react'
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';

import { actions } from '../actions';
import { getContractInstance } from '../helper/web3Functions';
import { web3 } from '../web3';

import UBorder from '../assets/images/dotted-border.png';
import UploadIcon from '../assets/images/upload.png';
import UploadSocialCSVModal from '../modals/uploadSocialCSV';
import GenerateMerkleHashModal from '../modals/generateMerkleHash';
import ConfirmModal from '../modals/confirm-message';

const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)

const SubAdmin = (props) => {
  const [selectedProjectId, setSelectedProjectId] = useState('');
  
  const [platformFee, setPlatformFee] = useState('');
  const [openCSVModal, setOpenCSVDModal] = useState(false);
  const [openSnapShotModal, setOpenSnapShotModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { getUnapprovedSubAdmins, unapprovedSubAdmins, projects, getProjects, web3Data , uploadSocialCSV } = props
  const [selectedTab, setSelectedTab] = useState(0);
  const [address, setAddress] = useState('');
  const pauseUnpauseModule = <><InputOuter>
    <CITitle>Pause the Nft contract - This will cease the minting till you upause it again.</CITitle>
    <div className='s-row'>
      <CWBtn onClick={() => makeTransaction(undefined, 'pause')}>Pause</CWBtn>
    </div>
  </InputOuter>
    <InputOuter>
      <CITitle>Unpause the Nft contract - This will get the contract running back like normal.</CITitle>
      <div className='s-row'>
        <CWBtn onClick={() => makeTransaction(undefined, 'unpause')}>Unpause</CWBtn>
      </div>
    </InputOuter>
  </>
  const addPaymentTokenModule = <><InputOuter>
    <CITitle>Add Payment token</CITitle>
    <input type='text' placeholder='Enter the address of the token.' onChange={(e) => setAddress(e.target.value)} />
  </InputOuter>
    <div className='s-row'>
      <CWBtn onClick={() => makeTransaction()}>Submit</CWBtn>
    </div></>

  const setPlatformFeeModule = <><InputOuter>
    <CITitle>Set the platform fee</CITitle>
    <input type='text' placeholder='Enter the address of the token.' onChange={(e) => setPlatformFee(e.target.value)} />
  </InputOuter>
    <div className='s-row'>
      <CWBtn onClick={() => makeTransaction()}>Submit</CWBtn>
    </div></>

  const subAdminListmodule = <><CITitle>Sub Admin List</CITitle>
    <div className='table-responsive'>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <th style={{ width: "50px" }}>No.</th>
          <th>Name</th>
          <th>Project Name</th>          
          <th>Wallet Address</th>
          <th>Website URL</th>
          <th>Actions</th>
        </thead>
        <tbody>{unapprovedSubAdmins?.map((subAdmin, key) =>
          <tr>
            <td>{key + 1}</td>
            <td>{subAdmin.name}</td>      
            <td>{subAdmin.projectName}</td>
            <td>{subAdmin.walletAddress}</td>
            <td>{subAdmin.email}</td>
            <td><CWBtn onClick={() => makeTransaction(key)}>{subAdmin.status === "approved" ? "Approved !" : "Approve"}</CWBtn></td>
          </tr>)}
        </tbody>
      </table>
    </div></>

  const uploadResultsModule = <>
    <CITitle>Social Media Details</CITitle>
    <InputOuter>
      <UploadBorder>
        <div className="upload-btn-wrapper">
          <CWBtn2><img src={UploadIcon} alt='' /> Add CSV File here</CWBtn2>
          <input
            type="file"
            name="myfile" 
            />
        </div>
        <p>or drop it right here</p>
      </UploadBorder>
    </InputOuter>
    <CWBtn  >Upload CSV</CWBtn>
  </>

  const projectsListModule = <><CITitle>Projects List</CITitle>
    <div className='table-responsive'>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <th style={{ width: "50px" }}>No.</th>
          <th>Project Name</th>
          <th>Owner</th>
          <th>Website URL</th>
          <th>Actions</th>
        </thead>
        <tbody>{projects?.map((project, key) =>
          <tr>
            <td>{key + 1}</td>
            <td>{project.projectName}</td>
            <td>{project.createdBy?.name}</td>
            <td>{project.webUrl}</td>
            <td><CWBtn onClick={() =>{setSelectedProjectId(project._id); setOpenCSVDModal(true)}} > {"Upload CSV"} </CWBtn>
              <CWBtn onClick={() => {setSelectedProjectId(project._id);setOpenSnapShotModal(true)}} > {"SnapShot"} </CWBtn>
              <CWBtn onClick={() => {setSelectedProjectId(project._id);setOpenConfirmModal(true)} }> dummy</CWBtn>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div></>

  const buttons =
    [{ name: "Approve Sub-Admins", type: "callAdmins", fxnName: "addWhitelist", module: subAdminListmodule, },
    //  {name: "Ongoing INOs", type:"callINOs",fxnName:"",module:addPaymentTokenModule},
    { name: "Add/Remove Payment Token", type: 'addremovetoken', fxnName: "addTokenAddress", module: addPaymentTokenModule },
    { name: "Pause/Unpause", type: "pauseUnpause", fxnName: "pause", module: pauseUnpauseModule },
    { name: "Set Platform Fee", type: "platformfee", fxnName: "setPlatformFees", module: setPlatformFeeModule },
    { name: "Upload Social Media Results", type: "platformfee", fxnName: "setPlatformFees", module: uploadResultsModule },
    { name: "Projects List", type: "platformfee", fxnName: "setPlatformFees", module: projectsListModule },
    ];

  useEffect(() => {
    if (!projects) getProjects()
  }, [])

  console.log('projects : ', projects)


  useEffect(() => {
    if (selectedTab === 0) getUnapprovedSubAdmins()
  }, [selectedTab, getUnapprovedSubAdmins])

  const makeTransaction = async (key, sfxn) => {
    const nftContractInstance = getContractInstance(selectedTab === 3 ? "marketPlace" : 'nft');
    let params;
    if (selectedTab === 0) {
      params = [unapprovedSubAdmins[key].walletAddress];
    }
    else if (selectedTab === 2) { params = []; }
    else if (selectedTab === 3) { params = [web3.utils.toWei(platformFee)] }
    else params = [address]
    const fxn = sfxn ? sfxn : buttons[selectedTab].fxnName
    try {
      await nftContractInstance.methods[fxn](...params)
        .send({ from: web3Data.accounts[0] })
        .on('transactionHash', (hash) => {
          return this.popup('process');
        })
        .on('receipt', (receipt) => {
          window.removeEventListener('receipt', this.withdraw);
          return onReciept(receipt);
        })
        .on('error', (error) => {
          window.removeEventListener('error', this.withdraw);
          return onTransactionError(error);
        });
    } catch (err) { console.log(err) }
  }
  const onReciept = (receipt) => {
    if (receipt.status) {
      // this.getUserData(this.state.web3Data);
      // this.popup('success', 'Transaction Successful', true);
    } else {
      console.log('error');
    }
  };
  const onTransactionError = (error) => {
    let msg = 'Transaction reverted';
    if (error.code === 4001) {
      msg = 'Transaction denied by user';
    } else if (error.code === -32602) {
      msg = 'wrong parameters';
    } else if (error.code === -32603) {
      msg = 'Internal Error';
    } else if (error.code === -32002) {
      msg = 'Complete previous request';
    }
    this.popup('error', msg, true);
  };


  return (
    <Gs.Container>
      <CIOuter>
        <CILeft>
          <CITitle>Admins</CITitle>
          <div className='tab-list'>
            {buttons.map((btn, key) => <button className={selectedTab === key && "active"} onClick={() => setSelectedTab(key)}>{btn.name}</button>)}
          </div>
        </CILeft>
        <CIRight>
          {buttons[selectedTab].module}
        </CIRight>
      </CIOuter>

      <Modal open={openCSVModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenCSVDModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal4',
      }}>
        <UploadSocialCSVModal selectedProjectId={selectedProjectId}/>
      </Modal>

      <Modal open={openSnapShotModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenSnapShotModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        <GenerateMerkleHashModal selectedProjectId={selectedProjectId} />
      </Modal>

      <Modal open={openConfirmModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenConfirmModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3 no-close',
      }}>
        <ConfirmModal close={() => setOpenConfirmModal(false)} />
      </Modal>

    </Gs.Container>
  );
};

const mapDipatchToProps = (dispatch) => {
  return {
    uploadSocialCSV:(csvData,selectedProjectId)=>dispatch(actions.uploadSocialCSV(csvData,selectedProjectId)),
    getUnapprovedSubAdmins: () => dispatch(actions.getUnapprovedSubAdmins()),
    getProjects: () => dispatch(actions.getProjects()),
    authLogin: (nonce, signature) => dispatch(actions.authLogin(nonce, signature)),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    web3Data: state.isAuthenticated,
    projects: state.allProjects,
    singleNFTDetails: state.singeNFTDetails,
    unapprovedSubAdmins: state.unapprovedSubAdmins
  }
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
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

const CILeft = styled.div`
  width:278px;
  ${Media.md} {
    margin-bottom:30px; width:100%;
  }
  .tab-list{ margin-bottom:32px; border-bottom:0px;
      button{width:100%; display:flex; align-items:center; justify-content:center; text-align:center; opacity:0.5; font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 17px; line-height: 20px; color: #6BFCFC; min-height:67px;
      border: 1px solid #7BF5FB; box-sizing: border-box; background-color:transparent;
      &.active{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
    }
  }
`;

const CIRight = styled.div`
  width:calc(100% - 323px); margin-left:45px;
  ${Media.md} {
    width:100%; margin-left:0px;
  }
  .table-responsive
  {
    overflow-x:auto;
    table{width:100%; border-bottom:1px solid #7BF5FB; border-right:1px solid #7BF5FB; table-layout: fixed;
      th,td{border:1px solid #7BF5FB; text-align:center; padding:10px; border-bottom:0px; border-right:0px; word-break:break-word;
        ${Media.md} {
          word-break:initial;
        }
      }
      ${Media.md} {
        table-layout: initial;
      }
    }
  }
`;

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:10px 15px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
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

const CWBtn2 = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 600; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:14px 50px 14px 51px; border:none; transition: all .4s ease-in-out; 
  :hover{opacity:0.9;}
  img{margin-right:7px;}
  &.add-more{display:flex; align-items:center;
    svg{margin-right:10px; font-size:16px;}
  }
  &.ver2{width:100%; display:flex; align-items:center; justify-content:center; min-height:50px; padding:0px;
    svg{margin-right:5px;}
  }
`;

export default connect(mapStateToProps, mapDipatchToProps)(SubAdmin);
// export default ;
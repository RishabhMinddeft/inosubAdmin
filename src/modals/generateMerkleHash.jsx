import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import { MdOutlineFindReplace } from 'react-icons/md';
import ClipLoader from "react-spinners/ClipLoader";
import { ImUpload } from 'react-icons/im';
import { actions } from '../actions';
import { connect } from 'react-redux';
import { createRootHash } from '../helper/Merkle';
import { getContractInstance } from '../helper/web3Functions';
import { Toast } from '../helper/toastify.message';

const GenerateMerkleHashModal = (props) => {
  
  const { blockChainId } = props;
  const [loading, setLoading] = useState(false);
  const [merkleHash,setMerkleHash] = useState('');
  const [process,setProcess] = useState(1);
  const {selectedProjectId,fetchSnapshotWinnersData,snapshotWinnersData,user,onClose,getProjects,web3Data,addMerkleHash , addedMerkleHash} = props
  
  useEffect(()=>{
    if(snapshotWinnersData){setProcess(2)}
  },[snapshotWinnersData])
  
  const generateMerkleHash=()=>{
    const _merkleHash = createRootHash(snapshotWinnersData);
    setMerkleHash(_merkleHash)
    addMerkleHash(selectedProjectId,_merkleHash)

  }

  const upDateHash = async() =>{
    if(!merkleHash){
      Toast.error('Generate Hash First.!')
      return false;
    }
    setLoading(true) // start loading
    const nftContractInstance = getContractInstance('nft');
    try {
      await nftContractInstance.methods.updateProject(blockChainId, merkleHash)
        .send({ from: web3Data.accounts[0] })
        .on('transactionHash', (hash) => {
          window.removeEventListener('transactionHash', upLoadHash);

        })
        .on('receipt', (receipt) => {
          window.removeEventListener('receipt', upLoadHash);
          return onReciept(receipt);
        })
        .on('error', (error) => {
          window.removeEventListener('error', upLoadHash);
          return onTransactionError(error);
          // return this.popup('error', error.message, true);
        });
    } catch (err) { console.log(err) }
  }

  const upLoadHash = async() =>{
    if(!merkleHash){
      Toast.error('Generate Hash First.!')
      return false;
    }
    setLoading(true) // start loading
    const nftContractInstance = getContractInstance('nft');
    try {
      await nftContractInstance.methods.createProject(merkleHash)
        .send({ from: web3Data.accounts[0] })
        .on('transactionHash', (hash) => {
          window.removeEventListener('transactionHash', upLoadHash);

        })
        .on('receipt', (receipt) => {
          window.removeEventListener('receipt', upLoadHash);
          return onReciept(receipt);
        })
        .on('error', (error) => {
          window.removeEventListener('error', upLoadHash);
          return onTransactionError(error);
          // return this.popup('error', error.message, true);
        });
    } catch (err) { console.log(err) }
  }

  const onReciept = (receipt) => {
    if (receipt.status) {
      setLoading(false);
      Toast.success(blockChainId ? 'Hash updated succesfully.!'
        : 'Hash uploaded succesfully.!')
      getProjects(user._id) // refresh the project list
      onClose() // close the modal
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
    Toast.error(msg)
    onClose() // close the modal
  };

  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <CDDesc><b>Info :</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem exercitationem pariatur soluta non commodi? Animi repellat at, aut tempora odit quam ducimus alias maiores expedita debitis consequatur vero corrupti dolor.</CDDesc>
            
            {process===1 && <CWBtn onClick={()=>{fetchSnapshotWinnersData(selectedProjectId)}}>
            
            <MdOutlineFindReplace /> Fetch Snapshot Registered User Data</CWBtn>}
            
            {process===2 && <>
              <InputOuter>
                <input type="text" placeholder='' disabled value={merkleHash} />
              </InputOuter>
              <GBtn disabled={merkleHash ? true:false} onClick={()=>generateMerkleHash()}>Generate User Data Hash</GBtn>
            </>}
          
            {loading && <div>
              <CWBtn style={{ marginBottom: "0px" }} disabled={true} >
                <ClipLoader loading={true} size={24} />loading...</CWBtn>
            </div>}
          
            {merkleHash && !loading && <div>
              {!blockChainId && <CWBtn style={{ marginBottom: "0px" }} onClick={()=>upLoadHash()}><ImUpload /> Upload</CWBtn>}
              {blockChainId && <CWBtn style={{ marginBottom: "0px" }} onClick={()=>upDateHash()}><ImUpload /> Update</CWBtn>}
            </div>}
          
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    getProjects: (id) => dispatch(actions.getProjects(id)),
    addMerkleHash:(projectId, merkleHash)=>dispatch(actions.addMerkleHash(projectId ,merkleHash)) ,
    fetchSnapshotWinnersData:(projectId)=>dispatch(actions.fetchSnapshotWinnersData(projectId)),
  }
}

const mapStateToProps = (state) => {
  return {
    addedMerkleHash:state.addedMerkleHash,
    web3Data: state.isAuthenticated,
    user: state.fetchUser,
    snapshotWinnersData :state.snapshotWinnersData,

  }
}

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

export default connect(mapStateToProps, mapDipatchToProps)(GenerateMerkleHashModal);

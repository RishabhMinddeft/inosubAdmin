import React, { useEffect, useState } from 'react'
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import { connect } from 'react-redux';
import { actions } from '../actions';
import { getContractInstance } from '../helper/web3Functions';

const SubAdmin = (props) => {
  const {getUnapprovedSubAdmins , unapprovedSubAdmins } = props
  const buttons = [ {name:"Approve Sub-Admins", type:"callAdmins"}, {name: "Ongoing INOs", type:"callINOs"}] ;
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(()=>{
    if(selectedTab === 0) getUnapprovedSubAdmins()
  },[selectedTab,getUnapprovedSubAdmins])

  const approveSubAdmin=async(key)=>{
    const nftContractInstance = getContractInstance('nft');
    
    const params = [unapprovedSubAdmins[key].walletAddress];
    try{
    await nftContractInstance.methods
    .addWhitelist(...params)
    .send({ from: "0x863Ce3D6Aa68851aF2AdB09A479369326C3B1E13" })
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
  }catch(err){console.log(err)}

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
            {buttons.map((btn,key)=><button className={selectedTab===key && "active"} onClick={()=>setSelectedTab(key)}>{btn.name}</button> ) }
            
          </div>
        </CILeft>
        <CIRight>
          <CITitle>Sub Admin List</CITitle>
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
              <tbody>{unapprovedSubAdmins?.map((subAdmin,key)=>
              <tr>
                  <td>{key+1}</td>
                  <td>{subAdmin.name}</td>
                  <td>{subAdmin.projectName}</td>
                  <td>{subAdmin.walletAddress}</td>
                  <td>{subAdmin.email}</td>
                  <td><CWBtn onClick={()=>approveSubAdmin(key)} >Approve</CWBtn></td>
                </tr>)}
                
                {/* <tr>
                  <td>2</td>
                  <td>John Abraham</td>
                  <td>XYZ</td>
                  <td>fjhfsy7werAjdaDHD673bsySDASAX26832s</td>
                  <td>https://www.google.com/https://www.google.com/https://www.google.com/</td>
                  <td><CWBtn>Approve</CWBtn></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>John Abraham</td>
                  <td>XYZ</td>
                  <td>fjhfsy7werAjdaDHD673bsySDASAX26832s</td>
                  <td>https://www.google.com/</td>
                  <td><CWBtn>Approve</CWBtn></td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </CIRight>
      </CIOuter>
    </Gs.Container>
  );
};

const mapDipatchToProps = (dispatch) => {
  return {
    getUnapprovedSubAdmins :()=>dispatch(actions.getUnapprovedSubAdmins()),
    authLogin: (nonce, signature) => dispatch(actions.authLogin(nonce, signature)),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    web3Data:state.fetchWeb3Data,
    singleNFTDetails: state.singeNFTDetails,
    unapprovedSubAdmins:state.unapprovedSubAdmins
  }
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
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
export default connect (mapStateToProps, mapDipatchToProps)(SubAdmin);
// export default ;
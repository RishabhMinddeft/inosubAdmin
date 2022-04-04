import React, { useEffect, useState } from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DateModal from '../modals/choose-date';
import CompleteListingModal from '../modals/complete-listing';
import ListedForSaleModal from '../modals/listed-for-sale';
import Media from '../theme/media-breackpoint';
import { connect } from 'react-redux';
import ProfileIMG from '../assets/images/dummy1.jpg';
import EyeIcon from '../assets/images/eye.png';
import DollarIcon from '../assets/images/dollar.png';
import RocketIcon from '../assets/images/rocket.png';
import ArrowDown from '../assets/images/arrow-down.png';
import CalenderIcon from '../assets/images/calender.png';
import ArrowRight from '../assets/images/arrow-right-thin.png';
import { getContractInstance } from '../helper/web3Functions';
import { useLocation } from 'react-router';
import { actions } from '../actions';
import { TimeStampToDateString } from '../helper/functions';
const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const MintItem = (props) => {
  const { singleNFTDetails, getSingleNFTDetails } = props
  console.log(singleNFTDetails)
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openStepsModal, setOpenStepsModal] = useState(false);
  const [openSuccessModal, setopenSuccessModal] = useState(false);
  const [saleState,setSaleState ] = useState('fixed');
  const [startDate,setStartDate ] = useState('');
  const [endDate, setEndDate] = useState('')
  const [currency, setCurrency] = useState('binance')
  const [price,setPrice] = useState('');
  const [priceStep,setPriceStep] = useState('');
  const [stepInterval,setStepInterval] = useState('');
  const [endPrice,setEndPrice] = useState('')
  const [isSpecificBuyer, setIsSpecificBuyer ] = useState(false);
  const [specificBuyerAddress , setSpecificBuyerAddress  ] = useState('')
  let query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    console.log(id);
    getSingleNFTDetails(id)
    // /nft/single/623c6c9e6036575c7ffe0b7d
  }, [])

  const putOnSale = async () => {
    console.log("this 1")
    const nftContractInstance = getContractInstance('nft');
    console.log("this 2")
    // const { web3Data, deposits } = this.state;
    // if (!web3Data.isLoggedIn)
    //   return this.popup('error', 'Please connect to metamask');
    // if (new Date().getTime() / 1000 < +deposits[2])
    //   return this.popup('error', "Didn't reached maturity date .");
    // let params = [tokenId,copies, price , saleState , startDate , endDate, paymentTokenAdrdess ]
    let params = []
    try{
    await nftContractInstance.methods
      .placeOrder(...params)
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
        // return this.popup('error', error.message, true);
      });
    }catch(err){console.log(err)}
  };

  const onReciept = (receipt) => {
    if (receipt.status) {
      this.getUserData(this.state.web3Data);
      this.popup('success', 'Transaction Successful', true);
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

  const setDuration=(timeArr)=>{
    setStartDate(Math.floor(timeArr[0].getTime()/1000))
    setEndDate(Math.floor(timeArr[1].getTime()/1000))
  }
  console.log(startDate,endDate)
  return (
    <>
      <Gs.Container>
        <IDOuter>
          <IDLeft>
            <IDHeader>
              <IDTitle>List item for sale</IDTitle>
              <div className='view'>
                <img src={EyeIcon} alt='' />
                <p>235</p>
              </div>
            </IDHeader>
            <hr />
            <CustomTabs2>
              <label>Type</label>
              <div className='tab-main'>
                <div className='tab-list'>
                  <button className='active' onClick={() => setSaleState('fixed')}><img src={DollarIcon} alt='' /> Fixed Price</button>
                  <button onClick={() => setSaleState('dutchAuction')}><img src={RocketIcon} alt='' /> Timed</button>
                </div>
                <label>Description</label>
                  <FDEsc>{singleNFTDetails?.nftDetails.description}</FDEsc>
{/* ------------------------------------------------------------ */}
                {saleState==='fixed'? <div className='tab-panel'>                
                  <label>Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select onClick={(e) => setCurrency(e.target.value)}>
                          <option value='ethereum'>ETH</option>
                          <option value='seedify'>SFUND</option>
                          <option value='binance'>BNB</option>
                        </select>
                        <DArrow>
                          <img src={ArrowDown} alt='' />
                        </DArrow>
                      </div>
                    </InputOuter>
                    <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' onChange={(e) => setPrice(e.target.value)} />
                    </InputOuter>
                  </PriceOuter>
                  <label>Start time</label>
                  <DateOuter>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>{TimeStampToDateString(startDate) }</DateText>
                    {/* <div className='ar-bg'>
                      <img src={ArrowRight} alt='' />
                    </div>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>{TimeStampToDateString(endDate)}</DateText> */}
                  </DateOuter>
                  <hr />
                  {/* <label className='mt-32'>More Options</label> */}
                  {/* <BigInputOuter>
                    <div className='big-input-box'>
                      <CustomSwitch>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                      </CustomSwitch>
                      Sell as a bundle
                    </div>
                  </BigInputOuter> */}
                  {/* <BigInputOuter>
                    <div className='big-input-box'>
                      <CustomSwitch>
                        <label className="switch">
                          <input type="checkbox"  onChange = {(e)=>setSpecificBuyerAddress(e.target.checked)}/>
                          <span className="slider round"></span>
                        </label>
                      </CustomSwitch>
                      Reserve for specific buyer. (The buyer can purchase the item after it's listed.
                    </div>
                  </BigInputOuter> */}
                  {/* {isSpecificBuyer? <InputOuter className='w80 mb-0'>
                    <input type='text' placeholder='Enter the buyer’s id'  onChange={(e)=>setSpecificBuyerAddress(e.target.value)} />
                  </InputOuter>:null} */}
                </div>
                :null}
                {/* ------------------------------------------------------------------------------- */}

                {saleState==='dutchAuction'?<div className='tab-panel'>
                  {/* <label>Method</label>
                  <InputOuter>
                    <div className='select-outer'>
                      <select>
                        <option>Sell to the highest bidder</option>
                        <option>Sell to the this user</option>
                      </select>
                      <DArrow>
                        <img src={ArrowDown} alt='' />
                      </DArrow>
                    </div>
                  </InputOuter> */}
                  <label>Starting Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select>
                          <option>ETH</option>
                          <option>SFUND</option>
                          <option>BNB</option>
                        </select>
                        <DArrow>
                          <img src={ArrowDown} alt='' />
                        </DArrow>
                      </div>
                    </InputOuter>
                    <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' />
                    </InputOuter>
                  </PriceOuter>
                  <label>End Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select onClick={(e)=>setCurrency(e.target.value)}>
                          <option>ETH</option>
                          <option>SFUND</option>
                          <option>BNB</option>
                        </select>
                        <DArrow>
                          <img src={ArrowDown} alt='' />
                        </DArrow>
                      </div>
                    </InputOuter>
                    <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' onChange={(e)=>endPrice(e.target.value)} />
                    </InputOuter>
                  </PriceOuter>
                  <label>Duration</label>
                  <DateOuter>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>{TimeStampToDateString(startDate) }</DateText>
                    <div className='ar-bg'>
                      <img src={ArrowRight} alt='' />
                    </div>
                    <img src={CalenderIcon} alt='' onClick={() => setOpenDateModal(true)} />
                    <DateText>{TimeStampToDateString(endDate)}</DateText>
                  </DateOuter>
                  <label>Price Step</label>
                  <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' onChange={(e)=>setPriceStep(e.targetvalue)} />
                    </InputOuter>
                    <label>Step Interval</label>
                  <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' onChange={(e)=>setStepInterval(e.targetvalue)}/>
                    </InputOuter>
                  <hr className='ver2' />
                  <p></p>
                  {/* <label>More Options</label> */}
                  {/* <BigInputOuter>
                    <div className='big-input-box'>
                      <CustomSwitch>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                      </CustomSwitch>
                      Include reserve price
                    </div>
                  </BigInputOuter> */}
                  {/* <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select>
                          <option>ETH</option>
                          <option>SFUND</option>
                          <option>BNB</option>
                        </select>
                        <DArrow>
                          <img src={ArrowDown} alt='' />
                        </DArrow>
                      </div>
                    </InputOuter>
                    <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount of reserve fee' />
                    </InputOuter>
                  </PriceOuter>                   */}
                </div>:null}
              </div>
              <hr className='ver2' />
                  <label onClick={() => setOpenStepsModal(true)}>Fees</label>
                  <SFee>Service fee is <span>2.5%</span></SFee>
                  <CWBtn onClick={() => putOnSale()}>Sell</CWBtn>

              {/* ------------------------------------------------------------------------------- */}
            </CustomTabs2>

          </IDLeft>
          
          <IDRight>
            <div className='img-outer'>
              <img src={singleNFTDetails ? `https://ipfs.io/ipfs/${singleNFTDetails.nftDetails.image}` : ProfileIMG} alt='' />
            </div>
          </IDRight>
        </IDOuter>
      </Gs.Container>
      <Modal open={openDateModal} closeIcon={closeIcon} onClose={() => setOpenDateModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        <DateModal setOpenDateModal ={setOpenDateModal} setDuration = {setDuration} />
      </Modal>
      <Modal open={openStepsModal} closeIcon={closeIcon} onClose={() => setOpenStepsModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        <CompleteListingModal />
      </Modal>
      <Modal open={openSuccessModal} closeIcon={closeIcon} onClose={() => setopenSuccessModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal4',
      }}>
        <ListedForSaleModal />
      </Modal>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    getSingleNFTDetails: (id) => dispatch(actions.getSingleNFTDetails(id)),
    createNFT: (data) => dispatch(actions.createNFT(data)),
    enableMetamask: () => dispatch(actions.enableMetamask()),
    enabledWalletConnect: () => dispatch(actions.enabledWalletConnect()),
    generateNonce: (address) => dispatch(actions.generateNonce(address)),
    authLogin: (nonce, signature) => dispatch(actions.authLogin(nonce, signature)),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    singleNFTDetails: state.singeNFTDetails
  }
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const IDOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:73px 0px 92px;
  ${Media.md} {
    flex-direction:column-reverse;
  }
`;

const IDLeft = styled.div`
  width:50%;
  hr{margin:24px 0px; border-color: rgba(255, 255, 255, 0.17); border-top:0px;
    &.ver2{margin:32px 0px;}
  }
  ${Media.md} {
    width:100%;
  }
`;

const IDRight = styled.div`
  width:50%;
  .img-outer{ background: linear-gradient(0deg, rgba(26, 35, 42, 0) 84.72%, rgba(123, 245, 251, 0.1) 98.82%), #13151C; padding:24px;
    border: 1px solid #7BF5FB; box-sizing: border-box; width:532px; height:532px; overflow:hidden; border-radius: 2px; margin-left:auto;
    img{width:100%; height:100%; object-fit:cover;}
    ${Media.md2} {
      width:400px; height:400px;
    }
    ${Media.md} {
      width:100%; height:100%;
    }
    ${Media.xs} {
      padding:10px;
    }
  }
  ${Media.md} {
    width:100%; margin-bottom:30px;
  }
`;

const IDHeader = styled(FlexDiv)`
  justify-content:space-between;
  .view{display:flex; align-items:center; justify-content:center; background: #2D2F43; border-radius: 81px; padding:5px 10px 6px;
    p{margin:0px 0px 0px 4px; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF;}
  }
`;

const IDTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF;
`;

const CustomTabs2 = styled.div`
  label{font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #FFFFFF; margin-bottom:16px; display:block;
    &.mt-32{margin-top:32px;}
  }
  .tab-main{
    .tab-list{ display:flex; align-items:center; justify-content:space-between; margin-bottom:0px; border-bottom:0px;
        button{width:calc(50% - 8.5px); text-align:center; opacity:0.5; font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 17px; line-height: 20px; color: #6BFCFC; min-height:67px;
        display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box; background-color:transparent;
        img{margin-right:8px;}
        &.active{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
        :after{display:none;}
      }
    }
    .tab-panel{padding:32px 0px 0px;}
  }
`;

const FDEsc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF; opacity: 0.9; margin:0px 0px 32px;
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

const DArrow = styled.div`
  position:absolute; right:21px; top:15px; z-index:-1;
`;

const PriceOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:space-between; margin-bottom:24px;
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

const BigInputOuter = styled.div`
  margin-bottom:25px;
  input{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:24px; min-height:76px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
  &.mb-50{margin-bottom:50px;}
  .big-input-box{
    width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:24px; min-height:76px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF; display:flex; align-items:center;}
    .react-switch-bg{margin-right:12px !important;}
`;

const CustomSwitch = styled.div`
  .switch{ position: relative; width: 46px; height: 29px; margin-bottom:0px; margin-right:12px;
    span{opacity:1; margin-left:0px;}
  }
  .switch input{opacity: 0; width: 0; height: 0;}
  .slider{position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #585A7A; -webkit-transition: .4s; transition: .4s;}
  .slider:before{position: absolute; content: ""; height: 17px; width: 17px; left: 6px; bottom: 6px; background-color: #8485A7; -webkit-transition: .4s; transition: .4s;}
  input:checked + .slider { background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);}
  input:checked + .slider:before{ background-color:#7BF5FB;}
  input:focus + .slider { box-shadow:none;}
  input:checked + .slider:before{ -webkit-transform: translateX(17px); -ms-transform: translateX(17px); transform: translateX(17px);}
  .slider.round {border-radius: 56px;}
  .slider.round:before{ border-radius: 50%;}
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 83px 20px 84px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

const SFee = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 24px; color: rgba(255, 255, 255, 0.71); margin:0px 0px 32px;
  span{font-family: 'Adrianna Sb'; font-weight:600; color:#7BF5FB;}
`;

const DateOuter = styled(FlexDiv)`
  justify-content:flex-start; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; min-height:50px; padding:15px 16px 15px 17px; width: max-content;
  .ar-bg{width:30px; height:30px; border-radius:50%; background-color: #3D3E53; display:flex; align-items:center; justify-content:center; margin:0px 20px;
    img{margin-right:0px;}
  }
  img{margin-right:10px; cursor:pointer;}
  ${Media.xs} {
    width:auto;
  }
`;

const DateText = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
`;

export default connect(mapStateToProps, mapDipatchToProps)(MintItem);

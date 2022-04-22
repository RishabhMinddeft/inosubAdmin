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
import { useAuth } from '../hooks';
import { TimeStampToDateString } from '../helper/functions';
import { web3 } from '../web3';
import { Toast } from '../helper/toastify.message';
import getContractAddresses from '../contractData/contractAddress/addresses';
import ReactTooltip from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
//0x393fc6dcF517898e0aDe2f8831e65c8A6E9E6D4F

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
const paymentTokenArr = [{ "address": "0x393fc6dcF517898e0aDe2f8831e65c8A6E9E6D4F", name: "USDT" },
{ "address": "0x0000000000000000000000000000000000000000", name: "BNB" }];
const saleTypeNum = { 'BUY': 0, 'DUTCHAUCTION': 1 }


const MintItem = (props) => {
  const { singleNFTDetails, getSingleNFTDetails, web3Data, updateNFT, updatedNFT } = props
  const { isloggedIn } = useAuth({ route: 'mint' }) // route should be same mentioned in routes file without slash
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openStepsModal, setOpenStepsModal] = useState(false);
  const [openSuccessModal, setopenSuccessModal] = useState(false);
  const [saleState, setSaleState] = useState('BUY');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('')
  const [currency, setCurrency] = useState(0)
  const [price, setPrice] = useState('');
  const [priceStep, setPriceStep] = useState('');
  const [stepInterval, setStepInterval] = useState('');
  const [endPrice, setEndPrice] = useState('')
  const [isSpecificBuyer, setIsSpecificBuyer] = useState(false);
  const [specificBuyerAddress, setSpecificBuyerAddress] = useState('')
  const [selectedPaymentToken, setSelectedPaymentToken] = useState(0)
  const [isEndDate, setIsEndDate] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  let query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    console.log(id);
    getSingleNFTDetails(id)
  }, [])

  useEffect(() => {
    if (updatedNFT?.id) {
      putOnSale()
    }
  }, [updatedNFT])

  const _updateNFT = () => {
    const resp = formValidate()
    if (!resp) {
      const obj = {
        price: price,
        startTime: startDate,
        endTime: endDate,
        saleState: saleState,
        nftId: singleNFTDetails._id,
      }
      if (saleState === "DUTCHAUCTION") {
        obj.endPrice = endPrice;
        obj.priceStep = priceStep;
        obj.stepInterval = stepInterval;
      }
      updateNFT(obj);
    }

  }
  useEffect(() => { if (web3Data.accounts[0]) checkIsApproved() }, [web3Data.accounts[0]])

  const checkIsApproved = async () => {
    const nftContractInstance = getContractInstance('nft');
    const { marketPlace } = getContractAddresses()
    try {
      const isApproved = await nftContractInstance.methods.isApprovedForAll(web3Data.accounts[0], marketPlace).call();
      console.log(isApproved)
      setIsApproved(isApproved)
    } catch (err) {
      console.log(err)

    }
  }

  const approve = async () => {
    return new Promise(async (resolve, reject) => {
      const nftContractInstance = getContractInstance('nft');
      const { marketPlace } = getContractAddresses()
      const params = [marketPlace, true];
      try {
        await nftContractInstance.methods.setApprovalForAll(...params)
          .send({ from: web3Data.accounts[0] })
          .on('transactionHash', (hash) => {
            window.removeEventListener('transactionHash', approve);
            Toast.info("Approval transaction Processing")
          })
          .on('receipt', (receipt) => {
            window.removeEventListener('receipt', approve);
            resolve(true)
          })
          .on('error', (error) => {
            window.removeEventListener('error', approve);
            reject(false)
          });
      } catch (err) {
        reject(false)
      }
    })

  }
  const putOnSale = async () => {
    let approval = false;
    if (!isApproved) {
      approval = await approve();
      if (!approval) return Toast.error("Approval failed")
    }
    const nftContractInstance = getContractInstance('marketPlace');
    const paymentTokenAddress = paymentTokenArr[currency].address //"0x0000000000000000000000000000000000000000";//paymentTokenArr[ selectedPaymentToken].address
    console.log(priceStep, price, endPrice)
    let params = saleState === "DUTCHAUCTION" ? [singleNFTDetails.tokenId, singleNFTDetails.totalEdition, web3.utils.toWei(price), startDate, web3.utils.toWei(endPrice), paymentTokenAddress, stepInterval, web3.utils.toWei(priceStep)] : [singleNFTDetails.tokenId, singleNFTDetails.totalEdition, web3.utils.toWei(price), saleTypeNum[saleState], startDate, endDate, paymentTokenAddress]
    const fxn = saleState === "DUTCHAUCTION" ? "placeDutchOrder" : "placeOrder"
    try {
      await nftContractInstance.methods[fxn](...params)
        .send({ from: web3Data.accounts[0] })
        .on('transactionHash', (hash) => {
          window.removeEventListener('transactionHash', putOnSale);
          Toast.info("Transaction Processing")
        })
        .on('receipt', (receipt) => {
          window.removeEventListener('receipt', putOnSale);
          return onReciept(receipt);
        })
        .on('error', (error) => {
          window.removeEventListener('error', putOnSale);
          return onTransactionError(error);
        });
    } catch (err) { console.log(err) }
  };

  const onReciept = (receipt) => {
    if (receipt.status) {
      setopenSuccessModal(true);
      Toast.success('Transaction Successful')
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
  };

  const setDuration = (time) => {
    if (isEndDate) {
      setEndDate(Math.floor(new Date(time).getTime() / 1000))
    } else {
      setStartDate(Math.floor(new Date(time).getTime() / 1000))
    }
  }

  const formValidate = () => {
    if (!saleState) {
      Toast.error('Please enter all the required fields.')
      return true
    } else if (saleState === 'BUY') {
      if (price === '') {
        Toast.error('Please select price.')
        return true
      } else if (startDate === '' || endDate === '') {
        Toast.error('Please select time duration.')
        return true
      } else return false
    } else if (saleState === 'DUTCHAUCTION') {
      if (price === '') {
        Toast.error('Please select starting price.')
        return true
      } else if (endPrice === '') {
        Toast.error('Please select end price.')
        return true
      } else if (startDate === '' || endDate === '') {
        Toast.error('Please select time duration.')
        return true
      } else if (priceStep === '') {
        Toast.error('Please select price step.')
        return true
      } else if (stepInterval === '') {
        Toast.error('Please select step interval.')
        return true
      } else return false
    }
  }

  console.log(startDate, endDate)
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
              <label className='custom-ver'>Type <FaInfoCircle data-html="true" data-tip="<b>Fixed Price :</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, <br /><br /> <b>Dutch Auction :</b> when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." /></label>
              <div className='tab-main'>
                <div className='tab-list'>
                  <button className={saleState === "BUY" && 'active'} onClick={() => setSaleState('BUY')}><img src={DollarIcon} alt='' /> Fixed Price </button>
                  <button className={saleState === "DUTCHAUCTION" && 'active'} onClick={() => setSaleState('DUTCHAUCTION')}><img src={RocketIcon} alt='' /> Dutch Auction</button>
                </div>
                <label>Description</label>
                <FDEsc>{singleNFTDetails?.nftDetails.description}</FDEsc>
                {/* ------------------------------------------------------------ */}
                {saleState === 'BUY' ? <div className='tab-panel'>
                  <label>Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select onClick={(e) => setCurrency(e.target.value)}>
                          {paymentTokenArr.map((token, key) =>
                            <option value={key}>{token.name}</option>
                          )}
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
                  <hr />
                  <label>Duration</label>
                  <DateOuter>
                    <div className='date-inner'>
                      <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setIsEndDate(false) }} />
                      <DateText>{TimeStampToDateString(startDate)}</DateText>
                    </div>
                    <div className='ar-bg'>
                      <img src={ArrowRight} alt='' />
                    </div>
                    <div className='date-inner'>
                      <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setIsEndDate(true) }} />
                      <DateText>{TimeStampToDateString(endDate)}</DateText>
                    </div>
                  </DateOuter>
                </div>
                  : null}
                {/* ------------------------------------------------------------------------------- */}

                {saleState === 'DUTCHAUCTION' ? <div className='tab-panel'>
                  <label>Starting Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select onClick={(e) => setCurrency(e.target.value)}>
                          {paymentTokenArr.map((token, key) =>
                            <option value={key}>{token.name}</option>
                          )}
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
                  <label>End Price</label>
                  <PriceOuter>
                    <InputOuter className='w20 mb-0'>
                      <div className='select-outer'>
                        <select onClick={(e) => setCurrency(e.target.value)}>
                          {paymentTokenArr.map((token, key) =>
                            <option value={key}>{token.name}</option>
                          )}
                        </select>
                        <DArrow>
                          <img src={ArrowDown} alt='' />
                        </DArrow>
                      </div>
                    </InputOuter>
                    <InputOuter className='w80 mb-0'>
                      <input type='text' placeholder='Amount' onChange={(e) => setEndPrice(e.target.value)} />
                    </InputOuter>
                  </PriceOuter>
                  <label>Duration</label>
                  <DateOuter>
                    <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setIsEndDate(false) }} />
                    <DateText>{TimeStampToDateString(startDate)}</DateText>
                    <div className='ar-bg'>
                      <img src={ArrowRight} alt='' />
                    </div>
                    <img src={CalenderIcon} alt='' onClick={() => { setOpenDateModal(true); setIsEndDate(true) }} />
                    <DateText>{TimeStampToDateString(endDate)}</DateText>
                  </DateOuter>
                  <hr />
                  <label>Price Step</label>
                  <InputOuter>
                    <input type='text' placeholder='Enter Number' onChange={(e) => setPriceStep(e.target.value)} />
                  </InputOuter>
                  <label>Step Interval</label>
                  <InputOuter>
                    <input type='text' placeholder='Enter Number' onChange={(e) => setStepInterval(e.target.value)} />
                  </InputOuter>
                </div> : null}
              </div>
              <hr className='ver2' />
              <label>Choose Type</label>
              <CustomRadioButton>
                <label class="radio-container">Public
                  <input type="radio" checked="checked" name="radio" />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-container">Private
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                </label>
              </CustomRadioButton>
              <label onClick={() => setOpenStepsModal(true)}>Fees</label>
              <SFee>Service fee is <span>2.5%</span></SFee>
              <CWBtn onClick={() => _updateNFT()}>Sell</CWBtn>

              {/* ------------------------------------------------------------------------------- */}
            </CustomTabs2>

          </IDLeft>

          <IDRight>
            <div className='img-outer'>
              {singleNFTDetails?.nftDetails.formate === 'video' ?
                <video id='video'
                  controlsList='nodownload'
                  src={`https://ipfs.io/ipfs/${singleNFTDetails.nftDetails.image}`}
                  controls={true}
                  width={'100%'}
                  height={'100%'} />
                : <img src={singleNFTDetails ? `https://ipfs.io/ipfs/${singleNFTDetails.nftDetails.image}` : ProfileIMG} alt='' />}
            </div>
          </IDRight>
        </IDOuter>
      </Gs.Container>
      <Modal open={openDateModal} closeIcon={closeIcon} onClose={() => setOpenDateModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal3',
      }}>
        <DateModal setOpenDateModal={setOpenDateModal} setDuration={setDuration} isEndDate={isEndDate} />
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
        <ListedForSaleModal nftDetails={singleNFTDetails?.nftDetails} />
      </Modal>
      <ReactTooltip className='TT-design ver2' place="right"></ReactTooltip>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    updateNFT: (obj) => dispatch(actions.updateNFT(obj)),
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
  return {
    web3Data: state.isAuthenticated,
    singleNFTDetails: state.singeNFTDetails,
    updatedNFT: state.updatedNFT
  }
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CustomRadioButton = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:30px;
  .radio-container {
    display: block; position: relative; padding-left: 35px; cursor: pointer; font-size: 16px; width: calc(50% - 70px);
  }
  .radio-container input {
    position: absolute; opacity: 0; cursor: pointer;
  }
  .checkmark {
    position: absolute; top: 0; left: 0; height: 20px; width: 20px;
    background-color: transparent; border-radius: 50%; border:1px solid #eee; box-shadow:0px 0px 5px 1px #333;
  }
  .radio-container input:checked ~ .checkmark {
    background-color: transparent; border-color:#6bfcfc;
  }
  .checkmark:after {
    content: ""; position: absolute; display: none;
  }
  .radio-container input:checked ~ .checkmark:after {
    display: block;
  }
  .radio-container .checkmark:after {
    top: 6px; left: 6px; width: 8px; height: 8px; border-radius: 50%; background: #6bfcfc;
  }
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
    &.custom-ver{display:flex; align-items:center; 
      svg{color:#FBC07B; margin-left:5px; font-size:14px;}
    }
  }
  .tab-main{
    .tab-list{ display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; border-bottom:0px;
        button{width:calc(50% - 8.5px); text-align:center; opacity:0.5; font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 17px; line-height: 20px; color: #6BFCFC; min-height:67px;
        display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box; background-color:transparent;
        img{margin-right:8px;}
        &.active{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
        :after{display:none;}
      }
    }
    .tab-panel{}
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
    ${Media.xs} {
      margin:10px auto; transform:rotate(90deg);
    }
  }
  img{margin-right:10px; cursor:pointer;}
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

export default connect(mapStateToProps, mapDipatchToProps)(MintItem);

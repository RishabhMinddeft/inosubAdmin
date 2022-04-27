import React, { useEffect, useState } from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import PleaseWait from '../modals/please-wait';
import ShareCommunity from '../modals/share-community';
import { FaPlusCircle } from 'react-icons/fa';
import Media from '../theme/media-breackpoint';
import { IoMdClose } from 'react-icons/io';

import ProfileIMG from '../assets/images/dummy1.jpg';
import ProfileIMG2 from '../assets/images/dummy2.jpg';
import UBorder from '../assets/images/dotted-border.png';
import UploadIcon from '../assets/images/upload.png';
import ArrowDown from '../assets/images/arrow-down.png';
import ipfs from '../config/ipfs';
import { actions } from '../actions';
import { useAuth } from '../hooks';
import { compressImage } from '../helper/functions';
import { connect } from 'react-redux';
import { getContractInstance } from '../helper/web3Functions';
import { Toast } from '../helper/toastify.message';

const CreateItem = (props) => {
  const { nftCreated, web3Data } = props

  const { isloggedIn } = useAuth({ route: 'create' }) // route should be same mentioned in routes file without slash
  const tabs = [{ tabName: "properties", btnName: 'PROPERTIES', sInput: 'Name' },
  { tabName: "levels", btnName: 'LEVELS', sInput: 'Value' },
  { tabName: "stats", btnName: 'STATS', sInput: 'Number' }]
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState(null);
  const [externalLink, setExternalLink] = useState('');
  const [description, setDescription] = useState('');
  const [supply, setSupply] = useState('');
  const [attributes, setAttributes] = useState({ properties: [], levels: [], stats: [] });
  const [currentAttribute, setCurrentAttribute] = useState({ trait_type: "", value: '' });
  const [isLoading, setIsLoading] = useState({ status: false, title: "", desc: "" })

  const [unLockableContent, setUnclockableContent] = useState();
  const [isUnLockableContent, setIsUnclockableContent] = useState();
  const [network, setNetwork] = useState('ethereum');
  const [currTab, setCurrTab] = useState('properties');
  const [uploadRatio, setUploadRatio] = useState();
  const [collection, setCollection] = useState(null);
  // console.log(name, image, externalLink, description, supply, attributes, unLockableContent, isUnLockableContent)

  const [pleaseWaitModal, setPleaseWaitModal] = useState(false);
  const [createdModal, setCreatedModal] = useState(false);
  const closeIcon = (
    <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
      <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
      <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    </svg>
  )

  useEffect(() => {
    props.getCollections() // fetch the collections list
  }, [])

  console.log('collections list : ', props.collections)

  useEffect(() => {
    if (image) {
      let fileType = image.type
      if (!fileType.search('video')) setType('video')
      else setType('image')
    }
  }, [image])

  const mint = async (ipfs) => {
    const nftContractInstance = getContractInstance('nft');
    const uri = ipfs
    console.log("this 1", ipfs, supply, nftContractInstance, web3Data)
    setIsLoading(prevState => ({
      ...prevState,
      desc: "Please confirm the transaction to mint the item"
    }));
    try {
      await nftContractInstance.methods.mint(supply, 250, uri)
        .send({ from: web3Data.accounts[0] })
        .on('transactionHash', (hash) => {
          // this.setState({ txnHash: hash });
          window.removeEventListener('transactionHash', mint);
          setIsLoading(prevState => ({
            ...prevState,
            desc: "Transaction processing"
          }))
          // Toast.info("Transaction Processing")
        })
        .on('receipt', (receipt) => {

          window.removeEventListener('receipt', mint);
          setCreatedModal(true)
          return onReciept(receipt);
        })
        .on('error', (error) => {
          window.removeEventListener('error', mint);
          return onTransactionError(error);
          // return this.popup('error', error.message, true);
        });
    } catch (err) { console.log(err) }
  };
  useEffect(() => {
    if (nftCreated?.id) {
      console.log(nftCreated)
      mint(nftCreated.ipfs)
    }
  }, [nftCreated])
  const onReciept = (receipt) => {
    if (receipt.status) {
      setPleaseWaitModal(false)
      Toast.success('Item succesfully minted.')
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
    setPleaseWaitModal(false)
    Toast.error(msg)
  };
  const validate = () => {
    const _error = { status: false, msg: '' }
    if (!name || !image || !description || !supply || !network) {
      _error.status = true; _error.msg = "Please enter all the required fields.";
    }
    var res = externalLink?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    console.log(externalLink, res)
    if (externalLink && res == null) {
      _error.status = true; _error.msg = "Please enter valid external link";
    }
    if (!collection) {
      _error.status = true; _error.msg = "Please select collection";
    }
    return _error;
  }

  const submitNFTDetails = async () => {
    const error = validate()
    if (error.status) return Toast.error(error.msg)

    setIsLoading({ status: true, title: "", desc: "Saving Details!" })
    setPleaseWaitModal(true)
    let fileType = image.type
    let compressionRequired = false;
    let compressedNFTFile = image;
    console.log(1, image.size, image.type)
    if (
      image.size > 1572864 &&
      !fileType.search("image") &&
      !fileType.includes("gif")
    ) {
      compressionRequired = true;
      compressedNFTFile = await compressImage(image);
    }
    //
    let originalIpfsHash = await ipfs.add(image, {
      pin: true,
      progress: (bytes) => {
        setUploadRatio(bytes);
      },
    });
    let original_size = image.size
    //
    console.log(2, originalIpfsHash)
    let compressedImageIpfsHash = '';
    if (compressionRequired) {
      compressedImageIpfsHash = await ipfs.add(compressedNFTFile, {
        pin: true,
        progress: (bytes) => {
          setUploadRatio(Math.floor((bytes * 100) / original_size));
        },
      })
    }
    console.log(3, compressedImageIpfsHash)
    //
    const allAttributes = [...attributes.properties, ...attributes.levels, ...attributes.stats];
    console.log(4, allAttributes)
    const metaData = {
      'description': description,
      'name': name,
      'image': originalIpfsHash.path,
      'external_url': externalLink,
      'formate': type,
      attributes: allAttributes
    }
    // const buffer = ipfs.Buffer;
    let objectString = JSON.stringify(metaData);
    // let bufferedString = await buffer.from(objectString);
    console.log(5, objectString)
    let metaDataURI = await ipfs.add(objectString);
    //
    console.log(6, metaDataURI)
    metaData.compressedImg = compressionRequired ? `https://ipfs.io/ipfs/${compressedImageIpfsHash.path}` : `https://ipfs.io/ipfs/${metaData.image}`;
    
    let nftObj = {
      nftDetails: metaData,
      ipfs: `https://ipfs.io/ipfs/${metaDataURI.path}`,
      isUnlockableContent: isUnLockableContent,
      unclockableContent: unLockableContent,
      totalEdition: supply,
      network: network,
      creatorId: localStorage.getItem('userId'),
      collectionId: collection,
    }

    props.createNFT(nftObj)
  }
  const addAttributes = (type) => {
    if (currentAttribute.trait_type !== '' && currentAttribute.value !== '') {
      setAttributes(prevState => ({
        ...prevState,
        [type]: [...attributes[type], currentAttribute]
      }));
    }
    setCurrentAttribute(prevState => ({ ...prevState, trait_type: "", value: '' }))
  }

  const addCurrentAttribute = (input, type) => {
    setCurrentAttribute(prevState => ({
      ...prevState,
      [type]: input
    }))
  }
  console.log(currentAttribute, attributes)
  return (
    <>
      <Gs.Container>
        <CIOuter>
          <CILeft>
            <CITitle >Preview Item</CITitle>
            <LeftBox>
              <div className='img-outer'>
                {type === 'video' ?
                  <video id='video'
                    controlsList='nodownload'
                    src={URL.createObjectURL(image)}
                    controls={true}
                    width={'100%'}
                    height={'100%'} />
                  : <img src={image ? URL.createObjectURL(image) : ProfileIMG} alt='' />}
              </div>
              <CILHeader>
                <CILTitle>{name ? name : "Game Asset Name"}</CILTitle>
                <GreyBadge>10X</GreyBadge>
              </CILHeader>
              <OtherDetail>
                <ODLeft>
                  <div className='img-outer'>
                    <img src={ProfileIMG2} alt='' />
                  </div>
                  <div>
                    <PName>PROJECT NAME</PName>
                    <PDetail>SIDUS</PDetail>
                  </div>
                </ODLeft>
                <ODRight>
                  <PName>PRICE</PName>
                  <SValue>0.01 SFUND</SValue>
                </ODRight>
              </OtherDetail>
            </LeftBox>
          </CILeft>
          <CIRight>
            <label>Upload File <span>(File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB)</span></label>
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
            <label className='mb-5'>Item Name</label>
            <InputOuter>
              <input type='text' placeholder='Enter the name of your NFT item here.' onChange={(e) => setName(e.target.value)} />
            </InputOuter>
            <label className='mb-5'>External Link</label>
            <InputOuter>
              <input type='text' placeholder='Add the link about the item to provide detailed information about the item and direct the user to link.' onChange={(e) => setExternalLink(e.target.value)} />
            </InputOuter>
            <label className='mb-5'>DESCRIPTION</label>
            <InputOuter>
              <textarea placeholder='Give detailed information and the story behind your NFTs and create a context for the potential owner!' onChange={(e) => setDescription(e.target.value)}></textarea>
            </InputOuter>
            <label className='mb-5'>Select Collection</label>
            {/* <InputOuter>
              <select name="collection" onChange={(e) => setCollection(e.target.value)}>
                {props.collections?.map((collection, key) => (
                  <option value={collection._id} key={key}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </InputOuter> */}
            <PriceOuter>
              <InputOuter className='w80 mb-0'>
                <div className='select-outer'>
                  <select name="collection" onChange={(e) => setCollection(e.target.value)}>
                    {props.collections?.map((collection, key) => (
                      <option value={collection._id} key={key}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                  <DArrow>
                    <img src={ArrowDown} alt='' />
                  </DArrow>
                </div>
              </InputOuter>
              <InputOuter className='w20 mb-0'>
                <CWBtn2 className='ver2'><FaPlusCircle /> Create</CWBtn2>
              </InputOuter>
            </PriceOuter>
            <label className='mb-5'>Supply <span className='ver2'>(No gas fees to you!)</span></label>
            <InputOuter>
              <input type='text' placeholder='The number of copies that can be minted.' onChange={(e) => setSupply(e.target.value)} />
            </InputOuter>
            <hr />
            <CustomHTabs>
              <div className='tab-main'>
                <div className='tab-list'>
                  {tabs.map((ele, key) => <button key={key} className={currTab === ele.tabName ? 'active' : null} onClick={() => { setCurrTab(ele.tabName) }}>{ele.btnName}</button>)}
                </div>
                <div className='tab-panel'>
                  <label className='mb-5'>Type</label>
                  <InputOuter>
                    <input type='text' placeholder='Enter a character' value={currentAttribute.trait_type} onChange={(e) => addCurrentAttribute(e.target.value, 'trait_type')} />
                  </InputOuter>

                  {currTab !== "stats" ? <><label className='mb-5'>{currTab === "properties" ? "Name" : "Value"}</label>
                    <InputOuter>
                      <input type='text' placeholder='A complex form might...|' value={currentAttribute.value} onChange={(e) => addCurrentAttribute(e.target.value, 'value')} />
                    </InputOuter>
                  </> :
                    <ValueOuter>
                      <div className="number-row">
                        <div className='number-box'>
                          <label className='mb-5'>Number</label>
                          <InputOuter>
                            <input type='text' value={currentAttribute.value} onChange={(e) => addCurrentAttribute(e.target.value, 'value')} />
                          </InputOuter>
                        </div>
                        <p>of</p>
                        <div className='number-box'>
                          <label className='mb-5'>Number</label>
                          <InputOuter>
                            <input type='text' value={currentAttribute.value} />
                          </InputOuter>
                        </div>
                      </div></ValueOuter>}
                  <Badges>
                    <BadgeList>
                      {attributes[currTab].map((ele, key) =>
                        <BadgeBox key={key}>
                          <Value1>{ele.trait_type}</Value1>
                          <Value2>{ele.value}</Value2>
                          <IoMdClose onClick={() => {
                            let newList = attributes[currTab].filter((item) => item.trait_type !== ele.trait_type || item.value !== ele.value)
                            setAttributes(prevState => ({
                              ...prevState,
                              [currTab]: newList,
                            }));
                          }} />
                        </BadgeBox>)}
                    </BadgeList>
                    <CWBtn2 className='add-more' onClick={() => addAttributes(currTab)}><FaPlusCircle /> Add More</CWBtn2>
                  </Badges>
                </div>
              </div>
            </CustomHTabs>
            <label className='mb-5'>Blockchain</label>
            <InputOuter>
              <div className='select-outer'>
                <select onClick={(e) => setNetwork(e.target.value)}>
                  <option value='ethereum' >Ethereum</option>
                  <option value='polygon'>Polygon</option>
                  <option value='binance'>Binance Smart Chain</option>
                </select>
                <DArrow>
                  <img src={ArrowDown} alt='' />
                </DArrow>
              </div>
            </InputOuter>
            <BigInputOuter>
              <div className='big-input-box'>
                <CustomSwitch>
                  <label className="switch">
                    <input type="checkbox" onChange={(e) => setIsUnclockableContent(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </CustomSwitch>
                Include unlockable content that can only be revealed by the owner of the item.
              </div>
            </BigInputOuter>
            {isUnLockableContent ? <BigInputOuter className='mb-50'>
              <input type='text' placeholder='Enter access key, code to redeem etc. that can only be revealed by the owner of the item.' onChange={(e) => setUnclockableContent(e.target.value)} />
            </BigInputOuter> : null}
            <div className='s-row'>
              <CWBtn onClick={() => submitNFTDetails()}>Submit</CWBtn>
            </div>
          </CIRight>
        </CIOuter>
      </Gs.Container>
      <Modal open={pleaseWaitModal} closeIcon={closeIcon} onClose={() => setPleaseWaitModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}>
        <PleaseWait isLoading={isLoading} title={isLoading.title} description={isLoading.desc} />
      </Modal>
      <Modal open={createdModal} closeIcon={closeIcon} onClose={() => setCreatedModal(false)} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal2',
      }}>
        <ShareCommunity name={name} id={nftCreated?.id} />
      </Modal>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    createNFT: (data) => dispatch(actions.createNFT(data)),
    enableMetamask: () => dispatch(actions.enableMetamask()),
    getCollections: () => dispatch(actions.getCollectionList()),
    enabledWalletConnect: () => dispatch(actions.enabledWalletConnect()),
    generateNonce: (address) => dispatch(actions.generateNonce(address)),
    authLogin: (nonce, signature) => dispatch(actions.authLogin(nonce, signature)),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  return {
    web3Data: state.isAuthenticated,
    authenticated: state.isAuthenticated,
    collections: state.collectionList,
    nonce: state.fetchNonce,
    nftCreated: state.createNFT
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
    margin-bottom:50px;
  }
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

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px;
  .img-outer{ border-radius: 2px; margin-bottom:21px;
    width:100%; height:246px; overflow:hidden; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const CILHeader = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:24px;
`;

const CILTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 21px; line-height: 25px; color: #FFFFFF;
`;

const GreyBadge = styled(FlexDiv)`
  font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #D7E1E9; background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(60px); border-radius: 69px; padding: 0px 8px;
`;

const OtherDetail = styled(FlexDiv)`
  justify-content:space-between; 
`;

const ODLeft = styled(FlexDiv)`
  .img-outer{ border-radius: 2px; width:40px; height:40px; overflow:hidden; border:none; margin-right:8px; margin-bottom:0px;
    img{width:100%; height:100%; object-fit:cover; }
  }
`;

const PName = styled.div`
  font-style: normal; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF; opacity: 0.8; margin:0px 0px 3px;
`;

const PDetail = styled.div`
  font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #FFFFFF;
`;

const ODRight = styled.div`
  text-align:right;
`;

const SValue = styled.div`
  font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF;
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
  &.ver2{width:100%; display:flex; align-items:center; justify-content:center; min-height:50px; padding:0px;
    svg{margin-right:5px;}
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

const CustomHTabs = styled.div`
  margin-bottom:32px;
  .tab-main{
    .tab-list{
      display:flex; align-items:center; justify-content:center; margin-bottom:0px; border-bottom:0px;
      button{
        width:33.33%; text-align:center; opacity:0.5; font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #6BFCFC; min-height:67px;
        display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box; background-color:transparent;
        &.active{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
        :after{display:none;}
      }
    }
    .tab-panel{padding:32px 32px 40px; border: 1px solid #7BF5FB; box-sizing: border-box; border-radius: 2px; border-top-left-radius:0px; border-top-right-radius:0px; border-top:0px;
      ${Media.xs} {
        padding:32px 15px 40px;
      }
    }
  }
`;

const DArrow = styled.div`
  position:absolute; right:21px; top:15px; z-index:-1;
`;

const ValueOuter = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start;
  .value-box{width:calc(70% - 24px); margin-right:24px;
    .input-box{
      width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:76px;
      font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 24px; color: #FFFFFF;
    }
    ${Media.sm} {
      width:100%; margin-right:0px;
    }
  }
  .number-row{display:flex; align-items:center; width:100%;
    .number-box{ width:50%;
      input{text-align:center;}
    }
  }
  p{margin:0px 18px; font-style: normal; font-weight: 500; font-size: 16px; line-height: 20px; color: #FFFFFF;}
  &.mb-0{margin-bottom:0px;}
  ${Media.sm} {
    display:block;
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

const Badges = styled(FlexDiv)`
  justify-content:space-between;
  ${Media.sm} {
    display:block;
  }
`;

const BadgeBox = styled.div`
  background: rgba(54,57,79,0.5); border: 1px solid rgba(255,255,255,0.15); padding: 10px 20px; text-align: center; margin:0px 10px 10px 0px; min-width:100px; position:relative;
  ${Media.sm} {
    min-width:initial;
  }
  svg{position:absolute; top:3px; right:3px; color:rgba(255,255,255,0.3); cursor:pointer; font-size:18px;}
`;

const BadgeList = styled(FlexDiv)`
  justify-content:flex-start; width:75%;
  ${Media.sm} {
    margin-bottom:40px;
  }
`;

const Value1 = styled.div`
  font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 13px; text-transform:uppercase; line-height: 23px; color: rgba(255,255,255,0.9); letter-spacing:0.8px;
`;

const Value2 = styled.div`
  font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(255,255,255,0.5);
`;

const PriceOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:space-between; margin-bottom:40px;
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

export default connect(mapStateToProps, mapDipatchToProps)(CreateItem)
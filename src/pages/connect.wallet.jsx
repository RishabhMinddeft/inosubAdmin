import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';

import { connect } from 'react-redux';

import MetaMask from '../assets/images/metamask.png';
import CoinBase from '../assets/images/coinbase.png';
import WC from '../assets/images/wallet-connect.png';

import { actions } from '../actions';
import { useMetaMaskAuth } from '../hooks';
import { Toast } from '../helper/toastify.message';
import { web3, walletConnectProvider } from '../web3';
import { chainId, chainIdHex } from '../config';



const ConnectWallet = (props) => {

  const { enabledWalletConnect, authenticated,
    generateNonce, nonce, authLogin, user } = props
  const navigate = useNavigate()

  const { activate } = useMetaMaskAuth({
    generateNonce: (account) => {
      generateNonce(account)
    }
  })

  useEffect(() => {
    const sign = async (nonce) => {
      if (nonce && authenticated.accounts[0]) {
        try {
          const signature = await web3.eth.personal.sign(
            web3.utils.utf8ToHex(nonce),
            authenticated.accounts[0]
          )
          await authLogin(nonce, signature) // auth login for user via nonce & signature
        } catch (error) {
          // console.log(error)
          if (error.code === 4001) {
            // console.log(error.message)
            Toast.error(error.message)
          }
        }
      }
    }
    sign(nonce)
    // eslint-disable-next-line
  }, [nonce])


  const connectToWallet = async (isWalletConnect) => {
    props.getWeb3() // refresh the web3 object
    if (isWalletConnect) {
      enabledWalletConnect()
      const resp = await web3.eth.net.getId()
      if (resp !== chainId && resp !== chainIdHex) { // for the mobile version
        Toast.error('Wrong network. Please switch to binance network')
        props.web3Logout()
        props.onClose()
        if (walletConnectProvider.connector.connected) {
          localStorage.removeItem('walletconnect') // to disconnect from wallet connect 
          await walletConnectProvider.disconnect() // Close provider session
        }
      }
    } else {
      await activate() // connect with metamask
    }
  }

  useEffect(() => {
    if (authenticated.isLoggedIn && user) {
      console.log("user data", user)
      navigate('../admin', { replace: true })
    }
    // eslint-disable-next-line
  }, [user])


  return (
    <>
      <Gs.Container>
        <CWOuter>
          <CWTitle>We Need Your Wallet Synchronization</CWTitle>
          <CWDesc>Lorem ipsum dolor sit amet consectetur adipiscing elit Laborum obcaecati Dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</CWDesc>
          <CBoxrow>
            <CBox>
              <button type='button' onClick={() => connectToWallet(0)}>
                <img src={MetaMask} alt='' />
                <CBoxTitle>Metamask</CBoxTitle>
                <CBoxDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</CBoxDesc>
              </button>
            </CBox>
            <CBox>
              <button type='button'>
                <img src={CoinBase} alt='' />
                <CBoxTitle>Coinbase Wallet</CBoxTitle>
                <CBoxDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</CBoxDesc>
              </button>
            </CBox>
            <CBox>
              <button type='button' onClick={() => connectToWallet(1)}>
                <img src={WC} alt='' />
                <CBoxTitle>Wallet Connect</CBoxTitle>
                <CBoxDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</CBoxDesc>
              </button>
            </CBox>
          </CBoxrow>
        </CWOuter>
      </Gs.Container>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CWOuter = styled.div`
  padding:130px 0px;
  ${Media.sm} {
    padding:70px 0px;
  }
`;

const CWTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 24px; text-align:center;
`;

const CWDesc = styled.div`
  max-width:634px; margin:0 auto 68px; font-style: normal; font-weight: 500; font-size: 21px; line-height: 31px; text-align: center; color: rgba(255, 255, 255, 0.8);
`;

const CBoxrow = styled(FlexDiv)`
  align-items:stretch; margin-bottom:90px;
  ${Media.md} {
    margin-bottom:0px;
  }
`;

const CBox = styled(FlexDiv)`
  width:calc(33.81% - 21px); margin-right:21px; align-items: initial;
  :last-child{margin-right:0px;}
  img{margin:45px 0px 16px;}
  button{padding:0px; width:100%; background: linear-gradient(0deg, rgba(123, 245, 251, 0.1) 36.89%, rgba(18, 19, 28, 0) 100%); border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 2px; transition: all .4s ease-in-out;
    :hover{background-image: linear-gradient(0deg, rgba(18, 19, 28, 0), rgba(123, 245, 251, 0.1) 36.89%);}
  }
  ${Media.md} {
    width:100%; margin-right:0px; margin-bottom:21px;
  }
`;

const CBoxTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 24px; line-height: 29px; text-align: center; color: #FFFFFF; margin:0px 0px 16px; padding:0px 30px;
`;

const CBoxDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 16px; line-height: 22px; text-align: center; color: #FFFFFF; opacity: 0.8; padding:0px 15px; margin:0px auto 34px; max-width:318px;
  ${Media.md} {
    max-width:100%;
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(actions.getWeb3()),
    enabledWalletConnect: () => dispatch(actions.enabledWalletConnect()),
    generateNonce: (address) => dispatch(actions.generateNonce(address)),
    authLogin: (nonce, signature) => dispatch(actions.authLogin(nonce, signature)),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    nonce: state.fetchNonce,
    user: state.fetchUser,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(ConnectWallet)
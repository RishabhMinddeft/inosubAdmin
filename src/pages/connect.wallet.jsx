import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import detectEthereumProvider from '@metamask/detect-provider';

import { connect } from 'react-redux';

import MetaMask from '../assets/images/metamask.png';
import CoinBase from '../assets/images/coinbase.png';
import WC from '../assets/images/wallet-connect.png';

import { actions } from '../actions';
import { Toast } from '../helper/toastify.message';
import { web3, walletConnectProvider } from '../web3';
import { chainId, chainIdHex, currency_symbol, network_name, rpcUrls, explorerLinks } from '../config';



const ConnectWallet = (props) => {

  const { enableMetamask, enabledWalletConnect, authenticated, 
    generateNonce, nonce, authLogin, getUser, user } = props
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)


  useEffect(() => {
    if (clicked) {
      if (authenticated.accounts[0] && !authenticated.isLoggedIn && !nonce) {
        generateNonce(authenticated.accounts[0]) // generate nonce for user
      }
    }
    // eslint-disable-next-line
  }, [clicked])

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
      } else {
        setClicked(true)
      }
    } else {
      let provider = await detectEthereumProvider() // Check MetaMask installed
      if (provider) {
        const resp = await web3.eth.net.getId();
        if (!authenticated.isLoggedIn && resp !== chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
            })
          } catch (error) {
            // console.log(error)
            if (error.code === 4001) {
              // console.log(error.message)
              Toast.error(error.message)
            }
            if (error.code === 4902) {
              addNetwork() // add network in metamask
            }
          }
        }
        enableMetamask()
        setClicked(true)
      } else {
        Toast.error('Please install MetaMask.!') // Please install MetaMask!
        props.onClose()
      }
    }
  }

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: network_name,
            nativeCurrency: {
              name: 'Polygon Token',
              symbol: currency_symbol,
              decimals: 18
            },
            rpcUrls: [rpcUrls],
            blockExplorerUrls: [explorerLinks],
          },
        ],
      })
    } catch (error) {
      if (error.code === 4001) {
        Toast.error(error.message)
      }
    }
  }

  // useEffect(() => {
  //   if (authenticated.isLoggedIn) {
  //     getUser() // fetch user details
  //   }
  //   // eslint-disable-next-line
  // }, [authenticated])

  useEffect(() => {
    if (authenticated.isLoggedIn && user) {
      navigate('../admin', { replace: true })
    }
    // eslint-disable-next-line
  }, [user])

  return (
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
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CWOuter = styled.div`
  padding:130px 0px;
`;

const CWTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 24px; text-align:center;
`;

const CWDesc = styled.div`
  max-width:634px; margin:0 auto 68px; font-style: normal; font-weight: 500; font-size: 21px; line-height: 31px; text-align: center; color: rgba(255, 255, 255, 0.8);
`;

const CBoxrow = styled(FlexDiv)`
  align-items:flex-start; margin-bottom:90px;
`;

const CBox = styled(FlexDiv)`
  width:calc(33.81% - 21px); margin-right:21px;
  :last-child{margin-right:0px;}
  img{margin:45px 0px 16px;}
  button{padding:0px; width:100%; background: linear-gradient(0deg, rgba(123, 245, 251, 0.1) 36.89%, rgba(18, 19, 28, 0) 100%); border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 2px; transition: all .4s ease-in-out;
    :hover{background-image: linear-gradient(0deg, rgba(18, 19, 28, 0), rgba(123, 245, 251, 0.1) 36.89%);}
  }
`;

const CBoxTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 24px; line-height: 29px; text-align: center; color: #FFFFFF; margin:0px 0px 16px; padding:0px 30px;
`;

const CBoxDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 16px; line-height: 22px; text-align: center; color: #FFFFFF; opacity: 0.8; margin:0px auto 34px; max-width:318px;
`;


const mapDipatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actions.getUser()),
    enableMetamask: () => dispatch(actions.enableMetamask()),
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
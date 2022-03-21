import React from 'react';
import Gs from '../theme/globalStyles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MetaMask from '../assets/images/metamask.png';
import CoinBase from '../assets/images/coinbase.png';
import WC from '../assets/images/wallet-connect.png';

const HomePage = () => {

  return (
    <Gs.Container>
      <CWOuter>
        <CWTitle>We Need Your Wallet Synchronization</CWTitle>
        <CWDesc>Lorem ipsum dolor sit amet consectetur adipiscing elit Laborum obcaecati Dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</CWDesc>
        <CBoxrow>
          <CBox>
            <button type='button'>
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
            <button type='button'>
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

export default HomePage;

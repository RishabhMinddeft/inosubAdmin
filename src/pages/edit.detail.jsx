import React from 'react'
import Gs from '../theme/globalStyles';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { actions } from '../actions';


const EditProfile = (props) => {

  return (
    <Gs.Container>
      <CWOuter>
        <CWTitle>Update Profile Page</CWTitle>
        <CWDesc>
            We Need Your Wallet Synchronization
        </CWDesc>
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


const mapDipatchToProps = (dispatch) => {
  return {
    enableMetamask: () => dispatch(actions.enableMetamask()),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.fetchUser,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(EditProfile)
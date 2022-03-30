import React from 'react';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';


const Landing = (props) => {

  return (
    <Gs.Container>
      <CWOuter>
        <CWTitle>Welcome to Admin Dashboard!</CWTitle>
        <CWDesc>Lorem ipsum dolor sit amet consectetur adipiscing elit Laborum obcaecati Dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</CWDesc>
      </CWOuter>
    </Gs.Container>
  )
}


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
    // clearNonce: () => dispatch({ type: 'GENERATE_NONCE', data: null }),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.fetchUser,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Landing);
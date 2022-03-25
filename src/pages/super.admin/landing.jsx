import React from 'react';
import Gs from '../../theme/globalStyles';
import styled from 'styled-components';


const SuperLanding = () => {

    return (
        <Gs.Container>
            <CWOuter>
                <CWTitle>Welcome to Super Admin Dashboard.!</CWTitle>
                <CWDesc>Lorem ipsum dolor sit amet consectetur adipiscing elit Laborum obcaecati Dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</CWDesc>
                <CBoxrow>
                </CBoxrow>
            </CWOuter>
        </Gs.Container>
    )
}


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


export default SuperLanding;
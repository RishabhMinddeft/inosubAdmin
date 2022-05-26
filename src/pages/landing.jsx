import React from 'react';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { MdPostAdd, MdAddBusiness } from 'react-icons/md';
import Media from '../theme/media-breackpoint';

const Landing = (props) => {

  const navigate = useNavigate();
  const { isloggedIn } = useAuth({ route: 'admin' }) // route should be same mentioned in routes file without slash

  return (
    <Gs.Container>
      <CWOuter>
        <CWTitle>Welcome to Admin Dashboard!</CWTitle>
        <CWDesc>Admins can create projects and NFTs here. NFTs can be put on sale for the public or private round INOs under a particular project.</CWDesc>
        <div className='button-list'>
          <CWBtn onClick={() => navigate('/create')}><MdPostAdd />Create NFT</CWBtn>
          <CWBtn onClick={() => navigate('/project')}><MdAddBusiness /> Create Project</CWBtn>
        </div>
      </CWOuter>
    </Gs.Container>
  )
}


const CWOuter = styled.div`
  padding:130px 0px;
  .button-list{text-align:center; display:flex; align-items:center; justify-content:center;
    ${Media.sm} {
      display:block;
      button{
        ${Media.sm} {
          margin:10px auto;
        }
      }
    }
  }
  ${Media.xs} {
    padding:70px 0px;
  }
`;

const CWTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 24px; text-align:center;
`;

const CWDesc = styled.div`
  max-width:634px; margin:0 auto 68px; font-style: normal; font-weight: 500; font-size: 21px; line-height: 31px; text-align: center; color: rgba(255, 255, 255, 0.8);
  ${Media.xs} {
    margin:0 auto 40px;
  }
`;

const CWBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 20px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:21px 33px; border:none; margin:0px 8px; transition: all .4s ease-in-out; min-width:300px; display:flex; align-items:center; justify-content:center;
  :hover{opacity:0.9;}
  svg{font-size:26px; margin-right:10px;}
  ${Media.xs} {
    min-width:initial;
  }
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
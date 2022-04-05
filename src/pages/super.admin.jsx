import React from 'react'
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';

const SubAdmin = (props) => {

  return (
    <Gs.Container>
      <CIOuter>
        <CILeft>
          <CITitle>Admins</CITitle>
          <div className='tab-list'>
            <button className='active'> Approve Sub-Admins</button>
            <button> Approve Super-Admins</button>
          </div>
        </CILeft>
        <CIRight>
          <CITitle>Sub Admin List</CITitle>
          <div className='table-responsive'>
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <th style={{ width: "50px" }}>No.</th>
                <th>Name</th>
                <th>Project Name</th>
                <th>Wallet Address</th>
                <th>Website URL</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Abraham</td>
                  <td>XYZ</td>
                  <td>fjhfsy7werAjdaDHD673bsySDASAX26832s</td>
                  <td>https://www.google.com/</td>
                  <td><CWBtn>Approve</CWBtn></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>John Abraham</td>
                  <td>XYZ</td>
                  <td>fjhfsy7werAjdaDHD673bsySDASAX26832s</td>
                  <td>https://www.google.com/https://www.google.com/https://www.google.com/</td>
                  <td><CWBtn>Approve</CWBtn></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>John Abraham</td>
                  <td>XYZ</td>
                  <td>fjhfsy7werAjdaDHD673bsySDASAX26832s</td>
                  <td>https://www.google.com/</td>
                  <td><CWBtn>Approve</CWBtn></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CIRight>
      </CIOuter>
    </Gs.Container>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
`;

const CILeft = styled.div`
  width:278px;
  ${Media.md} {
    margin-bottom:30px; width:100%;
  }
  .tab-list{ margin-bottom:32px; border-bottom:0px;
      button{width:100%; display:flex; align-items:center; justify-content:center; text-align:center; opacity:0.5; font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 17px; line-height: 20px; color: #6BFCFC; min-height:67px;
      border: 1px solid #7BF5FB; box-sizing: border-box; background-color:transparent;
      &.active{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
    }
  }
`;

const CIRight = styled.div`
  width:calc(100% - 323px); margin-left:45px;
  ${Media.md} {
    width:100%; margin-left:0px;
  }
  .table-responsive
  {
    overflow-x:auto;
    table{width:100%; border-bottom:1px solid #7BF5FB; border-right:1px solid #7BF5FB; table-layout: fixed;
      th,td{border:1px solid #7BF5FB; text-align:center; padding:10px; border-bottom:0px; border-right:0px; word-break:break-word;
        ${Media.md} {
          word-break:initial;
        }
      }
      ${Media.md} {
        table-layout: initial;
      }
    }
  }
`;

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:10px 15px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

export default SubAdmin;
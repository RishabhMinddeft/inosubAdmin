import React from 'react';
import styled from 'styled-components';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';
import { IoIosCloseCircle } from 'react-icons/io';
import { Scrollbars } from 'react-custom-scrollbars';

const UpdateAllocation = (props) => {

  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <TitleOuter>
            <CDTitle>Total Users : <span>2000</span></CDTitle>
            <CDTitle>Total NFT : <span><input type="text" /></span></CDTitle>
          </TitleOuter>
          <TierTitle>
            <div className='line'></div>
            <p>SFUND Users Allocation (60%) : <span>1200</span></p>
          </TierTitle>
          <Scrollbars
            autoHeight
            autoHeightMin={332}
            autoHeightMax={332}
            renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
            renderView={props => <div {...props} className="view" />}>
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Raffle Tier</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                  <th>7</th>
                  <th>8</th>
                  <th>9</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Snapshot Users</th>
                  <td>1000</td>
                  <td>100</td>
                  <td>150</td>
                  <td>200</td>
                  <td>3000</td>
                  <td>170</td>
                  <td>300</td>
                  <td>1500</td>
                  <td>10</td>
                  <td><b>4500</b></td>
                </tr>
                <tr>
                  <th>Allocated Users</th>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><b>450</b></td>
                </tr>
                <tr>
                  <th>NFT Allocated</th>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><b>45</b></td>
                </tr>
                <tr>
                  <th>Generate Lottery</th>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Scrollbars>
          <TierTitle>
            <div className='line'></div>
            <p>SNFT Users Allocation (30%)</p>
          </TierTitle>
          <TitleOuter className='ver2'>
            <CDTitle>Snapshot User : <span>1000</span></CDTitle>
            <CDTitle>Allocation : <span>600</span></CDTitle>
            <CWBtn> Generate Lottery</CWBtn>
          </TitleOuter>
          <TierTitle>
            <div className='line'></div>
            <p>Twitter users</p>
          </TierTitle>
          <TitleOuter className='ver2'>
            <CDTitle>Snapshot User : <span>1000</span></CDTitle>
            <CDTitle>Allocation : <span>600</span></CDTitle>
            <CWBtn> Generate Lottery</CWBtn>
          </TitleOuter>
          <div style={{ textAlign: "center" }}>
            <CWBtn className='ver2'>Submit your allocation data</CWBtn>
          </div>
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const TitleOuter = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:50px;
  &.ver2{justify-content:space-between; margin-bottom:30px;}
`;

const USHOuter = styled.div`
  padding:30px; width:100%; box-sizing:border-box;
  .table-responsive
  {
    overflow-x:auto;
    
  }
  table{width:100%; border-bottom:1px solid rgb(123 245 251 / 20%); border-right:1px solid rgb(123 245 251 / 20%);
      th{background:rgba(83,65,198,0.3);}
      th,td{border:1px solid rgb(123 245 251 / 20%); text-align:center; padding:10px; border-bottom:0px; border-right:0px; 
        ${Media.md} {
          word-break:initial;
        }
        :first-child{
          width:100px;
        }
        input{box-sizing:border-box; width:100%; background-color:transparent; border:1px solid #555; color:#fff;}
      }
      ${Media.md} {
        table-layout: fixed;
      }
      td{
        b{color:#7bf5fb;}
        button{padding:8px 10px; margin:0; font-size:14px; font-weight:600; position:relative; background:#7bf5fb; color:#333;
          svg{position:absolute; top:0px; right:-6px; color:#FC6B74; font-size:14px;}
        }
      }
    }
`;

const CDTitle = styled.div`
  font-family: 'Adrianna Sb'; font-style: normal; font-size: 17px; line-height: 26px; color: #FFFFFF; margin-right:30px;
  span{font-family: 'Adrianna Rg'; color:#7bf5fb; }
  input{box-sizing:border-box; background-color:transparent; border:1px solid #555; color:#fff;}
`;

const CDDesc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #FFFFFF; width:100%; margin-bottom:30px; text-align:center;
  b{font-family: 'Adrianna Bd';}
`;

const CWBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 18px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:15px 30px; border:none; transition: all .4s ease-in-out; margin-bottom:40px; margin:0px 5px;
  :hover{opacity:0.9;}
  svg{font-size:24px; margin-right:5px;}
  ${Media.xs} {
    padding:15px 20px;
  }
  &.ver2{margin:20px auto;}
`;

const TierTitle = styled.div`
  font-family: 'Rajdhani', sans-serif; font-weight: bold; font-size: 17px; line-height: 26px; color: #FFFFFF; position:relative; margin:35px 0px;
  .line{ width:100%; height:1px; background-color:rgb(251 192 123 / 50%);}
  p{background-color: #FBC07B; position: absolute; top: -17px; left: 0; margin: 0; padding: 5px 10px; border-radius: 5px; color: #333;
    span{color:#000; }
  }
`;

export default UpdateAllocation;

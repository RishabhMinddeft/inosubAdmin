import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../theme/globalStyles";
import Media from "../theme/media-breackpoint";
import { IoIosCloseCircle } from "react-icons/io";
import { Scrollbars } from "react-custom-scrollbars";
import { actions } from "../actions";
import { connect } from "react-redux";

const UpdateAllocation = (props) => {
  const {
    projectId,
    getSnapShotData,
    snapshotData,
    generateFileHash,
    fileHash,
  } = props;
  console.log(snapshotData);
  const [sfundUserAllocation, setSfundUserAllocation] = useState(
    new Array(9).fill(0)
  );
  const [sfundNFTAllocation, setSfundNFTAllocation] = useState(
    new Array(9).fill(0)
  );
  const [poolPercent, setPoolPercentage] = useState([60, 30, 10]);
  console.log(poolPercent);
  const totalUsers = 100;

  console.log(fileHash);
  useEffect(() => {
    getSnapShotData(projectId);
  }, [projectId, getSnapShotData]);

  const allocationSum = (key) => {
    if (key === "nfts")
      return sfundNFTAllocation.reduce((partialSum, a) => +partialSum + +a, 0);
    if (key === "users")
      return sfundUserAllocation.reduce((partialSum, a) => +partialSum + +a, 0);
  };

  const updateAllocatedNFT = (e, key) => {
    let newArr = [...sfundNFTAllocation]; // copying the old datas array
    newArr[key] = e.target.value; // replace e.target.value with whatever you want to change it to
    setSfundNFTAllocation(newArr);
  };

  function updateAllocatedUsers(e, key) {
    console.log(e, key);
    let newArr = [...sfundUserAllocation]; // copying the old datas array
    newArr[key] = e.target.value; // replace e.target.value with whatever you want to change it to
    setSfundUserAllocation(newArr);
  }

  const _generateFileHash = () => {
    const sUsers = snapshotData?.users;
    let obj = {
      guarantedTiers: [],
      lotteryTiers: [],
      projectId: projectId,
    };
    sfundUserAllocation.forEach((ele, key) => {
      if (+ele) {
        if (snapshotData?.users[`tier${+key + 1}`] > +ele) {
          obj.lotteryTiers.push({
            tier: `tier${+key + 1}`,
            totalUsers: sUsers[`tier${+key + 1}`],
            lotteryWinners: ele,
            allocation: sfundNFTAllocation[key],
          });
        } else {
          if (+ele >= snapshotData?.users[`tier${+key + 1}`]) {
            obj.guarantedTiers.push({
              tier: `tier${+key + 1}`,
              totalUsers: sUsers[`tier${+key + 1}`],
              allocation: sfundNFTAllocation[key],
            });
          }
        }
      }
    });
    console.log("this new onj", obj);

    generateFileHash(obj);
  };

  const upDatePoolPercent = (newPercent, poolId) => {
    let _newPoolPercent = poolPercent;
    _newPoolPercent[poolId] = newPercent;
    setPoolPercentage(_newPoolPercent);
  };
  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <TitleOuter>
            <CDTitle>
              Total Users : <span>{totalUsers}</span>
            </CDTitle>
            <CDTitle>
              Total NFT :{" "}
              <span>
                <input type="text" />
              </span>
            </CDTitle>
          </TitleOuter>
          <TierTitle>
            <div className="line"></div>
            <p>
              SFUND Users Allocation (
              <input
                value={poolPercent[0]}
                type="text"
                onChange={(e) => {
                  upDatePoolPercent(e.target.value, 0);
                }}
              />
              %) : <span>{Math.floor((totalUsers * poolPercent[0]) / 100)}</span>
            </p>
          </TierTitle>
          <Scrollbars
            autoHeight
            autoHeightMin={230}
            autoHeightMax={230}
            renderTrackHorizontal={(props) => (
              <div {...props} className="track-horizontal" />
            )}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
            renderThumbHorizontal={(props) => (
              <div {...props} className="thumb-horizontal" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
            renderView={(props) => <div {...props} className="view" />}
          >
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Raffle Tier</th>
                  {[...Array(9).keys()].map((key) => (
                    <td>{key + 1}</td>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Snapshot Users</th>
                  {[...Array(9).keys()].map((ele, key) => (
                    <td key={key}>{snapshotData?.users[`tier${+key + 1}`]}</td>
                  ))}
                  <td>
                    <b>4500</b>
                  </td>
                </tr>
                <tr>
                  <th>Allocated Users</th>
                  {sfundUserAllocation.map((ele, key) => (
                    <td>
                      <input
                        key={key}
                        value={ele}
                        type="text"
                        onChange={(e) => updateAllocatedUsers(e, key)}
                      />
                    </td>
                  ))}
                  <td>
                    <b>{allocationSum("users")}</b>
                  </td>
                </tr>
                <tr>
                  <th>NFT Allocated</th>
                  {sfundNFTAllocation.map((ele, key) => (
                    <td>
                      <input
                        key={key}
                        value={ele}
                        type="text"
                        onChange={(e) => {
                          updateAllocatedNFT(e, key);
                        }}
                      />
                    </td>
                  ))}
                  <td>
                    <b>{allocationSum("nfts")}</b>
                  </td>
                </tr>
                {/* <tr>
                  <th>Generate Lottery</th>
                  {[...Array(9).keys()].map(()=><td><CWBtn>Generated! <IoIosCloseCircle /></CWBtn></td>) }
                  <td></td>
                </tr> */}
              </tbody>
            </table>
          </Scrollbars>
          {/* <TierTitle>
            <div className="line"></div>
            <p>
              SNFT Users Allocation (
              <input
                value={poolPercent[1]}
                type="text"
                onChange={(e) => {
                  upDatePoolPercent(e.target.value, 1);
                }}
              />
              %) :<span>{Math.floor((totalUsers * poolPercent[1]) / 100)}</span>
            </p>
          </TierTitle>
          <TitleOuter className="ver2">
            <CDTitle>
              Snapshot User : <span>1000</span>
            </CDTitle>
            <CDTitle>
              Allocation : <span>600</span>
            </CDTitle>
          </TitleOuter> */}
          <TierTitle>
            <div className="line"></div>
            <p>
              Twitter users(
              <input
                value={poolPercent[2]}
                type="text"
                onChange={(e) => {
                  upDatePoolPercent(e.target.value, 2);
                }}
              />
              %) : <span>{Math.floor((totalUsers * poolPercent[2]) / 100)}</span>
            </p>
          </TierTitle>
          <TitleOuter className="ver2">
            <CDTitle>
              Snapshot User : <span>1000</span>
            </CDTitle>
            <CDTitle>
              Allocation : <span>600</span>
            </CDTitle>
            {/* <CWBtn> Generate Lottery</CWBtn> */}
          </TitleOuter>
          <div style={{ textAlign: "center" }}>
            <CWBtn className="ver2" onClick={() => _generateFileHash()}>
              Submit your allocation data
            </CWBtn>
          </div>
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const TitleOuter = styled(FlexDiv)`
  justify-content: flex-start;
  margin-bottom: 50px;
  &.ver2 {
    justify-content: space-between;
    margin-bottom: 30px;
  }
`;

const USHOuter = styled.div`
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  .table-responsive {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-bottom: 1px solid rgb(123 245 251 / 20%);
    border-right: 1px solid rgb(123 245 251 / 20%);
    th {
      background: rgba(83, 65, 198, 0.3);
    }
    th,
    td {
      border: 1px solid rgb(123 245 251 / 20%);
      text-align: center;
      padding: 10px;
      border-bottom: 0px;
      border-right: 0px;
      ${Media.md} {
        word-break: initial;
      }
      :first-child {
        width: 100px;
      }
      input {
        box-sizing: border-box;
        width: 100%;
        background-color: transparent;
        border: 1px solid #555;
        color: #fff;
        text-align:center;
        font-family: "Rajdhani", sans-serif;
      }
    }
    ${Media.md} {
      table-layout: fixed;
    }
    td {
      b {
        color: #7bf5fb;
      }
      button {
        padding: 8px 10px;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        position: relative;
        background: #7bf5fb;
        color: #333;
        svg {
          position: absolute;
          top: 0px;
          right: -6px;
          color: #fc6b74;
          font-size: 14px;
        }
      }
    }
  }
`;

const CDTitle = styled.div`
  font-family: "Adrianna Sb";
  font-style: normal;
  font-size: 17px;
  line-height: 26px;
  color: #ffffff;
  margin-right: 30px;
  span {
    font-family: "Adrianna Rg";
    color: #7bf5fb;
  }
  input {
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid #555;
    color: #fff;
  }
`;

const CDDesc = styled.div`
  font-family: "Adrianna Rg";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  color: #ffffff;
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
  b {
    font-family: "Adrianna Bd";
  }
`;

const CWBtn = styled.button`
  font-family: "Rajdhani", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 19px;
  color: #7bf5fb;
  background: linear-gradient(263.59deg, #343fa1 0%, #6350bb 100%);
  border-radius: 4px;
  padding: 15px 30px;
  border: none;
  transition: all 0.4s ease-in-out;
  margin-bottom: 40px;
  margin: 0px 5px;
  :hover {
    opacity: 0.9;
  }
  svg {
    font-size: 24px;
    margin-right: 5px;
  }
  ${Media.xs} {
    padding: 15px 20px;
  }
  &.ver2 {
    margin: 20px auto;
  }
`;

const TierTitle = styled.div`
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  font-size: 17px;
  line-height: 26px;
  color: #ffffff;
  position: relative;
  margin: 35px 0px;
  ${Media.xs} {
    margin: 15px 0px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: rgb(251 192 123 / 50%);
    ${Media.xs} {
      display:none;
    }
  }
  p {
    background-color: #fbc07b;
    position: absolute;
    top: -17px;
    left: 0;
    margin: 0;
    padding: 5px 10px;
    border-radius: 5px;
    color: #333;
    ${Media.xs} {
      position: initial;
      top: 0px;
    }
    span {
      color: #000;
    }
    input{ max-width: 40px; text-align: center; background-color: #fff; border-radius: 4px; border: 1px solid #333; margin: 0px 1px 0px 2px;
      font-weight: bold;
      font-family: 'Rajdhani';
      font-size: 14px;
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    generateFileHash: (allocationData) =>
      dispatch(actions.generateFileHash(allocationData)),
    getSnapShotData: (projectId) =>
      dispatch(actions.getSnapShotData(projectId)),
    getProjects: (id) => dispatch(actions.getProjects(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    fileHash: state.fileHash,
    snapshotData: state.snapshotData,
    web3Data: state.isAuthenticated,
    projects: state.allProjects,
    user: state.fetchUser,
    socialCSVData: state.socialCSVData,
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(UpdateAllocation);

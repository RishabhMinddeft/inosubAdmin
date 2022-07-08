import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../theme/globalStyles";
import { MdOutlineFindReplace } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { ImUpload } from "react-icons/im";
import { actions } from "../actions";
import { connect } from "react-redux";
import { createRootHash } from "../helper/Merkle";
import { getContractInstance } from "../helper/web3Functions";
import { Toast } from "../helper/toastify.message";
import { act } from "react-dom/test-utils";

const GenerateLottery = (props) => {
  const { getSnapShotData, snapshotData } = props;
  const [loading, setLoading] = useState(false);
  const [merkleHash, setMerkleHash] = useState("");
  const [process, setProcess] = useState(1);
  const {
    selectedProjectId,
    user,
    onClose,
    getProjects,
    web3Data,
    generateLottery,
    lotteryGenerated,
  } = props;
  console.log(lotteryGenerated);
  useEffect(() => {
    if (snapshotData) {
      setProcess(2);
    }
  }, [snapshotData]);

  const generateRequestNumber = async () => {
    // return generateLottery(selectedProjectId, 1);
    console.log("this");
    setLoading(true); // start loading
    const nftContractInstance = getContractInstance("lottery");
    try {
      const requestNumber = await nftContractInstance.methods
        .addHash(snapshotData?.fileHash[0].fileHash)
        .send({ from: web3Data.accounts[0] })
        .on("transactionHash", (hash) => {
          window.removeEventListener("transactionHash", generateRequestNumber);
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
          window.removeEventListener("receipt", generateRequestNumber);
          return onReciept(receipt);
        })
        .on("error", (error) => {
          window.removeEventListener("error", generateRequestNumber);
          return onTransactionError(error);
          // return this.popup('error', error.message, true);
        });
      setProcess(3);

      // generateLottery(selectedProjectId, requestNumber);
      console.log("this is request", requestNumber);
    } catch (err) {
      console.log(err);
    }
  };

  const onReciept = (receipt) => {
    if (receipt.status) {
      setLoading(false);
      Toast.success("File hash updated succesfully.!");
      getProjects(user._id); // refresh the project list
      onClose(); // close the modal
    } else {
      console.log("error");
    }
  };

  const onTransactionError = (error) => {
    let msg = "Transaction reverted";
    if (error.code === 4001) {
      msg = "Transaction denied by user";
    } else if (error.code === -32602) {
      msg = "wrong parameters";
    } else if (error.code === -32603) {
      msg = "Internal Error";
    } else if (error.code === -32002) {
      msg = "Complete previous request";
    }
    Toast.error(msg);
    onClose(); // close the modal
  };

  return (
    <>
      <ModalContentOuter>
        <USHOuter>
          <CDDesc>
            <b>Info :</b> To generate lottery you have to first get the file
            hash after uploading allocation. This file hash is for verification
            process of selected users and will be uploaded to blockchain. After
            uploading you will get the request number through which you will
            generate lottery by clicking on "Generate Lottery" button.
          </CDDesc>

          {process === 1 && (
            <CWBtn
              onClick={() => {
                getSnapShotData(selectedProjectId);
              }}
            >
              <MdOutlineFindReplace /> Fetch File Hash to create request number
            </CWBtn>
          )}

          {process === 2 && (
            <>
              <InputOuter>
                <input
                  type="text"
                  placeholder=""
                  disabled
                  value={snapshotData?.fileHash[0].fileHash}
                />
              </InputOuter>
              <GBtn
                disabled={snapshotData?.fileHash[0].fileHash ? false : true}
                onClick={() => generateRequestNumber()}
              >
                Generate request number for lottery
              </GBtn>
            </>
          )}

          {loading && (
            <div>
              <CWBtn style={{ marginBottom: "0px" }} disabled={true}>
                <ClipLoader loading={true} size={24} />
                loading...
              </CWBtn>
            </div>
          )}

          {process === 3 && !loading && (
            <div>
              <CWBtn
                style={{ marginBottom: "0px" }}
                // onClick={() => generateLottery(selectedProjectId, requestNumber)}
              >
                <ImUpload /> Generate Lottery
              </CWBtn>
            </div>
          )}
        </USHOuter>
      </ModalContentOuter>
    </>
  );
};
const mapDipatchToProps = (dispatch) => {
  return {
    generateLottery: (selectedProjectId, requestNumber) =>
      dispatch(actions.generateLottery(selectedProjectId, requestNumber)),
    getProjects: (id) => dispatch(actions.getProjects(id)),
    getSnapShotData: (projectId) =>
      dispatch(actions.getSnapShotData(projectId)),
    fetchSnapshotWinnersData: (projectId) =>
      dispatch(actions.fetchSnapshotWinnersData(projectId)),
  };
};

const mapStateToProps = (state) => {
  return {
    lotteryGenerated: state.lotteryGenerated,
    snapshotData: state.snapshotData,
    addedMerkleHash: state.addedMerkleHash,
    web3Data: state.isAuthenticated,
    user: state.fetchUser,
    snapshotWinnersData: state.snapshotWinnersData,
  };
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const USHOuter = styled.div`
  padding: 50px 30px 30px;
  width: 100%;
`;

const CDDesc = styled.div`
  font-family: "Adrianna Rg";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  color: #ffffff;
  width: 100%;
  margin-bottom: 20px;
  b {
    font-family: "Adrianna Bd";
  }
`;

const GBtn = styled.button`
  font-size: 14px;
  font-family: "Rajdhani", sans-serif;
  color: #7bf5fb;
  background-color: transparent;
  border: none;
  padding: 0px;
  text-decoration: underline;
  margin-bottom: 40px;
  width: 100%;
  text-align: right;
  :hover {
    opacity: 0.8;
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
  padding: 21px 15px 20px 15px;
  width: 100%;
  border: none;
  transition: all 0.4s ease-in-out;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    opacity: 0.9;
  }
  svg {
    font-size: 24px;
    margin-right: 5px;
  }
`;

const InputOuter = styled.div`
  input,
  textarea,
  select {
    width: 100%;
    background: rgba(54, 57, 79, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
    padding: 13px 16px;
    min-height: 50px;
    font-style: normal;
    font-family: "Adrianna Rg";
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    ::placeholder {
      color: #ffffff;
      opacity: 0.7;
    }
  }
  textarea {
    min-height: 116px;
    resize: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    cursor: pointer;
    option {
      background: rgba(54, 57, 79, 1);
    }
  }
  &.mb-0 {
    margin-bottom: 0px;
  }
  .select-outer {
    position: relative;
    z-index: 0;
    background: rgba(54, 57, 79, 0.5);
  }
`;

export default connect(mapStateToProps, mapDipatchToProps)(GenerateLottery);

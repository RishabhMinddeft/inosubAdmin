import React, { useEffect, useState } from "react";
import Gs from "../theme/globalStyles";
import styled from "styled-components";
import Media from "../theme/media-breackpoint";
import { connect } from "react-redux";
import { Modal } from "react-responsive-modal";
import { actions } from "../actions";
import ClipLoader from "react-spinners/ClipLoader";

import UploadSocialCSVModal from "../modals/uploadSocialCSV";
import AllocationModal from "../modals/update-allocation";
import GenerateMerkleHashModal from "../modals/generateMerkleHash";
import Spinner from "../modals/spinner";
import PleaseWait from "../modals/please-wait";
import GenerateLottery from "../modals/generateLottery";

const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line
      x1="5"
      y1="5"
      x2="15"
      y2="15"
      stroke="#7BF5FB"
      strokeWidth="2.6"
      strokeLinecap="square"
      strokeMiterlimitit="16"
    ></line>
    <line
      x1="15"
      y1="5"
      x2="5"
      y2="15"
      stroke="#7BF5FB"
      strokeWidth="2.6"
      strokeLinecap="square"
      strokeMiterlimitit="16"
    ></line>
  </svg>
);

const SubAdminProjectsList = (props) => {
  const { projects, getProjects, user } = props;
  const [projectId, setProjectId] = useState(null);
  const [blockChainId, setBlockChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genSnapShot, setGenSnapShot] = useState(false);
  const [openCSVModal, setOpenCSVDModal] = useState(false);
  const [openSnapShotModal, setOpenSnapShotModal] = useState(false);
  const [openAllocation, setOpenAllocation] = useState(false);
  const [generateLotteryModal, setGenerateLotteryModal] = useState(false);

  // useEffect(() => {
  //   if (!projects && user) getProjects(user._id);
  // }, [user]);

  useEffect(() => {
    if (!projects && user?._id) {
      const allProjects = user.role === "SUPERADMIN";
      getProjects(user?._id, allProjects);
    }
  }, [user?._id]);
  useEffect(() => {
    const generateSnapShot = () => {
      setLoading(true); // show loading
      props.generateSnapShot(projectId);
    };
    if (genSnapShot) generateSnapShot();
  }, [genSnapShot]);

  useEffect(() => {
    if (props.snapGenerated) {
      const allProjects = user?.role === "SUPERADMIN";
      getProjects(user._id, allProjects);
      setLoading(false);
      setGenSnapShot(false);
    }
  }, [props.snapGenerated]);

  return (
    <Gs.Container>
      <CIOuter>
        <CIRight>
          {!projects && <Spinner />}

          {projects && (
            <div className="table-responsive">
              <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <th style={{ width: "50px" }}>No.</th>
                  <th>Project Name</th>
                  <th>Owner</th>
                  <th>Website URL</th>
                  <th>Actions</th>
                </thead>

                <tbody>
                  {projects?.map((project, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{project.projectName}</td>
                      <td>{project.createdBy?.name}</td>
                      <td>{project.webUrl}</td>
                      <td>
                        {project.status === "upload" && (
                          <CWBtn
                            onClick={() => {
                              setOpenCSVDModal(true);
                              setProjectId(project._id);
                            }}
                          >
                            {" "}
                            {"Upload CSV"}{" "}
                          </CWBtn>
                        )}

                        {project.status === "snapshot" && (
                          <CWBtn
                            onClick={() => {
                              setGenSnapShot(true);
                              setProjectId(project._id);
                            }}
                          >
                            Generate Snapshot
                          </CWBtn>
                        )}
                        {project.status === "progress" && (
                          <CWBtn disabled className="d-flex">Processing <ClipLoader loading={true} size={12} color={"#7bf5fb"} /></CWBtn>
                        )}
                        {project.status === "filehash" && (
                          <CWBtn
                            onClick={() => {
                              setOpenAllocation(true);
                              setProjectId(project._id);
                              setBlockChainId(project.blockChainId);
                            }}
                          >
                            {" "}
                            Update Allocation Data{" "}
                          </CWBtn>
                        )}
                        {project.status === "lottery" && (
                          <CWBtn
                            onClick={() => {
                              setGenerateLotteryModal(true);
                              setProjectId(project._id);
                              setBlockChainId(project.blockChainId);
                            }}
                          >
                            {" "}
                            Generate Lottery
                          </CWBtn>
                        )}
                        {project.status === "whitelist" && (
                          <CWBtn
                            onClick={() => {
                              setProjectId(project._id);
                              setBlockChainId(project.blockChainId);
                              setOpenSnapShotModal(true);
                            }}
                          >
                            Upload Winners Data
                          </CWBtn>
                        )}
                        <STS>(Skip this step)</STS>
                        {/* {status === 1 && <CWBtn onClick={() => { setOpenCSVDModal(true); setProjectId(project._id); }} > {"Upload CSV"} </CWBtn>} */}
                        {/* {project.blockChainId === '' && <CWBtn onClick={() => { setOpenSnapShotModal(true); setProjectId(project._id); }} > {"Snapshot"} </CWBtn>}
                        {project.blockChainId !== '' && <CWBtn onClick={() => { setOpenSnapShotModal(true); setProjectId(project._id); setBlockChainId(project.blockChainId) }} > {"Update Hash"} </CWBtn>} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Modal
            open={openCSVModal}
            closeOnOverlayClick={false}
            closeIcon={closeIcon}
            onClose={() => setOpenCSVDModal(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal4",
            }}
          >
            <UploadSocialCSVModal
              selectedProjectId={projectId}
              onClose={() => setOpenCSVDModal(false)}
            />
          </Modal>

          <Modal
            open={openSnapShotModal}
            closeOnOverlayClick={false}
            closeIcon={closeIcon}
            onClose={() => setOpenSnapShotModal(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal3",
            }}
          >
            <GenerateMerkleHashModal
              selectedProjectId={projectId}
              blockChainId={blockChainId}
              onClose={() => setOpenSnapShotModal(false)}
            />
          </Modal>
          <Modal
            open={generateLotteryModal}
            closeOnOverlayClick={false}
            closeIcon={closeIcon}
            onClose={() => setGenerateLotteryModal(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal3",
            }}
          >
            <GenerateLottery
              selectedProjectId={projectId}
              blockChainId={blockChainId}
              onClose={() => setGenerateLotteryModal(false)}
            />
          </Modal>

          <Modal
            open={openAllocation}
            closeOnOverlayClick={false}
            closeIcon={closeIcon}
            onClose={() => setOpenAllocation(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal4",
            }}
          >
            <AllocationModal
              projectId={projectId}
              onClose={() => setOpenAllocation(false)}
            />
          </Modal>

          <Modal
            open={loading}
            onClose={() => setLoading(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            <PleaseWait
              isLoading={loading}
              title={"Loading"}
              description={"Generating snapshot, please wait for a moment."}
            />
          </Modal>
        </CIRight>
      </CIOuter>
    </Gs.Container>
  );
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const STS = styled.div`
  cursor:pointer;
  font-size:14px;
  color:#ddd;
  font-weight:normal;
`;

const CWBtn = styled.button`
  font-family: "Adrianna Bd";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #7bf5fb;
  background: linear-gradient(263.59deg, #343fa1 0%, #6350bb 100%);
  border-radius: 4px;
  padding: 10px 15px;
  border: none;
  transition: all 0.4s ease-in-out;
  :hover {
    opacity: 0.9;
  }
  &.d-flex{display:flex; align-items:center; justify-content:center; margin:0 auto;
    span{margin-left:5px;}
  }
`;

const CIOuter = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: flex-start;
  margin: 32px 0px 100px;
`;

const CIRight = styled.div`
  // width:calc(100% - 323px); margin-left:45px;
  margin: 0 auto;
  ${Media.md} {
    width: 100%;
    margin-left: 0px;
  }
  .table-responsive {
    overflow-x: auto;
    table {
      width: 100%;
      border-bottom: 1px solid #7bf5fb;
      border-right: 1px solid #7bf5fb;
      table-layout: fixed;
      th,
      td {
        border: 1px solid #7bf5fb;
        text-align: center;
        padding: 10px;
        border-bottom: 0px;
        border-right: 0px;
        word-break: break-word;
        ${Media.md} {
          word-break: initial;
        }
      }
      ${Media.md} {
        table-layout: initial;
      }
    }
  }
`;

const CWBtn2 = styled.button`
  font-family: "Rajdhani", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #7bf5fb;
  background: linear-gradient(263.59deg, #343fa1 0%, #6350bb 100%);
  border-radius: 4px;
  padding: 14px 50px 14px 51px;
  border: none;
  transition: all 0.4s ease-in-out;
  :hover {
    opacity: 0.9;
  }
  img {
    margin-right: 7px;
  }
  &.add-more {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
      font-size: 16px;
    }
  }
  &.ver2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    padding: 0px;
    svg {
      margin-right: 5px;
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getProjects: (id, allProjects) =>
      dispatch(actions.getProjects(id, allProjects)),
    generateSnapShot: (id) => dispatch(actions.generateSnapShot(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    web3Data: state.isAuthenticated,
    projects: state.allProjects,
    user: state.fetchUser,
    socialCSVData: state.socialCSVData,
    snapGenerated: state.snapGenerated,
  };
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(SubAdminProjectsList);

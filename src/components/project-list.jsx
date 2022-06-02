import React, { useEffect, useState } from 'react'
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import Media from '../theme/media-breackpoint';
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { actions } from '../actions';


import UploadSocialCSVModal from '../modals/uploadSocialCSV';
import AllocationModal from '../modals/update-allocation';
import GenerateMerkleHashModal from '../modals/generateMerkleHash';
import Spinner from '../modals/spinner';


const closeIcon = (
  <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
    <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
  </svg>
)


const SubAdminProjectsList = (props) => {

  const { projects, getProjects, user } = props;
  const [projectId, setProjectId] = useState(null);
  const [openCSVModal, setOpenCSVDModal] = useState(false);
  const [openSnapShotModal, setOpenSnapShotModal] = useState(false);
  const [openAllocation, setOpenAllocation] = useState(false);

  const status = 1;

  useEffect(() => {
    if (!projects && user?._id) getProjects(user?._id)
  }, [user?._id])

  console.log('user created projects : ', projects)

  return (
    <Gs.Container>
      <CIOuter>
        <CIRight>
          {!projects && <Spinner />}

          {projects &&
            <div className='table-responsive'>
              <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <th style={{ width: "50px" }}>No.</th>
                  <th>Project Name</th>
                  <th>Owner</th>
                  <th>Website URL</th>
                  <th>Actions</th>
                </thead>

                <tbody>
                  {projects?.map((project, key) =>
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{project.projectName}</td>
                      <td>{project.createdBy?.name}</td>
                      <td>{project.webUrl}</td>
                      <td>
                        {status === 1 && <CWBtn onClick={() => { setOpenCSVDModal(true); setProjectId(project._id); }} > {"Upload CSV"} </CWBtn>}
                        {status === 1 && <CWBtn onClick={() => { setOpenSnapShotModal(true); setProjectId(project._id); }} > {"Snapshot"} </CWBtn>}
                        {status === 3 && <> {"UPLOADED"}</>}
                        <CWBtn onClick={() => {setOpenAllocation(true);setProjectId(project._id)}}> Update Allocation</CWBtn>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}

          <Modal open={openCSVModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenCSVDModal(false)} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal4',
          }}>
            <UploadSocialCSVModal selectedProjectId={projectId} onClose={() => setOpenCSVDModal(false)} />
          </Modal>

          <Modal open={openSnapShotModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenSnapShotModal(false)} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal3',
          }}>
            <GenerateMerkleHashModal selectedProjectId={projectId} onClose={() => setOpenSnapShotModal(false)} />
          </Modal>

          <Modal open={openAllocation} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenAllocation(false)} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal4',
          }}>
            <AllocationModal projectId={projectId} onClose={() => setOpenAllocation(false)} />
          </Modal>

        </CIRight>
      </CIOuter>
    </Gs.Container>
  )
}


const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;


const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:10px 15px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

const CIOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
`;

const CIRight = styled.div`
  // width:calc(100% - 323px); margin-left:45px;
  margin:0 auto;
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

const CWBtn2 = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 600; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:14px 50px 14px 51px; border:none; transition: all .4s ease-in-out; 
  :hover{opacity:0.9;}
  img{margin-right:7px;}
  &.add-more{display:flex; align-items:center;
    svg{margin-right:10px; font-size:16px;}
  }
  &.ver2{width:100%; display:flex; align-items:center; justify-content:center; min-height:50px; padding:0px;
    svg{margin-right:5px;}
  }
`;


const mapDipatchToProps = (dispatch) => {
  return {
    getProjects: (id) => dispatch(actions.getProjects(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    web3Data: state.isAuthenticated,
    projects: state.allProjects,
    user: state.fetchUser,
    socialCSVData: state.socialCSVData,
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(SubAdminProjectsList);
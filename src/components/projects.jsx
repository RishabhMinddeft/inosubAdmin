import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { actions } from '../actions';

import UploadSocialCSVModal from '../modals/uploadSocialCSV';
import AllocationModal from '../modals/update-allocation';
import GenerateMerkleHashModal from '../modals/generateMerkleHash';
// import ConfirmModal from '../modals/confirm-message';
import Spinner from '../modals/spinner';

const closeIcon = (
    <svg fill="currentColor" viewBox="2 2 16 16" width={20} height={20}>
        <line x1="5" y1="5" x2="15" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
        <line x1="15" y1="5" x2="5" y2="15" stroke="#7BF5FB" strokeWidth="2.6" strokeLinecap="square" strokeMiterlimitit="16"></line>
    </svg>
)


const ProjectsList = (props) => {

    const { projects, getProjects } = props;
    const [projectId, setProjectId] = useState(null);
    const [openCSVModal, setOpenCSVDModal] = useState(false);
    const [openSnapShotModal, setOpenSnapShotModal] = useState(false);
    const [openAllocation, setOpenAllocation] = useState(false);
    // const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const status = 1;

    useEffect(() => {
        if (!projects) getProjects()
    }, [])

    console.log('projects ', projects)

    return (
        <>
            <CITitle>Projects List</CITitle>
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
                                        <CWBtn onClick={() => setOpenAllocation(true)}> Update Allocation</CWBtn>
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

            {/* <Modal open={openConfirmModal} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenConfirmModal(false)} center classNames={{
                overlay: 'customOverlay',
                modal: 'customModal3 no-close',
            }}>
                <ConfirmModal onClose={() => setOpenConfirmModal(false)} />
            </Modal> */}

            <Modal open={openAllocation} closeOnOverlayClick={false} closeIcon={closeIcon} onClose={() => setOpenAllocation(false)} center classNames={{
                overlay: 'customOverlay',
                modal: 'customModal4',
            }}>
                <AllocationModal onClose={() => setOpenAllocation(false)} />
            </Modal>
        </>
    )
}

const CITitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF; margin-bottom:24px;
`;

const CWBtn = styled.button`
  font-family: 'Adrianna Bd'; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:10px 15px; border:none; transition: all .4s ease-in-out;
  :hover{opacity:0.9;}
`;

const mapDipatchToProps = (dispatch) => {
    return {
        getProjects: () => dispatch(actions.getProjects()),
    }
}

const mapStateToProps = (state) => {
    return {
        web3Data: state.isAuthenticated,
        projects: state.allProjects,
        socialCSVData: state.socialCSVData,
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsList);
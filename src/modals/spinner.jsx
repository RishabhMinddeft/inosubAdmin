import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
    top: 50%;
    left: 52%;
`;

const Spinner = () => {

    let [loading] = useState(true);
    let [color] = useState("#000000");

    return (
        <>
            {/* <ModalContentOuter> */}
                <CustomLoader>
                    <div className="sweet-loading">
                        <FadeLoader color={color} loading={loading} css={override} height={9} width={3} radius={10} margin={-3} speedMultiplier={1} />
                    </div>
                </CustomLoader>
            {/* </ModalContentOuter> */}
        </>
    );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)`
    padding:35px 50px;
`;

const CustomLoader = styled(FlexDiv)`
 width:100%; margin-bottom:25px;
 .sweet-loading{width:70px; height:70px; background-color:#7BF5FB; border-radius:50%;}
`;

export default Spinner;

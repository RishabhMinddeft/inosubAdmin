import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';


const override = css`
    top: 50%;
    left: 52%;
`;

const CreateItem = (props) => {

    let { title, description } = props;
    let [loading] = useState(true);
    let [color] = useState("#000000");

    return (
        <>
            <ModalContentOuter>
                <CustomLoader>
                    <div className="sweet-loading">
                        <FadeLoader color={color} loading={loading} css={override} height={9} width={3} radius={10} margin={-3} speedMultiplier={1} />
                    </div>
                </CustomLoader>
                <PleaseTitle>{title}</PleaseTitle>
                <PleaseDesc>{description}</PleaseDesc>
            </ModalContentOuter>
        </>
    );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)`
    padding:35px 50px;
`;

const PleaseTitle = styled.div`
 font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 16px; width:100%; text-align:center;
`;

const PleaseDesc = styled.div`
 font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF; text-align:center; max-width:231px;
`;

const CustomLoader = styled(FlexDiv)`
 width:100%; margin-bottom:25px;
 .sweet-loading{width:70px; height:70px; background-color:#7BF5FB; border-radius:50%;}
`;

export default CreateItem;

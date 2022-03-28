import { forwardRef } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
import { FiChevronDown } from 'react-icons/fi';
import withClickOutside from "../helper/hoc.dropdown";


const DropDown = forwardRef(({ open, setOpen, ...props }, ref) => {

    const { name, childs } = props
    
    const onInit = ({ state, style, node }) => {
        setOpen(false)
    }

    const onClick = (action) => {
        if (action === 'Disconnect') props.logout()
        return false
    }
  
    return (
        <div className='menu-outer' ref={ref}>
            <Link to='#' onClick={() => setOpen(!open)}>
                {name} <FiChevronDown /></Link>
                <SubMenuLinks>
                    <Collapse onInit={onInit} isOpen={open}>
                    <SubMenuOuter>
                        {childs.map((value, key) => {
                            return <Link key={key} to={value.href} onClick={() => onClick(value.name)}>{value.name}</Link>
                        })}
                    </SubMenuOuter>
                    </Collapse>
                </SubMenuLinks>
        </div>
    );
})

const SubMenuLinks = styled.div`
  .collapse-css-transition{position:absolute; top:35px; left:20px; right:auto; transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); min-width:187px; background-color:#1e1f2d;}
`;

const SubMenuOuter = styled.div`
  background: linear-gradient(0deg, rgba(123, 245, 251, 0.1) 36.89%, rgba(18, 19, 28, 0) 100%); border:1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 2px;
  a{padding:12px 16px; font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF; margin:0px !important; border-bottom:1px solid #7BF5FB;
    :last-child{border-bottom:0px;}
  }
`;

export default withClickOutside(DropDown);
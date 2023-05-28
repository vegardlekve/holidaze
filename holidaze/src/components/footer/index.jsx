import React from "react";
//Styles
import styled from "styled-components";
import logo from "../../assets/logotext.png";

const Footer = () => {
    return (
        <StyledFooter>
            <img src={logo} />
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-height: 80px;
    }
`;

import React from "react";
import { Link } from "react-router-dom";
import Nav from "../nav";
import logo from "../../assets/logo.png";
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <Nav />
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.header`
    min-height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0rem 10%;

    img {
        width: 50px;
        height: 50px;
    }
`;

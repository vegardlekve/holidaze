import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../hooks/context";

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return <LogoutBtn onClick={handleLogout}>Log Out</LogoutBtn>;
    } else {
        return (
            <StyledAuth>
                <Link to="/login">Log In</Link>
                <Link to="/register">Register</Link>
            </StyledAuth>
        );
    }
};

export default Auth;

const StyledAuth = styled.div`
    display: flex;
    gap: 2rem;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LogoutBtn = styled.button`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 5rem;
    height: 2rem;
`;

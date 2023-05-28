import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../authComp";
import hamburger from "../../assets/hamburger1.svg";
import styled from "styled-components";
import { AuthContext } from "../../hooks/context";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isLoggedIn } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {}, [isLoggedIn]);

    return (
        <StyledHeader>
            <StyledNav isMenuOpen={isMenuOpen}>
                <StyledBurger className="hamburger" onClick={toggleMenu}>
                    <img src={hamburger} alt="Hamburger Icon" />
                </StyledBurger>
                <div className={`menu ${isMenuOpen ? "open" : ""}`}>
                    <div className="navContainer">
                        <div className="navLinks">
                            <Link to="/">Home</Link>
                            {isLoggedIn && <Link to="/profile">Profile</Link>}
                        </div>
                        <div className="authBtn">
                            <Auth />
                        </div>
                    </div>
                </div>
            </StyledNav>
        </StyledHeader>
    );
};

export default Nav;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const StyledNav = styled.nav`
    position: relative;

    .menu {
        display: none;
    }

    .menu {
        display: flex;

        align-items: center;
        justify-content: space-between;
        flex: 1;
    }

    .navContainer {
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;
    }

    .navLinks {
        display: flex;
        gap: 2rem;
    }

    .authBtn {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        align-items: flex-start;
    }

    @media (max-width: 800px) {
        .navContainer {
            flex-direction: column;
            width: 100%;
        }

        .menu {
            display: none;
        }

        .open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            padding: 1rem;
            transition: all 0.3s ease;
            opacity: 1;
            visibility: visible;
        }

        .navLinks,
        .authBtn {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1rem;
        }
    }
`;

const StyledBurger = styled.button`
    display: none;
    @media (max-width: 800px) {
        display: block;
    }
`;

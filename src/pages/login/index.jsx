import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../hooks/context";

const API_URL = "https://api.noroff.dev/api/v1/holidaze/auth/login";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                email,
                password,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const { accessToken } = await response.json();

            localStorage.setItem("accessToken", accessToken);

            setEmail("");
            setPassword("");
            setErrorMessage("");

            setIsLoggedIn(true);

            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <main>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <FormField>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormField>
                <FormField>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormField>
                <FormField>
                    <SubmitButton type="submit">Login</SubmitButton>
                </FormField>
            </LoginForm>
        </main>
    );
};

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 800) {
        justify-content: center;
        align-items: center;
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        width: 50vh;

        &:focus {
            outline: none;
        }
    }

    @media (max-width: 880px) {
        input {
            width: 350px;
        }
    }
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    color: black;
    width: 50vh;
    text-align: center;
    border-radius: 10px;
    background-color: var(--secondary);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ffffff;
        border-color: black;
        border: 3px solid;
    }

    @media (max-width: 880) {
        width: 350px;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
`;

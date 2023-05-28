import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = "https://api.noroff.dev/api/v1/holidaze/auth/register";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [venueManager, setVenueManager] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                name,
                email,
                password,
                avatar,
                venueManager,
            };

            if (!isValidName(name)) {
                throw new Error("Invalid name format.");
            }

            if (!isValidEmail(email)) {
                throw new Error("Invalid email address.");
            }

            if (!isValidPassword(password)) {
                throw new Error(
                    "Invalid password. It must be at least 8 characters."
                );
            }

            if (avatar && !isValidUrl(avatar)) {
                throw new Error("Invalid avatar URL.");
            }

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

            setName("");
            setEmail("");
            setPassword("");
            setAvatar("");
            setVenueManager(false);
            setErrorMessage("");

            setSuccessMessage(
                "🎈 Registration successful. Redirecting to login page...🎈"
            );

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const isValidName = (name) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(name);
    };

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;
        return regex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <RegisterForm onSubmit={handleSubmit}>
            <h2>Register</h2>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {successMessage && (
                <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            <FormField>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </FormField>
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
                <label htmlFor="avatar">Avatar:</label>
                <input
                    type="text"
                    id="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                />
            </FormField>
            <FormField>
                <label htmlFor="venueManager">Venue Manager:</label>
                <input
                    type="checkbox"
                    id="venueManager"
                    checked={venueManager}
                    onChange={(e) => setVenueManager(e.target.checked)}
                />
            </FormField>
            <FormField>
                <SubmitButton type="submit">Register</SubmitButton>
            </FormField>
        </RegisterForm>
    );
};

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
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

    @media (max-width: 768px) {
        input {
            width: 100%;
        }
    }
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    color: white;
    width: 50vh;
    text-align: center;
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
    color: green;
    margin-bottom: 1rem;
`;

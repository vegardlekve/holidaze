import React from "react";
import styled from "styled-components";

const UserAvatar = ({ user }) => {
    const { name, email, avatar } = user;

    return (
        <UserAvatarContainer>
            <AvatarImage
                src={avatar || "/default-avatar.png"}
                alt="User avatar"
            />
            <div>
                <UserName>{name}</UserName>
                <UserEmail>{email}</UserEmail>
            </div>
        </UserAvatarContainer>
    );
};

export default UserAvatar;

const UserAvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const AvatarImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserName = styled.h2`
    margin: 0;
    font-size: 1.5rem;
`;

const UserEmail = styled.p`
    margin: 0;
    color: #888;
`;

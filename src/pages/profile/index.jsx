import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import UserAvatar from "../../components/UserAvatar";
import UserBookings from "../../components/UserBookings";
import VenueManagerControls from "../../components/VenueManagerControls";
import { AuthContext } from "../../hooks/context";

const ProfilePage = () => {
    const authContext = useContext(AuthContext);
    const { accessTokenArray } = authContext;
    const accessToken = `${accessTokenArray[0]}.${accessTokenArray[1]}.${accessTokenArray[2]}`;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            const response = await fetch(
                "https://api.noroff.dev/api/v1/holidaze/profiles",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            setUser(data[0]);
            setIsLoading(false);
        };
        getUserProfile();
    }, [accessToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <ProfileContainer>
            <UserAvatar user={user} />
            {user.venueManager ? (
                <VenueManagerControls venues={user.venues} />
            ) : null}
            <UserBookings bookings={user.bookings} />
        </ProfileContainer>
    );
};

export default ProfilePage;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

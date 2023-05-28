import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UserBookings = ({ user, token }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/bookings/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setBookings(data);
        };

        fetchBookings();
    }, [user, token]);

    return (
        <BookingsSection>
            <h2>Your Upcoming Bookings</h2>
            {bookings.map((booking) => (
                <Booking key={booking.id}>{}</Booking>
            ))}
        </BookingsSection>
    );
};

export default UserBookings;

const BookingsSection = styled.section``;

const Booking = styled.div``;

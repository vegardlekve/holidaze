import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DateRangePicker } from "react-date-range";
import { Carousel } from "react-responsive-carousel";
import Modal from "../../components/modal/";
import { AuthContext } from "../../hooks/context";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const VenuePage = () => {
    const { id } = useParams();
    const authContext = useContext(AuthContext);
    const { isLoggedIn, accessToken } = authContext;
    const [venue, setVenue] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guests, setGuests] = useState(1);
    const [bookedDates, setBookedDates] = useState([]);
    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const getVenue = async (id) => {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/venues/${id}`
            );
            const data = await response.json();

            if (data && data.bookings) {
                const bookedDateRanges = data.bookings.map((booking) => ({
                    startDate: new Date(booking.dateFrom),
                    endDate: new Date(booking.dateTo),
                    key: "booked",
                }));
                setBookedDates(bookedDateRanges);
            }
            return data;
        };
        getVenue(id).then((data) => setVenue(data));
    }, [id]);

    if (!venue) return <div>Loading...</div>;

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const guestsNumber = Number(guests);
        const dateFrom = startDate.toISOString();
        const dateTo = endDate.toISOString();
        const venueId = id;

        if (guestsNumber > venue.maxGuests) {
            setBookingError(
                `Cannot book for more than ${venue.maxGuests} guests.`
            );
            return;
        }

        const response = await fetch(
            "https://api.noroff.dev/api/v1/holidaze/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    guests: guestsNumber,
                    dateFrom,
                    dateTo,
                    venueId,
                }),
            }
        );

        if (response.ok) {
            setBookingError(null);
            setBookingSuccess(true);
        } else {
            const data = await response.json();
            setBookingError(data.errors[0].message);
        }
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <VenueContainer>
            <CarouselWrapper>
                <Carousel>
                    {venue.media.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Image ${index}`} />
                        </div>
                    ))}
                </Carousel>
            </CarouselWrapper>
            <ContentWrapper>
                <VenueInfo>
                    <h2>{venue.name}</h2>
                    <p>{venue.description}</p>
                    <p>Price: {venue.price}</p>
                    <p>Max guests: {venue.maxGuests}</p>
                    <p>Rating: {venue.rating}</p>
                    <p>Address: {venue.location.address}</p>
                    <p>City: {venue.location.city}</p>
                </VenueInfo>
                <DateRangePickerContainer>
                    <DateRangePicker
                        ranges={[selectionRange, ...bookedDates]}
                        onChange={handleSelect}
                        minDate={new Date()}
                        rangeColors={["#f76e85"]}
                        disabledDates={bookedDates}
                        showDateDisplay={false}
                        months={2}
                    />
                </DateRangePickerContainer>
                <BookButton onClick={openModal} disabled={!isLoggedIn}>
                    Book Now
                </BookButton>
            </ContentWrapper>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <Form onSubmit={handleBookingSubmit}>
                    <label>
                        Number of Guests:
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            min={1}
                            max={venue.maxGuests}
                            required
                        />
                    </label>
                    <SubmitButton type="submit">Submit Booking</SubmitButton>
                </Form>
            </Modal>
        </VenueContainer>
    );
};

export default VenuePage;

const VenueContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const CarouselWrapper = styled.div`
    max-width: 800px;
    margin-bottom: 2rem;

    .carousel {
        margin-bottom: 2rem;
    }

    .carousel .slide img {
        max-height: 400px;
        object-fit: cover;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
`;

const VenueInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    margin-bottom: 2rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    p {
        margin-bottom: 0.5rem;
    }
`;

const DateRangePickerContainer = styled.div`
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
`;

const BookButton = styled.button`
    padding: 1rem 2rem;
    background-color: var(--primary);
    color: white;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--secondary);
        color: black;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        input {
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
    }
`;

const SubmitButton = styled.button`
    padding: 0.5rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

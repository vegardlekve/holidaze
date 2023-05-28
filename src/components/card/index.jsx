import React from "react";
//Route
import { Link } from "react-router-dom";
//Styles
import styled from "styled-components";
//Assets
import placeholder from "../../assets/placeholder.jpg";

export default function Card({ locality }) {
    const { id, name, description, media, price } = locality;
    const cardImg = media && media[0] ? media[0] : placeholder;

    const handleImageError = (event) => {
        event.target.src = placeholder;
    };

    return (
        <Link to={`/venue/${id}`}>
            <StyledCard>
                <div>
                    <img src={cardImg} alt={name} onError={handleImageError} />
                </div>
                <h2>{name}</h2>
                <div className="description">
                    <p>{description}</p>
                </div>
                <div>
                    <p></p>
                </div>
                <button>{price} kr a night</button>
            </StyledCard>
        </Link>
    );
}

const StyledCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 20vh;
    max-height: 600px;
    width: 300px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    overflow: hidden;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
    }

    h2 {
        margin: 3rem 0rem;
    }

    .description {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    button {
        color: white;
        height: 3.5rem;
        margin-top: auto;
    }
`;

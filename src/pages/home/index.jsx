import React from "react";
//Components
import Card from "../../components/card";
//Hooks
import DataSetup from "../../hooks/dataSetup";
import useSearch from "../../hooks/search";
//Styles
import styled from "styled-components";
//Assets
import banner from "../../assets/logotext.png";

export default function Home() {
    const { data, isLoading, error } = DataSetup(
        "https://api.noroff.dev/api/v1/holidaze/venues/"
    );
    const { query, setQuery, searchResults } = useSearch(data);

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Oh no.. {error.message}</div>;
    }

    const venues = searchResults.length > 0 ? searchResults : data;

    const searchMessage =
        searchResults.length === 0 && query !== ""
            ? "Sorry, can't find that :/"
            : "";

    return (
        <main>
            <Banner>
                <img src={banner} alt="holidaze logo"></img>
            </Banner>
            <SearchWrap>
                <form action="">
                    <input
                        type="text"
                        placeholder="Search venues"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </form>
            </SearchWrap>
            {searchMessage && <SearchMessage>{searchMessage}</SearchMessage>}
            {searchResults.length ? (
                <SearchOutput>
                    <Gallery>
                        {venues.map((locality) => (
                            <Card key={locality.id} locality={locality} />
                        ))}
                    </Gallery>
                </SearchOutput>
            ) : (
                ""
            )}

            <Gallery>
                {venues.map((locality) => (
                    <Card key={locality.id} locality={locality} />
                ))}
            </Gallery>
        </main>
    );
}

const Banner = styled.div`
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        img {
            width: 80%;
        }
    }
`;

const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    margin: 0rem 10%;

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const SearchWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    form {
        width: 30%;

        @media (max-width: 800px) {
            width: 60%;
        }
    }

    input {
        width: 100%;
        border: none;
        border: 1px solid;
        padding: 0.5rem;
        border-radius: 5px;

        &:focus {
            outline: none;
        }
    }
`;

const SearchOutput = styled.div`
    margin-bottom: 3rem;
`;

const SearchMessage = styled.div`
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
`;

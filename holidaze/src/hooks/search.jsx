import { useState, useEffect } from "react";

export default function useSearch(data) {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query === "") {
            setSearchResults([]);
        } else {
            const filteredResults = data.filter((product) => {
                const hasTitle =
                    product.title &&
                    product.title.toLowerCase().includes(query.toLowerCase());
                const hasDescription =
                    product.description &&
                    product.description
                        .toLowerCase()
                        .includes(query.toLowerCase());
                return hasTitle || hasDescription;
            });
            setSearchResults(filteredResults);
        }
    }, [query, data]);

    return { query, setQuery, searchResults };
}

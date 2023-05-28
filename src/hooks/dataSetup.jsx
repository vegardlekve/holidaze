import { useState, useEffect } from "react";

export default function DataSetup(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const fetchedData = await fetch(url);
                const responseData = await fetchedData.json();

                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else if (typeof responseData === "object") {
                    const dataArray = Object.values(responseData);
                    setData(dataArray);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [url]);

    return { data, isLoading, isError };
}

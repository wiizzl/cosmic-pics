import { useEffect, useState } from "react";

export function useFetch(method: string, url: string, endpoint: string) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${url}?api_key=${process.env.EXPO_PUBLIC_NASA_API_KEY}${endpoint}`, { method });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error while fetching API :", `${url}/${endpoint}`, error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, error, refetch };
}

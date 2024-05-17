import { useEffect, useState } from "react";

export function useFetch(method: string, endpoint: string) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${endpoint}?api_key=dgbTBSPlvCRYjxFpkP0vijv10xBPEdQgOjqN5Ux3`, {
                method,
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error while fetching API :", endpoint, error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, error, refetch };
}

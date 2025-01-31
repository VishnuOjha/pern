import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useSearch = (fetchData, delay = 500) => {
    const [query, setQuery] = useState("");

    // Fetching data using TanStack Query
    const { data: results = [], isLoading, error } = useQuery({
        queryKey: ["search", query], // Unique cache key with query
        queryFn: () => fetchData(query),
        enabled: !!query, // Only run when query is not empty
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
        retry: 1, // Retry once on failure
        refetchOnWindowFocus: false, // Do not refetch when window is focused
    });

    // Function to trigger search
    const onSearch = (value) => {
        setQuery(value);
    };

    return { query, results, isLoading, error, onSearch };
};

export default useSearch;

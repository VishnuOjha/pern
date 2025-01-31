import { useQuery } from '@tanstack/react-query';
import API from '../services/Api';

const fetchUsers = async () => {
    const { data } = await API.get('/users');
    return data;
};

const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],  // Unique cache key
        queryFn: fetchUsers,   // Function to fetch data
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};

export default useGetUsers;

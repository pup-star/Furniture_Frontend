import { useState, useEffect} from 'react';
import axios from 'axios';


const useFetchProfile = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] =useState(false);
    const [error, setError] = useState(null)

    const fetchProfile = async ()=> {
        setIsLoading(true)
        let userdata = await AsyncStorage.getItem("token");
        let data = JSON.parse(userdata);
        console.log(`homepage getItem id: ${data}`)
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${data}`)
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        fetchProfile();
    }, []);

    const refetch = () => {
        setIsLoading(true)
        fetchProfile();
    }
  return {data, isLoading, error, refetch}
}

export default useFetchProfile;
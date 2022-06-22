import axios from "axios";

const FetchData = async (url,method, body) => {
    const config = {
        method,
        url,
        headers: {
            'Authorization': 'Bearer 2dcadecaf2492b8a99323c1af77f4d2ac465da6b', 
            'Content-Type': 'application/json'
        },
        data: body
    }
    const response = await axios(config)
    return response.data
}

export default FetchData
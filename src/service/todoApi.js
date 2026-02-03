import { useEffect, useState } from "react"
import { httpClient } from "../http/hook/httpclient"

export const useGetTodos = () =>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const  getTodos = async()=>{
            try {
                setLoading(true)
                setError(null)
                const datas = await httpClient.get("/todo")
                setData(datas.data)

            } catch (e) {
                setError(e)
            }
            finally{
                setLoading(false)
            }
        };
        getTodos()
    },[])

    return{
        data,loading,error
    }
}


export const usePostTodo=()=>{
    const PostTodo= async(data)=>{
        const response = await httpClient.post("/todo",data);
        return response.data;
    };
    return { PostTodo };
}
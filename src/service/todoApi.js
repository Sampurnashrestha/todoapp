import { useEffect, useState } from "react"
import { httpClient } from "../http/hook/httpclient"

export const useGetTodos = () =>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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

    useEffect(()=>{
        getTodos()
    },[])

    return{
        data,loading,error,
        refetch: getTodos,
    }
}


export const usePostTodo=()=>{
    const PostTodo= async(data)=>{
        const response = await httpClient.post("/todo",data);
        return response.data;
    };
    return { PostTodo };

}

 export const useDeleteTodo=()=>{
    const deleteTodo= async(id)=>{
        const response = await httpClient.delete(`/todo/${id}`);
        return response.data;
    };
    return { deleteTodo };
}
 export const useUpdateTodo=()=>{
    const onUpdateTodo= async(id,data)=>{
        const response = await httpClient.patch(`/todo/${id}`,data);
        return response.data;
    };
    return { onUpdateTodo };
}
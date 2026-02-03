import React, { useState } from "react";
import { useGetTodos, usePostTodo } from "../service/todoApi";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import PreLoader from "../components/Preloader";

const Todo = () => {
    const [todoText, setTodoText] = useState("");
    const { data, loading} = useGetTodos()
    const {PostTodo} = usePostTodo()


   const handleClick = () =>{
    PostTodo ({
        name:todoText
    })
    setTodoText("")
  }


  return (
    <div className="min-w-full max-h-screen flex justify-center items-center mt-40 ">
      <div className="bg-white flex flex-col  p-10 w-100 h-100 gap-3 shadow-2xl rounded-2xl">
        <div className="flex flex-row gap-3">
            <label className="text">
          <input placeholder="Insert Todo" value={todoText} onChange={e=>setTodoText(e.currentTarget.value)} className=" border border-gray-200 grow px-6 py-3 rounded-2xl"/>
        </label>

        <motion.div
        whileTap={{scale: 0.8}}
        transition={{duration: 0.1}}
        className="px-4 h-7 bg-green  bg-green-500 rounded-xl mt-3">
          <button
          onClick={handleClick}
          className=" text-white ">Submit</button>
        </motion.div>
        </div>

        <div className="border border-gray-300 rounded-2xl h-80 overflow-y-auto p-3 ">
            
                {loading? <PreLoader/> :(data?.map((todoItem, i)=>(
                    <TodoItem key={i} todoItem={todoItem} />
                )))}
            
        </div>
      </div>
    </div>
  );
};

export default Todo;

const TodoItem =({todoItem}) =>{
    return(
        <div className='text-black'>
            {todoItem.name}
        </div>
    )
}

import React, { useState } from "react";
import { useDeleteTodo, useGetTodos, usePostTodo, useUpdateTodo } from "../service/todoApi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PreLoader from "../components/Preloader";
import { Check, Pen, Trash } from "lucide-react";

const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const { data, loading, refetch } = useGetTodos();
  const { PostTodo } = usePostTodo();

  const { deleteTodo } = useDeleteTodo();

  const { onUpdateTodo} = useUpdateTodo();

  const handleClick = () => {
    PostTodo({
      name: todoText,
      
    });
    setTodoText("");
    refetch()
  };

 

  const handleUpdate = (id,data) =>{
    onUpdateTodo(id, data)
    refetch()
  }
  return (
    <div className="min-w-full max-h-screen flex justify-center items-center mt-40 ">
      <div className="bg-white flex flex-col  p-10 w-100 h-100 gap-3 shadow-2xl rounded-2xl">
        <div className="flex flex-row gap-3">
          <label className="text">
            <input
              placeholder="Insert Todo"
              value={todoText}
              onChange={(e) => setTodoText(e.currentTarget.value)}
              className=" border border-gray-200 grow px-6 py-3 rounded-2xl"
            />
          </label>

          <motion.div
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.1 }}
            className="px-4 h-7 bg-green  bg-green-500 rounded-xl mt-3"
          >
            <button onClick={handleClick} className=" text-white ">
              Submit
            </button>
          </motion.div>
        </div>

        <div className="border border-gray-300 rounded-2xl h-80 overflow-y-auto p-3 ">
          {loading ? (
            <PreLoader />
          ) : (
            data?.map((todoItem, i) => (
              <TodoItem
                key={i}
                todoItem={todoItem}
                OnDelete={()=>{
                  deleteTodo(todoItem.id)
                  refetch()
                }}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;

const TodoItem = ({ todoItem, OnDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todoItem.name);
  const handelEditandSave = (id) => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      onUpdate(id, {name : value})
      setIsEditing(false);
    }
  };

  return (
    <div className="text-black flex flex-row justify-between items-center">
      <div>{todoItem.id}</div>
      {isEditing ? (
        <label className="border border-gray-300 rounded-2xl p-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </label>
      ) : (
        <p>{todoItem.name}</p>
      )}

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
          onClick={()=>handelEditandSave(todoItem.id)}
          className=""
        >
          {isEditing? <Check /> :<Pen />}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
          onClick={OnDelete}
          className="text-red-500"
        >
          <Trash />
        </motion.button>
      </div>
    </div>
  );
};

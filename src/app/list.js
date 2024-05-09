import React, { useState, useEffect } from "react";

export default function List() {
  "use client";
  const [todos, setTodos] = useState();
  const supabaseUrl = "https://wkgmsqqhdwznniikuofo.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select("todo");
    setTodos(data);
  };
  return (
    <div>
      {" "}
      <ul>
        {data &&
          data.map((todo) => (
            <li key={todo._id}>
              <span>{todo.todo}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function TodoList() {
  const { data, error } = await supabase.from("todos").select();

  const addTodo = async (formData) => {
    "use server";

    const todoItem = formData.get("todo");
    if (!todoItem) {
      return;
    }
    // Save todo item to database
    const { data, error } = await supabase.from("todos").insert({
      todo: todoItem,
    });
    console.log( 'err' + error);
    revalidatePath("/");
  };

  return (
    <>
      <div className="container m-14 text-center">
        <h2 className="mb-4 text-xl font-semibold">Server Actions Demo</h2>
        <div>
          <form action={addTodo} method="POST">
            <div>
              <label htmlFor="todo">Todo</label>
              <div className="my-4">
                <input
                  className="bg-slate-100 py-2 px-1 w-96"
                  id="todo"
                  name="todo"
                  type="text"
                  placeholder="What needs to be done?"
                  required
                />
              </div>
            </div>
            <div>
              <button className="bg-sky-400 w-80 py-2 rounded-sm" type="submit">
                {" "}
                Add Todo
              </button>
            </div>
          </form>
          <div>
            <ul>
              {data &&
                data.map((todo) => (
                  <li key={todo.id}>
                    <span>{todo.todo}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

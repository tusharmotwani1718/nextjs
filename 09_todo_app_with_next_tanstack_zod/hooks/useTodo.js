import { useQuery } from "@tanstack/react-query";
import { fetchTodosAction } from "../server_actions/todos.actions";

export function useTodos() {
    const query = useQuery({
        queryKey: ["todos"],
        queryFn: async () =>{
            const res = await fetchTodosAction();
            if(!res.success) {
                throw new Error (`Error fetching todos...`);
            }

            

            return res.data;
        }
    })

    return query;
}
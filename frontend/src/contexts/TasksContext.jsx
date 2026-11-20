import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContext";
import { fetchTasks } from "../units/network";

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async (signal) => {
    try {
      const data = await fetchTasks({ signal });
      if (signal?.aborted) return;

      const fetchedIds = new Set(data.map((task) => task.id));
      setTasks((current) => [
        ...data,
        ...current.filter((task) => !fetchedIds.has(task.id)),
      ]);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching tasks:", error);
      }
    }
  }, []);

  useEffect(() => {
    setTasks([]);
    if (!userId) return;

    const controller = new AbortController();

    loadTasks(controller.signal);

    return () => controller.abort();
  }, [loadTasks, userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        loadTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }

  return context;
};

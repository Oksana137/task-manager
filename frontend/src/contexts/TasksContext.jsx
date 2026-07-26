import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { fetchTasks } from "../units/network";

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async (signal) => {
    try {
      const data = await fetchTasks({ signal });
      setTasks(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching tasks:", error);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadTasks(controller.signal);

    return () => controller.abort();
  }, [loadTasks]);

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

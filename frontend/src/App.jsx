import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { TasksProvider } from "./contexts/TasksContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import TaskBoardPage from "./pages/TaskBoardPage";
import TaskListPage from "./pages/TaskListPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TaskBoardPage />} />
            <Route path="/tasks-list" element={<TaskListPage />} />
          </Route>
        </Route>
      </>,
    ),
  );

  return (
    <AuthContextProvider>
      <ProjectProvider>
        <TasksProvider>
          <RouterProvider router={router} />
        </TasksProvider>
      </ProjectProvider>
    </AuthContextProvider>
  );
}

export default App;

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
import TasksGroupPage from "./pages/TasksGroupPage";
import TasksPage from "./pages/TasksPage";
import MembersPage from "./pages/MembersPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TasksGroupPage />} />
            <Route path="/tasks-list" element={<TasksPage />} />
            <Route path="/members" element={<MembersPage />} />
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

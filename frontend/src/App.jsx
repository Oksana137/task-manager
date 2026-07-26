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
import Tasks from "./pages/Tasks";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Tasks />} />
      </Route>,
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

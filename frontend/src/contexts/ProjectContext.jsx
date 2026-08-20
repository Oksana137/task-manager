import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { fetchMyProjects } from "../units/network";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      setProjects([]);
      setSelectedProject(null);
      setProjectsLoaded(false);
      return;
    }

    const controller = new AbortController();

    fetchMyProjects({ signal: controller.signal })
      .then((data) => {
        setProjects(data);

        setSelectedProject((prev) => {
          if (prev && data.some((project) => project.id === prev.id)) {
            return prev;
          }

          return data[0] ?? null;
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching projects:", error.message);
        }
      })
      .finally(() => setProjectsLoaded(true));

    return () => controller.abort();
  }, [isAuth]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        projectsLoaded,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
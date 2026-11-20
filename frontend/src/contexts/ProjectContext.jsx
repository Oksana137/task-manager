import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { createProject, fetchMyProjects } from "../units/network";

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
        if (controller.signal.aborted) return;
        const fetchedIds = new Set(data.map((project) => project.id));
        setProjects((current) => [
          ...data,
          ...current.filter((project) => !fetchedIds.has(project.id)),
        ]);
        setSelectedProject((current) => current ?? data[0] ?? null);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching projects:", error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setProjectsLoaded(true);
      });

    return () => controller.abort();
  }, [isAuth]);

  const addProject = async (title, signal) => {
    const project = await createProject(title, signal);
    if (signal.aborted) return;

    setProjects((current) =>
      current.some(({ id }) => id === project.id) ? current : [...current, project],
    );
    setSelectedProject(project);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        projectsLoaded,
        selectedProject,
        setSelectedProject,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);

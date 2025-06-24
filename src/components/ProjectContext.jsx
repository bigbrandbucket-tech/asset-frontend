// src/context/ProjectContext.js
import { createContext, useContext, useState } from "react";

export const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

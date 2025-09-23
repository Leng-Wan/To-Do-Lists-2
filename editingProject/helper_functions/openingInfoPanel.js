import { updateProject } from "../../Storage/projectManager.js";
import { normalizeTasks } from "./normalizeTasks.js";
import { renderPanel } from "./renderPanel.js";

export function openInfoPanel(project) {
  const infoPanel = document.querySelector(".editing-project");
  if (!infoPanel) return;

  const projectsPanel = document.querySelector(".renderProjects");

  const state = {
    editing: false,
    workingTitle: project.title || "",
    workingTasks: normalizeTasks(project.tasks),
    selectedTaskIds: new Set(),
  };

  const context = {
    infoPanel,
    projectsPanel,
    project,
    state,
    updateProject,
  };

  context.rerender = () => renderPanel(context);

  renderPanel(context);
}

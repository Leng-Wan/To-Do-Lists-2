import { updateProject } from "../Storage/projectManager.js";
import { openInfoPanel } from "./helper_functions/openingInfoPanel.js";

let wired = false;

export function initEditPanel() {
  if (wired) return;
  wired = true;

  document.addEventListener("project:info", (event) => {
    const project = event.detail;
    if (!project) return;
    openInfoPanel(project);
  });
}



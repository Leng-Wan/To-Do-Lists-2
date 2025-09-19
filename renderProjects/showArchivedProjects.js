import { getArchivedProjects } from "../Storage/projectManager.js";
import { renderList, togglePanels } from "./renderList.js";
import { wireListActions } from "../projectActions/actionsRouter.js";

const showArchivedProjectsBtn = document.querySelector(".archived");
const container = document.querySelector(".archivedProjects");
const showProjectLists = document.querySelector(".renderProjects");


let wired = false;

function render() {
  togglePanels({ showSelector: ".archivedProjects", hideSelector: ".renderProjects" });
  renderList({
    containerSelector: ".archivedProjects",
    items: getArchivedProjects(),
    emptyText: "No archived projects yet",
    actions: [
      { text: "Undo", className: "undo",action:"undo" },
      { text: "Delete", className: "delete",action:"delete" },
    ],
  });
}

export function showArchivedPj() {
  if (wired) return;
  wired = true;
  if (!showArchivedProjectsBtn || !container) {
    console.warn("Projects UI elements missing: cannot wire render.");
    return;
  }
  showArchivedProjectsBtn.addEventListener("click", render);
  document.addEventListener("project:archived", render);
  document.addEventListener('archived:removed', render);
  document.addEventListener('project:unarchived', render);

  wireListActions(".archivedProjects")
}

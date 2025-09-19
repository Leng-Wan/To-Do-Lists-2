import { getProjects } from "../Storage/projectManager.js";
import { renderList, togglePanels } from "./renderList.js";
import { wireListActions } from "../projectActions/actionsRouter.js";

const showProjectBtn = document.querySelector(".projects");
const container = document.querySelector(".renderProjects");

let wired = false;

function render() {
  togglePanels({ showSelector: ".renderProjects", hideSelector: ".archivedProjects" });
  renderList({
    containerSelector: ".renderProjects",
    items: getProjects(),
    emptyText: "No projects yet",
    actions: [
      { text: "Edit", className: "edit",action:"edit" },
      { text: "Delete", className: "delete",action:"delete" },
      { text: "Done", className: "done",action:"done" },
    ],
  });
}

export function show()
{
    if(wired) return
    wired = true;

    if(!showProjectBtn || !container)
    {
        console.warn("Projects UI elements missing; cannot wire renderer.");
        return;
    }

    showProjectBtn.addEventListener("click",render)
    document.addEventListener("project:created",render)
    document.addEventListener("project:removed",render)
    document.addEventListener("project:archived",render)
    document.addEventListener("project:unarchived",render)

    wireListActions(".renderProjects")
}

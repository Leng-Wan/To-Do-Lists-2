import { removeProject, 
         removeArchivedProject,
         archivedProject,
         unarchiveProject } 
         from "../Storage/projectManager.js";

let wire = new Set()

export function wireListActions(containerSelector)
{
   if(wire.has(containerSelector)) return;

  let container = document.querySelector(containerSelector)
  if(!container) return;

  wire.add(containerSelector)

  container.addEventListener("click",(e)=>
{
    const btn = e.target.closest("button[data-action]")
    if(!btn) return;

    const action = btn.dataset.action || btn.classList[0] || (btn.textContent || '').toLowerCase();
    const projectEl = btn.closest(".eachProject")
    const projectID = projectEl?.dataset.id;

    if(!action || !projectID) return;

    const isArchivedList = container.matches(".archivedProjects")

    switch(action)
    {
        case 'delete': return handlerDelete(projectID, isArchivedList);
        case 'done': return handlerDone(projectID);
        case 'edit': return handlerEdit(projectID);
        case 'undo': return handlerUndo(projectID);
        default: return;
    }

})

}

function handlerDelete(projectID, isArchivedList) {
  if (!projectID) return;
  if (!confirm('Delete this project?')) return;
  return isArchivedList ? removeArchivedProject(projectID) : removeProject(projectID);
}


function handlerDone(projectID)
{
    if(!confirm("Mark as done and archive?")) return;
    const ok = archivedProject(projectID)
    if(!ok) console.log("Archive failed (not found):", projectID)
}

function handlerEdit(projectID)
{

}

function handlerUndo(projectID)
{
    if(!confirm("Move back to active projects?"))return;
    const ok = unarchiveProject(projectID)
    if(!ok) console.warn("Unarchive failed (not found):",projectID)
}

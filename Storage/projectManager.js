import { dataFactory } from "./dataFactory.js";

let projects = [];
let archivedProjects = []

// Add a project given a title string or a full project object
export function addProject(project_or_Title) {
  if(typeof project_or_Title === 'string')
  {
    const title = project_or_Title.trim()
    let project = dataFactory({title})

    projects.push(project)

    return project;
  }

  if(typeof project_or_Title === 'object')
  {
    projects.push(project_or_Title)
    return project_or_Title;
  }

  return null;
}
//geting projects
export function getProjects() {
  return [...projects];
}

//removing project
export function removeProject(project_id)
{
    let idx = projects.findIndex(p => p.id === project_id)
    if(idx === -1) return false;

    const [removed] = projects.splice(idx,1)
    document.dispatchEvent(new CustomEvent("project:removed",{detail:removed}))
    return true;
}

//archiving project
export function archivedProject(project_id)
{
    let idx = projects.findIndex(p=>p.id === project_id)
    if(idx === -1) return false;

    const [projectArchived] = projects.splice(idx,1)
    archivedProjects.push(projectArchived)
    document.dispatchEvent(new CustomEvent("project:archived",{detail:projectArchived}))
    return true;
}

export function getArchivedProjects()
{
    return [...archivedProjects]
}

export function removeArchivedProject(project_id) {
  const idx = archivedProjects.findIndex(p => p.id === project_id);
  if (idx === -1) return false;
  const [removed] = archivedProjects.splice(idx, 1);
  document.dispatchEvent(new CustomEvent('archived:removed', { detail: removed }));
  return true;
}


export function unarchiveProject(project_id) {
  const idx = archivedProjects.findIndex(p => p.id === project_id);
  if (idx === -1) return false;
  const [proj] = archivedProjects.splice(idx, 1);
  projects.push(proj);
  document.dispatchEvent(new CustomEvent('project:unarchived', { detail: proj }));
  return true;
}

//this aims to open edit mode of specific project
export function getProjectDetail(project_id)
{
 const idx = projects.findIndex(p => p.id === project_id)
 if(idx === -1) return null;

 const project = projects[idx]
 document.dispatchEvent(new CustomEvent("project:info", {detail:project}))

 return project;
}

// updating project
export function updateProject(project_id,changes={})
{
  const idx = projects.findIndex(p=>p.id === project_id)
  if(idx === -1) return null;

  const now = new Date().toISOString();

  const next = {...projects[idx], ...changes, updated_at:now}

  if(typeof changes.title === 'string')
  {
    const t = changes.title.trim();
    if(!t) return projects[idx]
    next.title = t;
  }

  if(Array.isArray(changes.tasks)) next.tasks = changes.tasks;
  projects[idx] = next;
  document.dispatchEvent(new CustomEvent("project:updated",{detail:next}))
  return next;
}
// Listen for created projects dispatched by the capture module
document.addEventListener("project:created", (e) => {
  addProject(e.detail);
});

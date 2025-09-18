import { dataFactory } from "./dataFactory.js";

let projects = [];
let archived = []

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
}

// Listen for created projects dispatched by the capture module
document.addEventListener("project:created", (e) => {
  addProject(e.detail);
});

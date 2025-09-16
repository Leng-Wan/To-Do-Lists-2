import { dataFactory } from "./dataFactory.js";

let projects = [];

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

export function getProjects() {
  return [...projects];
}

// Listen for created projects dispatched by the capture module
document.addEventListener("project:created", (e) => {
  addProject(e.detail);
});

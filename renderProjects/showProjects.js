import { getProjects } from "../Storage/projectManager.js";

const showProjectBtn = document.querySelector(".projects");
const container = document.querySelector(".renderProjects");

let wired = false;

function render() {
  if (!container) return;
  container.hidden = false;
  container.textContent = "";

  const projects = getProjects();
  if (!projects.length) {
    container.textContent = "No projects yet";
    return;
  }

  const frag = document.createDocumentFragment();

  projects.forEach((item, index) => {
    const itemDiv = document.createElement("div"); // each project
    itemDiv.dataset.id = item.id;
    itemDiv.classList.add("eachProject")

    const number = document.createElement("span");
    number.textContent = index + 1;

    const pjTitle = document.createElement("p");
    pjTitle.textContent = item.title;

    // action buttons
    const divActions = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete");

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = "Done";
    doneBtn.classList.add("done");

    divActions.appendChild(editBtn);
    divActions.appendChild(delBtn);
    divActions.appendChild(doneBtn);

    itemDiv.appendChild(number);
    itemDiv.appendChild(pjTitle);
    itemDiv.appendChild(divActions);

    frag.appendChild(itemDiv);
  });

  container.appendChild(frag);
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
}

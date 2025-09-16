import { dataFactory } from "../Storage/dataFactory.js";

const createPjBtn = document.querySelector(".create");
const projectForm = document.querySelector("#projectForm");
const projectModal = document.querySelector("#projectModal");
const projectTitle = document.querySelector("#title");
const cancelBtn = document.querySelector(".cancel");

let wire = false; //guard to prevent duplicate attaching event listeners

export function creatingProject()
{
    if(wire) return;

    if(!createPjBtn || !projectForm || !projectModal || !projectTitle || !cancelBtn)
    {
        console.log("Project UI element is missing..cannot handle ")
        return;
    }

    wire = true;

    //opening project modal
    createPjBtn.addEventListener("click",()=>
    {
        projectModal.hidden = false;
        projectForm.reset();
        projectTitle.focus();
    })

    //handle form submit
    projectForm.addEventListener("submit",(e)=>
    {
        e.preventDefault();
        const title = projectTitle.value.trim();
        if(! title)
        {
            console.log("No project title found")
            return;
        }

        const project = dataFactory({title})

        projectForm.reset()
        projectModal.hidden = true;

        //reminding all listeners
        document.dispatchEvent(new CustomEvent("project:created", {detail:project}))
    })

    cancelBtn.addEventListener("click",()=>
    {
        projectForm.reset();
        projectModal.hidden = true;
    })
}
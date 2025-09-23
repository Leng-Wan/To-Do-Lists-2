import { getProjectDetail } from "../Storage/projectManager.js";

let wired = false;

export function projectDetail()
{
    if(wired) return;
    const container = document.querySelector(".renderProjects")
    if(!container) return;

    wired = true;

    container.addEventListener("click",(e)=>
    {
        const btn = e.target.closest('button[data-action="info"]')
        if(!btn) return;

        const action = btn.dataset.action;
        const projectEl = btn.closest(".eachProject")
        if(!projectEl) return;

        const projectID = projectEl?.dataset.id;

        if(!action || !projectID) return;
        getProjectDetail(projectID)
        
    })

}
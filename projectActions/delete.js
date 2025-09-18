import { removeProject } from "../Storage/projectManager.js";

const LIST_SELECTOR   = ".renderProjects";
const ITEM_SELECTOR   = ".eachProject";
const DELETE_SELECTOR = ".delete";

let wired = false;

export function delFunction() {
  if (wired) return;

  const container = document.querySelector(LIST_SELECTOR);
  if (!container) return;

  wired = true;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(DELETE_SELECTOR);
    if (!btn) return;

    const projectEl = btn.closest(ITEM_SELECTOR);
    if (!projectEl) return;

    const projectID = projectEl.dataset.id;
    if (!projectID) return;

    const name = projectEl.querySelector("p")?.textContent?.trim() || "this project";
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    const ok = removeProject(projectID);

    if (ok === false) {
      console.warn("No project found:", projectID);
    }
  });
}

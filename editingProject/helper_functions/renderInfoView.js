import { escapeHTML } from "./escapeHTML.js";
import { renderTaskList } from "./renderTaskList.js";

export function renderInfoView({ workingTitle, workingTasks, selectedTaskIds }) {
  return `
    <section class="project-info">
      <header class="info-header">
        <h2 class="info-title">${escapeHTML(workingTitle)}</h2>
        <div class="info-actions">
          <button type="button" class="info-edit">Edit</button>
          <button type="button" class="info-close">Close</button>
        </div>
      </header>
      <div class="info-body">
        <ul class="info-subtasks">
          ${renderTaskList(workingTasks, { editing: false, selected: selectedTaskIds })}
        </ul>
      </div>
    </section>
  `;
}

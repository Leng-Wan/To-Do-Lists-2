import { escapeHTML } from "./escapeHTML.js";
import { renderTaskList } from "./renderTaskList.js";

export function renderEditView({ workingTitle, workingTasks, selectedTaskIds }) {
  const hasSelection = selectedTaskIds.size > 0;

  return `
    <section class="project-info is-editing">
      <header class="info-header">
        <div class="info-title-edit">
          <label for="infoTitleInput" class="sr-only">Title</label>
          <input id="infoTitleInput" class="info-title-input" type="text" autocomplete="off" value="${escapeHTML(workingTitle)}">
        </div>
        <div class="info-actions">
          <button type="button" class="info-save">Save</button>
          <button type="button" class="info-cancel">Cancel</button>
        </div>
      </header>
      <div class="info-body">
        <div class="tasks-add-row">
          <label for="newSubtaskTitle" class="sr-only">New subtask</label>
          <input id="newSubtaskTitle" class="task-add-input" type="text" placeholder="Add a subtask" autocomplete="off">
          <button type="button" class="task-add-btn">Add</button>
        </div>
        <ul class="info-subtasks is-editing">
          ${renderTaskList(workingTasks, { editing: true, selected: selectedTaskIds })}
        </ul>
        <footer class="info-footer">
          <button type="button" class="tasks-delete" ${hasSelection ? "" : "disabled"}>Delete Selected</button>
        </footer>
      </div>
    </section>
  `;
}

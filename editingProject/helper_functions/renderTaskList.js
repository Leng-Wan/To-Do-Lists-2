import { escapeHTML } from "./escapeHTML.js";

export function renderTaskList(tasks, { editing, selected }) {
  if (!tasks.length) {
    return `<li class="info-subtasks-empty">No subtasks yet</li>`;
  }

  return tasks
    .map((task) => {
      if (!editing) {
        return `
          <li class="info-subtask" data-id="${escapeHTML(task.id)}">
            <span class="task-title">${escapeHTML(task.title)}</span>
          </li>
        `;
      }

      const isSelected = selected.has(task.id);
      const checked = isSelected ? "checked" : "";
      const selectedClass = isSelected ? " is-selected" : "";
      return `
        <li class="info-subtask is-editing${selectedClass}" data-id="${escapeHTML(task.id)}">
          <label class="task-edit-row">
            <input type="checkbox" class="task-select" ${checked}>
            <input type="text" class="task-title-input" value="${escapeHTML(task.title)}">
          </label>
        </li>
      `;
    })
    .join("");
}

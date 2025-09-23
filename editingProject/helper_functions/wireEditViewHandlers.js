import { normalizeTasks } from "./normalizeTasks.js";

export function wireEditViewHandlers({
  infoPanel,
  project,
  state,
  updateProject,
  rerender,
}) {
  const titleInput = infoPanel.querySelector("#infoTitleInput");
  const subtasksList = infoPanel.querySelector(".info-subtasks");
  const deleteBtn = infoPanel.querySelector(".tasks-delete");
  const saveBtn = infoPanel.querySelector(".info-save");
  const cancelBtn = infoPanel.querySelector(".info-cancel");
  const addInput = infoPanel.querySelector("#newSubtaskTitle");
  const addBtn = infoPanel.querySelector(".task-add-btn");

  if (titleInput) {
    titleInput.addEventListener("input", (event) => {
      state.workingTitle = event.target.value;
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      state.editing = false;
      state.workingTitle = project.title || "";
      state.workingTasks = normalizeTasks(project.tasks);
      state.selectedTaskIds = new Set();
      rerender();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const nextTitle = state.workingTitle.trim() || project.title;
      const nextTasks = state.workingTasks.map((task) => ({
        ...task,
        title: task.title.trim(),
      }));

      updateProject(project.id, { title: nextTitle, tasks: nextTasks });

      project.title = nextTitle;
      project.tasks = nextTasks;
      state.workingTitle = nextTitle;
      state.workingTasks = nextTasks;
      state.selectedTaskIds = new Set();
      state.editing = false;
      rerender();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (!state.selectedTaskIds.size) return;
      state.workingTasks = state.workingTasks.filter(
        (task) => !state.selectedTaskIds.has(task.id)
      );
      state.selectedTaskIds = new Set();
      rerender();
    });
  }

  function handleAddTask() {
    if (!addInput) return;
    const title = addInput.value.trim();
    if (!title) return;

    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    state.workingTasks = [
      ...state.workingTasks,
      { id, title, done: false },
    ];

    addInput.value = "";
    rerender();
  }

  if (addBtn) {
    addBtn.addEventListener("click", handleAddTask);
  }

  if (addInput) {
    addInput.focus();
    addInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleAddTask();
      }
    });
  }

  if (subtasksList) {
    subtasksList.addEventListener("change", (event) => {
      const row = event.target.closest(".info-subtask");
      if (!row) return;
      const taskId = row.dataset.id;

      if (event.target.matches(".task-select")) {
        if (event.target.checked) {
          state.selectedTaskIds.add(taskId);
          row.classList.add("is-selected");
        } else {
          state.selectedTaskIds.delete(taskId);
          row.classList.remove("is-selected");
        }

        const btn = infoPanel.querySelector(".tasks-delete");
        if (btn) {
          btn.disabled = state.selectedTaskIds.size === 0;
        }
      }
    });

    subtasksList.addEventListener("input", (event) => {
      if (!event.target.matches(".task-title-input")) return;
      const row = event.target.closest(".info-subtask");
      if (!row) return;
      const taskId = row.dataset.id;
      const nextTitle = event.target.value;

      state.workingTasks = state.workingTasks.map((task) =>
        task.id === taskId ? { ...task, title: nextTitle } : task
      );
    });
  }
}

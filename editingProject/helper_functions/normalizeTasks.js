export function normalizeTasks(tasks) {
  if (!Array.isArray(tasks)) return [];

  return tasks.map((task, index) => {
    if (task && typeof task === "object") {
      const id = String(task.id ?? `${Date.now()}-${index}`);
      const title = String(task.title ?? "").trim();
      return { id, title, done: !!task.done };
    }

    const title = String(task ?? "").trim();
    return { id: String(`${Date.now()}-${index}`), title, done: false };
  });
}

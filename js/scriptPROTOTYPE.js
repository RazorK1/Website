"use strict";
var Priority;
(function (Priority) {
    Priority["Low"] = "Low";
    Priority["Medium"] = "Medium";
    Priority["High"] = "High";
})(Priority || (Priority = {}));
class TaskManager {
    tasks = [];
    taskInput;
    taskList;
    totalTasks;
    completedTasks;
    remainingTasks;
    completionRate;
    prioritySelect;
    constructor() {
        this.taskInput =
            document.getElementById("taskInput");
        this.taskList =
            document.getElementById("taskList");
        this.totalTasks =
            document.getElementById("totalTasks");
        this.completedTasks =
            document.getElementById("completedTasks");
        this.remainingTasks =
            document.getElementById("remainingTasks");
        this.completionRate =
            document.getElementById("completionRate");
        this.prioritySelect =
            document.getElementById("prioritySelect");
        const addButton = document.getElementById("addTaskBtn");
        const clearButton = document.getElementById("clearAllBtn");
        addButton.addEventListener("click", () => {
            this.addTask();
        });
        clearButton.addEventListener("click", () => {
            const confirmDelete = confirm("Delete all tasks?");
            if (confirmDelete) {
                this.clearAllTasks();
            }
        });
        this.taskInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.addTask();
            }
        });
        this.loadTasks();
        this.renderTasks();
    }
    addTask() {
        const title = this.taskInput.value.trim();
        if (title === "") {
            alert("Please enter a task.");
            return;
        }
        const task = {
            id: Date.now(),
            title: title,
            completed: false,
            priority: this.prioritySelect.value
        };
        this.tasks.push(task);
        this.taskInput.value = "";
        this.saveTasks();
        this.renderTasks();
    }
    deleteTask(id) {
        this.tasks =
            this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed =
                !task.completed;
        }
        this.saveTasks();
        this.renderTasks();
    }
    clearAllTasks() {
        this.tasks = [];
        this.saveTasks();
        this.renderTasks();
    }
    renderTasks() {
        this.taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.className =
                "task-item";
            const taskInfo = document.createElement("div");
            taskInfo.className =
                "task-info";
            const checkbox = document.createElement("input");
            checkbox.type =
                "checkbox";
            checkbox.checked =
                task.completed;
            checkbox.addEventListener("change", () => {
                this.toggleTask(task.id);
            });
            const span = document.createElement("span");
            span.textContent =
                `${task.title} [${task.priority}]`;
            if (task.completed) {
                span.classList.add("completed");
            }
            const deleteButton = document.createElement("button");
            deleteButton.textContent =
                "Delete";
            deleteButton.className =
                "delete-btn";
            deleteButton.addEventListener("click", () => {
                this.deleteTask(task.id);
            });
            taskInfo.appendChild(checkbox);
            taskInfo.appendChild(span);
            li.appendChild(taskInfo);
            li.appendChild(deleteButton);
            this.taskList.appendChild(li);
        });
        this.updateStats();
    }
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const remaining = total - completed;
        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);
        this.totalTasks.textContent =
            total.toString();
        this.completedTasks.textContent =
            completed.toString();
        this.remainingTasks.textContent =
            remaining.toString();
        this.completionRate.textContent =
            `${percentage}%`;
    }
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks =
                JSON.parse(savedTasks);
        }
    }
}
new TaskManager();

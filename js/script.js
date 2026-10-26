"use strict";
class TaskManager {
    tasks = [];
    taskInput;
    taskList;
    totalTasks;
    completedTasks;
    constructor() {
        this.taskInput =
            document.getElementById("taskInput");
        this.taskList =
            document.getElementById("taskList");
        this.totalTasks =
            document.getElementById("totalTasks");
        this.completedTasks =
            document.getElementById("completedTasks");
        this.loadTasks();
        const addButton = document.getElementById("addTaskBtn");
        addButton.addEventListener("click", () => {
            this.addTask();
        });
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
            completed: false
        };
        this.tasks.push(task);
        this.taskInput.value = "";
        this.saveTasks();
        this.renderTasks();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        this.saveTasks();
        this.renderTasks();
    }
    renderTasks() {
        this.taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "task-item";
            const taskInfo = document.createElement("div");
            taskInfo.className = "task-info";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                this.toggleTask(task.id);
            });
            const span = document.createElement("span");
            span.textContent = task.title;
            if (task.completed) {
                span.classList.add("completed");
            }
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
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
        this.totalTasks.textContent =
            total.toString();
        this.completedTasks.textContent =
            completed.toString();
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

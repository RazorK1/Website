enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
}

class TaskManager {

    private tasks: Task[] = [];

    private taskInput: HTMLInputElement;
    private taskList: HTMLUListElement;

    private totalTasks: HTMLElement;
    private completedTasks: HTMLElement;
    private remainingTasks: HTMLElement;
    private completionRate: HTMLElement;

    private prioritySelect: HTMLSelectElement;

    constructor() {

        this.taskInput =
            document.getElementById("taskInput") as HTMLInputElement;

        this.taskList =
            document.getElementById("taskList") as HTMLUListElement;

        this.totalTasks =
            document.getElementById("totalTasks") as HTMLElement;

        this.completedTasks =
            document.getElementById("completedTasks") as HTMLElement;

        this.remainingTasks =
            document.getElementById("remainingTasks") as HTMLElement;

        this.completionRate =
            document.getElementById("completionRate") as HTMLElement;

        this.prioritySelect =
            document.getElementById("prioritySelect") as HTMLSelectElement;

        const addButton =
            document.getElementById("addTaskBtn") as HTMLButtonElement;

        const clearButton =
            document.getElementById("clearAllBtn") as HTMLButtonElement;

        addButton.addEventListener("click", () => {
            this.addTask();
        });

        clearButton.addEventListener("click", () => {

            const confirmDelete =
                confirm("Delete all tasks?");

            if (confirmDelete) {
                this.clearAllTasks();
            }

        });

        this.taskInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {
                    this.addTask();
                }

            }
        );

        this.loadTasks();
        this.renderTasks();
    }

    private addTask(): void {

        const title =
            this.taskInput.value.trim();

        if (title === "") {

            alert("Please enter a task.");

            return;
        }

        const task: Task = {

            id: Date.now(),

            title: title,

            completed: false,

            priority:
                this.prioritySelect.value as Priority

        };

        this.tasks.push(task);

        this.taskInput.value = "";

        this.saveTasks();
        this.renderTasks();
    }

    private deleteTask(id: number): void {

        this.tasks =
            this.tasks.filter(
                task => task.id !== id
            );

        this.saveTasks();
        this.renderTasks();
    }

    private toggleTask(id: number): void {

        const task =
            this.tasks.find(
                task => task.id === id
            );

        if (task) {

            task.completed =
                !task.completed;
        }

        this.saveTasks();
        this.renderTasks();
    }

    private clearAllTasks(): void {

        this.tasks = [];

        this.saveTasks();
        this.renderTasks();
    }

    private renderTasks(): void {

        this.taskList.innerHTML = "";

        this.tasks.forEach(task => {

            const li =
                document.createElement("li");

            li.className =
                "task-item";

            const taskInfo =
                document.createElement("div");

            taskInfo.className =
                "task-info";

            const checkbox =
                document.createElement("input");

            checkbox.type =
                "checkbox";

            checkbox.checked =
                task.completed;

            checkbox.addEventListener(
                "change",
                () => {
                    this.toggleTask(task.id);
                }
            );

            const span =
                document.createElement("span");

            span.textContent =
                `${task.title} [${task.priority}]`;

            if (task.completed) {

                span.classList.add(
                    "completed"
                );
            }

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.className =
                "delete-btn";

            deleteButton.addEventListener(
                "click",
                () => {
                    this.deleteTask(task.id);
                }
            );

            taskInfo.appendChild(
                checkbox
            );

            taskInfo.appendChild(
                span
            );

            li.appendChild(
                taskInfo
            );

            li.appendChild(
                deleteButton
            );

            this.taskList.appendChild(
                li
            );

        });

        this.updateStats();
    }

    private updateStats(): void {

        const total =
            this.tasks.length;

        const completed =
            this.tasks.filter(
                task => task.completed
            ).length;

        const remaining =
            total - completed;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );

        this.totalTasks.textContent =
            total.toString();

        this.completedTasks.textContent =
            completed.toString();

        this.remainingTasks.textContent =
            remaining.toString();

        this.completionRate.textContent =
            `${percentage}%`;
    }

    private saveTasks(): void {

        localStorage.setItem(
            "tasks",
            JSON.stringify(this.tasks)
        );
    }

    private loadTasks(): void {

        const savedTasks =
            localStorage.getItem("tasks");

        if (savedTasks) {

            this.tasks =
                JSON.parse(savedTasks) as Task[];
        }
    }
}

new TaskManager();

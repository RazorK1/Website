interface Task {
    id: number;
    title: string;
    completed: boolean;
}

class TaskManager {

    private tasks: Task[] = [];

    private taskInput: HTMLInputElement;
    private taskList: HTMLUListElement;

    private totalTasks: HTMLElement;
    private completedTasks: HTMLElement;

    constructor() {

        this.taskInput =
            document.getElementById("taskInput") as HTMLInputElement;

        this.taskList =
            document.getElementById("taskList") as HTMLUListElement;

        this.totalTasks =
            document.getElementById("totalTasks") as HTMLElement;

        this.completedTasks =
            document.getElementById("completedTasks") as HTMLElement;

        this.loadTasks();

        const addButton =
            document.getElementById("addTaskBtn") as HTMLButtonElement;

        addButton.addEventListener("click", () => {
            this.addTask();
        });

        this.renderTasks();
    }

    private addTask(): void {

        const title: string =
            this.taskInput.value.trim();

        if (title === "") {
            alert("Please enter a task.");
            return;
        }

        const task: Task = {
            id: Date.now(),
            title: title,
            completed: false
        };

        this.tasks.push(task);

        this.taskInput.value = "";

        this.saveTasks();
        this.renderTasks();
    }

    private deleteTask(id: number): void {

        this.tasks = this.tasks.filter(
            task => task.id !== id
        );

        this.saveTasks();
        this.renderTasks();
    }

    private toggleTask(id: number): void {

        const task = this.tasks.find(
            task => task.id === id
        );

        if (task) {
            task.completed = !task.completed;
        }

        this.saveTasks();
        this.renderTasks();
    }

    private renderTasks(): void {

        this.taskList.innerHTML = "";

        this.tasks.forEach(task => {

            const li = document.createElement("li");
            li.className = "task-item";

            const taskInfo =
                document.createElement("div");

            taskInfo.className = "task-info";

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                this.toggleTask(task.id);
            });

            const span =
                document.createElement("span");

            span.textContent = task.title;

            if (task.completed) {
                span.classList.add("completed");
            }

            const deleteButton =
                document.createElement("button");

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

    private updateStats(): void {

        const total: number =
            this.tasks.length;

        const completed: number =
            this.tasks.filter(
                task => task.completed
            ).length;

        this.totalTasks.textContent =
            total.toString();

        this.completedTasks.textContent =
            completed.toString();
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

document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Função para renderizar a lista de tarefas
    function renderTasks() {
        taskList.innerHTML = ''; // Limpa a lista
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Apagar';
            deleteBtn.onclick = () => {
                deleteTask(index);
            };

            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    // Adicionar nova tarefa
    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            taskInput.value = ''; // Limpar input
            saveTasks();
            renderTasks();
        }
    }

    // Excluir tarefa
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Salvar tarefas no localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Adicionar evento ao botão
    addTaskBtn.addEventListener('click', addTask);

    // Permitir adicionar tarefa com a tecla "Enter"
    taskInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Renderizar tarefas ao carregar a página
    renderTasks();
});

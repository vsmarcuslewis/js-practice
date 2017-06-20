/*jshint browser: true*/
/*global console, alert*/

var form = document.getElementById('addTask'),
    newTaskInput = document.getElementById('newTaskInput'),
    formButton = form.querySelector('button'),
    toDoList = document.getElementById('toDoList'),
    completedList = document.getElementById('completedList'),
    Data = {
        tasks: [],
        completed: []
    };

function BuildTask() {
    this.task = document.createElement('article');
    this.task.className = 'task';

    //Details Button
    this.detailsButton = document.createElement('span');
    this.detailsButton.className = 'details';
    this.detailsButton.innerHTML = '<img src="images/buttons/details-button.svg">';

        this.task.append(this.detailsButton);

    this.titleTag = document.createElement('h2');
    this.title = newTaskInput.value;
    this.titleTag.textContent = this.title;

        this.task.append(this.titleTag);

    // Action Buttons
    this.actions = document.createElement('div');
    this.actions.className = 'actions';

        this.task.append(this.actions);

    this.deleteButton = document.createElement('span');
    this.deleteButton.className = 'delete';
    this.deleteButton.innerHTML = '<img src="images/buttons/delete-button.svg">';

        this.actions.append(this.deleteButton);

    this.completedButton = document.createElement('span');
    this.completedButton.className = 'completed';
    this.completedButton.innerHTML = '<img src="images/buttons/completed-button.svg">';

        this.actions.append(this.completedButton);

    this.playButton = document.createElement('span');
    this.playButton.className = 'trackTime';
    this.playButton.innerHTML = '<img src="images/buttons/start-button.svg">';

        this.actions.append(this.playButton);
}

formButton.addEventListener('click', function(e) {
    var insertTask = new BuildTask();

    if (newTaskInput.value) {
        Data.tasks.push(insertTask.title);

        toDoList.prepend(insertTask.task);

        newTaskInput.value = '';
        newTaskInput.placeholder = 'enter a new task';

    } else {
        newTaskInput.placeholder = 'please enter a new task!';
    }

    if (document.querySelectorAll('#toDoList article.task').length > 0) {
        toDoList.removeAttribute('class');
    } else {
        toDoList.setAttribute('class', 'null');
    }

    // Delete Task
    insertTask.deleteButton.addEventListener('click', function() {

        if (this.parentNode.parentNode.parentNode.id === 'toDoList') {
            // splice removes items from arrays
            // indexOf reads a string and grabs its index number within the array
            Data.tasks.splice(Data.tasks.indexOf(insertTask.title), 1);
        } else {
            Data.completed.splice(Data.completed.indexOf(insertTask.title), 1);
        }


        this.parentNode.parentNode.remove();

        if (document.querySelectorAll('#toDoList article.task').length < 1) {
            toDoList.setAttribute('class', 'null');
        }
        if (document.querySelectorAll('#completedList article.task').length < 1) {
            completedList.setAttribute('class', 'null');
        }

        console.log(Data);
    });

    // Complete Task
    insertTask.completedButton.addEventListener('click', function() {

        if(this.parentNode.parentNode.parentNode.id === 'toDoList') {
            completedList.prepend(insertTask.task);

            if (document.querySelectorAll('#toDoList article.task').length < 1) {
                toDoList.setAttribute('class', 'null');
            }
            if (document.querySelectorAll('#completedList article.task').length > 0) {
                completedList.removeAttribute('class');
            }

            Data.tasks.splice(Data.tasks.indexOf(insertTask.title), 1);
            Data.completed.push(insertTask.title);
        } else {
            toDoList.prepend(insertTask.task);

            if (document.querySelectorAll('#toDoList article.task').length > 0) {
                toDoList.removeAttribute('class');
            }
            if (document.querySelectorAll('#completedList article.task').length < 1) {
                completedList.setAttribute('class', 'null');
            }

            Data.completed.splice(Data.completed.indexOf(insertTask.title), 1);
            Data.tasks.push(insertTask.title);
        }

        console.log(Data);
    });


    e.preventDefault();
});





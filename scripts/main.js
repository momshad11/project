"use strict";

document.addEventListener("DOMContentLoaded", setup)

function setup() {
//    document.getElementById("buttonSubmit").onclick = function () {submit(evt);};
    loadTodo();
}

function submit() {
    let toDoItem = {
        task_name: document.getElementById('task_name_value').value, 
        task_description: document.getElementById('task_description_value').value,
        task_importance: document.getElementById('task_importance_value').value,
        task_category: getCheckedCategory(),
    };

    let allTasksSerialized = localStorage.getItem('allTasks') 
    let allTasksArray;

    if(allTasksSerialized){
        allTasksArray = JSON.parse(allTasksSerialized);
    }
    else{
        allTasksArray = [];
    }

    allTasksArray.push(toDoItem);
    localStorage.setItem("allTasks", JSON.stringify(allTasksArray));


   showNewTask(toDoItem);
   return false;
}

function showNewTask(toDoItem) {
    debugger;
    var temp = document.getElementsByTagName("template")[0];
    var currentTaskTemplate = temp.content.cloneNode(true);
    currentTaskTemplate.querySelector('taskName').innerHTML = toDoItem.task_name;
    currentTaskTemplate.querySelector('.taskDescription').innerHTML = toDoItem.task_description;
    document.body.appendChild(currentTaskTemplate);
  }

function getCheckedCategory(){
    let radioButtonElements = document.getElementsByClassName('task_category_value');
    for(let i=0; i< radioButtonElements.length; i++)
    {
        if(radioButtonElements[i].checked){
            return radioButtonElements[i].value;
        }
    }

}

function checkedAction(evt){    // the checkbox of a particular todo being checked:
    // a. remove the task from the global todo array
    // b. remove the todo article from the DOM
}

function loadTodo(){
    let allTasksSerialized = localStorage.getItem('allTasks') 
    let allTasksArray;

    if(allTasksSerialized){
        allTasksArray = JSON.parse(allTasksSerialized);
    }
    else{
        allTasksArray = [];
    }

    // Update UI


    // reads from local storage when the page loads, and
    // initializes the global todo array. It can call the existing function that adds a todo to the DOM to initialize
    // the page with the todo tasks. 
}

/*
Modify the functions written in part 4 and 5 to also invoke a function to write the updated todo global
array to local storage.
*/
"use strict";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  document.getElementById("buttonSubmit").onclick = function () {submit();};
  loadTodo();
}

function submit() {
  let toDoItem = {
    task_name: document.getElementById("task_name_value").value,
    task_description: document.getElementById("task_description_value").value,
    task_importance: document.getElementById("task_importance_value").value,
    task_category: getCheckedCategory(),
  };

  let allTasksSerialized = localStorage.getItem("allTasks");
  let allTasksArray;

  if (allTasksSerialized) {
    allTasksArray = JSON.parse(allTasksSerialized);
  } else {
    allTasksArray = [];
  }

  allTasksArray.push(toDoItem);
  localStorage.setItem("allTasks", JSON.stringify(allTasksArray));

  showNewTask(toDoItem, allTasksArray.length);
  return false;
}

function showNewTask(toDoItem, index) {
  var temp = document.getElementsByTagName("template")[0];
  var currentTaskTemplate = temp.content.cloneNode(true);
  currentTaskTemplate.querySelector(".taskName").innerHTML = toDoItem.task_name;
  currentTaskTemplate.querySelector(".taskDescription").innerHTML =
    toDoItem.task_description;

  switch (toDoItem.task_category) {
    case "school":
        currentTaskTemplate.querySelector(".task-container").classList.add('red');
      break;
    case "work":
        currentTaskTemplate.querySelector(".task-container").classList.add('green');
      break;
    case "personal":
        currentTaskTemplate.querySelector(".task-container").classList.add('blue');
      break;
  }

  let numStars = parseInt(toDoItem.task_importance);
  let starString = '';

  for(let i =0; i < 3; i++)
  {
      if(i < numStars){
        starString += '\u2605';
      }
      else{
        starString += '\u2606';
      }
  }

  currentTaskTemplate.querySelector(".rating").innerHTML = starString;
  currentTaskTemplate.querySelector(".checkedButton").setAttribute('data-itemIndex', index);

  document.body.appendChild(currentTaskTemplate);
}

function getCheckedCategory() {
  let radioButtonElements = document.getElementsByClassName(
    "task_category_value"
  );
  for (let i = 0; i < radioButtonElements.length; i++) {
    if (radioButtonElements[i].checked) {
      return radioButtonElements[i].value;
    }
  }
}

function checkedAction(evt) {
    let allTasksArray = JSON.parse(localStorage.getItem("allTasks"));
    let removableIndex = parseInt(evt.getAttribute('data-itemIndex')) === 0 ? 0 : parseInt(evt.getAttribute('data-itemIndex')) - 1;
    const itemToRemove = allTasksArray.indexOf(allTasksArray[removableIndex]);
    if (itemToRemove > -1) {
        allTasksArray.splice(itemToRemove, 1);
    }

    localStorage.setItem("allTasks", JSON.stringify(allTasksArray));
    evt.parentNode.parentNode.parentNode.removeChild(evt.parentNode.parentNode);
}

function loadTodo() {
  let allTasksSerialized = localStorage.getItem("allTasks");
  let allTasksArray;

  if (allTasksSerialized) {
    allTasksArray = JSON.parse(allTasksSerialized);
  } else {
    allTasksArray = [];
  }

  if(allTasksArray.length > 0){
    populateItems(allTasksArray);
  }
}

function populateItems(allTasksArray){
    for(let i=0; i<allTasksArray.length; i++){
        showNewTask(allTasksArray[i], i);
    }
}

/*
Modify the functions written in part 4 and 5 to also invoke a function to write the updated todo global
array to local storage.
*/

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addTodoButton");
let addTOStore=document.getElementById("SaveButton");


addTodoButton.onclick=function(){
    onAddTodo();
}

function getTodoFromLocalStorage(){
    let StringfiedTodolist=localStorage.getItem("TodoList");
    let parsedTodoList=JSON.parse(StringfiedTodolist);
    if(parsedTodoList=== null){
        return [];
    }
    else{
        return parsedTodoList;
    }

}

let todoList = getTodoFromLocalStorage()

addTOStore.onclick=function(){
    localStorage.setItem("TodoList",JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=todoList[todoIndex];
    if (todoObject.isChecked===true){
        todoObject.isChecked= false;
    } else{
        todoObject.isChecked = true;
    }
}
function onDeleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    console.log(todoId);
    let deleteElIndex=todoList.findIndex(function(eachItem){
        let eachItemId="todo"+eachItem.uniqueNo;
        if (eachItemId===todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteElIndex,1);
}



function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoId="todo"+todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id=checkboxId;
    inputElement.checked=todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick=function (){
        onTodoStatusChange(checkboxId,labelId,todoId);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId; 
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);


    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick= function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

}


function onAddTodo(){
    let todosCount=todoList.length;
    todosCount=todosCount+1;
    let userInputElement=document.getElementById("todoUserInput");
    let userInputValue=userInputElement.value;
    if (userInputValue===""){
        alert("Please Enter Something!!");
        return;
    }

    let newTodo={
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    }; 
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value="";
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
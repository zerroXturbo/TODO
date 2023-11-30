const addMessage = document.getElementById("message"),
      addButton = document.getElementById("add"),
      todo = document.getElementById("todo");

let todoList = [];

if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"));
    displayMessages();
}

addButton.addEventListener("click", function(){
    if (addMessage.value === ""){
        addMessage.placeholder = "Вы не ввели свою цель:(";
        return;
    }
    if (addMessage.value.length > 28){
        addMessage.value = "Слишком много букв...";
        return
    }

    let newTodo = {
        numberId: Math.random(),
        todo: addMessage.value,
        checked: false
    }

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem("todo", JSON.stringify(todoList));
});

todo.addEventListener("change", function(event){
    let valueLabel = todo.querySelector("[for="+ event.target.getAttribute("id") +"]").textContent; 
    console.log(todo.querySelector("[for="+ event.target.getAttribute("id") +"]"));
    console.log(valueLabel);
    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    });
});

function displayMessages(){
    let displayMessages = "";
    if (todoList.length === 0) todo.innerHTML = "";
    todoList.forEach(function(item, i){
        displayMessages += `
        <li>
            <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
            <label for="item_${i}">${item.todo}</label>
            <input type="button" id="${item.numberId}" class="delete" value="❌">
        </li>
        `;
        todo.innerHTML = displayMessages;
        var current_task = document.querySelectorAll(".delete");
        for(var i=0; i<current_task.length; i++){
            current_task[i].addEventListener("click", function(){
                let itemId = this.getAttribute("id");
                todoList.forEach(function(item, i){
                    if (Number(item.numberId) === Number(itemId)){
                        todoList.splice(i, 1);
                        localStorage.setItem("todo", JSON.stringify(todoList));
                    }
                })
                this.parentNode.remove();
            })
        }
    })
}
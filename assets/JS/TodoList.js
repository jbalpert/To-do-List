//jQuery

// //Check Off Specific Todos By Clicking
// $("ul").on("click", "li", function(){
// 	$(this).toggleClass("completed");
// });

// //Click on X to delete Todo
// $("ul").on("click", "span", function(event){
// 	$(this).parent().fadeOut(500,function(){
// 		$(this).remove();
// 	});
// 	event.stopPropagation();
// });

// //Add a todo

// $("input[type='text']").keypress(function(event){
// 	if(event.which === 13){
// 		//todoText contains input text
// 		let todoText = $(this).val();
// 		$(this).val("");
// 		//create a new li and add to ul
// 		$("ul").append("<li><span>X</span> " + todoText + "</li>")
// 	}
// });

//Javascript

document.addEventListener("DOMContentLoaded", ()=> {
	reloadTodos();
});

//Check Off Specific Todos By Clicking
const ul = document.querySelector("ul");

  ul.addEventListener('click', function() {
  	if(event.target.tagName.toLowerCase() === "li"){
    event.target.classList.toggle("completed");
	}
  });

//Click on X to delete Todo
	ul.addEventListener('click', function(){
	let click = event.target.tagName.toLowerCase();
	if(click === "span"){
		deleteTodo(event.target.parentNode);
	}
	else if(click === "i"){
		deleteTodo(event.target.parentNode.parentNode);
	}
});

//Add a todo
const textbox = document.querySelector("input");
addTodo(textbox);


function deleteTodo(removeParent){
	let index = (Array.prototype.indexOf.call(removeParent.parentNode.children, removeParent));
	deleteStorage(index);
	removeParent.classList.add("hidden");
	event.stopPropagation();
	setTimeout(function(){removeParent.remove();}, 500);
}

function addTodo(textbox){
	textbox.addEventListener('keydown', function(todo){
	if(todo.keyCode === 13){
		let todoText = textbox.value;
		if(todoText != ""){
		ul.innerHTML += "<li><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + todoText + "</li>";
		textbox.value = "";
			}
		}
		storeTodos();
	});
}
let listItems = document.querySelectorAll("li");

function updateList(){
	listItems = document.querySelectorAll("li");
} 

// Local Storage for the Todos
function storeTodos(){
	localStorage.clear();
	updateList();
	listItems.forEach((item, i) => {
		localStorage.setItem(i.toString(),item.textContent);
	});
}

function deleteStorage(index){
	storeTodos();
	localStorage.removeItem(index.toString());
}

function reloadTodos(){
	for (let i = 0; i < localStorage.length; i++){
		let todo = localStorage.getItem(i.toString());
		ul.innerHTML += "<li><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + todo + "</li>";
	}
}


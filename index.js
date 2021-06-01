var container = document.getElementById('container');
var input = document.getElementById('inputText');
var todoList = document.getElementById('todoList');
var nodeList;

function Item(id, content, isActive, isCompleted) {
    this.id = id;
    this.content = content;
    this.isActive = isActive;
    this.isCompleted = isCompleted;

    this.createDomElem = function() {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        var i = document.createElement('i');
        var textContent = document.createTextNode(this.content);
        var textBox = document.createElement('span');
        var input = document.createElement('input');


        checkbox.type = "checkbox";
        checkbox.className = 'checkbox';
        i.className = 'icon';
        textBox.className = 'textBox';
        input.type = "text";
        input.className = "inputBox";

        li.appendChild(checkbox);
        li.appendChild(textBox);
        textBox.appendChild(textContent);
        li.appendChild(input);
        li.appendChild(i);

        return li;
    };
}

function List(list) {
    this.list = list;

    this.getLength = function() {
        return this.list.length;
    };
    this.getList = function() {
        return this.list;
    };
    this.addItemToList = function(item) {
      this.list.push(item);
    };
    this.deleteItemFromList = function(id) {
        this.list = this.list.filter(function (item) {
            return item.id !== id;
        })
    }
}

window.addEventListener('load', (event) => {
    nodeList = new List([]);
});

input.addEventListener(
    'keydown',
    function(key) {
        if (key.code === "Enter" && input.value.trim().length > 2) {
            var id = nodeList.getLength() ? nodeList.getLength() : 0;
            var item = new Item(id, input.value.trim(), false, false);

            nodeList.addItemToList(item);

            for (var i = 0; i < (nodeList.getLength() - 1); i++);  {
                var elem = item.createDomElem(nodeList.getList()[i]);
                var checkbox = elem.getElementsByClassName('checkbox')[0];
                var icon = elem.getElementsByClassName('icon')[0];
                var textBox = elem.getElementsByClassName('textBox')[0];
                var inputBox = elem.getElementsByClassName('inputBox')[0];

                todoList.appendChild(elem);

                checkbox.addEventListener('click', function() {
                    item.isActive = !item.isActive;
                    item.isActive ? elem.classList.add('active') : elem.classList.remove('active');
                });

                icon.addEventListener('click', function(){
                    nodeList.deleteItemFromList(item.id);
                    todoList.removeChild(elem);
                });

                textBox.addEventListener('dblclick', function(){
                    var text = textBox.innerHTML;
                    //var parentElement = textBox.parentElement;
                    elem.classList.add('editMode');
                    inputBox.value = text;
                });

                inputBox.addEventListener('keydown', function(key){
                    if (key.code === "Enter" && inputBox.value.trim().length > 2) {
                        nodeList.getList()[i].content = inputBox.value.trim();
                        textBox.innerHTML = nodeList.getList()[i].content;
                        elem.classList.remove('editMode');
                    }
                });
            }

            input.value = '';
        }
    }
);





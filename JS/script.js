//seleção de elementos
const todoForm = window.document.getElementById('todo-form')
const todoInput = window.document.getElementById('iinput')
const todoList = window.document.getElementById('itodo-list')
const editForm = window.document.getElementById('edit-form')
const editInput = window.document.getElementById('iedit-input')
const cancelEditBtn = window.document.getElementById('cancel-edit-button')

let oldInputValue //variavel que tera os titulos antigos dos eventos.

//funções
const saveTodo = (text) => {
    const todo = window.document.createElement('div') //criando uma div externa
    todo.classList.add('todo') //definindo a classe desta div de 'todo'

    const todoTitle = window.document.createElement('h3')
    todoTitle.innerText = text //inserindo o texto digitado no elemento criado.
    todo.appendChild(todoTitle) // inserindo o h3 com o texto na div.

    const doneBtn = window.document.createElement('button')
    doneBtn.classList.add('finish-todo') //cria um novo botão da classe definida.
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //adiciona o icone do botão.
    todo.appendChild(doneBtn) //colocando o botão na div.


    const editBtn = window.document.createElement('button')
    editBtn.classList.add('edit-todo') //cria um novo botão da classe definida.
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' //adiciona o icone do botão.
    todo.appendChild(editBtn) //colocando o botão na div.

    const deleteBtn = window.document.createElement('button')
    deleteBtn.classList.add('remove-todo') //cria um novo botão da classe definida.
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>' //adiciona o icone do botão.
    todo.appendChild(deleteBtn) //colocando o botão na div.

    todoList.appendChild(todo) // colocando a div na lista geral.
    todoInput.value = '' //limpa o campo
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide') //edita a classe 'hide', se tiver sendo exibido ele esconde, e vice-versa
    todoForm.classList.toggle('hide') //esconde o formulario principal e a lista de to-do, e deixa apenas o formulário de edit.
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = window.document.querySelectorAll('.todo')//pega a lista de tarefas com a classe .todo, ou seja, todas as terafas cadastradas e não finalizadas.
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')
        console.log(todoTitle, text)

        if (todoTitle.innerText === oldInputValue) { //percorre os elementos da classe .todo e modifica apenas o com texto devido contido no old...
            todoTitle.innerText = text
        }
    })
}

// eventos 
todoForm.addEventListener('submit', (e) => {
    e.preventDefault() //envia um formulário apenas no front-end, ao clicar o botão '+'.
    const inputValue = todoInput.value //pegar o valor do input para criar uma nova tarefa.
    if (inputValue) { //mini validação, para não pegar o campo vazio.
        //salvar o to-do
        saveTodo(inputValue)
    }
})



window.document.addEventListener('click', (e) => {
    const targetEl = e.target //verifica se o 'target' do evento 'click' contem um elemento com classe definida.
    const parentEl = targetEl.closest('div') //seleciona a 'div' mais proxima do elemento 'targetEl', no caso, o 'targetEl' é um button, o elemento pai mais proximo é a div de classe 'todo'.
    let todoTitle //como não tem id para determinados ações, será usado este titulo. Cada elemento que eu clicar terá um titulo.
    if (parentEl && parentEl.querySelector('h3')) { //verifica se existe um parent, ou seja, se o botão foi clicado e adicionado a div; e se ja possui um 'h3'. Aqui o 'getElementById' não funciona.
        todoTitle = parentEl.querySelector('h3').innerText //coloca o texto digitado no 'h3' e armazena como o titulo daquele evento.

    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done') //quando detecta que o elemento(botão) da classe 'finish' foi clicado, eu pego a variavel pai da div mais proximo e adiciono 'sub-classe' 'done' de 'todo' a classe. O 'toggle' é mais funcional do que o 'add', pois assim se caso não seja da 'done' ele adiciona, caso ja seja, ele tira.
    }
    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove() //remove toda a 'div' contida no target. 
    }
    if (targetEl.classList.contains('edit-todo')) {
        toggleForms() //função para esconder um formulário e mostrar outro.
        editInput.value = todoTitle // o input digitado no campo de edição receberá o titulo do 'h3'.
        oldInputValue = todoTitle // guarda o valor anterior a edição para poder consultar posteriormente.
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault() //PARA NÃO ENVIAR FORMULÁRIO NO BACK-END

    toggleForms() // da toggle de volta.
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value //valor novo digitado pelo usuario.
    if (editInputValue) {
        //atualizar o valor.
        updateTodo(editInputValue) //atualiza o valor da variavel para o texto armazenado na edição;
    }

    toggleForms() //após a edição ser finalizada, volta para o estado anterior.
})
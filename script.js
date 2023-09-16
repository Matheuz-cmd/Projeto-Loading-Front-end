const localStorageKey = 'to-do-list-loading'

function validateIfExistsNewTask()
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}
function newTask() {
    let input = document.getElementById('input-new-task')

    if (!input.value) {
        alert('Digite algo para inserir na to-do list')
    }
    else if(validateIfExistsNewTask())
    {
        alert('Já existe uma task com essa descrição')
    }
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = '' 
}
function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
       list.innerHTML += `
       <li class= "to-do-task">
       <input id="checkbox" type="checkbox">
       <div>${values[i]['name']}</div>
       <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>x</button>
       </li>
       `
        
    }
}
function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

window.addEventListener('keypress', (e) =>{
    if (e.key == 'Enter'){
        newTask() 
    }
})
showValues()
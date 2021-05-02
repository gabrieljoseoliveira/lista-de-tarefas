const novaTarefa = document.querySelector(`.novaTarefa`);
const bAdicionar = document.querySelector(`.addTarefa`);
const lista = document.querySelector(`.tarefas`);

bAdicionar.addEventListener(`click`, () => {

    if (!novaTarefa.value) return;

    adicionaTarefa(novaTarefa.value);

});

novaTarefa.addEventListener(`keypress`, (e) => {

    if (e.keyCode === 13) {

        if (!novaTarefa.value) return;

        adicionaTarefa(novaTarefa.value);

    }

});

const criaItem = (tarefa) => {

    return document.createElement(`li`);

}

const adicionaTarefa = (tarefa) => {

    const item = criaItem();
    item.innerText = tarefa
    lista.appendChild(item);
    limpaInput();
    criaBotaoDeApagar(item);
    salvarTarefas();

}

const limpaInput = () => {

    novaTarefa.value = ``;
    novaTarefa.focus();

}

const criaBotaoDeApagar = (item) => {
    item.innerText += ` `;
    const bDeApagar = document.createElement('button');
    bDeApagar.innerText = `Apagar`;
    bDeApagar.setAttribute(`class`, `btnDeApagar`);
    item.appendChild(bDeApagar);
}

const salvarTarefas = () => {

    const itens = lista.querySelectorAll(`li`);
    const tarefas = [];

    for (const item of itens) {

        const tarefa = item.innerText.replace(`Apagar`, ``).trim();
        tarefas.push(tarefa);

    }


    const tarefasJSON = JSON.stringify(tarefas);
    localStorage.setItem(`tarefas`, tarefasJSON);
    console.log(tarefasJSON);

}

const tarefasSalvas = () => {

    const salvas = localStorage.getItem(`tarefas`);
    const tarefasSalvas = JSON.parse(salvas);

    for (const item of tarefasSalvas) {

        adicionaTarefa(item);

    }

}

document.addEventListener('click', (event) => {

    if (event.target.classList.contains(`btnDeApagar`)) {

        event.target.parentElement.remove();
        salvarTarefas();

    }

});

tarefasSalvas();
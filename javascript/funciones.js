
const contenedorTarea = document.querySelector('.contenedortarea');
const inputNombreTarea = document.getElementById('inputNombreTarea');
const inputPrioridad = document.getElementById('inputPrioridad');
const btnsubmit = document.getElementById('btnSubmit');


printTareas(tareas, contenedorTarea);


function printTareas(pTareas, pdiv) {

    for (const tarea of pTareas) {

        const div = printTarea(tarea);
        console.log(div);

        pdiv.appendChild(div);

    }
}

function printTarea(pTarea) {
    const pTareaNombre = document.createElement('p');
    pTareaNombre.innerText = pTarea.nombreTarea;

    const pPrioridad = document.createElement('p');
    pPrioridad.innerText = pTarea.Prioridad;


    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    btnBorrar.dataset.idTarea = pTarea.idTarea;
    btnBorrar.addEventListener('click', (event) => {
        tareas = borrarTarea(event.target.dataset.idTarea, tareas);
        event.target.parentNode.remove();
    });

    const div = document.createElement('div')
    div.classList.add('tareas')
    console.log(pTarea);
    div.appendChild(pTareaNombre);
    div.appendChild(pPrioridad);
    div.appendChild(btnBorrar);

    return div
}

function borrarTarea(pIdbtn, pTareas) {
    const nuevaListaTareas = [];

    for (const tarea of pTareas) {
        if (tarea.idTarea !== parseInt(pIdbtn)) {
            nuevaListaTareas.push(tarea);
        }
    }
    return nuevaListaTareas

}
btnsubmit.addEventListener('click', nuevaTarea);
function nuevaTarea(event) {

    event.preventDefault();

    const nuevatarea = {

        idTarea: tareas.length + 1,
        nombreTarea: inputNombreTarea.value,
        Prioridad: inputPrioridad.value
    }
    console.log(nuevatarea);
    tareas.push(nuevatarea);


    const divNuevaTarea = printTarea(nuevatarea);
    contenedorTarea.appendChild(divNuevaTarea);
}

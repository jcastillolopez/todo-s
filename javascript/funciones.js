let localTareas = (localStorage.getItem('tareas') === null) ? localStorage.setItem('tareas', JSON.stringify(tareas)) : JSON.parse(localStorage.getItem('tareas'))

const contenedorTarea = document.querySelector('.contenedortarea');
const inputNombreTarea = document.querySelector('#inputNombreTarea');
const btnsubmit = document.querySelector('#btnSubmit');

/******************* PINTAR ------- TAREAS ----INICIO*************** */

printTareas(localTareas, contenedorTarea);

function printTareas(pTareas, pDiv) {
    pDiv.innerHTML = ""
    for (const tarea of pTareas) {
        const div = printTarea(tarea);
        pDiv.appendChild(div);
    }
}

function printTarea(pTarea) {
    const pTareaNombre = document.createElement('span');
    pTareaNombre.innerText = pTarea.nombreTarea;

    const pPrioridad = document.createElement('span');
    pPrioridad.innerText = pTarea.Prioridad;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';
    btnBorrar.dataset.idTarea = pTarea.idTarea;
    btnBorrar.addEventListener('click', (event) => {
        let listadoLocalTareas = JSON.parse(localStorage.getItem('tareas'))
        let listadoActualiazado = borrarTarea(event.target.dataset.idTarea, listadoLocalTareas);
        localStorage.setItem('tareas', JSON.stringify(listadoActualiazado))
        event.target.parentNode.remove();
    });

    const div = document.createElement('div');
    let color
    switch (pTarea.Prioridad) {
        case 'Urgente':
            color = 'red';
            break;
        case 'Mensual':
            color = 'yellow';
            break;
        case 'Diaria':
            color = 'green';
            break;
        default:
            break;
    }
    div.style.boxShadow = `4px 4px 4px ${color}`

    div.classList.add('tareas')
    div.appendChild(pTareaNombre);
    div.appendChild(pPrioridad);
    div.appendChild(btnBorrar);
    return div
}

function borrarTarea(pIdbtn, pTareas) {
    let nuevaListaTareas = [];
    for (let tarea of pTareas) {
        if (tarea.idTarea !== parseInt(pIdbtn)) {
            nuevaListaTareas.push(tarea);
        }
    }
    return nuevaListaTareas
}

/******************* PINTAR ------- TAREAS ----FIN*************** */
/**************** CREAR         NUEVA       TAREA       ******** */
btnsubmit.addEventListener('click', crearTarea);

function crearTarea() {
    listadoLocalTareas = JSON.parse(localStorage.getItem('tareas'));

    let nuevaTarea = {
        idTarea: listadoLocalTareas.length + 1,
        nombreTarea: inputNombreTarea.value,
        Prioridad: selectPrioridad.value
    }

    listadoLocalTareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(listadoLocalTareas))
    printTareas(listadoLocalTareas, contenedorTarea);
}

/**************** CREAR         NUEVA       TAREA    FIN   ******** */
/*******************CREAR      FILTROS     INICIO ******************/

filtroPrioridad.addEventListener('change', (event) => {
    let listadoTareas = JSON.parse(localStorage.getItem('tareas'));
    if (event.target.value !== 'todas') {
        const listadoFiltrado = listadoTareas.filter(tarea => tarea.Prioridad === event.target.value);
        printTareas(listadoFiltrado, contenedorTarea)
    } else {
        printTareas(listadoTareas, contenedorTarea);
    }
});

filtroPorNombre.addEventListener('input', tareasFiltradasNombre);

function tareasFiltradasNombre(event) {
    let filtroNombre = event.target.value.toLowerCase();
    const FiltradasNombreTareas = new Array();
    for (let tarea of tareas) {
        if (tarea.nombreTarea.toLowerCase().includes(filtroNombre) && (!filtroNombre.includes(tarea))) {
            FiltradasNombreTareas.push(tarea);
        }
    }
    printTareas(FiltradasNombreTareas, contenedorTarea);
}
/*******************CREAR      FILTROS     FIN ******************/








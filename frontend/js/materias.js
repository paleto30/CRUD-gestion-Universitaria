import {
    getDocentes,
    getCarreras,
    obtenerMaterias,
    nuevaMateria,
    eliminarMateria,
    buscarNombre,
    obtenerMateria,
    editarMateria,

} from "../Apis/APImateria.js";


document.addEventListener('DOMContentLoaded',()=>{
    getMaterias();
    seccionDocente();
    seccionDocenteUp();
    seccionCarrera();
    seccionCarreraUp(); 
    updateMateria();
});


//  FUNCION PARA OBTENER TODAS LAS MATERIAS 
async function getMaterias() {
    const materias = await obtenerMaterias();
    const listado = document.querySelector("#materias");
    let html = '';
    materias.forEach(element => {
        const {materia_id, materia_nombre, docente_nombre, carrera_nombre} = element; 
        html +=`
            <tr>
                <td>${materia_nombre}</td>
                <td>${docente_nombre}</td>
                <td>${carrera_nombre}</td>
                    
                <td ><a href="" data-materia="${materia_id}" idMateria=${materia_id} class="btn btn-success editar" data-bs-toggle="modal"
                data-bs-target="#updateMateria">Editar</a></td>           
                <td ><a href="#" data-materia="${materia_id}" class="btn btn-danger eliminar">Eliminar</a></td>
            </tr> 
        `;
        listado.innerHTML = html;
    });
};

// funcion para obtener los docentes disponibles 
async function seccionDocente() {
  const docentes = await getDocentes();
  const sec = document.querySelector("#listaDocentes");
  let html = "";
  docentes.forEach(element => {
    const { docente_id,docente_cedula ,docente_nombre,docente_sexo } = element;
    html +=` <option value="${docente_id}">${docente_nombre}</option> `;
    sec.innerHTML = html;
  });
};

// funcion para obtener los carreras disponibles 
async function seccionCarrera() {
    const carreras = await getCarreras();
    const sec = document.querySelector("#listaCarreras");
    let html = "";
    carreras.forEach(element => {
      const { carrera_id,carrera_nombre } = element;
      html +=` <option value="${carrera_id}">${carrera_nombre}</option> `;
      sec.innerHTML = html;
    });
};


// AGREGAR UNA NUEVA MATERIA ===========================================================

const form = document.querySelector("#formularioM");
form.addEventListener('submit', agregarMateria);

async function agregarMateria(e) {
    e.preventDefault();
    const materia_nombre = document.querySelector("#nombre").value;
    const docente_id = document.querySelector("#listaDocentes").value;
    const carrera_id = document.querySelector("#listaCarreras").value;
    const materia = {
        materia_nombre,
        docente_id,
        carrera_id,
    };
    const confirma = confirm("¿Desea agregar esta Materia?");
    if (confirma) {
        await nuevaMateria(materia);
    }
};

// ELIMINAR UNA MATERIA====================================================================
const listado = document.querySelector("#materias");
listado.addEventListener('click', confirmarEliminar);
async function confirmarEliminar(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const  mateira_id = parseInt(e.target.dataset.materia)  
        //console.log(mateira_id);
        const confirma = confirm("¿Desea eliminar esta Materia?");
        if (confirma) {
            await eliminarMateria(mateira_id);
        }
    }
}


//EDITAR UNA MATERIA===========================================================================

// get para docentes update
async function seccionDocenteUp() {
    const docentes = await getDocentes();
    const sec = document.querySelector("#listaDocentesUp");
    let html = "";
    docentes.forEach(element => {
      const { docente_id,docente_cedula ,docente_nombre,docente_sexo } = element;
      html +=` <option value="${docente_id}">${docente_nombre}</option> `;
      sec.innerHTML = html;
    });
};

// get para carreras update
async function seccionCarreraUp() {
    const carreras = await getCarreras();
    const sec = document.querySelector("#listaCarreraUp");
    let html = "";
    carreras.forEach(element => {
      const { carrera_id,carrera_nombre } = element;
      html +=` <option value="${carrera_id}">${carrera_nombre}</option> `;
      sec.innerHTML = html;
    });
};


// update materia

function updateMateria() { 
    const listado = document.querySelector("#materias");
    listado.addEventListener("click", loadData);
    async function loadData(e) {
        if(e.target.classList.contains("editar")){
            const materia_id = e.target.getAttribute("idMateria");
            const materia = await obtenerMateria(materia_id);
            mostrarMateria(materia);
            
            const formulario = document.querySelector("#formularioUpdate");
            formulario.addEventListener("submit", validarMateria);
        }         
    }
};

function mostrarMateria(materia) {
    const inputid = materia[0]["materia_id"];
    const inputnombre = materia[0]["materia_nombre"];
    const inputdocenteId = materia[0]["docente_id"];
    const inputcarreraId = materia[0]["carrera_id"];
    //console.log(inputcarrera,inputdocente);
    document.querySelector("#idUpdate").value = inputid;
    document.querySelector("#nombreUpdate").value = inputnombre;
    document.querySelector("#listaDocentesUp").value = inputdocenteId; 
    document.querySelector("#listaCarreraUp").value = inputcarreraId;
};

async function validarMateria(e) {
    e.preventDefault();
    const materia = {
        materia_id : document.querySelector("#idUpdate").value,
        materia_nombre : document.querySelector("#nombreUpdate").value,
        docente_id : document.querySelector("#listaDocentesUp").value,
        carrera_id : document.querySelector("#listaCarreraUp").value
    }
    const confirma = confirm("¿Desea Actualizar esta Materia?")
    if (confirma) {
        await editarMateria(materia);
    }
};

//============================= fin de editar materia 



// BUSQUEDA POR NOMBRE DE MATERIA --------------------->>

const search = document.querySelector("#search");
search.addEventListener("input",searchMateria);

async function searchMateria(e) {
    let searching = e.target.value;
    if ( "" === e.target.value) {
        getMaterias();
    } else {
        const materia = await buscarNombre(searching);
        const lista = document.querySelector("#materias");
        let html = "";
        materia.forEach(element => {
            const { materia_id, materia_nombre, docente_nombre, carrera_nombre} = element;
            html += `
                <tr>
                    <td>${materia_nombre}</td>
                    <td>${docente_nombre}</td>
                    <td>${carrera_nombre}</td>
                        
                    <td ><a href="" data-materia="${materia_id}" idMateria=${materia_id} class="btn btn-success editar" data-bs-toggle="modal"
                    data-bs-target="#updateMateria">Editar</a></td>           
                    <td ><a href="#" data-materia="${materia_id}" class="btn btn-danger eliminar">Eliminar</a></td>
                </tr>
            `;
        });
        lista.innerHTML = html;
    }
};










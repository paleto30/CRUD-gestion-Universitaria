import {
    obtenerMatriculas,
    obtenerMatricula,
    nuevaMatricula,
    eliminarMatricula,
    editarMatricula,
    buscarID,
    getCarreras,
    getEstudiantes
} from "../Apis/APImatricula.js"


document.addEventListener('DOMContentLoaded', ()=>{

    getMatriculas();
    selectCarrera();
    selectEstudiante();

    selectEstudianteUp();
    selectCarreraUp();
    updateMateria();
});



async function getMatriculas() {
    const matriculas = await obtenerMatriculas();
    const listado = document.querySelector("#matriculas");
    let html = '';
    matriculas.forEach(element => {
        const {matricula_id, matricula_fecha, carrera_nombre, estudiante_nombre} = element;
        html += `
            <tr>
                <td>${matricula_id}</td>
                <td>${matricula_fecha}</td>
                <td>${carrera_nombre}</td>
                <td>${estudiante_nombre}</td>      
                <td ><a href="" data-matricula="${matricula_id}" idMatricula=${matricula_id} class="btn btn-success editar" data-bs-toggle="modal"
                data-bs-target="#updateMatricula">Editar</a></td>           
                <td ><a href="#" data-matricula="${matricula_id}" class="btn btn-danger eliminar">Eliminar</a></td>
            </tr>
        `;
        listado.innerHTML = html;
    });
};

// funcion para obtener los carreras disponibles 
async function selectCarrera() {
    const carreras = await getCarreras();
    const sec = document.querySelector("#listaCarreras");
    let html = "";
    carreras.forEach(element => {
      const { carrera_id,carrera_nombre } = element;
      html +=` <option value="${carrera_id}">${carrera_nombre}</option> `;
      sec.innerHTML = html;
    });
};
// funcion para obtener los docentes disponibles 
async function selectEstudiante() {
    const estudiantes = await getEstudiantes();
    const sec = document.querySelector("#listaEstudiantes");
    let html = "";
    estudiantes.forEach(element => {
      const { estudiante_id, estudiante_img, estudiante_cedula ,estudiante_nombre,estudiante_sexo,estudiante_jornada,estudiante_promedio,campo_id } = element;
      html +=` <option value="${estudiante_id}">${estudiante_nombre}</option> `;
      sec.innerHTML = html;
    });
};


// AGREGAR NUEVA MATRICULA ==============================================================================


const form = document.querySelector("#formularioMt");
form.addEventListener('submit', crearMatricula);


async function  crearMatricula(e) {
    e.preventDefault();
    const matricula_fecha = document.querySelector("#fecha").value;
    const carrera_id = document.querySelector("#listaCarreras").value;
    const estudiante_id = document.querySelector("#listaEstudiantes").value;
    const matricula = {
        matricula_fecha,
        carrera_id,
        estudiante_id
    }
    const confirma = confirm("¿Desea agregar esta materia?");
    if (confirma) {
        await nuevaMatricula(matricula);
    }
};

// ELIMINAR UNA MATRICULA====================================================================
const listado = document.querySelector("#matriculas");
listado.addEventListener('click', confirmarEliminar);
async function confirmarEliminar(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const  matricula_id = parseInt(e.target.dataset.matricula)  
        //console.log(matricula_id);
        const confirma = confirm("¿Desea eliminar esta Materia?");
        if (confirma) {
            await eliminarMatricula(matricula_id);
        }
    }
};



//EDITAR UNA MATERIA===========================================================================

// get para docentes update
async function selectEstudianteUp() {
    const estudiantes = await getEstudiantes();
    const sec = document.querySelector("#listaEstudiantesUp");
    let html = "";
    estudiantes.forEach(element => {
      const { estudiante_id, estudiante_img, estudiante_cedula ,estudiante_nombre,estudiante_sexo,estudiante_jornada,estudiante_promedio,campo_id  } = element;
      html +=` <option value="${estudiante_id}">${estudiante_nombre}</option> `;
      sec.innerHTML = html;
    });
};

// get para carreras update
async function selectCarreraUp() {
    const carreras = await getCarreras();
    const sec = document.querySelector("#listaCarreraUp");
    let html = "";
    carreras.forEach(element => {
      const { carrera_id,carrera_nombre } = element;
      html +=` <option value="${carrera_id}">${carrera_nombre}</option> `;
      sec.innerHTML = html;
    });
};


// UPDATE MATRICULAS 

function updateMateria() { 
    const listado = document.querySelector("#matriculas");
    listado.addEventListener("click", loadData);
    async function loadData(e) {
        if(e.target.classList.contains("editar")){
            const matricula_id = e.target.getAttribute("idMatricula");
            const matricula = await obtenerMatricula(matricula_id);
            console.log(matricula);
            mostrarMatricula(matricula);
            
            const formulario = document.querySelector("#formularioUpdate");
            formulario.addEventListener("submit", validarMatricula);
        }         
    }
};

function mostrarMatricula(matricula) {
    const inputid = matricula[0]["matricula_id"];
    const inputfecha = matricula[0]["matricula_fecha"];
    const inputestudianteId = matricula[0]["estudiante_id"];
    const inputcarreraId = matricula[0]["carrera_id"];
    console.log(inputfecha);
    document.querySelector("#idUpdate").value = inputid;
    document.querySelector("#fechaUp").value = inputfecha;
    document.querySelector("#listaEstudiantesUp").value = inputestudianteId; 
    document.querySelector("#listaCarreraUp").value = inputcarreraId;
};

async function validarMatricula(e) {
    e.preventDefault();
    const matricula = {
        matricula_id : document.querySelector("#idUpdate").value,
        matricula_fecha : document.querySelector("#fechaUp").value,
        estudiante_id : document.querySelector("#listaEstudiantesUp").value,
        carrera_id : document.querySelector("#listaCarreraUp").value
    }
    const confirma = confirm("¿Desea Actualizar esta Matricula?")
    if (confirma) {
        await editarMatricula(matricula);
    }
};

//============================= fin de editar materia 

// BUSQUEDA POR NOMBRE DE MATERIA --------------------->>

const search = document.querySelector("#search");
search.addEventListener("input",searchMatricula);

async function searchMatricula(e) {
    let searching = e.target.value;
    if ( "" === e.target.value) {
        getMatriculas();
    } else {
        const matricula = await buscarID(searching);
        const lista = document.querySelector("#matriculas");
        let html = "";
        matricula.forEach(element => {
            const { matricula_id, matricula_fecha, carrera_nombre, estudiante_nombre} = element;
            html += `
                <tr>
                    <td>${matricula_id}</td>
                    <td>${matricula_fecha}</td>
                    <td>${carrera_nombre}</td>
                    <td>${estudiante_nombre}</td>
                    <td ><a href="" data-matricula="${matricula_id}" idMatricula=${matricula_id} class="btn btn-success editar" data-bs-toggle="modal"
                    data-bs-target="#updateMatricula">Editar</a></td>           
                    <td ><a href="#" data-matricula="${matricula_id}" class="btn btn-danger eliminar">Eliminar</a></td>    
                </tr>
            `;
        });
        lista.innerHTML = html;
    }
};








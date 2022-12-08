import {
    obtenerCarreras,
    obtenerCarrera,
    nuevaCarrera,
    eliminarCarrera,
    editarCarrera,
    buscarNombre,
}from "../Apis/APIcarrera.js"


document.addEventListener('DOMContentLoaded',()=>{
    getCarreras();
    updateCampo();
});


// get de todas las carreras en la tabla 
async function getCarreras() {
    const  carreras = await obtenerCarreras();
    const listado = document.querySelector("#carrera");
    let html = '';
    carreras.forEach(carrera => {
        const { carrera_id, carrera_nombre } = carrera;
        html +=`
        <tr>
            <td>${carrera_nombre}</td>

            <td ><a href="" data-carrera="${carrera_id}" idCarrera=${carrera_id} class="btn btn-success editar" data-bs-toggle="modal"
            data-bs-target="#updateCarrera">Editar</a></td>
            <td>
                <a href="#" data-carrera="${carrera_id}" class="btn btn-danger eliminar">Eliminar</a>
            </td>
        </tr> 
        `;
        listado.innerHTML = html; 
    });
};



// INGRESAR NUEVA CARRERA 
const form = document.querySelector("#formularioCr");
form.addEventListener('submit', crearCarrera);

async function crearCarrera(e) {
    e.preventDefault(e);
    const carrera_nombre = document.querySelector('#nombre').value;
    const carrera = {
        carrera_nombre
    };
    const confirma = confirm("¿Agregar esta Carrera?"); 
    if (confirma) {
        await nuevaCarrera(carrera);
    };
}



// ELIMINAR UNA CARRERA

const listado = document.querySelector("#carrera");
listado.addEventListener('click', confirmarEliminar);

async function confirmarEliminar(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const carrera_id = parseInt(e.target.dataset.carrera);
        //console.log(carrera_id);
        const confirma = confirm("¿Desea eliminar esta Carrera?");
        if (confirma) {
            await eliminarCarrera(carrera_id);
        }     
    }
};




// EDITAR CARRERAS
function updateCampo() {
    const  listado = document.querySelector('#carrera');
    listado.addEventListener('click', loadCarrera);

    async function loadCarrera(e) {
        
        if(e.target.classList.contains("editar")){
            const carrera_id = e.target.getAttribute("idCarrera");
            console.log(carrera_id);
            const carrera = await obtenerCarrera(carrera_id);
            console.log(carrera);
            mostrarCarrera(carrera);

            // registrar el formulario actualizado
            const formulario = document.querySelector("#formularioUpdate");
            formulario.addEventListener('submit', validarCarrera);
      }
    };
};

function mostrarCarrera(carrera) {
    const inputid = carrera[0]["carrera_id"];
    const inputnombre = carrera[0]["carrera_nombre"];
    console.log(inputid,inputnombre);
    document.querySelector("#idUpdate").value = inputid;
    document.querySelector("#nombreUpdate").value = inputnombre;
};
async function validarCarrera(e) {
    e.preventDefault();
    const carrera = {
        carrera_id : document.querySelector("#idUpdate").value,
        carrera_nombre : document.querySelector("#nombreUpdate").value
    };
    const confirma = confirm("¿Desea Actualizar esta Carrera?");
    if (confirma) {
        await editarCarrera(carrera);
    }
};
// fin de editar carreraa ===================================================


// BUSCAR CARRERA POR NOMBRE

const search = document.querySelector("#search");
search.addEventListener("input", searchCarrera);

async function searchCarrera(e) {
    let buscando = e.target.value;

    if (buscando === "") {
        getCarreras();
    } else {
        const carrera = await buscarNombre(buscando);
        const carreras = document.querySelector("#carrera");
        let html = '';
        carrera.forEach(element => {
            const { carrera_id, carrera_nombre} = element;
            html += `
                <tr>
                <td>${carrera_nombre}</td>
                    
                <td ><a href="" data-carrera="${carrera_id}" idCarrera=${carrera_id} class="btn btn-success editar" data-bs-toggle="modal"
                data-bs-target="#updateCarrera">Editar</a></td>
                <td ><a href="#" data-carrera="${carrera_id}" class="btn btn-danger eliminar">Eliminar</a></td>
                </tr>
            `;           
        });
        carreras.innerHTML = html; 
    }
};
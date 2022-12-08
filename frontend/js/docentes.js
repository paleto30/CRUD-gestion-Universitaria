import {
    obtenerDocentes,
    obtenerDocente,
    nuevoDocente,
    eliminarDocente,
    editarDocente,
    buscarNombre,
    
} from "../Apis/APIdocente.js";

document.addEventListener('DOMContentLoaded',() =>{
    getDocentes();
    updateDocente();
});

async function getDocentes(){
    const docentes = await obtenerDocentes();
    console.log(docentes);
    const listaDocentes = document.querySelector("#docentes");
    console.log(listaDocentes);
    let html = "";
    docentes.forEach( docente => {
        const { docente_id, docente_cedula, docente_nombre, docente_sexo } = docente;
        html +=`
        <tr>
            <td>${docente_cedula}</td>
            <td>${docente_nombre}</td>
            <td>${docente_sexo}</td>
            <td ><a href="" data-docente="${docente_id}" idDocente=${docente_id} class="btn btn-success editar" data-bs-toggle="modal"
              data-bs-target="#updateDocente">Editar</a></td>
            <td>
                <a href="#" data-docente="${docente_id}" class="btn btn-danger eliminar">Eliminar</a>
            </td>
            
        </tr>
        `,
        listaDocentes.innerHTML = html;
    });
};

//   ya funciona
/* INGRESAR NUEVO DOCENTE - CRUD (C) */
const formulario = document.querySelector("#formularioD");
formulario.addEventListener('submit', crearDocente);

async function crearDocente(e) {
    e.preventDefault(e);
    const docente_cedula = document.querySelector("#cedula").value;
    const docente_nombre = document.querySelector("#nombre").value;
    const docente_sexo = document.querySelector("#sexo").value;
    const docente = {
        docente_cedula,
        docente_nombre,
        docente_sexo,
    };
    const confirmar = confirm("¿Deseas Agregar este Docente?");
    if (confirmar) {
        await nuevoDocente(docente);
    }
};


/* ELIMINAR DOCENTE */
const listado = document.querySelector("#docentes");
listado.addEventListener('click', confirmarEliminar);

async function confirmarEliminar(e) {
  if (e.target.classList.contains("eliminar")) {
    console.log(e.target.classList.contains("eliminar"));
    const docente_id = parseInt(e.target.dataset.docente);
    console.log("este es el id:",docente_id);
    const confirmar = confirm("¿Deseas eliminar este Docente?");

    if (confirmar) {
      /* llamamos a la funcion metodo HTTP DELETE */
      await eliminarDocente(docente_id);
      console.log("ya  se ejecuto la funcion de eliminar");
    }
  }
};

// editar
//EDITAR DOCENTE    funciona--->>

function updateDocente() {
    const listado = document.querySelector("#docentes");
    listado.addEventListener("click", loadDetail);
  
    async function loadDetail(e) {
      if (e.target.classList.contains("editar")) {
        console.log("existe:",e.target.classList.contains("editar"));
        const docente_id = e.target.getAttribute("idDocente");
        console.log(docente_id);
        const docente = await obtenerDocente(docente_id);
        console.log(docente);
        mostrarDocente(docente);
        // registra el formulario
        const formulario = document.querySelector("#formularioUpdate");
        formulario.addEventListener("submit", validarDocente);
      }
    }
  };
  
  function mostrarDocente(docente) {
    const inputid = docente[0]["docente_id"];
    const inputcedula = docente[0]["docente_cedula"];
    const inputnombre = docente[0]["docente_nombre"];
    const inputsexo = docente[0]["docente_sexo"];
    console.log("id:",inputid,"\nnombre:",inputnombre);
    document.querySelector("#idUpdate").value = inputid;
    document.querySelector("#cedulaUpdate").value = inputcedula;
    document.querySelector("#nombreUpdate").value = inputnombre;
    document.querySelector("#sexoUpdate").value = inputsexo;
  }
  
  async function validarDocente(e) {
    e.preventDefault();
    const docente = {
      docente_id: document.querySelector("#idUpdate").value,
      docente_cedula: document.querySelector("#cedulaUpdate").value,
      docente_nombre: document.querySelector("#nombreUpdate").value,
      docente_sexo: document.querySelector("#sexoUpdate").value, 
    };
    const confirmar = confirm("¿Deseas Actualizar este Docente?");
      if (confirmar) {
        await editarDocente(docente);
        console.log("ya  se ejecuto la funcion de actualizar");
      }
  }
  // fin de editar  ---->> 

/* BUSQUEDA NOMBRE    Ya funciona :) */
const search = document.querySelector("#search");
search.addEventListener("input", searchDocente);

async function searchDocente(e) {
  let searching = e.target.value;
  if (e.target.value === "") {
    getDocentes();
  } else {
    const docente = await buscarNombre(searching);
    const docentes = document.querySelector("#docentes");
    let html = "";
    docente.forEach((docent) => {
      const { docente_id, docente_cedula, docente_nombre, docente_sexo } = docent;
      html += `
            <tr>
                <td>${docente_cedula}</td>
                <td>${docente_nombre}</td>
                <td>${docente_sexo}</td>
                    
                <td ><a href="" data-docente="${docente_id}" idDocente=${docente_id} class="btn btn-success editar" data-bs-toggle="modal"
                data-bs-target="#updateDocente">Editar</a></td>
            
                <td ><a href="#" data-docente="${docente_id}" class="btn btn-danger eliminar">Eliminar</a></td>
            </tr>  
          `;
    });
    docentes.innerHTML = html;
  }
}

























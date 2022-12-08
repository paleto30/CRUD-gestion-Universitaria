import {
  obtenerEstudiantes,
  obtenerEstudiante,
  obtenerEstudianteD,
  getCampos,
  eliminarEstudiante,
  editarEstudiante,
  nuevoEstudiante,
  buscarNombre,
} from "../Apis/API.js";

document.addEventListener("DOMContentLoaded", () => {
  getStudents();
  seccionCampos();
  getProgramasUpdate();
  updateEstudiante();
});


// funcion para gestionar los campos disponibles 
async function seccionCampos() {
  const array = await getCampos();
  //console.log(array);
  const sec = document.querySelector("#listaCampos");
  let html = "";
  array.forEach(element => {
    const {campo_id, campo_nombre} = element;
    //console.log("este es el id: ",campo_id,"\neste es el nombre: ",campo_nombre);
    html +=` <option value="${campo_id}">${campo_nombre}</option> `;
    sec.innerHTML = html;
  });
  //console.log("ya esta  funcionando ");
};

// YA esta funcionando 
/* LISTAR ESTUDIANTE  - CRUD (R) */
async function getStudents() {
  const students = await obtenerEstudiantes();
  const estudiantes = document.querySelector("#estudiantes");
  
  let html = "";
  students.forEach((estudiante) => {
    const { estudiante_id, estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_nombre } = estudiante;
    html += `
            <tr>
             
              <td>${estudiante_cedula}</td>
              <td>${estudiante_nombre}</td>
              <td>${estudiante_sexo}</td>
              <td>${estudiante_jornada}</td>
              <td>${estudiante_promedio}</td>
              <td>${campo_nombre}</td>              
             
              
              <td ><a href="" data-estudiante="${estudiante_id}" idEstudiante=${estudiante_id} class="btn btn-success editar" data-bs-toggle="modal"
              data-bs-target="#updateEstudiante">Editar</a></td>
              <td ><a href="#" data-estudiante="${estudiante_id}" class="btn btn-danger eliminar">Eliminar</a></td>
              <td id="detalle"> 
                <a href="#" class="btn btn-primary detalles" idEstu="${estudiante_id}" data-bs-toggle="modal" data-bs-target="#exampleModalD">Detalle</a>
              </td>
            </tr>
          `;
  });
  estudiantes.innerHTML = html;
}


//====================================================================================================

// ya esta funcionando 
/* INGRESAR NUEVO ESTUDIANTE  - CRUD (C) */
const formulario = document.querySelector("#formularioEstudiante");
formulario.addEventListener("submit", crearEstudiante);

async function crearEstudiante(e) {
  e.preventDefault(e);   
  const estudiante_img = document.querySelector("#image").value;
  const estudiante_cedula = document.querySelector("#cedula").value;
  const estudiante_nombre = document.querySelector("#nombre").value;
  const estudiante_sexo = document.querySelector("#sexo").value;
  const estudiante_jornada = document.querySelector("#jornada").value;
  const estudiante_promedio = document.querySelector("#promedio").value;
  const campo_id = document.querySelector("#listaCampos").value;

  const estudiante = {
    estudiante_img,
    estudiante_cedula,
    estudiante_nombre,
    estudiante_sexo,
    estudiante_jornada,
    estudiante_promedio,
    campo_id,
  };

  const confirmar = confirm("¿Deseas Agregar este Estudiante?");
    if (confirmar) {
      await nuevoEstudiante(estudiante);
    }
  
  
};

/* ELIMINAR ESTUDIANTE -->>  funcionando*/ 

const listado = document.querySelector("#estudiantes");
listado.addEventListener('click', confirmarEliminar);

async function confirmarEliminar(e) {
  if (e.target.classList.contains("eliminar")) {
    console.log(e.target.classList.contains("eliminar"));
    const estudiante_id = parseInt(e.target.dataset.estudiante);
    console.log("este es el id:",estudiante_id);
    const confirmar = confirm("¿Deseas eliminar este Estudiante?");

    if (confirmar) {
      /* llamamos a la funcion metodo HTTP DELETE */
      await eliminarEstudiante(estudiante_id);
      console.log("ya  se ejecuto la funcion de eliminar");
    }
  }
};


//====================================================================================================



//EDITAR ESTUDIANTE    funciona--->>
async function getProgramasUpdate() {
  const campos = await getCampos();
  const fields = document.querySelector("#listado-programasUpdate");
  let html = "";
  campos.forEach((campo) => {
    const { campo_id, campo_nombre } = campo;
    html += `
      <option value="${campo_id}">${campo_nombre}</option>
      `;
    fields.innerHTML = html;
  });
}


function updateEstudiante() {
  const listado = document.querySelector("#estudiantes");
  listado.addEventListener("click", loadDetail);
  async function loadDetail(e) {
    if (e.target.classList.contains("editar")) { 
      const estudiante_id = e.target.getAttribute("idEstudiante");
      const estudiante = await obtenerEstudiante(estudiante_id);
      mostrarEstudiante(estudiante);
      
      // registra el formulario
      const formulario = document.querySelector("#formularioUpdate");
      formulario.addEventListener("submit", validarEstudiante);
    }
  }
};

function mostrarEstudiante(estudiante) {
  const inputid = estudiante[0]["estudiante_id"];
  const inputimg = estudiante[0]["estudiante_img"];
  const inputcedula = estudiante[0]["estudiante_cedula"];
  const inputnombre = estudiante[0]["estudiante_nombre"];
  const inputsexo = estudiante[0]["estudiante_sexo"];
  const inputjornada = estudiante[0]["estudiante_jornada"];
  const inputpromedio = estudiante[0]["estudiante_promedio"];
  const inputCampo_id = estudiante[0]["campo_id"];

  document.querySelector("#idUpdate").value = inputid;
  document.querySelector("#imageUp").value = inputimg;
  document.querySelector("#cedulaUpdate").value = inputcedula;
  document.querySelector("#nombreUpdate").value = inputnombre;
  document.querySelector("#sexoUpdate").value = inputsexo;
  document.querySelector("#jornadaUpdate").value = inputjornada;
  document.querySelector("#promedioUpdate").value = inputpromedio;
  document.querySelector("#listado-programasUpdate").value = inputCampo_id;
}

async function validarEstudiante(e) {
  e.preventDefault();
  const estudiante = {
    estudiante_id: document.querySelector("#idUpdate").value,
    estudiante_img : document.querySelector("#imageUp").value,
    estudiante_cedula: document.querySelector("#cedulaUpdate").value,
    estudiante_nombre: document.querySelector("#nombreUpdate").value,
    estudiante_sexo: document.querySelector("#sexoUpdate").value,
    estudiante_jornada: document.querySelector("#jornadaUpdate").value,
    estudiante_promedio: document.querySelector("#promedioUpdate").value,
    campo_id: document.querySelector("#listado-programasUpdate").value,
  };
  const confirmar = confirm("¿Deseas Actualizar este Estudiante?");

    if (confirmar) {
      await editarEstudiante(estudiante);
      console.log("ya  se ejecuto la funcion de actualizar");
    }
};


// funcion de buscar por nombre 

/* BUSQUEDA NOMBRE */
const search = document.querySelector("#search");
search.addEventListener("input", searchEstudiante);

async function searchEstudiante(e) {
  let searching = e.target.value;
  if (e.target.value === "") {
    getStudents();
  } else {
    const estudiante = await buscarNombre(searching);
    const estudiantes = document.querySelector("#estudiantes");
    let html = "";
    estudiante.forEach((student) => {
      const { estudiante_id,estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_nombre} = student;
      html += `
            <tr>
    
              <td>${estudiante_cedula}</td>
              <td>${estudiante_nombre}</td>
              <td>${estudiante_sexo}</td>
              <td>${estudiante_jornada}</td>
              <td>${estudiante_promedio}</td>
              <td>${campo_nombre}</td>
                           
              <td ><a href="" data-estudiante="${estudiante_id}" idEstudiante=${estudiante_id} class="btn btn-success editar" data-bs-toggle="modal"
              data-bs-target="#updateEstudiante">Editar</a></td>
              <td ><a href="#" data-estudiante="${estudiante_id}" class="btn btn-danger eliminar">Eliminar</a></td>
              <td style="display:flex; justify-content:center;" id="detalle"> 
                <a href="#" class="btn btn-primary detalles" idEstu="${estudiante_id}" data-bs-toggle="modal" data-bs-target="#exampleModalD">Detalle</a>
              </td>
            </tr>
          `;
    });
    estudiantes.innerHTML = html;
  }
}



// mostrar detalles de estudiante en el modal de detalles
const listados = document.querySelector("#estudiantes");
listados.addEventListener("click", lookDetail);

function lookDetail(e) {
  console.log(e.target.classList.contains("detalles"));
  if (e.target.classList.contains("detalles")) {
    const userSelect = e.target.parentElement.parentElement;
    console.log(userSelect);
    studentSelect(userSelect);
  }
};

 async function studentSelect(userSelect) {
  const userGet ={
    id_user : userSelect.querySelector("#detalle").querySelector("a").getAttribute("idEstu")
  };
  const estudiante_id = userGet.id_user;
  const User = await obtenerEstudianteD(estudiante_id);
  console.log(User);
  let html = '';
  const listado = document.querySelector("#modalBodyStudentD");
  User.forEach( element => {
    const {estudiante_id,estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_nombre} = element;
    html +=`
      <table class="table table-info table-striped table-bordered">
        <thead>
          <tr>
            <td> foto <br><img src="/frontend/img/${estudiante_img}" style="width: 200px;" alt="" srcset=""> </td>
          </tr>
          <tr>
            <td>
              NOMBRE: ${estudiante_nombre}  
            </td>
          </tr>
          <tr>
            <td>
              ESTUDIANDO LA CARRERA DE:  ${campo_nombre}
            </td>
          </tr>
        </thead>
      </table>
    `;
  });
  listado.innerHTML = html;
};




function calcularIMC(pesoEnKilos, alturaEnMetros) {
    var imc = Math.round(pesoEnKilos / (alturaEnMetros * alturaEnMetros));

    var clasificacion;

    if (imc < 18.5) {
      clasificacion = 'estás muy delgado';
    } else if (imc < 25) {
      clasificacion = 'estás saludable';
    } else {
      clasificacion = 'tienes sobrepeso';
    }
    
    return {imc, clasificacion};
}

function obtenerUsuarios() {
    let usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function guardarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const talla = parseFloat(document.getElementById('talla').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaEnMetros = talla / 100;
    const {imc, clasificacion} = calcularIMC(peso, alturaEnMetros);

    const usuario = {nombre, talla, peso, imc, clasificacion};

    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);

    document.getElementById('formulario').reset();
    mostrarUsuarios();
}

function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';

    const usuarios = obtenerUsuarios();
    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${usuario.nombre} - IMC: ${usuario.imc} (${usuario.clasificacion})
                        <button class="editar" onclick="editarUsuario(${index})">Editar</button>
                        <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>`;
        listaUsuarios.appendChild(li);
    });
}

function editarUsuario(index) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios[index];

    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('talla').value = usuario.talla;
    document.getElementById('peso').value = usuario.peso;

    eliminarUsuario(index); //Se elimina el usuario actual para actualizar
}

function eliminarUsuario(index) {
    const usuarios = obtenerUsuarios();
    usuarios.splice(index, 1);
    guardarUsuarios(usuarios);
    mostrarUsuarios();
}

document.addEventListener('DOMContentLoaded', mostrarUsuarios);
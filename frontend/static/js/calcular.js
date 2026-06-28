let memoriaNum1 = "";
let operacionSeleccionada = "";
let pantalla = document.getElementById('pantalla');
let modal = document.querySelector('.calc-container');

function abrirCalculadora() {
    pantalla.value = "0";
    memoriaNum1 = "";
    operacionSeleccionada = "";
    modal.classList.add('activo');
}

function cerrarCalculadora() {

    if (modal){
        modal.classList.remove('activo');
    }
}

function cerrarCalculadoraFuera(event) {
    if (event.target === modal) {
        cerrarCalculadora();
    }
}   

function agregarNumero(digito) {
    if (pantalla.value === "0" && digito !== ".") {
        pantalla.value = digito;
    } else {
        
        if (digito === "." && pantalla.value.includes(".")) return;
        pantalla.value += digito;
    }
}

function seleccionarOperacion(op) {
    if (pantalla.value !== "") {
        memoriaNum1 = pantalla.value;
        operacionSeleccionada = op;
        pantalla.value = ""; // Limpiar pantalla para el segundo número
    }
}

function limpiar() {
    pantalla.value = "";
    memoriaNum1 = "";
    operacionSeleccionada = "";
}

function borrar(){
    limpiar();
}

function enviarCalculo() {
    // Verificación de que tengamos todos los datos necesarios para operar
    if (memoriaNum1 !== "" && operacionSeleccionada !== "" && pantalla.value !== "") {
        
        const datosOperaciones = {
            n: memoriaNum1,
            n2: pantalla.value,
            operacion: operacionSeleccionada
        };

        fetch('http://127.0.0', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosOperaciones)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.resultado !== null && data.resultado !== undefined) {
                pantalla.value = data.resultado;
                memoriaNum1 = data.resultado; // Guardar el resultado en memoriaNum1
                operacionSeleccionada = ""; // Limpiar la operación seleccionada
            } else if (data.error) {
                pantalla.value = "Error";
                alert(data.error); // Mostrar el mensaje de error
            }
        })
        .catch(error => {
            console.error('Error al conectar con el servidor:', error);
        });
    }
}


document.addEventListener('keydown', function(event) {
    
    
    if (!modal.classList.contains('activo')) return; 

    const tecla = event.key;
    if ((tecla >= '0' && tecla <= '9') || tecla === '.') {
        agregarNumero(tecla);
    }
    else if (tecla === '+') {
        seleccionarOperacion('suma');
    }
    else if (tecla === '-') {
        seleccionarOperacion('resta');
    }   
    else if (tecla === '*' || tecla.toLowerCase() === 'x') {
        seleccionarOperacion('multiplicacion');
    }
    else if (tecla === '/') {
        event.preventDefault(); 
        seleccionarOperacion('division');
    }
    else if (tecla === 'Enter' || tecla === '=') {
        event.preventDefault(); 
        enviarCalculo();
    }
    else if (tecla === 'Escape' || tecla === 'c' || tecla === 'C' || tecla === 'Delete') {
        limpiar();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const resOculto = document.getElementById('jinja-resultado');
    const errorOculto = document.getElementById('jinja-error');

    if (resOculto && resOculto.value.trim() !== '' || errorOculto) {
        if (resOculto) {
            pantalla.value = resOculto.value;
        }
        
        setTimeout(function() {
            abrirCalculadora();
        }, 100);
    }
    if (errorOculto) {
        setTimeout(function() {
            abrirCalculadora();
        }, 100);
    }
});

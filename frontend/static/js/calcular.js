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
        pantalla.value = ""; 
    }
}

function limpiar() {
    pantalla.value = "0";
    memoriaNum1 = "";
    operacionSeleccionada = "";
}

function borrar(){
    limpiar();
}

function enviarCalculo(event) {
    if (event) {
        event.preventDefault();
    }

    if (memoriaNum1 !== "" && operacionSeleccionada !== "" && pantalla.value !== "") {
        
        const datosOperaciones = {
            n: memoriaNum1,
            n2: pantalla.value,
            operacion: operacionSeleccionada
        };

        // DIRECCIÓN REVISADA MILIMÉTRICAMENTE
        fetch('http://127.0.0.1:5000/api/calcular', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(datosOpereraciones)
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultado !== null && data.resultado !== undefined) {
                pantalla.value = data.resultado;
                memoriaNum1 = data.resultado; 
                operacionSeleccionada = ""; 
            } else if (data.error) {
                pantalla.value = "Error";
                alert(data.error); 
            }
        })
        .catch(error => {
            console.error('Error al conectar con el Backend:', error);
        });
    }
}

document.addEventListener('keydown', function(event) {
    if (!modal || !modal.classList.contains('activo')) return; 

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
        enviarCalculo(event);
    }
    else if (tecla === 'Escape' || tecla === 'c' || tecla === 'C' || tecla === 'Delete') {
        limpiar();
    }
});
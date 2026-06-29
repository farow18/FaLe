document.getElementById('form-registro').addEventListener('submit', function(event){
    event.preventDefault(); //Congela la recarga de la pagina 

    const msgBox = document.getElementById('msg-alerta')

    const payload = {
        usuario: document.getElementById('reg-usuario').value,
        nombre : document.getElementById('reg-nombre').value,
        apellido: document.getElementById('reg-apellido').value,
        edad: parseInt(document.getElementById('reg-edad').value),
        email: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value,
    };

    fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {

        if(data.success){
            msgBox.className = "alert-box alert-success";
            msgBox.textContent = data.mensaje;
            document.getElementById('form-registro').reset()
        }else{
            msgBox.className = "alert-box alert-danger";
            msgBox.textContent = data.error;
        }
    })
    .catch(err =>{
        console.error("Error al conectar con la API", err);
        msgBox.className = "alert-box alert-danger";
        msgBox.textContent = "Error critico de red. Verificar el Backend";
    });
});
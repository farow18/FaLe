from flask import Blueprint, request, jsonify
from modelos import db, Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def registro_usuario():
    datos = request.get_json(silent=True) or {}

    user_input = (datos.get('usuario') or '').strip()
    nom_input = (datos.get('nombre') or '').strip()
    ape_input = (datos.get('apellido') or '').strip()
    edad_input = datos.get('edad')
    email_input = (datos.get('email') or '').strip()
    pass_input = datos.get('password') or ''

    if not all([user_input, nom_input, ape_input, email_input, pass_input]):
        return jsonify({'success': False, 'error': 'Faltan datos obligatorios'}), 400

    usuario_existente = Usuario.query.filter_by(usuario=user_input).first()
    if usuario_existente:
        return jsonify({'success': False, 'error': 'El nombre de usuario ya existe'}), 400

    if Usuario.query.filter_by(email=email_input).first():
        return jsonify({'success': False, 'error': 'El correo electrónico ya esta registrado.'}), 400

    nuevo_ususario = Usuario(
        usuario=user_input,
        nombre=nom_input,
        apellido=ape_input,
        edad=edad_input,
        email=email_input,
    )
    nuevo_ususario.encriptar_password(pass_input)

    db.session.add(nuevo_ususario)
    db.session.commit()

    return jsonify({'success': True, 'mensaje': 'Registrado de forma exitosa'}), 201


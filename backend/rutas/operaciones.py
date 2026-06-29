from flask import Blueprint, request, jsonify
from calculadora_ser import calcular

operaciones_bp = Blueprint('operaciones', __name__)

@operaciones_bp.route('/calcular', methods=['POST'])
def api_calcular():
    datos = request.get_json(silent=True) or {}

    n_str = datos.get('n')
    n2_str = datos.get('n2')
    operacion = datos.get('operacion')

    resultado, error = calcular(n_str, n2_str, operacion)

    return jsonify({
        'resultado': resultado,
        'error': error
    })
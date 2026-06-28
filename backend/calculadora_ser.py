def calcular(num1_str, num2_str, operacion):

    resultado = None
    error = None

    try:
        num1 = float(num1_str) if num1_str else 0.0
        num2 = float(num2_str) if num2_str else 0.0

        if operacion == 'suma':
            resultado = num1 +  num2
        elif operacion == 'resta':
            resultado = num1 - num2
        elif operacion == 'multiplicacion':
            resultado = num1 * num2
        elif operacion == 'division':
            if num2 == 0:
                error = "No se puede dividir entre 0"
            else:
                resultado = num1 / num2
        else:
            error = "Operación no valida"
    except ValueError:
        error = "Ingrese números validos"

    return resultado, error
def calcular(n_str,n2_str, operacion):

    resultado = None
    error = None

    try:
        n = float(n_str) if n_str else 0.0
        n2 = float(n2_str) if n2_str else 0.0
        
        if operacion == 'suma':
            resultado = n + n2
        elif operacion == 'resta':
            resultado = n - n2
        elif operacion == 'multiplicacion':
            resultado = n * n2
        elif operacion == 'division':
            if n2 == 0:
                error = "No se puede dividir entre cero."
            else:
                resultado = n / n2
        else:
            error = "Operación no válida."
    except ValueError:
        error = "Por favor, ingresa números válidos."

    return resultado, error
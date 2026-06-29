import os
from flask import Flask
from flask_cors import CORS

try:
    from modelos import db
    from rutas.auth import auth_bp
    from rutas.operaciones import operaciones_bp
except ModuleNotFoundError:
    from backend.modelos import db
    from backend.rutas.auth import auth_bp
    from backend.rutas.operaciones import operaciones_bp

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///database.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(operaciones_bp, url_prefix='/api')

with app.app_context():
    try:
        db.create_all()
        print("Base de datos conectada y tablas verificadas")
    except Exception:
        print("Aviso: MySQL aun no esta iniciando, el backend reintentara")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
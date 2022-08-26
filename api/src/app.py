import email
import json
from urllib import response
from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required, create_access_token
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = 'my-secret-key'

db.init_app(app)
Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
        
        username = request.json.get("username")
        email=request.json.get("email")
        password=request.json.get("password")
        
        
        if not username: return jsonify({"msg":"Userame is required!!"}), 400
        if not email: return jsonify({"msg":"Email is required!!"}), 400
        if not password: return jsonify({"msg":"Password is required!!"}), 400   
        user_ = User.query.filter_by(email=email).first()  
        if user_: return jsonify({ "msg": "Usuario ya registrado" }), 400

        user = User()
        user.username = username
        user.email = email
        user.password = generate_password_hash(password)
        user.save()

        access_token = create_access_token(identity=user.email)

        data={
            "access_token": access_token, 
            "user": user.serialize()
        } 

        
        return jsonify({ "msg": "Registro exitoso" }, data), 201

@app.route('/api/login', methods=['POST'])
def login():
        email=request.json.get("email")
        password=request.json.get("password")

        if not email: return jsonify({"msg":"Olvidaste el email!!"}), 400
        if not password: return jsonify({"msg":"Olvidaste el password!!"}), 400   

        user = User.query.filter_by(email=email).first()
        if not user: return jsonify({ "msg": "El Usuario incorrecto" }), 400  
    
        if not check_password_hash(user.password, password):
            return jsonify({ "msg":"usuario/contraseña no se encuentran" })

        access_token = create_access_token(identity=user.email)

        data={
            "access_token": access_token, 
            "user": user.serialize()
        } 

        return jsonify({"msg":"usuario conectado"}, data), 200

@app.route('/api/users', methods=['GET'])
def users():

    users=User.query.all()
    users=list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    identity = get_jwt_identity()
    user=User.query.filter_by(email=identity).first()
    return jsonify({ "identity": identity, "user": user.serialize() }), 200



if __name__ == '__main__':
    app.run()
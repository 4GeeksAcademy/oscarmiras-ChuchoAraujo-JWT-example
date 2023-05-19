"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

#------------------------------- GET USERS -------------------------------

@api.route('/users', methods=['GET'])
def get_users():

    users = User.query.all()
    users_serialize = [user.serialize() for user in users]

    return jsonify(users_serialize), 200

#------------------------------- SIGN UP USERS -------------------------------

@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    new_user = User(email = body['email'], password = body['password'])
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "msg": "User created successfully", 
    }

    return jsonify(response_body), 200


#------------------------------- LOGIN USERS -------------------------------

@api.route('/login', methods=['POST'])
def login():
    # Obtener los datos del usuario desde el cliente
    body = request.get_json()
    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email, password=password).first()

    if user == None:
        return jsonify({"msg": "User or password, Not exist!"}), 401

    access_token = create_access_token(identity=user.serialize())

    response_body = {
        "msg": "Token create successfully",
        "token": access_token
    }

    return jsonify(response_body), 200 

#------------------------------- PRIVATE USERS -------------------------------

@api.route("/private", methods=["GET"])
#Verifica si tienes un token de acceso
@jwt_required() 

def protected():
    #Accede a la identidad del usuario actual con get_jwt_identity.
    response_body= {
        "msg": "Permission granted",
        "user": get_jwt_identity()
    }
    return jsonify(response_body), 200
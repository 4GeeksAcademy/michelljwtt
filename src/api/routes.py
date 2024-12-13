"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email = email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity = email)

        return jsonify(access_token = access_token), 201

    return jsonify({'error': 'el usuario no existe'}), 401

@api.route('/signup', methods=['POST'])
def handle_signup():

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # verfifica si el usuario ya existe

    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({'error': 'El usuario ya existe'}), 403
    
    #crear un usuario nuevo 
    new_user = User(email = email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
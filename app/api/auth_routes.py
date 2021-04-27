from flask import Blueprint, jsonify, session, request
from app.models import User, Song, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login/', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout/')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup/', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    url = None
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]
    else:
        url = 'https://i.stack.imgur.com/l60Hf.png'
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=request.form['username'],
            email=request.form['email'],
            password=request.form['password'],
            profile_URL=url,
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized/')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/edit/', methods=['PUT'])
def edit_user():
    """
    Creates a new user and logs them in
    """
    user = request.form['id']
    matched_user = User.query.get(user)
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]
    else:
        url = None
    matched_user.profile_URL = url
    db.session.commit()
    return matched_user.to_dict()


@auth_routes.route('/likes/', methods=['PUT'])
def userLikes():
    userId = request.json
    likes = User.query.get(userId).songs.all()
    likeList = []
    for like in likes:
        song = like.to_dict()
        likeList.append(song['id'])
    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!', likeList)
    return jsonify(likeList)


@auth_routes.route('/likes/', methods=['POST'])
def addLike():
    data = request.json
    user = User.query.get(data['userId'])
    song = Song.query.get(data['songId'])
    user.songs.append(song)
    song.users.append(user)
    db.session.commit()
    likeList = []
    likes = [likeList.append(song.to_dict()['id']) for song in user.songs]
    return jsonify(likeList)


@auth_routes.route('/likes/', methods=['DELETE'])
def deleteLike():
    data = request.json
    user = User.query.get(data['userId'])
    song = Song.query.get(data['songId'])
    user.songs.remove(song)
    song.users.remove(user)
    db.session.commit()
    likeList = []
    likes = [likeList.append(song.to_dict()['id']) for song in user.songs]
    return jsonify(likeList)

from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Song

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/')
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# edit song
# @user_routes.route('/songs/', methods=['PUT'])
# def userSongs():
#     userId = request.json

#     songs = User.query.get(userId).songs.all()
#     songList = []
#     for song in songs:
#         songList.append(song.to_dict())

#     return jsonify(songList)


# @user_routes.route('/songs/', methods=['POST'])
# def joinSongs():
#     data = request.json
#     user = User.query.get(data['userId'])
#     song = Song.query.get(data['songId'])
#     user.songs.append(song)
#     song.users.append(user)
#     db.session.commit()
#     user_songs = [song.to_dict() for song in user.songs]
#     return jsonify(user_songs)


@user_routes.route('/songs/<int:id>/')
def user_songs(id):
    songs = Song.query.filter_by(artist_id=id).all()
    songsDict = {"songs": [song.to_dict() for song in songs]}
    # print(songsDict)
    return songsDict


@user_routes.route("/songs/")
def songs():
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}

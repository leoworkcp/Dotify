from flask import Blueprint, json, request, jsonify, flash
from app.models import Song, db, User
# from app.forms import CommentForm
follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/', methods=['POST'])
def add_follow():
    data = request.json
    follower = User.query.get(data['followers_userId'])
    followed = User.query.get(data['following_userId'])
    follower.followed.append(followed)
    db.session.commit()
    followList = []
    follows = [followList.append(followed.to_dict()['id'])
               for followed in follower.followed]

    return jsonify(followList)
# Find single server


@follows_routes.route('/', methods=['PUT'])
def find_follows():
    data = request.json
    user = User.query.get(data['userId'])
    print('//////////////', user)
    followers = [follower.to_dict() for follower in user.followers]
    following = [follower.to_dict() for follower in user.followed]
    return jsonify({"followers": followers, "following": following})


@follows_routes.route('/', methods=['DELETE'])
def delete_follow():
    data = request.json
    follower = User.query.get(data['followers_userId'])
    followed = User.query.get(data['following_userId'])
    follower.followed.remove(followed)
    db.session.commit()
    followList = []
    follows = [followList.append(followed.to_dict()['id'])
               for followed in follower.followed]
    return jsonify(followList)

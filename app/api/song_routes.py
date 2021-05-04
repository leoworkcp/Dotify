from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Song, Comment, User
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, allowed_audio_file)

from app.forms.song_form import SongForm
from app.forms.comment_form import CommentForm

song_routes = Blueprint('songs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


# @song_routes.route('/upload/', methods=['POST'])
# def song_upload():
#     defaultImage = False
#     if 'song' not in request.files:
#         return {'errors': 'song required'}, 400
#     if 'image' not in request.files:
#         defaultImage = True

#     song = request.files['song']
#     image = ''
#     if defaultImage:
#         image = defaultImage
#     else:
#         image = request.files['image']

#     if not allowed_audio_file(song.filename):
#         return {'errors': 'file type not permitted'}, 400

#     song.filename = get_unique_filename(song.filename)

#     song_upload = upload_file_to_s3(song)

#     if "url" not in song_upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to song_upload
#         # so we send back that error message
#         return song_upload, 400

#     song = song_upload['url']
#     image_url = ''
#     if not defaultImage:
#         if not allowed_file(image.filename):
#             return {'errors': 'file type not permitted'}, 400

#         image.filename = get_unique_filename(image.filename)

#         image_upload = upload_file_to_s3(image)

#         if "url" not in image_upload:
#             # if the dictionary doesn't have a url key
#             # it means that there was an error when we tried to song_upload
#             # so we send back that error message
#             return image_upload, 400
#         image_url = image_upload['url']

#     else:
#         image_url = 'https://i.stack.imgur.com/l60Hf.png'

#     return {'image_url': image_url, 'song': song}, 200


# @song_routes.route('/newsong/', methods=['POST'])
# def new_song():

#     form = SongForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         songs = Song(
#             artist_id=form.data['artist_id'],
#             song=form.data['song'],
#             name=form.data['name'],
#             description=form.data['description'],
#             category=form.data['category'],
#             image_url=form.data['image_url']
#         )
#         print(songs)
#         db.session.add(songs)
#         db.session.commit()
#         return songs.to_dict()
#     print(form.errors)
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# new stuff
@song_routes.route('/', methods=['POST'])
# @login_required
def add_song():
    url_image = None
    url_song = None
    if "image_url" in request.files:
        image = request.files["image_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url_image = upload["url"]
    if "song" in request.files:
        song_file = request.files["song"]
        song_file.filename = get_unique_filename(song_file.filename)
        upload = upload_file_to_s3(song_file)
        url_song = upload["url"]
        print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        print(url_song)

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_song = Song(
        artist_id=request.form['artist_id'],
        name=request.form['name'],
        description=request.form['description'],
        category=request.form['category'],
        album=request.form['album'],
        image_url=url_image,
        song=url_song,
        # public=request.form['public'],

    )

    db.session.add(new_song)
    db.session.commit()
    data = new_song.to_dict()
    return data


@song_routes.route('/', methods=['DELETE'])
def delete_song():
    songId = request.json
    song = Song.query.get(songId)
    db.session.delete(song)
    db.session.commit()
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}

# new stuff  ends

# @song_routes.route('/<int:id>/delete/', methods=["DELETE"])
# def delete_song(id):
#     song = Song.query.get(id)
#     db.session.delete(song)
#     db.session.commit()
#     # db.session.flush()
#     return song.to_dict()


@song_routes.route("/public/", methods=['GET'])
def find_public_songs():
    songSearch = Song.query.filter(Song.public == True).all()
    songList = []
    for song in songSearch:
        songList.append(song.to_dict())
    return jsonify(songList)


@song_routes.route("/")
def songs():
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}


# get one song by ID
@song_routes.route("/<int:id>/")
def song_by_id(id):
    song = Song.query.get(id)
    songDict = {"song": song.to_dict()}
    # print(songDict)
    return songDict


# comments routes
@song_routes.route('/<int:id>/comment/', methods=['POST'])
def song_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            description=form.data["description"],
            user_id=form.data["user_id"],
            song_id=id,
            created_at=form.data["created_at"]
        )
        print(comment)
        db.session.add(comment)
        db.session.commit()
    return comment.to_dict()


@song_routes.route('/comment/<int:id>/delete/', methods=["DELETE"])
def delete_song_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()


@song_routes.route('/like/', methods=['PUT'])
def add_like():
    comment = request.json
    print("XXXXXXXXXXXXXXXXXXXXXX")
    print(comment)
    matched_comment = Comment.query.get(comment['commentId'])
    matched_comment.likes = matched_comment.likes + 1
    db.session.commit()
    return matched_comment.to_dict()

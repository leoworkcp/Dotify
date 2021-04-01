from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Song
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, allowed_audio_file)

from app.forms.song_form import SongForm


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


# @song_routes.route("/<int:id>")
# def song_by_id(id):
#     song = Song.query.get(id)
#     songDict = {"song": song.to_dict()}
#     return songDict


@song_routes.route('/upload/', methods=['POST'])
def song_upload():
    defaultImage = False
    if 'song' not in request.files:
        return {'errors': 'song required'}, 400
    if 'image' not in request.files:
        defaultImage = True

    song = request.files['song']
    image = ''
    if defaultImage:
        image = defaultImage
    else:
        image = request.files['image']

    if not allowed_audio_file(song.filename):
        return {'errors': 'file type not permitted'}, 400

    song.filename = get_unique_filename(song.filename)

    song_upload = upload_file_to_s3(song)

    if "url" not in song_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to song_upload
        # so we send back that error message
        return song_upload, 400

    song = song_upload['url']
    image_url = ''
    if not defaultImage:
        if not allowed_file(image.filename):
            return {'errors': 'file type not permitted'}, 400

        image.filename = get_unique_filename(image.filename)

        image_upload = upload_file_to_s3(image)

        if "url" not in image_upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to song_upload
            # so we send back that error message
            return image_upload, 400
        image_url = image_upload['url']

    else:
        image_url = 'https://i.stack.imgur.com/l60Hf.png'

    return {'image_url': image_url, 'song': song}, 200


@song_routes.route('/newsong/', methods=['POST'])
def new_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        songs = Song(
            artist_id=form.data['artist_id'],
            song=form.data['song'],
            name=form.data['name'],
            description=form.data['description'],
            category=form.data['category'],
            image_url=form.data['image_url']
        )
        print(songs)
        db.session.add(songs)
        db.session.commit()
        return songs.to_dict()
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@song_routes.route("/")
@login_required
def songs():
    # all_songs = Song.query.all()
    # songsDict = {"songs": [each_song.to_dict() for each_song in all_songs]}
    # print(songsDict)
    # return songsDict
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}

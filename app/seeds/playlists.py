from app.models import db
from app.models.song_user import Playlist


def seed_playlists():

    db.session.add()
    db.session.commit()


def undo_playlists():
    db.session.execute('TRUNCATE playlists CASCADE;')
    db.session.commit()

from app.models import db
from app.models.song_user import Song, User


def seed_songs():

    

    db.session.add()
    db.session.commit()




def undo_songs():
    db.session.execute('TRUNCATE songs CASCADE;')
    db.session.commit()
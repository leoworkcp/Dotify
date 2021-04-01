from app.models import db
from app.models.song_user import Comment


def seed_comments():

    db.session.add()
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.commit()

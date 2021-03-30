from .db import db
from datetime import datetime

comments_likes = db.Table(
    'comments_likes',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'comment_id', db.Integer, db.ForeignKey('comments.id'),
        nullable=False
    )
)


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, default=0, nullable=False)
    descrition = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(
        db.Integer, db.ForeignKey('songs.id'), nullable=False
    )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    # user relationship 
    user = db.relationship('User', back_populates='comments')
    song = db.relationship(
        'Song', back_populates='comments')
    users_likes = db.relationship(
        'User', secondary=comments_likes, back_populates='users_likes',
        lazy='dynamic'
    )    
    def to_dict(self):
        return {
            'id': self.id,
            'likes': self.likes,
            'message': self.message,
            'user_id': self.user_id,
            'song_id': self.song_id
        }

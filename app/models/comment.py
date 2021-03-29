from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, default=0, nullable=False)
    descrition = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    playlist_id = db.Column(
        db.Integer, db.ForeignKey('playlists.id'), nullable=False
    )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    user = db.relationship('User', back_populates='comments')
    playlist = db.relationship(
        'Playlist', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'likes': self.likes,
            'message': self.message,
            'user_id': self.user_id,
            'playlist_id': self.playlist_id
        }

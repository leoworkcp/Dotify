from .db import db
from datetime import datetime


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    song_id = db.Column(
        db.Integer, db.ForeignKey('songs.id'), nullable=False
    )
    image_url = db.Column(db.String(255))
    likes = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    songs = db.relationship('Song', back_populates='playlists')
    comments = db.relationship(
        'Comment', back_populates='playlist', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id,
            "song_id": self.song_id,
            "likes": self.likes
        }

from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

song_users = db.Table(
    'song_users',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'song_id', db.Integer, db.ForeignKey('songs.id'),
        nullable=False
    )
)





class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(40), nullable = False, unique = True)
    email = db.Column(db.String(255), nullable = False, unique = True)
    hashed_password = db.Column(db.String(255), nullable = False)
    profile_URL = db.Column(db.String(255))
    created_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
        )
    updated_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
        )

    #-----------------------------------------------------------
    song_admin = db.relationship('Song', back_populates='artist')
    comments = db.relationship('Comment', back_populates='user')
    songs = db.relationship(
            'Song', secondary=song_users, back_populates='users', lazy='dynamic'
        )
    
  
  
    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "profile_URL":self.profile_URL
        }


class Song(db.Model):
    __tablename__ = 'songs'
    
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    category = db.Column(db.String(50), nullable=False)
    likes = db.Column(db.Integer, default=0, nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String(255))
    waveform_url = db.Column(db.String(255))
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    artist = db.relationship('User', back_populates='song_admin')
    playlists = db.relationship(
        'Playlist', back_populates='songs', cascade='all, delete-orphan')
    users = db.relationship(
        'User', secondary=song_users, back_populates='songs',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "artist_id": self.artist_id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "likes": self.likes,
            "public": self.public,
            "image_url": self.image_url,
            "waveform_url": self.waveform_url,
        }

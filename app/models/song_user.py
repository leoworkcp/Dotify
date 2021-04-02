from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
# song_user join Table
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

# followers_users join Table
followers_users = db.Table(
    'followers_users',
    db.Column(
        "followings_id", db.Integer, db.ForeignKey('users.id'),
        nullable=True
    ),
    db.Column(
        'followers_id', db.Integer, db.ForeignKey('users.id'),
        nullable=True
    )
)

# comments_likes join Table
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

# songs_likes join Table
songs_likes = db.Table(
    'songs_likes',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'song_id', db.Integer, db.ForeignKey('songs.id'),
        nullable=False
    )
)


# playlist_likes join Table
playlist_likes = db.Table(
    'playlist_likes',
    db.Column(
        'playlist_id', db.Integer, db.ForeignKey('playlists.id'),
        nullable=False
    ),
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    )

)


# songs_playlists join Table
song_playlists = db.Table(
    'song_playlists',
    db.Column(
        'song_id', db.Integer, db.ForeignKey('songs.id'),
        nullable=False
    ),
    db.Column(
        "playlist_id", db.Integer, db.ForeignKey('playlists.id'),
        nullable=False
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.Boolean, nullable=False, default=True)
    profile_URL = db.Column(db.String(255))
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    # -----------------------------------------------------------
    song_admin = db.relationship('Song', back_populates='artists')

    # comment relationship
    comments_users = db.relationship(
        "Comment", back_populates='users_comments')
    # songs relationship
    songs = db.relationship(
        'Song', secondary=song_users, back_populates='users', lazy='dynamic'
    )
    # songs likes
    song_like = db.relationship(
        'Song', secondary=songs_likes, back_populates='user_song_like', lazy='dynamic'
    )

    # playlist_likes
    playlist_like = db.relationship(
        'Playlist', secondary=playlist_likes, back_populates='user_playlist_like', lazy='dynamic'
    )

    #  comments_likes
    comment_like = db.relationship(
        'Comment', secondary=comments_likes, back_populates='user_like', lazy='dynamic'
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
            "artist": self.artist,
            "profile_URL": self.profile_URL
        }


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    song = db.Column(db.String(500), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    category = db.Column(db.String(50), nullable=False)
    likes = db.Column(db.Integer, default=0, nullable=False)
    public = db.Column(db.Boolean, nullable=False, default=True)
    image_url = db.Column(db.String(255))
    waveform_url = db.Column(db.String(255))
    # waveform_url1 = db.Column(db.String(255) default="default")
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    artists = db.relationship('User', back_populates='song_admin')

    #  songs relationship
    users = db.relationship(
        'User', secondary=song_users, back_populates='songs',
        lazy='dynamic'
    )
    # playlist relationship
    songs_playlist = db.relationship(
        'Playlist', secondary=song_playlists, back_populates='playlists',
        lazy='dynamic'
    )
    #  playlist relationship Like

    # songs relationship Like
    user_song_like = db.relationship(
        'User', secondary=songs_likes, back_populates='song_like',
        lazy='dynamic'
    )
    #  comments relationship
    comments = db.relationship('Comment', back_populates='song_comments')

    def to_dict(self):
        return {
            "id": self.id,
            "artist_id": self.artist_id,
            "song": self.song,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "likes": self.likes,
            "public": self.public,
            "image_url": self.image_url,
            "waveform_url": self.waveform_url,
            "comments": [comment.to_dict() for comment in self.comments],
            "artist": self.artists.to_dict(),
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, default=0, nullable=False)
    description = db.Column(db.String(255))
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
    # user relationship to change song variable
    users_comments = db.relationship('User', back_populates='comments_users')
    # song relationship
    song_comments = db.relationship(
        'Song', back_populates='comments')

    # like joins table
    user_like = db.relationship(
        'User', secondary=comments_likes, back_populates='comment_like',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'likes': self.likes,
            'description': self.description,
            'user_id': self.user_id,
            'song_id': self.song_id,
            'created_at': self.created_at
        }


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255))
    likes = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    playlists = db.relationship(
        'Song', secondary=song_playlists, back_populates='songs_playlist', lazy='dynamic'
    )
    user_playlist_like = db.relationship(
        'User', secondary=playlist_likes, back_populates='playlist_like',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id,
            "likes": self.likes
        }

from werkzeug.security import generate_password_hash
from app.models import db
from app.models.song_user import User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', artist=True, profile_URL="https://i.stack.imgur.com/l60Hf.png")
    steve = User(username='Steve', email='steve@gmail.com',
                 password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/bca695cd14a044e8ac8d26bf9a9045e9.jpg")
    locoman = User(username='Locoman', email='leo@gmail.com',
                   password='Demouser123', artist=True, profile_URL="https://images.unsplash.com/photo-1617517131638-0a41bcbf6f9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")

    db.session.add(demo)
    db.session.add(steve)
    db.session.add(locoman)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()

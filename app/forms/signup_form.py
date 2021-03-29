from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def user_exists(form, field):
    print("Checking if user exists", field.data)
    email = field.data
    if not email:
        raise ValidationError('No email provided')
    if not re.match("[^@]+@[^@]+\.[^@]+", email):
        raise ValidationError('Provided email is not an email address')

    if User.query.filter(User.email == email).first():
        raise ValidationError("User is already registered.")


def username_exists(form, field):
    print("Checking if username exists",  field.data)
    username = field.data
    if not username:
        raise ValidationError('No username provided')

    if User.query.filter(User.username == username).first():
        raise ValidationError("is already in use.")

    if len(username) < 5 or len(username) > 20:
        raise ValidationError('must be between 5 and 20 characters')


def password_matches(form, field):
    print("Checking if password matches", field.data)
    password = field.data

    if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
        raise ValidationError(
            'must contain 1 capital letter and 1 number')

    if len(password) < 8 or len(password) > 50:
        raise ValidationError('must be between 8 and 50 characters')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(),  password_matches])
    profile_URL = StringField('profile_URL')
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def artists_exists(form, field):
#     print('Checking if user exists', field.data)
#     artists_id = field.data
#     user = User.query.filter(User.id == artists_id).first()
#     if not user:
#         raise ValidationError('Artist does not exist')


class SongForm(FlaskForm):
    artist_id = IntegerField('artist_id', validators=[
                             DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    category = StringField('category')
    song = StringField('song')
    image_url = StringField('image_url')

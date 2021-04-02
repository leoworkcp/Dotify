from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .comments import seed_comments, undo_comments
from .playlists import seed_playlists, undo_playlists


# op.drop_table('comments_likes')
# op.drop_table('songs_likes')
# op.drop_table('song_users')
# op.drop_table('song_playlists')
# op.drop_table('playlist_likes')
# op.drop_table('followers_users')


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_songs()
    seed_comments()
    # seed_playlists()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_songs()
    undo_comments()
    undo_playlists()

from werkzeug.security import generate_password_hash
from app.models import db
from app.models.song_user import User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', artist=True, profile_URL="https://i.stack.imgur.com/l60Hf.png")

    anderson_paak = User(username='Anderson.Paak', email='anderson_paak@gmail.com',
                         password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/90ad14c3c66743c498a78c31106a442b.jpg")

    brunno_mars = User(username='Brunno Mars', email='brunno_mars@gmail.com',
                       password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/22205d9f15a74693849be8fb830b708f.jpg")

    d_angelo = User(username="D'Angelo", email='d_angelo@gmail.com',
                    password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/081fe5166ee444838a60225d1157988a.jpg")

    daniel_caesar = User(username="Daniel Caesar", email='daniel_caesar@gmail.com',
                         password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/32622b0d324e43598a98e81ed160648d.jpg")

    giveon = User(username="Giveon", email='giveon@gmail.com',
                  password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/ccf9022a2a284aa4b76ff7aa9a181a45.jpg")

    jacob_collier = User(username="Jacob Collier", email='jacob_collier@gmail.com',
                         password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/73e7639d0d514e549782b128d48f0744.jpg")
    jorja_smith = User(username="Jorja Smith", email='jorja_smith@gmail.com',
                       password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/96855208c5694861941e291ec07a76fe.jpg")

    justin_bieber = User(username="Justin Bieber", email='justin_bieber@gmail.com',
                         password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/c742044ba40844f7ac4109fce8d43c2e.jpg")

    kaytranada = User(username="Kaytranada", email='kaytranada@gmail.com',
                      password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/f676eb27d63843d9a8cbed3539838d97.jpg")

    lil_nas = User(username="Lil Nas X", email='lil_nas@gmail.com',
                   password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/9545a174c519474c8acaba6db67f5a72.jpg")
    olivia_dean = User(username="Olivia Dean", email='olivia_dean@gmail.com',
                       password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/bc25c9a0de2e4036b193371078e83cfe.jpg")
    olivia_rodrigo = User(username="Olivia Rodrigo", email='olivia_rodrigo@gmail.com',
                          password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/ca6255a13a3a48dc97bef92d7ebc4d85.jpg")
    silk_sonic = User(username="Silk Sonic", email='silk_sonic@gmail.com',
                      password='Demouser123', artist=True, profile_URL="https://dotify-sound.s3.amazonaws.com/c7831dbf8fed4788a3e8aeac028cb793.jpg")

    db.session.add(demo)
    db.session.add(anderson_paak)
    db.session.add(brunno_mars)
    db.session.add(d_angelo)
    db.session.add(daniel_caesar)
    db.session.add(giveon)
    db.session.add(jacob_collier)
    db.session.add(jorja_smith)
    db.session.add(justin_bieber)
    db.session.add(kaytranada)
    db.session.add(lil_nas)
    db.session.add(olivia_dean)
    db.session.add(olivia_rodrigo)
    db.session.add(silk_sonic)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()

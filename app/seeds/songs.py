from app.models import db
from app.models.song_user import Song, User


def seed_songs():
    # category rock
    let_it_be = Song(
        artist_id=1, song="https://dotify-sound.s3.amazonaws.com/87152b4da45d4e099b9a683492d5153a.mp3", name="Let it Be", description="Classic", Category="Rock", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/bc336ce3a23147ba993a9fd905c3058d.jpg")
    love_me_do = Song(
        artist_id=1, song="https://dotify-sound.s3.amazonaws.com/7ef4b867509941668b2432ba2555c5af.mp3", name="Love Me Do", description="Classic", Category="Rock", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/c7699a7c4c0541b1af9753f201ecc0c7.jpg")
    # category pop
    my_mind = Song(
        artist_id=2, song="https://dotify-sound.s3.amazonaws.com/47680ec156f24a4b91e0486f41b7d752.mp3", name="On My Mind", description="Best Singles, Hits", Category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/1ba227e72feb41ef946720f260b954c4.jpg")
    call_me = Song(
        artist_id=2, song="https://dotify-sound.s3.amazonaws.com/432a1638c82a4f37872ebb16426037b0.mp3", name="Call Me By Your Name", description="Lil Nas X Montero, Hits, singles 2021", Category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/caafa94463744b87bf0a172585e9e623.png")
    # category r&b
    door_open = Song(
        artist_id=3, song="https://dotify-sound.s3.amazonaws.com/4c99f82470f044738d65da79f657d886.mp3", name="Leave the Door Open", description="2021 hits, Brunno Mars, Anderson Paak, Silk Sonic", Category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/60e446ce50834bb6b95d7f7446372e58.png")
    peaches = Song(
        artist_id=3, song="https://dotify-sound.s3.amazonaws.com/628e986b38744f09a70de15c28ffc70d.mp3", name="Peaches", description="ft. Daniel Caesar, Giveon, 2021, Singles Hits", Category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/5f85c725ea9445f49b5a55d8d4226c28.png")

    # seed this categories as well...
    # category hip-hop
    # category jazz
    # category edm
    # category rap

    # adding songs
    db.session.add(let_it_be)
    db.session.add(love_me_do)
    db.session.add(my_mind)
    db.session.add(call_me)
    db.session.add(door_open)
    db.session.add(peaches)
    # demo songs
    demo = User.query.get(1)
    demo.songs.append(let_it_be)
    demo.songs.append(love_me_do)
    # steve songs
    steve = User.query.get(2)
    steve.songs.append(my_mind)
    steve.songs.append(call_me)
    # locoman songs
    locoman = User.query.get(3)
    locoman.songs.append(door_open)
    locoman.songs.append(peaches)

    db.session.commit()


def undo_songs():
    db.session.execute('TRUNCATE songs CASCADE;')
    db.session.commit()

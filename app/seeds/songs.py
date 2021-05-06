from app.models import db
from app.models.song_user import Song, User


def seed_songs():
    # category rock Demo User Songs
    let_it_be = Song(
        artist_id=1, song="https://dotify-sound.s3.amazonaws.com/f93fddf56f0e4225ab8aefe380d12038.mp3", name="Let it Be", description="Classic", category="Rock", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/9687b1c551c04e249570dd793803fdd4.jpg", album="Let It Be (Remastered)")
    love_me_do = Song(
        artist_id=1, song="https://dotify-sound.s3.amazonaws.com/da504e5fc04e4baba4fc73c45344cd14.mp3", name="Love Me Do", description="Classic", category="Rock", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/ba578a2e1dec4b129c0bc101ac2c4856.jpg", album="Please Please Me (Remastered)")

    # category r&b
    # anderson_paak id 2
    make_it_better = Song(
        artist_id=2, song="https://dotify-sound.s3.amazonaws.com/f701a9b7f9ac4ec58c5b62dc61b9f8c0.mp3", name="Make It Better", description="Anderson .Paak - Make It Better (ft. Smokey Robinson)", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/af7d199a3cb64c8283667ee35ad69eaf.png", album="Ventura")
    # brunno_mars id 3
    door_open = Song(
        artist_id=3, song="https://dotify-sound.s3.amazonaws.com/41885dee956e4b048f73f64e30f00226.mp3", name="Leave the Door Open", description="2021 hits, Brunno Mars, Anderson Paak, Silk Sonic", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/0a8a46b74438461c81b3dfcca952db1b.jpg", album="Single")

    # d_angelo id 4
    africa = Song(
        artist_id=4, song="https://dotify-sound.s3.amazonaws.com/9a7744a53cc0417893f36dcfb2937bef.mp3", name="Africa", description="D'Angelo", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/438f7ffc2cb04dd9be25629983bc116f.png", album="Voodoo")

    brown_sugar = Song(
        artist_id=4, song="https://dotify-sound.s3.amazonaws.com/44e8720583b24443a143d6731b87945a.mp3", name="Brown Sugar", description="D'Angelo", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/bfa7e85e2f654aaf942e999f6033f174.png", album="Brown Sugar")

    # daniel_caesar id 5
    complexities = Song(
        artist_id=5, song="https://dotify-sound.s3.amazonaws.com/5bb905ee46e64cacb5ec1614d958241a.mp3", name="Complexities", description="Daniel_Caesar", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/fc3f18ba2a6a45c1ba881d3a95636395.png", album="Case Study 01")

    # category hip-hop
    # giveon id 6
    all_to_me = Song(
        artist_id=6, song="https://dotify-sound.s3.amazonaws.com/c206435557e64258970edce9afcaab35.mp3", name="All To Me", description="Giveon", category="hip-hop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/d9a73834720b4846938bf59fd9a906b5.png", album="When it's all Said and Done")

    # category jazz
    # jacob_collier id 7
    time_alone_with_you = Song(
        artist_id=7, song="https://dotify-sound.s3.amazonaws.com/6eae09f6f7f84dfd998c38967cc7d168.mp3", name="Time Alone With You", description="Jacob Collier ft. Daniel Caesar", category="jazz", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/e3fbc18bf36543cebcc8dd18a280f37a.jpg", album="Djesse Vol.3")

    # category pop
    # jorja_smith id 8
    my_mind = Song(
        artist_id=8, song="https://dotify-sound.s3.amazonaws.com/969f746788de404f9fc42bb27ea385e8.mp3", name="On My Mind", description="Best Singles, Hits jorja smith", category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/55cd9f9a339f4dcab3717aff6056b0ea.jpg", album="X Preditah")

    goodbyes = Song(
        artist_id=8, song="https://dotify-sound.s3.amazonaws.com/7e2e02048f8b41539b32e1ebe22679ce.mp3", name="Goodbyes", description="Jorja Smith", category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/0d8c5774e4134272adce2668bbc3e37a.png", album="Lost and Found")

    # category r&b
    # justin_bieber id 9
    peaches = Song(
        artist_id=9, song="https://dotify-sound.s3.amazonaws.com/d0a5cc5dda2b4723ae48ce3b4245e217.mp3", name="Peaches", description="ft. Daniel Caesar, Giveon, 2021, Singles Hits", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/ab7050ffb7e444d0a4730161ac7743de.png", album="Justice")

    # category EDM
    # kaytranada id 10
    break_dance = Song(
        artist_id=10, song="https://dotify-sound.s3.amazonaws.com/996c5f83bcdd4fddad0379b11ffa6d5c.mp3", name="BREAKDANCE LESSON N.1", description="kaytranada", category="edm", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/6d6b860fc7a84ce4b359e3594b2e6d91.png", album="99.9%")
    # category rap
    together = Song(
        artist_id=10, song="https://dotify-sound.s3.amazonaws.com/c999a88c9cd84a3a9ea6be498e0d1b66.mp3", name="Together", description="KAYTRANADA - (feat. AlunaGeorge &amp GoldLink)", category="rap", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/c1d9e273a9d54eecbc42d36720296878.png", album="99.9%")

    # category pop
    # lil_nas id 11
    call_me = Song(
        artist_id=11, song="https://dotify-sound.s3.amazonaws.com/9389b6634a2b41d589405ae1ac8a556a.mp3", name="Call Me By Your Name", description="Lil Nas X Montero, Hits, singles 2021", category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/5a8c99e372dc42fbbfa999530e05cda1.png", album="Single")

    # olivia_dean id 12
    hardest_part = Song(
        artist_id=12, song="https://dotify-sound.s3.amazonaws.com/71797d6e50d5445c929a8dda3fc2f107.mp3", name="Hardest Part", description="Olivia Dean", category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/4484318ce782415ebeb0f63cc60f571e.png", album="Single")

    # olivia_rodrigo id 13
    deja_vu = Song(
        artist_id=13, song="https://dotify-sound.s3.amazonaws.com/67967ca280444b1ea90e4c231bf63699.mp3", name="Deja Vu", description="Olivia Rodrigo", category="Pop", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/e6d6634f33f045329eaaecb4510bb016.png", album="Single")

    # category R&B
    # silk_sonic id 14
    intro = Song(
        artist_id=14, song="https://dotify-sound.s3.amazonaws.com/4ee5ac134e8b4c6888d1a2705c5fad4f.mp3", name="Silk Sonic Intro", description="Bruno Mars, Anderson.Paak, Silk Sonic", category="R&B", likes=0, public=True, image_url="https://dotify-sound.s3.amazonaws.com/c8bcce190bf547a19a037eb62620989b.jpg", album="Single")

    # adding songs
    # id 1
    db.session.add(let_it_be)
    db.session.add(love_me_do)

    # id 2
    db.session.add(make_it_better)

    # id 3
    db.session.add(door_open)

    # id 4
    db.session.add(africa)
    db.session.add(brown_sugar)

    # id 5
    db.session.add(complexities)

    # id 6
    db.session.add(all_to_me)

    # id 7
    db.session.add(time_alone_with_you)

    # id 8
    db.session.add(my_mind)
    db.session.add(goodbyes)

    # id 9
    db.session.add(peaches)

    # id 10
    db.session.add(break_dance)
    db.session.add(together)

    # id 11
    db.session.add(call_me)

    # id 12
    db.session.add(hardest_part)

    # id 13
    db.session.add(deja_vu)

    # id 14
    db.session.add(intro)

    # id 1
    demo = User.query.get(1)
    demo.songs.append(let_it_be)
    demo.songs.append(love_me_do)

    # id 2
    anderson_paak = User.query.get(2)
    anderson_paak.songs.append(make_it_better)

    # id 3
    brunno_mars = User.query.get(3)
    brunno_mars.songs.append(door_open)

    # id 4
    d_angelo = User.query.get(4)
    d_angelo.songs.append(africa)
    d_angelo.songs.append(brown_sugar)

    # id 5
    daniel_caesar = User.query.get(5)
    daniel_caesar.songs.append(complexities)

    # id 6
    giveon = User.query.get(6)
    giveon.songs.append(all_to_me)

    # id 7
    jacob_collier = User.query.get(7)
    jacob_collier.songs.append(time_alone_with_you)

    # id 8
    jorja_smith = User.query.get(8)
    jorja_smith.songs.append(my_mind)
    jorja_smith.songs.append(goodbyes)

    # id 9
    justin_bieber = User.query.get(9)
    justin_bieber.songs.append(peaches)

    # id 10
    kaytranada = User.query.get(10)
    kaytranada.songs.append(break_dance)
    kaytranada.songs.append(together)

    # id 11
    lil_nas = User.query.get(11)
    lil_nas.songs.append(call_me)

    # id 12
    olivia_dean = User.query.get(12)
    olivia_dean.songs.append(hardest_part)

    # id 13
    olivia_rodrigo = User.query.get(13)
    olivia_rodrigo.songs.append(deja_vu)

    # id 14
    silk_sonic = User.query.get(14)
    silk_sonic.songs.append(intro)

    db.session.commit()


def undo_songs():
    db.session.execute('TRUNCATE songs CASCADE;')
    db.session.commit()

from ..Conn.users import connect_database


def database():
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        cursor.execute("""create table if not exists users(
        id serial primary key,
        name text not null,
        email text not null, 
        description text not null default 'Sem Descrição',
        password text not null,
        session_token UUID,
        image_url text,
        FollowersQuantity INTEGER NOT NULL DEFAULT 0,
        followingquantity INTEGER NOT NULL DEFAULT 0,
        postsQuantity INTEGER NOT NULL DEFAULT 0
        )""")
        conn.commit()
    except Exception:
        if conn:
            conn.rollback()

        return {"status": False, "error": "Erro Database"}

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()

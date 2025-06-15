from backend.config.database import init_db

if __name__ == '__main__':
    init_db("database/schema/create_tables.sql")
    print("Database initialized successfully.")


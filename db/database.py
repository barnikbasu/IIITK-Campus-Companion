from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database file
SQL_ALCHEMY_DATABASE_URL = "sqlite:///./campus_companion.db"

engine = create_engine(
    SQL_ALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Required for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

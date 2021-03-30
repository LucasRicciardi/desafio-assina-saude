
import os


DATABASE_NAME: str = os.getenv('DATABASE_NAME', 'assina_saude')
DATABASE_URL: str = os.getenv('DATABASE_URL', 'mongodb://localhost:27017')

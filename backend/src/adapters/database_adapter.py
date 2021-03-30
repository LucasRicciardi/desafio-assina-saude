
import os
import json

import pymongo
import pymongo.database

from src import (
    settings,
)


client: pymongo.MongoClient = pymongo.MongoClient(settings.DATABASE_URL)
database = pymongo.database.Database = client.get_database(settings.DATABASE_NAME)

appointments_collection: pymongo.database.Collection = database.get_collection('appointments')
profesionals_collection: pymongo.database.Collection = database.get_collection('professionals')
specialties_collection: pymongo.database.Collection = database.get_collection('specialties')

# seed database with default data from the challenge
for file in os.listdir('seeds'):
    collection_name: str = file.split('.')[0]
    with open(f'seeds/{file}', 'r') as seeds_file:
        seeds: list = json.loads(seeds_file.read())
        for seed in seeds:
            update: dict = {
                '$set': seed
            }
            database[collection_name].update_one(seed, update, upsert=True)

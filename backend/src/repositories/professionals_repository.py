
from __future__ import annotations

from typing import (
    Generator,
)

import bson

from src import (
    adapters,
    entities,
)


class ProfessionalsRepository:
    
    def _create_professional(self, data: dict) -> entities.Professional:
        return entities.Professional(
            id=str(data.get('_id')), 
            name=data.get('name'),
            specialty=data.get('specialty'),
            crm=data.get('crm')
        )

    def get_by_id(self, id: str) -> entities.Professional:
        result = adapters.database.profesionals_collection.find_one({ '_id': bson.ObjectId(id) })
        if result:
            return self._create_professional(result)
            
    def list(self, specialty_id: str) -> Generator[entities.Professional]:
        filter: str = {
            'specialty': specialty_id
        }
        results = adapters.database.profesionals_collection.find(filter)
        for result in results:
            yield self._create_professional(result)


from __future__ import annotations

from typing import (
    Generator,
)

from src import (
    entities,
    adapters,
)


class SpecialtiesRepository:

    def _create_specialty(self, data: dict) -> entities.Specialty:
        return entities.Specialty(
            name=str(data.get('_id'))
        )

    def list(self) -> Generator[entities.Specialty]:
        results = adapters.database.specialties_collection.find()
        for result in results:
            yield self._create_specialty(result)

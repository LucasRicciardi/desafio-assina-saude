
from __future__ import annotations

from typing import (
    Generator,
)

import dataclasses
import re

import pymongo
import pymongo.results

from src import (
    adapters,
    entities,
)

from .professionals_repository import ProfessionalsRepository


@dataclasses.dataclass
class AppointmentsRepository:

    professionals_repository: ProfessionalsRepository = dataclasses.field(default_factory=ProfessionalsRepository)

    def _create_appointment(self, data: dict) -> entities.Appointment:
        return entities.Appointment(
            id=str(data.get('_id')),
            professional=self.professionals_repository.get_by_id(data.get('professional_id')),
            time=data.get('time')
        )

    def create(self, professional_id: str, time: str) -> entities.Appointment:
        document: dict = {
            'professional_id': professional_id,
            'time': time
        }
        result: pymongo.results.InsertOneResult = adapters.database.appointments_collection.insert_one(document)
        if not result:
            raise Exception
        return self._create_appointment(document)

    def list(self, filter: dict = {}) -> Generator[entities.Appointment]:
        results = adapters.database.appointments_collection.find(filter).sort('time', pymongo.ASCENDING)
        for result in results:
            yield self._create_appointment(result)

    def list_appointments_by_professional(self, professional_id: str, day: str, year: str, month: str) -> Generator[entities.Appointment]:
        filter: dict = {
            'professional_id': professional_id,
            'time': re.compile(f'{day}/{month}/{year}*')
        }
        return self.list(filter)


from __future__ import annotations

from typing import (
    Generator,
)

import dataclasses
import datetime

from src import (
    entities,
    repositories,
    exceptions
)


@dataclasses.dataclass
class AppointmentsService:

    appointments_repository: repositories.AppointmentsRepository = dataclasses.field(default_factory=repositories.AppointmentsRepository)
    professionals_repository: repositories.ProfessionalsRepository = dataclasses.field(default_factory=repositories.ProfessionalsRepository)
    
    def create_appointment(self, professional_id: str, time: str) -> entities.Appointment:
        professional: entities.Professional = self.professionals_repository.get_by_id(professional_id)
        if professional.have_appointment(time):
            raise exceptions.ProfessionalAlreadyHaveAppointmentError(professional, time)
        return self.appointments_repository.create(professional_id, time)

    def list_appointments(self) -> Generator[entities.Appointment]:
        return self.appointments_repository.list()

    def list_appointments_by_professional(self, professional_id: str, filter: dict) -> Generator[entities.Professional]:
        return self.appointments_repository.list_appointments_by_professional(professional_id, **filter)
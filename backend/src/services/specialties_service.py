
from __future__ import annotations

from typing import (
    Generator,
)

import dataclasses

from src import (
    entities,
    repositories,
)


@dataclasses.dataclass
class SpecialtiesService:
    
    specialties_repository: repositories.SpecialtiesRepository = dataclasses.field(default_factory=repositories.SpecialtiesRepository)

    def list_specialties(self) -> Generator[entities.Specialty]:
        return self.specialties_repository.list()

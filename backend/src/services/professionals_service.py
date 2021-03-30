
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
class ProfessionalsService:
    
    professionals_repository: repositories.ProfessionalsRepository = dataclasses.field(default_factory=repositories.ProfessionalsRepository)

    def list_professionals(self, specialty_id: str) -> Generator[entities.Professional]:
        return self.professionals_repository.list(specialty_id)
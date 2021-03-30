
from __future__ import annotations

from typing import (
    Any,
)

import dataclasses
import datetime

from src import (
    adapters,
)


@dataclasses.dataclass
class Professional:
    
    id: str = dataclasses.field(default=dataclasses.MISSING)
    name: str = dataclasses.field(default=dataclasses.MISSING)
    specialty: str = dataclasses.field(default=dataclasses.MISSING)
    crm: str = dataclasses.field(default=dataclasses.MISSING)
    
    def have_appointment(self, time: str) -> bool:
        filter: dict = {
            'professional_id': self.id,
            'time': time
        }
        result: Any = adapters.database.appointments_collection.find_one(filter)
        if result:
            return True
        return False

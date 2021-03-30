
from __future__ import annotations

import dataclasses
import datetime

from .professional import Professional


@dataclasses.dataclass
class Appointment:

    id: str = dataclasses.field(default=dataclasses.MISSING)
    professional: Professional = dataclasses.field(default=dataclasses.MISSING)
    time: str = dataclasses.field(default=dataclasses.MISSING)

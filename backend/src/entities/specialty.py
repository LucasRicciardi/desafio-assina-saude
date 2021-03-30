
from __future__ import annotations

import dataclasses


@dataclasses.dataclass
class Specialty:

    name: str = dataclasses.field(default=dataclasses.MISSING)

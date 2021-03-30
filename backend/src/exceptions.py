
import datetime

from src import (
    entities,
)

class ProfessionalAlreadyHaveAppointmentError(Exception):
    
    def __init__(self, professional: entities.Professional, time: str) -> None:
        pass
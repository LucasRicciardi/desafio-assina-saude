
from __future__ import annotations

import flask

from src import (
    services,
)


blueprint: flask.Blueprint = flask.Blueprint('specialties', __name__)

@blueprint.route(rule='/specialties', methods=[ 'GET' ])
def list_specialties_action() -> flask.Response:
    specialties_service: services.SpecialtiesService = services.SpecialtiesService()
    try:
        return flask.jsonify(list(specialties_service.list_specialties())), 200
    except Exception:
        response: dict = {
            'message': 'internal server error'
        }
        return flask.jsonify(response), 500

@blueprint.route(rule='/specialties/<string:id>/professionals', methods=[ 'GET' ])
def list_specialty_professionals_action(id: str) -> flask.Response:
    professionals_service: services.ProfessionalsService = services.ProfessionalsService()
    try:
        return flask.jsonify(list(professionals_service.list_professionals(specialty_id=id))), 200
    except Exception:
        response: dict = {
            'message': 'internal server error'
        }
        return flask.jsonify(response), 500

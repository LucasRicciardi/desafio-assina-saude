
import flask

from src import (
    helpers,
    services,
)


blueprint: flask.Blueprint = flask.Blueprint('professionals', __name__)

@blueprint.route(rule='/professionals/<string:id>/appointments', methods=[ 'GET' ])
def get_professional_appointments_action(id: str) -> flask.Response:
    appointments_service: services.AppointmentsService = services.AppointmentsService()
    try:
        filter: dict = { 
            'year': flask.request.args.get('year', helpers.get_current_year()),
            'month': flask.request.args.get('month', helpers.get_current_month()),
            'day': flask.request.args.get('day', helpers.get_current_day())
        }
        return flask.jsonify(list(appointments_service.list_appointments_by_professional(id, filter))), 200
    except Exception:
        response: dict = {
            'message': 'internal server error'
        }
        return flask.jsonify(response), 500
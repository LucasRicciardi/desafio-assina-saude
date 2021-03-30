
import flask

from src import (
    services,
    exceptions
)


blueprint: flask.Blueprint = flask.Blueprint('appointments', __name__)

@blueprint.route(rule='/appointments', methods=[ 'GET' ])
def list_appointments_action() -> flask.Response:
    appointments_service: services.AppointmentsService = services.AppointmentsService()
    try:
        return flask.jsonify(list(appointments_service.list_appointments())), 200
    except Exception as err:
        print(err)
        response: dict = {
            'message': 'internal server error'
        }
        return flask.jsonify(response), 500

@blueprint.route(rule='/appointments', methods=[ 'POST' ])
def create_appointment_action() -> flask.Response:
    appointments_service: services.AppointmentsService = services.AppointmentsService()
    try:
        return flask.jsonify(appointments_service.create_appointment(**flask.request.json)), 201
    except exceptions.ProfessionalAlreadyHaveAppointmentError:
        response: dict = {
            'message': 'Professional already have an appointment'
        }
        return flask.jsonify(response), 409
    except Exception:
        response: dict = {
            'message': 'internal server error'
        }
        return flask.jsonify(response), 500

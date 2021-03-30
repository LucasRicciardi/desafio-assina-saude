
import flask
import flask_cors

from src import (
    blueprints,
)


app: flask.Flask = flask.Flask('__main__')
cors: flask_cors.CORS = flask_cors.CORS(app)

app.register_blueprint(blueprints.appointments_blueprint)
app.register_blueprint(blueprints.professionals_blueprint)
app.register_blueprint(blueprints.specialties_blueprint)

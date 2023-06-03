from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from datalogic.models import db
from datalogic.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.cars import AllCarResource, UserCarResource
from resources.reservations import UserReservationResource,UnavailableResource,DeleteUnavailableResource,DeleteWaitListTable,WaitListResource,GetTableSetUp,DeleteTableSetUp,GetUsedTables,DeleteUsedTables,UpdateScheduleResource,UserReviewsDeleteResource,AllReservationsDeleteResource,UserReservationDeleteResource,AllReservationsResource,AllReviewsResource,AllTablesResource,UserReviewsResource,SetScheduleResource
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(AllCarResource, '/api/cars')
    api.add_resource(UserCarResource, '/api/user_cars')
    
    api.add_resource(UserReservationResource, '/api/user_reservations')
    api.add_resource(UserReservationDeleteResource, '/api/user_delete_reservation/<int:pk>')
    api.add_resource(AllReservationsResource, '/api/all_reservations')
    api.add_resource(AllReservationsDeleteResource, '/api/delete_reservations/<int:pk>')
    api.add_resource(AllTablesResource, '/api/all_tables')
    api.add_resource(UserReviewsResource, '/api/user_reviews')
    api.add_resource(UserReviewsDeleteResource, '/api/user_delete_reviews/<int:pk>')
    api.add_resource(AllReviewsResource, '/api/all_reviews')
    api.add_resource(SetScheduleResource, '/api/set_schedule')
    api.add_resource(UpdateScheduleResource, '/api/update_schedule/<int:pk>')
    api.add_resource(GetUsedTables, '/api/used_tables')
    api.add_resource(DeleteUsedTables, '/api/delete_used_tables/<int:pk>')
    api.add_resource(GetTableSetUp, '/api/table_set_up')
    api.add_resource(DeleteTableSetUp, '/api/delete_table_set_up/<int:pk>')
    api.add_resource(WaitListResource, '/api/wait_list')
    api.add_resource(DeleteWaitListTable, '/api/delete_wait_list_tabel/<int:pk>')
    api.add_resource(UnavailableResource, '/api/unavailable')
    api.add_resource(DeleteUnavailableResource, '/api/delete_unavailable/<int:pk>')



    return api

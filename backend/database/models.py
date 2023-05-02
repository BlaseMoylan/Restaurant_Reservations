from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    is_admin=db.Column(db.Boolean, nullable=False)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database
class Table(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    party_size=db.Column(db.Integer, nullable=False)
    is_reserved=db.Column(db.Boolean, nullable=False)

class Reservations(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    time=db.Column(db.Time, nullable=False)
    date=db.Column(db.Date, nullable=False)
    party_count=db.Column(db.Integer, nullable=False)
    costumer_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")
    table_id=db.Column(db.Integer, db.ForeignKey('table.id'))
    table=db.relationship("Table")

class Wait_List(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    reservation_id=db.Column(db.Integer, db.ForeignKey('reservations.id'))
    reservation=db.relationship("Reservations")

class Reviews(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    review_text=db.Column(db.Text, nullable=False)
    rating=db.Column(db.Integer, nullable=False)
    customer_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

class Schedule(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    day=db.Column(db.Date, nullable=False)
    opening=db.Column(db.Time, nullable=False)
    closing=db.Column(db.Time, nullable=False)

class TableSetUp(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    table_size=db.Column(db.Integer,nullable=False)
    num_of_tables=db.Column(db.Integer, nullable=False)

class UsedTables(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    day=db.Column(db.Date, nullable=False)
    hour=db.Column(db.Time, nullable=False)
    table_id=db.Column(db.Integer, db.ForeignKey('table.id'))
    table=db.relationship("Table")
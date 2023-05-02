from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Table, Reservations,Wait_List,Reviews,Schedule,TableSetUp,UsedTables

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    phone = fields.Integer(required=True)
    is_admin=fields.Boolean(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "phone","is_admin")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    phone = fields.Integer(required=True)
    is_admin=fields.Boolean(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "phone","is_admin")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below
class TableSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    party_size=fields.Integer(required=True)
    is_reserved=fields.Boolean(required=True)
    class Meta:
        fields=("id","party_size","is_reserved")
    
    @post_load
    def create_table(self, data, **kwargs):
        return Table(**data)

table_schema = TableSchema()
tables_schema = TableSchema(many=True)

class ReservationsSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    time=fields.Time(required=True)
    date=fields.Date(required=True)
    party_count=fields.Integer(required=True)
    costumer_id=fields.Integer(required=True)
    user = ma.Nested(UserSchema, many=False)
    table_id=fields.Integer(required=True)
    table=ma.Nested(TableSchema, many=False)
    class Meta:
        fields=("id","time","date","party_count","costumer_id","table_id")
    @post_load
    def create_reservation(self, data, **kwargs):
        return Reservations(**data)

reservation_schema = ReservationsSchema()
reservations_schema = ReservationsSchema(many=True)

class WaitListSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    reservation_id=fields.Integer(required=True)
    reservation=ma.Nested(ReservationsSchema,many=False)
    class Meta:
        fields=("id","reservation_id")
    @post_load
    def create_wait_list(self, data, **kwargs):
        return Wait_List(**data)

wait_list_schema = WaitListSchema()
wait_lists_schema = WaitListSchema(many=True)

class ReviewsSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    review_text=fields.String(required=True)
    rating=fields.Integer(required=True)
    costumer_id=fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields=("id","review_text","rating","costumer_id")
    @post_load
    def create_review(self, data, **kwargs):
        return Reviews(**data)

review_schema = ReviewsSchema()
reviews_schema = ReviewsSchema(many=True)

class ScheduleSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    day=fields.Date(required=True)
    opening=fields.Time(required=True)
    closing=fields.Time(required=True)
    class Meta:
        fields=("id","day","opening","closing")
    @post_load
    def create_schedule(self, data, **kwargs):
        return Schedule(**data)

schedule_schema = ScheduleSchema()
schedules_schema = ScheduleSchema(many=True)

class TableSetUpSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    table_size=fields.Integer(required=True)
    num_of_tables=fields.Integer(required=True)
    class Meta:
        fields=("id","table_size","num_of_tables")
    @post_load
    def create_table_set_up(self, data, **kwargs):
        return TableSetUp(**data)

table_set_up_schema = TableSetUpSchema()
tables_set_up_schema = TableSetUpSchema(many=True)

class UsedTablesSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    day=fields.Date(required=True)
    hour=fields.Time(required=True)
    table_id=fields.Integer(required=True)
    table=ma.Nested(TableSchema, many=False)
    class Meta:
            fields=("id","day","hour","table_id")
    @post_load
    def create_used_tables(self, data, **kwargs):
        return UsedTables(**data)

used_table_schema = UsedTablesSchema()
used_tables_schema = UsedTablesSchema(many=True)
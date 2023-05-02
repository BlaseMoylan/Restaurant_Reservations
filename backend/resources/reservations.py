from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Reviews,Schedule,Table,Reservations,Wait_List,UsedTables,TableSetUp
from database.schemas import review_schema,table_set_up_schema,tables_set_up_schema,used_table_schema,used_tables_schema,reviews_schema,schedule_schema,schedules_schema,wait_list_schema,wait_lists_schema,reservation_schema,reservations_schema,table_schema,tables_schema
from sqlalchemy import and_, delete

class UserReservationResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_reservation = reservation_schema.load(form_data)
        new_reservation.user_id = user_id
        db.session.add(new_reservation)
        db.session.commit()
        return reservation_schema.dump(new_reservation), 201
    
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_reservations = Reservations.query.filter_by(id=user_id)
        return reservations_schema.dump(user_reservations)

class UserReservationDeleteResource(Resource):

    @jwt_required()
    def delete(self,pk):
        user_id = get_jwt_identity()
        stmt=(
            delete(Reservations).
            where(and_(Reservations.id==pk,Reservations.custumer_id==user_id))
        )
        db.session.execute(stmt)
        db.session.commit()
        return '',200
    
class AllReservationsResource(Resource):
    def get(self):
        all_reservations = Reservations.query.all()
        return reservations_schema.dump(all_reservations),200

class AllReservationsDeleteResource(Resource):
    def delete(self,pk):
        reservation=Reservations.query.get_or_404(pk)
        db.session.delete(reservation)
        db.session.commit()
        return '', 204

class AllTablesResource(Resource):
    def post(self):
        form_data=request.get_json()
        new_table=table_schema.load(form_data)
        db.session.add(new_table)
        db.session.commit()
        return table_schema.dump(new_table), 201
    
    def get(self):
        all_tables = Table.query.all()
        return tables_schema.dump(all_tables),200
    
    def delete(self):
        tables=Table.query.all()
        for table in tables:
            db.session.delete(table)
        db.session.commit()
        return '', 204

class UserReviewsResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review=review_schema.load(form_data)
        new_review.customer_id=user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_reviews = Reviews.query.filter_by(customer_id=user_id)
        return reviews_schema.dump(user_reviews)

class UserReviewsDeleteResource(Resource):
    @jwt_required()
    def delete(self,pk):
        user_id = get_jwt_identity()
        stmt=(
            delete(Reviews).
            where(and_(Reviews.id==pk,Reviews.customer_id==user_id))
        )
        db.session.execute(stmt)
        db.session.commit()
        return '',200

class AllReviewsResource(Resource):
    def get(self):
        all_reviews=Reviews.query.all()
        return reviews_schema.dump(all_reviews),200

class SetScheduleResource(Resource):
    def post(self):
        form_data=request.get_json()
        new_schedule=schedule_schema.load(form_data)
        db.session.add(new_schedule)
        db.session.commit()
        return schedule_schema.dump(new_schedule), 201
    
    def get(self):
        all_schedules = Schedule.query.all()
        return schedules_schema.dump(all_schedules),200
    
class UpdateScheduleResource(Resource):
    def put(self, pk):
        schedule=Schedule.query.get_or_404(pk)
        form_data=request.get_json()
        print(schedule.closing)
        print(form_data['closing'])
        print(form_data['day'])
        schedule.day=form_data['day']
        schedule.opening=form_data['opening']
        schedule.closing=form_data['closing']
        db.session.commit()
        return schedule_schema.dump(schedule), 200

# not sure yet how to best proceed with the wait_list so I will add it on later

class GetTableSetUp(Resource):
    def get(self):
        table_set_up=TableSetUp.query.all()
        return tables_set_up_schema.dump(table_set_up), 200
    
    def post(self):
        form_data=request.get_json()
        new_table=table_set_up_schema.load(form_data)
        db.session.add(new_table)
        db.session.commit()
        return table_set_up_schema.dump(new_table), 201

class DeleteTableSetUp(Resource):
    def delete(self,pk):
        table_set_up=TableSetUp.query.get_or_404(pk)
        db.session.delete(table_set_up)
        db.session.commit()
        return '', 204
    
class GetUsedTables(Resource):
    def get(self):
        table=UsedTables.query.all()
        return used_tables_schema.dump(table), 200
    
    def post(self):
        form_data=request.get_json()
        new_table=used_table_schema.load(form_data)
        db.session.add(new_table)
        db.session.commit()
        return used_table_schema.dump(new_table), 201

class DeleteUsedTables(Resource):
    def delete(self,pk):
        table=TableSetUp.query.get_or_404(pk)
        db.session.delete(table)
        db.session.commit()
        return '', 204

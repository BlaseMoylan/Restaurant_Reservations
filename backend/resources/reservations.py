from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Reviews,Schedule,Table,Reservations,Wait_List
from database.schemas import review_schema,reviews_schema,schedule_schema,schedules_schema,wait_list_schema,wait_lists_schema,reservation_schema,reservations_schema,table_schema,tables_schema
from sqlalchemy import and_, delete

class UserReservation(Resource):
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
    
class AllReservations(Resource):
    def get(self):
        all_reservations = Reservations.query.all()
        return reservations_schema.dump(all_reservations),200
    
    def delete(self,pk):
        reservation=Reservations.query.get_or_404(pk)
        db.session.delete(reservation)
        db.session.commit()
        return '', 204

class AllTables(Resource):
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
        db.session.delete(tables)
        db.session.commit()
        return '', 204

class UserReviews(Resource):
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

class AllReviews(Resource):
    def get(self):
        all_reviews=Reviews.query.all()
        return reviews_schema.dump(all_reviews),200

class SetSchedule(Resource):
    def post(self):
        form_data=request.get_json()
        new_table=table_schema.load(form_data)
        db.session.add(new_table)
        db.session.commit()
        return table_schema.dump(new_table), 201
    
    def get(self):
        all_tables = Table.query.all()
        return tables_schema.dump(all_tables),200
    
    def put(self, pk):
        schedule=Schedule.query.get_or_404(pk)
        form_data=request.get_json()
        form_data['day']=schedule.day
        form_data['opening']=schedule.opening
        form_data['closing']=schedule.closing
        db.session.commit()
        return schedule_schema.dump(schedule), 200

# not sure yet how to best proceed with the wait_list so I will add it on later

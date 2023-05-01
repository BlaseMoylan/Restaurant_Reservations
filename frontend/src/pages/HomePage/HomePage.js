import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddReservation from "../../components/Home/add_reservation";
import UserReservations from "../../components/Home/user_reservations";
import axios from "axios";
import { UNSAFE_RouteContext } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const auth= "Bearer " + token
  console.log(auth)

  return (
    <main>
      <h1>Welcome!</h1>
      <UserReservations user={user} auth={auth}/>
      <AddReservation user={user} auth={auth}/>
    </main>
  );
};

export default HomePage;

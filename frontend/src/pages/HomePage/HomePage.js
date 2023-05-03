import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddReservation from "../../components/Home/add_reservation";
import UserReservations from "../../components/Home/user_reservations";
import axios from "axios";
import { UNSAFE_RouteContext } from "react-router-dom";
import { Link } from "react-router-dom";
// import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPage from "../AdminPage/AdminPage";
const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const auth= "Bearer " + token
  console.log(auth)
  console.log(user)
  if(user.is_admin!==true){
    return (
      <main>
        <h1>Welcome!</h1>
        <UserReservations user={user} auth={auth}/>
        <AddReservation user={user} auth={auth}/>
      </main>
    )
  }
  else{
    return(
      <AdminPage/>
    )
    
  }
  
};

export default HomePage;

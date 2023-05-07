import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddReservation from "../../components/Home/add_reservation";
import UserReservations from "../../components/Home/user_reservations";
import AvailableTimesCalendar from "../../components/Home/AvailableTimesCalendar";
import axios from "axios";
import { UNSAFE_RouteContext } from "react-router-dom";
import { Link } from "react-router-dom";
// import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPage from "../AdminPage/AdminPage";
const HomePage = () => {

  const [reservations,setReservations]=useState([])
  const [waitList,setWaitList]=useState([])
  const [usedTables, setUsedTables] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [user, token] = useAuth();
  const auth= "Bearer " + token
  console.log(auth)
  console.log(user)

  async function getWaitList(){
    let results= await axios.get(`http://127.0.0.1:5000/api/wait_list`)
    setWaitList(results.data)
  }

  async function getReservations(){
    let results= await axios.get(`http://127.0.0.1:5000/api/all_reservations`)
    setReservations(results.data)
    
  }

  async function getUsedTables() {
    let results = await axios.get(`http://127.0.0.1:5000/api/used_tables`);
    console.log("this is it");
    console.log(results.data);
    setUsedTables(results.data);
  }

  async function getAllTables() {
    let results = await axios.get(`http://127.0.0.1:5000/api/all_tables`);
    let tables = results.data;
    console.log(tables);
    setAllTables(tables);
    // get this on the backend side connected to an end point
  }

  useEffect(() => {
    getReservations()
    getWaitList()
    getUsedTables()
    getAllTables()
  }, []);
  if(user.is_admin!==true){
    if(waitList||reservations){
      return (
        <main>
          <h1>Welcome!</h1>
          <UserReservations user={user} auth={auth} waitList={waitList} reservations={reservations} getWaitList={getWaitList} setWaitList={setWaitList} getReservations={getReservations} usedTables={usedTables} allTables={allTables} getAllTables={getAllTables} getUsedTables={getUsedTables}/>
          <AddReservation user={user} auth={auth} getWaitList={getWaitList} waitList={waitList} getReservations={getReservations} usedTables={usedTables} allTables={allTables} getAllTables={getAllTables} getUsedTables={getUsedTables}/>
          <AvailableTimesCalendar/>
        </main>
      )
    }
    else{
      return (
        <main>
          <h1>Welcome!</h1>
          <UserReservations user={user} auth={auth} waitList={waitList} reservations={reservations} setWaitList={setWaitList} getReservations={getReservations} usedTables={usedTables} allTables={allTables} getAllTables={getAllTables} getUsedTables={getUsedTables}/>
          <AddReservation user={user} auth={auth} getWaitList={getWaitList} waitList={waitList} getReservations={getReservations} usedTables={usedTables} allTables={allTables} getAllTables={getAllTables} getUsedTables={getUsedTables}/>
          <AvailableTimesCalendar/>
        </main>
      )
    }
    
  }
  else{
    return(
      <AdminPage/>
    )
    
  }
  
};

export default HomePage;

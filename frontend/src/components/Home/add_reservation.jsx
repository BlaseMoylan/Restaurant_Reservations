import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import FullCalendar from "@fullcalendar/react";

const AddReservation = ({getWaitList,waitList,getReservations,usedTables,allTables,getAllTables,getUsedTables}) => {
  // const [addReservation, setAddReservation]=useState([])
  // turn this into a custom useState when there is time

  const { user, token } = useContext(AuthContext);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [table_size, setTableSize] = useState("");
  const [tableId, setTableId] = useState(null);
  const [unavailable,setUnavailable]=useState([])
  // const [usedTables, setUsedTables] = useState([]);
  // const [allTables, setAllTables] = useState([]);

  useEffect(() => {
    getUnavailable();
    getUsedTables();
    getAllTables();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    logic();
    console.log(tableId);
  }

  async function addReservation(form) {
    try {
      let results = await axios.post(`http://35.87.21.157:5000/api/user_reservations`,form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getReservations()
    } catch (ex) {
      console.log("error in put");
    }
  }
  // async function getUsedTables() {
  //   let results = await axios.get(`http://127.0.0.1:5000/api/used_tables`);
  //   console.log("this is it");
  //   console.log(results.data);
  //   setUsedTables(results.data);
  // }
  async function postUsedTable(form) {
    let results = await axios.post(
      `http://35.87.21.157:5000/api/used_tables`,
      form
    );
    getUsedTables()
  }
  // async function getAllTables() {
  //   let results = await axios.get(`http://127.0.0.1:5000/api/all_tables`);
  //   let tables = results.data;
  //   console.log(tables);
  //   setAllTables(tables);
  //   // get this on the backend side connected to an end point
  // }
  async function getUnavailable(){
    let results= await axios.get(`http://35.87.21.157:5000/api/unavailable`)
    setUnavailable(results.data)
  }
  async function postUnavailable(form){
    let results= await axios.post(`http://35.87.21.157:5000/api/unavailable`,form)
    getUnavailable()
  }

  async function postWaitList(form){
    let results= await axios.post(`http://35.87.21.157:5000/api/wait_list`,form)
    getWaitList()
  }
  // async function deleteWaitList(pk){
  //   let results=await axios.delete(`http://127.0.0.1:5000/api/delete_wait_list_tabel/${pk}`)
  //   getWaitList()
  // }

  // async function getWaitList(){
  //   let results= await axios.get(`http://127.0.0.1:5000/api/wait_list`)
  //   let count=1
  //   for(let item of results.data){
  //     if(item.costumer_id==user.id){
  //       break
  //     }
  //     else{
  //       count++
  //     }
  //   }
  //   alert(`Your position in the wait list is ${count}`)
  // }
  function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => {
        if(typeof aa == "string"){
            return aa.toLowerCase()
        }
        else{
            return aa
        }
    });
    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers);
    let selectedAnswer = acceptableAnswers.filter(aa => userResponse == aa)

    if (selectedAnswer.length == 1) {
        return selectedAnswer[0];
    }
    else{
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
  }
  function waitListRequest(){
    const userInput= validatedPrompt(
      'This booking is filled, do you wish to be put on a wait list?',['yes','no']
    );
    switch(userInput){
      case 'yes':
        let form={
          time: time,
          date: date,
          table_size: +table_size,
          costumer_id: +user.id
        }
        postWaitList(form)
        getWaitList()
        let count=1
        for(let item of waitList){
          if(item.costumer_id==user.id){
            break
          }
          else{
            count++
          }
        }
        alert(`Your position in the wait list is ${count}`)
        break
      case 'no':
        break
      default:
        alert('Invalid input. Please try again.');
    }
  }
  // function addReservationFromWaitList(){
    
  //   console.log("fired")
  //   waitList.map((item)=>{{
  //     let rightSize = allTables.filter((el)=>{
  //       if(item.table_size == el.party_size){
  //         return true
  //       }
  //     })
  //     console.log("Right Size", rightSize)
  //     let notAvaiable = usedTables.filter((el)=> el.date==item.date &&el.time ==item.time).map((el)=>el.table_id)
  //     console.log("Not available", notAvaiable)
  //     let avaialble = rightSize.filter((el)=> {
  //       if(notAvaiable.includes(el.id)){
  //         return false
  //       }
  //       else{
  //         return true
  //       }
  //     })
  //     console.log(avaialble)
  //     if(avaialble.length>0){
  //       let form = {
  //         time: item.time,
  //         date: item.date,
  //         table_id:avaialble[0].id,
  //       };
  //       setTableId(avaialble[0].id);
  //       postUsedTable(form);
  //       console.log(item.id)
  //       deleteWaitList(item.id)
  //     }
  //   }})
  // }
  // addReservationFromWaitList()
  function logic() {
    getUnavailable()
    getAllTables()
    console.log(allTables)
    let rightSize = allTables.filter((el)=>{
      if(table_size == el.party_size){
        return true
      }
    })
    // the problem is here!
    console.log("!!!!!!!!!!!!!!!!")
    console.log(rightSize)
    console.log("Right Size", rightSize)
    let notAvaiable = usedTables.filter((el)=> el.date==date &&el.time ==time+":00").map((el)=>el.table_id)
    console.log("Not available", notAvaiable)
    let avaialble = rightSize.filter((el)=> {
      if(notAvaiable.includes(el.id)){
        return false
      }
      else{
        return true
      }
    })
   
    console.log("Hopfully",avaialble)
    if(avaialble.length==0){
      let form={
        time:time,
        date:date,
        table_size:table_size
      }
      // need to instead search through unavailable and if it is not already in there then add it else go to the wait list
      // need to figure out how to triger the logic in user reservations to fire 
      if(unavailable.length==0){
        postUnavailable(form)
        waitListRequest()
      }
      else{
        for(let item of unavailable){
          if((item.time==time)&&(item.date==date)&&(item.table_size==table_size)){
            waitListRequest()
            break
          }
          else{postUnavailable(form)}
        }
        waitListRequest()
      }
    }
    else{
      let form = {
        time: time,
        date: date,
        table_id:avaialble[0].id,
      };
      setTableId(avaialble[0].id);
      postUsedTable(form);
}
    }
    
  useEffect(() => {
    if(tableId){
        console.log("useEffect running")
        let reservationForm = {
        time: time,
        date: date,
        party_count: +table_size,
        costumer_id: +user.id,
        table_id: tableId,
      };
      addReservation(reservationForm);}
    console.log("useEffect ran!")
  }, [tableId]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <label>Table Size</label>
        <input
          type="integer"
          value={table_size}
          onChange={(event) => setTableSize(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary ">
          Make Reservation
        </button>
      </div>
    </form>
  );
};

export default AddReservation;

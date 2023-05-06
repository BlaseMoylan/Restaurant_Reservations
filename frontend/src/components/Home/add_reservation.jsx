import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const AddReservation = () => {
  // const [addReservation, setAddReservation]=useState([])
  // turn this into a custom useState when there is time

  const { user, token } = useContext(AuthContext);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [table_size, setTableSize] = useState("");
  const [tableId, setTableId] = useState(null);
  const [usedTables, setUsedTables] = useState([]);
  const [allTables, setAllTables] = useState([]);

  useEffect(() => {
    getUsedTables();
    getAllTables();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    logic();
    console.log(tableId);
    // addReservation(reservationForm);
  }

  async function addReservation(form) {
    try {
      let results = await axios.post(
        `http://127.0.0.1:5000/api/user_reservations`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (ex) {
      console.log("error in put");
    }
  }
  async function getUsedTables() {
    let results = await axios.get(`http://127.0.0.1:5000/api/used_tables`);
    console.log("this is it");
    console.log(results.data);
    setUsedTables(results.data);
  }
  async function postUsedTable(form) {
    let results = await axios.post(
      `http://127.0.0.1:5000/api/used_tables`,
      form
    );
    getUsedTables()
  }
  async function getAllTables() {
    let results = await axios.get(`http://127.0.0.1:5000/api/all_tables`);
    let tables = results.data;
    console.log(tables);
    setAllTables(tables);
    // get this on the backend side connected to an end point
  }
  function logic() {

    let rightSize = allTables.filter((el)=>{
      if(table_size == el.party_size){
        return true
      }
    })
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
    
    let form = {
              time: time,
              date: date,
              table_id:avaialble[0].id,
            };
            setTableId(avaialble[0].id);
            postUsedTable(form);
    }

    // let id;
    // let post=null
    // let count=0
    // for (let used of usedTables) {
    //   for (let item of allTables) {
    //       if ((item.party_size == table_size)&&(used.date==date)&&(allTables[used.table_id-1].party_size==table_size)) {
    //         console.log(used.table_id)
    //         console.log(item.id)
    //         console.log(item.party_size)
    //         console.log(used.time)
    //         console.log(time+":00")
    //         console.log(used.date)
    //         console.log(date)
    //         if (
    //           item.id !== used.table_id ||
    //           time+":00" !== used.time ||
    //           date !== used.date
    //         ) {
    //           post=true
    //           id=item.id 
    //           break
    //         }
    //         else{
    //           post=false
    //         } 
    //     }
    //   }
    //   if(post==true){
    //     break
    //   }
      
    // }
    // if(post==null){
    //   for(let i of allTables){
    //     if(i.party_size == table_size){
    //       id=i.id
    //       post=true
    //       break
    //     }
    //   }
    // } 
    // console.log("it is here")
    
    
      //     if(item.party_size==table_size){
      //         console.log('it is here 1')
      //         console.log(usedTables)
      //         if(usedTables.length>0){
      //             console.log('it is here 1.5')
      //             let used=usedTables.filter((used)=>{
      //                 console.log('it is here 17')
      //                 if(item.id!==used.table_id || time!==used.time || date!==used.date){
      //                     id=item.id
      //                     console.log(item)
      //                     console.log('it is here 2')
      //                     // setTableId(item.id)
      //                     let form={
      //                         time:time,
      //                         date:date,
      //                         table_id:item.id
      //                     }
      //                     postUsedTable(form)
      //                     return true
      //                 }
      //         })}
      //         else{
      //             id=item.id
      //             console.log("else 1")
      //             let form={
      //                 time:time,
      //                 date:date,
      //                 table_id:item.id
      //             }
      //             postUsedTable(form)
      //         }
      //         }
      //     })
      // console.log(id)
      // setTableId(id)
      // console.log("it is here3")
      // console.log(tableId) http://127.0.0.1:5000/api/all_tables`);
    // let tables = results.data;/api/table_set_up
    
  


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

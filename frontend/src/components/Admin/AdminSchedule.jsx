// import React, { useState } from 'react';
// const Schedule = ({user,auth}) => {
//     return (  
//         <div></div>
//     );
// }
 
// export default Schedule;
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState } from 'react'
import axios from 'axios'
export default class Schedule extends React.Component {
    render() {
        let bookings=[]
        async function getReservations(){
            let results=await axios.get(`http://127.0.0.1:5000/api/all_reservations`)
            console.log(results.data)
            let ans=results.data
            let booking=ans.map((item)=>{
                let temp={title:`booked ${item.time}`,date:item.date}
                bookings.push(temp)
                return true
            })
        // for(let reservation in ans){
        //     console.log("it is here")
        //     console.log(reservation)
        //     let temp={title:`booked ${reservation.time}`,date:reservation.date}
        //     bookings.push(temp)
        // }
        console.log(bookings)
      }
      getReservations()
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={bookings}
      />
    )
  }
}
// export default class Schedule extends React.Component {
//     render() {
//       const [reservations,setReservations] = useState([])
//       const [display,setDisplay] = useState([])
//       async function getReservations(){
//         let results=await axios.get(`http://127.0.0.1:5000/api/all_reservations`)
//         setReservations(results.data)
//       }
//       function displayReservations(){
//         let bookings=[]
//         for(let reservation in reservations){
//             let temp={title:`booked ${reservation.time}`,date:reservation.date}
//             bookings.add(temp)
//         }
//         setDisplay(bookings)
//       }
//     return (
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridMonth"
//         events={display}
//       />
//     )
//   }
// }
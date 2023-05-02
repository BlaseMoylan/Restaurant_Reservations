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

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={[
          {title:"booked 5:00 pm",date:'2023-04-28',time:'20:00 pm'}
        ]}
      />
    )
  }
}
import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import axios from "axios";
export default class AvailableTimesCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bookings: [],
        };
      }
      updateEvents = async () => {
        let results = await axios.get(`http://127.0.0.1:5000/api/all_reservations`);
        this.setState({ bookings: results.data.map((item)=> ({title: `booked ${item.time}`,date:item.date})) });
      };
      scheduleHours =async()=>{
        let results=await axios.get(`http://127.0.0.1:5000/api/set_schedule`)
        let hours=results.data.map((item)=>(this.setState({bookings:[...this.state.bookings,{title: `open from ${item.opening} to ${item.closing}`,daysOfWeek:[item.id]}]})))
        
        console.log(this.state.bookings)
      }
      componentDidMount(){
        this.updateEvents();
        this.scheduleHours();
      }
  render() {
    return (
      <FullCalendar
      plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={this.state.bookings}
      />
    );
  }
}

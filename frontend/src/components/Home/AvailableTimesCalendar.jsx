import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import axios from "axios";
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }
  updateEvents = async () => {
    let results = await axios.get(`http://127.0.0.1:5000/api/unavailable`)
    // this.setState({ bookings: results.data.map((item)=> ({title: `unavailable ${item.time} for party size ${item.table_size}`,date:item.date})) });
    let data=results.data
    console.log(data)
    let hours=data.map((item)=>(this.setState({bookings:[...this.state.bookings,{title: `unavailable ${item.time} for size ${item.table_size}`,date:item.date}]})))
  };
  scheduleHours =async()=>{
    let results=await axios.get(`http://127.0.0.1:5000/api/set_schedule`)
    let hours=results.data.map((item)=>(this.setState({bookings:[...this.state.bookings,{title: `open from ${item.opening} to ${item.closing}`,daysOfWeek:[item.id]}]})))
    
    console.log(this.state.bookings)
  }
  componentDidMount(){
    this.scheduleHours();
    this.updateEvents();
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
import React, { useState,useEffect } from 'react';
import axios from 'axios';
const SetTable = ({user,auth}) => {
    const [tableSetUp,setTableSetUp]=useState([])
    const [table_size,setTableSize]= useState(0)
    const [numOfTables,setNumOfTables]= useState(0)
    const [day,setDay]=useState("")
    const [opening,setOpening]=useState("")
    const [closing,setClosing]=useState("")

    // will need a useEffect to get it to show on first run through
    async function getTableSetUp(){
        let results=await axios.get('http://35.87.21.157:5000/api/table_set_up')
        setTableSetUp(results.data)
    }
    useEffect(() => {
        getTableSetUp()
    }, []);


    function handleSubmit(event){
        
        event.preventDefault()
        let form={
            table_size:table_size,
            num_of_tables:numOfTables
        }
        postTableSetUp(form)
    }

    function handleSubmit2(event){
        event.preventDefault()
        let form={
            day:day,
            opening:opening,
            closing:closing
        }
        postSchedule(form)
    }

    async function postTableSetUp(form){
        // console.log("it is here")
        // let is_true=false
        // if(tableSetUp!==[]){
        //     for(let item in tableSetUp){
        //         console.log(item.table_size)
        //         console.log(data.table_size)
        //         if(item.table_size!==data.table_size){
        //             is_true=true    
        //         }
        //     }
        //     if(is_true==true){
        //         let results=await axios.post(`http://127.0.0.1:5000/api/table_set_up,${data}`)
        //     }
        // }
        // else{
        let results=await axios.post(`http://35.87.21.157:5000/api/table_set_up`,form)
        getTableSetUp()
        postTables(form)
        
        // }
    }

    async function postSchedule(form){
        let results=await axios.post(`http://35.87.21.157:5000/api/set_schedule`,form)
    }

    async function postTables(form){
        for(let i=0;i<form.num_of_tables;i++){
            let data={party_size:form.table_size}
            let results= await axios.post(`http://35.87.21.157:5000/api/all_tables`,data)
        }
    }
    return ( 
        <div>
            
            <table>
                
                <thead>
                    <tr>
                        <th>Table Size</th>
                        <th>number Of Tables</th>
                    </tr>
                </thead>
                <tbody>
                    {tableSetUp.map((type,index)=>{
                        return(
                            <tr>
                                <td>{type.table_size}</td>
                                <td>{type.num_of_tables}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form onSubmit={handleSubmit2}>
                    <div>
                        <lable>day</lable>
                        <input type="string" value={day} onChange={(event)=>setDay(event.target.value)}/>
                    </div>
                    <div>
                        <label>opening hours</label>
                        <input type="time" value={opening} onChange={(event)=>setOpening(event.target.value)}/>
                    </div>
                    <div>
                        <label>closing hours</label>
                        <input type="time" value={closing} onChange={(event)=>setClosing(event.target.value)}/>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary ">set schedule</button>
                </div>
            </form>
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>Table Size</lable>
                    <input type="integer" value={table_size} onChange={(event)=>setTableSize(event.target.value)}/>
                </div>
                <div>
                    <label>Number Of Tables</label>
                    <input type="integer" value={numOfTables} onChange={(event)=>setNumOfTables(event.target.value)}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary ">Add Table SetUp</button>
                </div>
            </form>
        </div>
    );
}
 
export default SetTable;
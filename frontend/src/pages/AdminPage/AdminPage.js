
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Schedule from "../../components/Admin/AdminSchedule";
import SetTable from "../../components/Admin/SetTable";
import axios from "axios";
import { UNSAFE_RouteContext } from "react-router-dom";
const AdminPage = () => {
    
    const [user, token] = useAuth();
    const auth= "Bearer " + token
    console.log(auth)
    
    
    return ( 
        <main>
            <Schedule user={user} auth={auth}/>
            <SetTable user={user} auth={auth}/>
        </main>
    );
}
 
export default AdminPage;
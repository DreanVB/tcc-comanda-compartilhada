import React, { useState, useEffect } from "react";
import AdmPage from "./AdmPage";
import './RestauranteList.css'

function RestauranteList(user) {
    console.log(user)
    console.log(user.token)
    console.log(user.user.id)
    const [Rest, setRest] = useState([]);


    return (
        <div className="rest">
          {user.user.id == 1 && <AdmPage user={user} />}
        </div>
      
    );
}

export default RestauranteList;
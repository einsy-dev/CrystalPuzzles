import React from "react"
import Checkin_header from "./components/Checkin_header"
import Login_main from "./components/Login_main"

function Login_page() {
    return(
        <div className="login_page_methodist">
            <Checkin_header/>
            <Login_main/>
        </div>
    )
}

export default Login_page
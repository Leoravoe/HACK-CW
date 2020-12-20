import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './Email.css'
import axios from "axios";
import Axios from 'axios';
const Email = () => {
    const [email, updateEmail] = useState("");
    const [validation, updateValidation] = useState(false);
    const emailpost = async (e) => {
        e.preventDefault()
        await Axios.post("http://localhost:5000/teacher/student/sendmail", {
            email: email
        }).then(res => updateValidation(true))
            .catch(err => console.log(err))
    }

    if (validation) {
        return <Redirect to="/TeacherDashboard" ></Redirect>
    }
    return (



        <div className="emailpost">
            <form className="emailpost2-info container" onSubmit={emailpost}>

                <div className="form-group ">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => updateEmail(e.target.value)} />

                </div>
                <div className="form-group">

                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Message" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a href="/TeacherDashboard" className="btn btn-danger">Cancel </a>
            </form>
        </div>
    )
}

export default Email

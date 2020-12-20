import Axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Loader from '../Loader/loader'
import './TeacherDashboard.css'
const TeacherDashboard = () => {
    const [pdf, updatepdf] = useState([]);
    const [TeacherID, updateTeacherID] = useState(null);
    const [pdf1, updatepdf1] = useState(null);
    const [pdf2, updatepdf2] = useState(null);
    const [summary, updateSummary] = useState(null);
    const [pdfValid, updatePdfValid] = useState(false);
    const [similar, updateSimilar] = useState(null);
    const [StudentId, updateStudentId] = useState(null);
    const [Marks, updateMarks] = useState(null);
    const [subject, updateSubject] = useState(null);
    const requestPDF = async () => {
        await Axios.get(`http://localhost:5000/teacher/${localStorage.getItem('userID')}`)
            .then(res => updatepdf(res.data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        updateTeacherID(localStorage.getItem('userID'))
        requestPDF()
    }, [])

    let Component = (
        pdf.map(data => {
            return (
                <div key={data.pdfID} className="card">
                    <div className="card-body">
                        {data.name} {data.subject}
                    </div>
                    <a href={`http://localhost:5000/teacher/student/${data.pdffilename}`} target="_blank">PDF</a>
                </div>
            )
        })
    )
    const model = async (e) => {
        e.preventDefault()
        updatePdfValid(false);
        const formData = new FormData()
        formData.append('file', pdf1)
        await Axios.post("https://push-that-code.herokuapp.com/summary", formData)
            .then(res => { return (updateSummary(res.data.summary_text), updatePdfValid(true)) })
            .catch(err => console.log(err))
    }

    const model2 = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file1', pdf1)
        formData.append('file2', pdf2)
        await Axios.post("https://push-that-code.herokuapp.com/plagarism", formData)
            .then(res => updateSimilar(res.data.similar))
            .catch(err => console.log(err))
    }

    const marksPost = async (e) => {
        e.preventDefault()
        await Axios.post("http://localhost:5000/teacher/student/score", {
            "score": Marks,
            "subject": subject,
            "teacherID": localStorage.getItem("userID"),
            "studentID": StudentId,
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            {/* This section is for NAVBAR */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand medico" href="#">Ed-o-Matic</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sign in
              </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/loginStudent">As a student</a>
                                <a className="dropdown-item" href="/loginTeacher">As a teacher</a>
                                <div className="dropdown-divider"></div>

                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sign up
              </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/signupStudent">As a student</a>
                                <a className="dropdown-item" href="/signupTeacher">As a teacher</a>
                                <div className="dropdown-divider"></div>

                            </div>
                        </li>

                    </ul>

                </div>
            </nav>

            {/* END */}


            <section className="colored-section">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card ml-5 detail">
                            <div className="card-body">
                                <h5 className="card-title fas fa-id-card"> {localStorage.getItem('userID')}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card ml-5 detail">
                            <div className="card-body">
                                <h5 className="card-title fas fa-signature"> {localStorage.getItem('name')}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card ml-5 detail">
                            <div className="card-body">
                                <h5 className="card-title fas fa-chalkboard-teacher"> {localStorage.getItem('class')}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="container">


                <div className="submission">


                    <div className="card mt-5 w-50 card1 student-pdf">

                        <div className="card-body text-center">
                            <h3 className="heading">Student's Pdf</h3>

                        </div>

                        <div className="card-body mx-auto">

                            {Component}
                        </div>
                    </div>

                    <div className="card mt-5 w-50 card1" >

                        <div className="card-body text-center">
                            <h3 className="heading">Marks</h3>
                            <p className="card-text"></p>
                        </div>

                        <form className="card-body mx-auto" onSubmit={marksPost}>
                            <label className="marks">Marks: </label>
                            <input type="text" name="marks" placeholder="Enter Marks" onChange={(e) => updateMarks(e.target.value)} /><br />
                            <label>Student id: </label>
                            <input type="text" name="stu_id" placeholder="Enter Student Id" onChange={(e) => updateStudentId(e.target.value)} /><br />
                            <label>Subject </label>
                            <input type="text" name="stu_id" placeholder="Subject" onChange={(e) => updateSubject(e.target.value)} /><br />
                            <input className=" btn btn-success" type="submit" ></input>
                            <a className="btn btn-danger" href='/email'>Send Email</a>

                        </form>
                    </div>
                </div>

            </section>

            {/* this section is for pdf uploads */}

            <form onSubmit={model2} >
                <section className="upload">
                    <div className="upload-card">
                        <input type="file" name="file" onChange={(e) => updatepdf1(e.target.files[0])} />
                    </div>
                    <div className="upload-card2">
                        <input type="file" name="file" onChange={(e) => updatepdf2(e.target.files[0])} />
                    </div>
                    <br />
                    <button type='submit' className="btn btn-primary plagiarism" > Plagiarism</button>
                </section>
            </form>
            <form onSubmit={model}>
                <button type='submit' className="btn btn-primary" > Summary</button>
            </form>
            <p className='similar-output'>Similarity Score: {similar}</p>
            {/* END */}

            {/* This section is for pdf summary */}
            <div className="container">
                <h3 className="heading head">Summary</h3>
                <div className=" w-100 border border-dark  summary">
                    {!pdfValid ? <Loader /> : <p>{summary}</p>}
                </div>
                <br />
                <br />
                <br />
            </div>
            {/* END */}


        </div>
    )
}
export default TeacherDashboard;
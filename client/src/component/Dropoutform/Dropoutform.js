import React, { useState } from 'react'
import Axios from 'axios'
import './Dropoutform.css';

const Dropoutform = () => {
    const [gender, updateGender] = useState('null');
    const [cast, updateCaste] = useState('null');
    const [disabled, updateDisabled] = useState('null');
    const [att, updateAtt] = useState('null');
    const [marks1, updateMarks1] = useState("");
    const [marks2, updateMarks2] = useState("");
    const [marks3, updateMarks3] = useState("");
    const [marks4, updateMarks4] = useState("");
    const [marks5, updateMarks5] = useState("");
    let store = "";

    const post = async (e) => {
        e.preventDefault();
        store = store.concat(marks1);
        store = store.concat(" ");
        store = store.concat(marks2);
        store = store.concat(" ");
        store = store.concat(marks3);
        store = store.concat(" ");
        store = store.concat(marks4);
        store = store.concat(" ");
        store = store.concat(marks5);
        console.log(store);
        const formdata = new FormData()
        formdata.append('gender', gender)
        formdata.append('cast', cast)
        formdata.append('disabled', disabled)
        formdata.append('att', att)
        formdata.append('marks', store)
        await Axios.post('https://push-that-code.herokuapp.com/dropout', formdata)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div className="dropout-info">
            <form onSubmit={post}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Gender</label>
                    <input
                        type="text" class="form-control"
                        id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="1 for Male 0 for Female"
                        onChange={(e) => updateGender(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Cast</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="1 For general 0 For cast"
                        onChange={(e) => updateCaste(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">disabled</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="1 For Yes 0 For No"
                        onChange={(e) => updateDisabled(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Attendance</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Rate out of 3"
                        onChange={(e) => updateAtt(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Marks1:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Marks1"
                        onChange={(e) => updateMarks1(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Marks2:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Marks2"
                        onChange={(e) => updateMarks2(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Marks3:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Marks3"
                        onChange={(e) => updateMarks3(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Marks4:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Marks4"
                        onChange={(e) => updateMarks4(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Marks5:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"
                        placeholder="Marks5"
                        onChange={(e) => updateMarks5(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Dropoutform;

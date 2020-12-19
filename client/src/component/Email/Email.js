import React, { useState } from 'react'
import './Email.css'
import axios from "axios";
import Axios from 'axios';
const Email = () => {
    const [email, updateEmail] = useState("");
    const emailpost = async (e) => {
        e.preventDefault()
        await Axios.post("http://localhost:5000/teacher/student/sendmail", {
            email: email
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (

        <main>
            <figure>
                <picture>
                    <source media="(min-width: 768px)"
                        srcset="//my-assets.netlify.com/codepen/dailyui-001/img.png     340w,
                          //my-assets.netlify.com/codepen/dailyui-001/img@2x.png  680w,
                          //my-assets.netlify.com/codepen/dailyui-001/img@3x.png 1020w"
                        sizes="360px" />
                    <source srcset="//my-assets.netlify.com/codepen/dailyui-001/img-small.png     340w,
                          //my-assets.netlify.com/codepen/dailyui-001/img-small@2x.png  680w,
                          //my-assets.netlify.com/codepen/dailyui-001/img-small@3x.png 1020w"
                        sizes="(min-width: 320px) 290px,
                          (min-width: 480px) 435px
                          (min-width: 640px) 580px" />
                    <img src="//my-assets.netlify.com/codepen/dailyui-001/img.png"
                        alt="Citymap illustration" />
                </picture>
            </figure>
            <div className="headline">
                <h2 className="text-headline">Ed-o-Matic</h2>
                <h2 className="text-subheadline">The Notifier</h2>
            </div>
            <form onSubmit={emailpost}>
                <span>
                    <label for="email" className="text-small-uppercase">Email</label>
                    <input className="text-body" id="email" name="email" type="email" required onChange={(e) => updateEmail(e.target.value)} />
                </span>
                <span>
                    <label for="email" className="text-small-uppercase">Message</label>
                    <input className="text-body" id="email" name="email" type="text" required />
                </span>

                <input className="text-small-uppercase" id="submit" type="submit" value="Send Email" />
            </form>
        </main>
    )
}

export default Email

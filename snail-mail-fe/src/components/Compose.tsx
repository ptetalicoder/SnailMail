
//Takes 2 Values:
    //1) The function that closes this component

import { useState } from "react"

    //TODO: 2) [We'll talk about this when we talk about Cypress]
interface Props {
    onClose: () => void
}

//Redefining the Mail Interface - We can reduce rewrites of this if we made a global Interface file instead
interface Mail {
    sender: string
    recipient: string
    subject: string
    body: string
}

//Props stands for "properties" - the object of properties passed into the component
export const Compose:React.FC<Props> = ({onClose}) => {

    //useState for the mail object - as the inputs in Compose change, this object will be filled with values
    const [mailToSend, setMailToSend] = useState<Mail>({
        sender: "me@snailmail.com",
        recipient: "",
        subject: "",
        body: ""
    })

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        //Storing the name and value attributes from the changed element for ease of use
        const name = event.target.name //name is an attribute we set in the inputs
        const value = event.target.value //value is whatever value is in the input box

        //"Take whatever input was changed, and set the matching state field to the value of the input"
        setMailToSend((mailToSend) => ({...mailToSend, [name]:value}))

        console.log(mailToSend)
    }

    const sendEmail = async () => {

        //TODO: send email (POST request)

        alert("Sent Mail!")

        onClose() //close the component after sending mail

    }

    return(
        <div className="card shadow position-absolute bottom-0 end-0 m-5 ">

            <h6 className="border-bottom position-absolute top-0 start-0 m-2">Compose Email</h6>
            <button onClick={onClose} className="btn-close position-absolute top-0 end-0 m-1"></button>

            <div>
                <input className="form-control border-bottom border-0 shadow-none" placeholder="recipient" name="recipient" onChange={handleInputChange}/>
            </div>

            <div>
                <input className="form-control border-bottom border-0 shadow-none" placeholder="subject" name="subject" onChange={handleInputChange}/>
            </div>

            <div className="card-body">
                <textarea name="body" className="form-control border-0 shadow-none" rows={6} onChange={handleInputChange}></textarea>
            </div>

            <button className="btn btn-sm btn-outline-primary d-block mx-auto" onClick={sendEmail}>Send</button>

        </div>
    )

}
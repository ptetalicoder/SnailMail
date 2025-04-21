//This is our first custom Component
//Components contain logic AND view in the same file
//It's like we merged an HTML file with the JS file that gives it functionality

import { useEffect, useState } from "react"

//Interfaces in React/TS help us model data. It's like making a custom datatype
interface Mail {
    sender: string
    recipient: string
    subject: string
    body: string
}

export const Inbox:React.FC = () => {

    //Logic goes up here (written in TypeScript)

    /*Store a Mail[] in a useState hook
    useState is good for storing data, like a variable
    in a component it's preferred over a variable because it will RE RENDER the component when its value changes */
    const [inbox, setInbox] = useState<Mail[]>([])
    /* useState anatomy:
        -the variable that stores our data (inbox)
        -the mutator function that lets us change the data (setInbox) 
        -the actual useState hook which initializes all of this
        -<the datatype of the variable>
        -(the initial value of the variable)
    */

    
    //useEffect is a hook we can use to invoke functionality at certain events
    //It's commonly used to make things happen as soon as the component renders
    useEffect(() => {
        //Let's populate the inbox as soon as the component renders
        getInbox()
    }, []) //[] to make the useEffect run once the component renders


    //Function that gathers our inbox (Will be a real HTTP request in a bit)
    const getInbox = () => {

        //For now, we'll just define a couple fake mail objects 
        const fakeInbox = [
            {
                sender:"guy@snailmail.com",
                recipient:"me@snailmail.com",
                subject:"I luv React",
                body:"React is a library for Single Page Applications"
            },
            {
                sender:"guy@snailmail.com",
                recipient:"me@snailmail.com",
                subject:"I luv Components",
                body:"Components are reuseable files that store a view with its logic"
            },
            {
                sender:"guy@snailmail.com",
                recipient:"me@snailmail.com",
                subject:"I luv hooks",
                body:"React has entities called 'hooks' that help us do common things in components"
            }
        ]

        //Use the mutator (setInbox) to set this data to our "inbox" state variable
        setInbox(fakeInbox)

    }

    //View goes down here - rememeber return() needs a wrapper element (we used a div) 
    return(
        <div>

            <h3>Inbox</h3>

            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Sender</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {/*For every email in the inbox, render a new table row with its data */}
                    {inbox.map((mail)=>(
                        <tr>
                            <td>{mail.subject}</td>
                            <td>{mail.sender}</td>
                            <td>{mail.body}</td>
                        </tr>
                    ))}
                    {/* Why () intead of {} for the arrow function? this lets us implicitly return the view, otherwise we'd have to define it with a return() */}
                </tbody>
            </table>

        </div>
    )

}

//Takes 2 Values:
    //1) The function that closes this component
    //TODO: 2) [We'll talk about this when we talk about Cypress]
interface Props {
    onClose: () => void
}

//Props stands for "properties" - the object of properties passed into the component
export const Compose:React.FC<Props> = ({onClose}) => {




    return(
        <div className="card shadow position-absolute bottom-0 end-0 m-5 ">

            <h6 className="border-bottom position-absolute top-0 start-0 m-2">Compose Email</h6>
            <button onClick={onClose} className="btn-close position-absolute top-0 end-0 m-1"></button>

            <div>
                <input className="form-control border-bottom border-0 shadow-none" placeholder="recipient" name="recipient"/>
            </div>

            <div>
                <input className="form-control border-bottom border-0 shadow-none" placeholder="subject" name="subject"/>
            </div>

            <div className="card-body">
                <textarea name="body" className="form-control border-0 shadow-none" rows={6}></textarea>
            </div>

        </div>
    )

}
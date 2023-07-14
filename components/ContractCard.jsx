import React from "react"
import Link from 'next/link'


function ContractCard(props) {
    const handleClick = () => {
        var result = confirm("Want to delete?")
        if (result==true) {
            props.onDelete(props.id)
            return true
        } else {
            return false
        }
    }


    return (
        <div className="card col-sm-6 col-md-4 col-xl-3 text-center mx-2 mb-3">
            <div className="card-body">
                <h5 className="card-title">{props.machineName}</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Id: {props.id.substring(0,6)}...</li>
                    <li className="list-group-item">One-Time Fee: {props.oneTimeFee}</li>
                    <li className="list-group-item">Usage Fee: {props.usageFee}</li>
                </ul>
                <Link href="/[id]/edit" as={`/${props.id}/edit`} legacyBehavior>
                    <button className="btn btn-primary mx-2">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={handleClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ContractCard

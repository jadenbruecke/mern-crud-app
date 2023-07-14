import React from "react"
import Link from 'next/link'


function ContractCard(props) {
    const handleClick = () => {
        props.onDelete(props.id)
    }

    return (
        <div className="card col-sm-6 col-md-4 col-xl-3 text-center mx-2 mb-3">
            <div className="card-body">
                <h5 className="card-title">Contract Id: {props.id}</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Machine Name: {props.machineName}</li>
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

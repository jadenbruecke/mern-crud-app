import React from "react"
import Link from 'next/link'


function SectionCard(props) {
  return (
    <div className="col-sm-6 col-lg-3 text-center mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}.</p>
          <Link href={props.destUrl} className="btn btn-primary">Enter</Link>
        </div>
      </div>
    </div>
  )
}

export default SectionCard
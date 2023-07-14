import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '@/lib/dbConnect'
import ContractModel from '@/model/ContractModel'


const ContractPage = ({ contract }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const contractID = router.query.id

    try {
      await fetch(`/api/contracts/${contractID}`, {
        method: 'DELETE',
      })
      router.push('/contracts')
    } catch (error) {
      setMessage('Failed to delete the contract.')
    }
  }

  return (
    <div className="row justify-content-center">
      <div key={contract._id} className="card col-sm-6 col-md-4 col-xl-3 text-center mx-2 mb-3">
        <div className="card-body">
          <h5 className="card-title">Contract Id: {contract._id}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Machine Name: {contract.machineName}</li>
            <li className="list-group-item">One-Time Fee: {contract.oneTimeFee}</li>
            <li className="list-group-item">Usage Fee: {contract.usageFee}</li>
          </ul>
          <Link href="/[id]/edit" as={`/${contract._id}/edit`} legacyBehavior>
            <button className="btn btn-primary mx-2">Edit</button>
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
        {message ? null : <p>{message}</p>}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const contract = await ContractModel.findById(params.id).lean()
  contract._id = contract._id.toString()

  return { props: { contract } }
}

export default ContractPage

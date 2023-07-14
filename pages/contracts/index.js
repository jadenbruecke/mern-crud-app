import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dbConnect from '@/lib/dbConnect'
import ContractCard from '@/components/ContractCard'
import ContractModel from '@/model/ContractModel'
import Link from 'next/link'


const ContractsIndex = ({ contracts }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async (idForDeletion) => {

    console.log("Deleting " + idForDeletion)

    try {
      await fetch(`/api/contracts/${idForDeletion}`, {
        method: 'DELETE',
      })
      router.push('/contracts')
    } catch (error) {
      setMessage('Failed to delete the contract.')
    }
  }

  return (
    <>
      <div className="card text-center mb-3">
        <div className="card-body">
          <h5 className="card-title">Contract collections</h5>
          <p className="card-text">Click the button to add a new contract.</p>
          <Link href="/contracts/new" className="btn btn-primary">Add Contract</Link>
        </div>
      </div>

      <div className="row justify-content-center mx-2">
        {contracts.map((contract) => (
          <ContractCard
            key={contract._id}
            id={contract._id}
            machineName={contract.machineName}
            oneTimeFee={contract.oneTimeFee}
            usageFee={contract.usageFee}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await ContractModel.find({})
  const contracts = result.map((doc) => {
    const contract = doc.toObject()
    contract._id = contract._id.toString()
    return contract
  })

  return { props: { contracts: contracts } }
}

export default ContractsIndex

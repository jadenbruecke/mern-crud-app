import { useState } from 'react'
import dbConnect from '@/lib/dbConnect'
import ContractModel from '@/model/ContractModel'


const UsageIndex = ({ contracts }) => {
  const [usage, setUsage] = useState({
    oneTimeFee: 0,
    usageFee: 0,
    usageAmount: 0
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log("Target name: " + name, "Target value: " + value)
    if (name === "selectedContract") {
      if (value === 'DEFAULT') {
        setUsage({
          oneTimeFee: 0,
          usageFee: 0,
          usageAmount: 0
        })
      } else {
        const filteredContract = contracts.filter((contract) => (value === contract._id))[0]
        /* Tracking filtered contract */
        console.log(filteredContract)
        setUsage((prevValue) => ({
          oneTimeFee: filteredContract.oneTimeFee,
          usageFee: filteredContract.usageFee,
          usageAmount: prevValue.usageAmount
        }))
      }
    } else if (name === "changedAmount") {
      setUsage((prevValue) => ({
        oneTimeFee: prevValue.oneTimeFee,
        usageFee: prevValue.usageFee,
        usageAmount: !value || value < 0 ? 0 : Math.round(value)
      }))
    }
  }

  return (
    <div>
      <div className='row justify-content-center mx-2'>
        <div className="col-sm-6 col-lg-4 text-center">
          <div className="mb-3">
            <label>Machine Name</label>
            <select
              onChange={handleChange}
              className="form-select"
              aria-label="Default select example"
              name="selectedContract"
              defaultValue={'DEFAULT'}
            >
              <option value='DEFAULT'>Open this select menu</option>
              {contracts.map((contract) => (
                <option key={contract._id} value={contract._id}>
                  {contract.machineName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>One-Time Fee</label>
            <input
              className="form-control"
              type="number"
              value={usage.oneTimeFee}
              aria-label="Disabled input example"
              disabled readOnly />
          </div>

          <div className="mb-3">
            <label>Usage Fee</label>
            <input
              className="form-control"
              type="number"
              value={usage.usageFee}
              aria-label="Disabled input example"
              disabled readOnly
            />
          </div>

          <div className="mb-3">
            <label>Usage Amount</label>
            <input
              type="number"
              min="0"
              step="1"
              value={usage.usageAmount}
              name="changedAmount"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contract Price</label>
            <input
              type="number"
              value={Math.round((usage.oneTimeFee + usage.usageFee * usage.usageAmount)*100)/100}
              name="contractPrice"
              className="form-control"
              aria-label="Disabled input example"
              disabled readOnly
            />
          </div>

        </div>
      </div>
    </div>
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

export default UsageIndex

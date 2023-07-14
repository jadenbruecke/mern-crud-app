import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, contractForm, forNewContract = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    machineName: contractForm.machineName,
    oneTimeFee: contractForm.oneTimeFee,
    usageFee: contractForm.usageFee,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/contracts/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/contracts/${id}`, data, false) // Update the local data without a revalidation
      router.push('/contracts')
    } catch (error) {
      setMessage('Failed to update contract')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/contracts')
    } catch (error) {
      setMessage('Failed to add contract')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = (target.name !== 'machineName') ? (Math.floor(target.value*100)/100) : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure contract info is filled for contract name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.machineName) err.machineName = 'Machine name is required'
    if (form.oneTimeFee === '') err.oneTimeFee = 'One-time fee is required'
    if (form.oneTimeFee < 0) err.oneTimeFee = 'One-time fee is lower than 0'
    if (form.usageFee === '') err.usageFee = 'Usage fee is required'
    if (form.usageFee < 0) err.usageFee = 'Usage fee is lower than 0'
    console.log(err)
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewContract ? postData(form) : putData(form)
    } else {
      setErrors(errs)
    }
  }

  return (
    <>
      <div className="row justify-content-center mx-2">
        <form id={formId} onSubmit={handleSubmit} className="col-sm-6 col-lg-4 text-center">
          <div className="mb-3">
            <label htmlFor="machineName">Machine Name</label>
            <input
              type="text"
              maxLength="60"
              name="machineName"
              className="form-control"
              value={form.machineName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="oneTimeFee">One-Time Fee</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="oneTimeFee"
              className="form-control"
              value={form.oneTimeFee}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="usageFee">Usage Fee</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="usageFee"
              className="form-control"
              value={form.usageFee}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p>{message}</p>
      </div>

      {
        Object.keys(errors).length === 0 ? null :
          <div className="alert alert-danger alert-dismissible fade show">
            <strong>Error!</strong> A problem has been occurred while submitting your data.
            <button type="button" className="btn-close" databsdismiss="alert"></button>
          </div>
      }

      <div>
        <ul>
          {!errors.machineName ? null : <li>{errors.machineName}</li>}
          {!errors.oneTimeFee ? null : <li>{errors.oneTimeFee}</li>}
          {!errors.usageFee ? null : <li>{errors.usageFee}</li>}
        </ul>
      </div>
    </>
  )
}

export default Form

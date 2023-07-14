import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '@/components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditContract = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: contract,
    error,
    isLoading,
  } = useSWR(id ? `/api/contracts/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!contract) return null

  const contractForm = {
    machineName: contract.machineName,
    oneTimeFee: contract.oneTimeFee,
    usageFee: contract.usageFee,
  }

  return <Form formId="edit-contract-form" contractForm={contractForm} forNewContract={false} />
}

export default EditContract

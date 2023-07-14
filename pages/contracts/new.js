import Form from "@/components/Form"

const NewContract = () => {
  const contractForm = {
    machineName: '',
    oneTimeFee: '',
    usageFee: '',
  }

  return <Form formId="add-contract-form" contractForm={contractForm} />
}

export default NewContract

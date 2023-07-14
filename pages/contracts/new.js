import Form from "@/components/Form"

const NewContract = () => {
  const contractForm = {
    machineName: '',
    oneTimeFee: 0,
    usageFee: 0,
  }

  return <Form formId="add-contract-form" contractForm={contractForm} />
}

export default NewContract

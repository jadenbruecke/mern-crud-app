import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
  machineName: {
    /* The name of the machine */
    type: String,
    unique: true,
    required: [true, 'Please provide a name for the machine.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  oneTimeFee: {
    /* The amount of one-time fee */
    type: Number,
    required: [true, 'Please enter one-time fee.'],
    min: [0, 'Value should be higher than 0']
  },
  usageFee: {
    /* The amount of usage fee */
    type: Number,
    required: [true, 'Please enter usage fee.'],
    min: [0, 'Value should be higher than 0']
  }
})

export default mongoose.models.ContractModel || mongoose.model('ContractModel', contractSchema)

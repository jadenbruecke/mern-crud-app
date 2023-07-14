import dbConnect from '@/lib/dbConnect'
import ContractModel from '@/model/ContractModel'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    /* Get all models */
    case 'GET':
      try {
        const contracts = await ContractModel.find({})
        res.status(200).json({ success: true, data: contracts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    /* Create a model */
    case 'POST':
      try {
        const contract = await ContractModel.create(
          req.body
        )
        res.status(201).json({ success: true, data: contract })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

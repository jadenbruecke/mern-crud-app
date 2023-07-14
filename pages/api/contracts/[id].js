import dbConnect from '@/lib/dbConnect'
import ContractModel from '@/model/ContractModel'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        /* Get a model by its ID */
        case 'GET':
            try {
            const pet = await ContractModel.findById(id)
            if (!pet) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: pet })
            } catch (error) {
            res.status(400).json({ success: false })
            }
            break
    
        /* Edit a model by its ID */
        case 'PUT' :
            try {
            const pet = await ContractModel.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })
            if (!pet) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: pet })
            } catch (error) {
            res.status(400).json({ success: false })
            }
            break
    
        /* Delete a model by its ID */
        case 'DELETE' :
            try {
            const deletedContract = await ContractModel.deleteOne({ _id: id })
            if (!deletedContract) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: {} })
            } catch (error) {
            res.status(400).json({ success: false })
            }
            break
    
        default:
            res.status(400).json({ success: false })
            break
    }
}

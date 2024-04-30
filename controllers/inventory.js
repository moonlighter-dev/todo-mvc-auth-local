const Inventory = require('../models/Inventory')

module.exports = {
    getInventory: async (req,res)=>{
        console.log(req.user)
        try{
            const allItems = await Inventory.find({})
            
            res.json(allItems)
        }catch(err){
            console.log(err)
        }
    },
    getItem: async (req,res)=>{
        console.log(req.user)
        try{
            const item = await Inventory.find({ scan: req.scan })
            
            res.json(item)
        }catch(err){
            console.log(err)
        }
    },
    addItem: async (req, res)=>{
        try{
            const item = await Inventory.create({ 
                scan: req.body.scan,
                description: req.body.description,
                brand: req.body.brand,
                number: req.body.number,
                qty: req.body.qty,
            })
            console.log('Item has been added!')
            res.json(item)
        }catch(err){
            console.log(err)
        }
    },
    updateItem: async (req, res)=>{
        const update = req.body
        try{
            const item = await Inventory.findOneAndUpdate({ scan: req.body.itemScan }, update)
            console.log('Item updated')
            res.json(item)
        }catch(err){
            console.log(err)
        }
    },
    deleteItem: async (req, res)=>{
        console.log(req.body.itemScan)
        try{
            await Inventory.findOneAndDelete({ scan: req.body.itemScan })
            console.log('Deleted Item')
            res.json({ msg: 'Deleted Item' })
        }catch(err){
            console.log(err)
        }
    }
}    
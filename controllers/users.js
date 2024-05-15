const User = require('../models/User')
const Reservation = require('../models/Reservation')

module.exports = {
    getUsers: async (req,res)=>{
        console.log("Welcome to the getUsers Controller!")
        try{
            
                const users = await User.find({ status: "user" })
                const totalUsers = users.length
                res.json(users)
            }
        catch(err){
            console.log(err)
        }
    },
    addUser: async (req, res) => {
        console.log('Adding User now....')
        console.log(req.body)
        try {
        const user = new User.save({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          idScan: req.body.idScan,
          status: req.body.status,
          email: req.body.email,
          phone: req.body.phone,
        })

        res.json(user)
        }
        catch (err) {
            console.log(err)
        }
        
      },
    updateUser: async (req, res) => {
        console.log(`Updating user ${req.params.id}`)
        try{
            const user = await User.findOneAndUpdate({
                _id: req.params.id
            },{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                IDScan: req.body.IDScan,
                phone: req.body.phone
            })
            console.log('Updated!')
            res.json(user)
        }catch(err){
            console.log(err)
        }
    },
    getUser: async (req, res) => {
        console.log(`Looking up user ${req.params.id}`)
        try {
            const user = await User.findOne({ _id: req.params.id })
            const reservations = await Reservation.find({
                userId: user.IDScan
            })
            console.log(user, reservations)
            res.json(user, reservations)
        } catch(err) {
            console.log(err)
        }
    },
    deleteUser: async (req, res)=>{
        console.log(`Deleting user ${req.params.id}`)
        try{
            await User.findOneAndDelete({_id:req.params.id})
            console.log('Deleted user')
            res.json({
                message: "Deleted successfully"
            })
        }catch(err){
            console.log(err)
        }
    }
}    
const Reservation = require('../models/Reservation')
const User = require('../models/User')

module.exports = {
    getReservations: async (req,res) => {
        try{
            const reservations = await Reservation
                .find({ inDate: null })
                .sort({ outDate: 1 })
                .lean()
            const totalReservations = reservations.length
            res.json(reservations)
        }catch(err){
            console.log(err)
        }
    },
    addReservation: async (req, res) => {
        try{
            const todaysDate = new Date()
            let reservation = await Reservation.create({
                outDate: todaysDate,
                userId: req.body.userId,
                staffId: req.body.staffId,
                itemId: req.body.itemId,
                })
                console.log('Reservation has been added!')
            res.json(reservation)
        
        }catch(err){
            console.log(err)
        }
    },
    getReservation: async (req, res) => {
        try {
            let reservation = await Reservation.findOne({ _id: req.params.id })
            res.json(reservation)
        } catch(err) {
            console.log(err)
        }
        
    },
    updateReservation: async (req, res) => {
        try{
            let todaysDate = new Date()
            let reservation = await Reservation.findOneAndUpdate({
                _id: req.params.id
            },{
                inDate: todaysDate,
            })
            console.log('Your item has been checked in!')
            // console.log(reservation)
            res.json(reservation)
        }catch(err){
            console.log(err)
        }
    },
    deleteReservation: async (req, res)=>{
        // console.log(req.params.id)
        try{
            await Reservation.findOneAndDelete({ _id:req.params.id })
            console.log('Deleted Reservation')
        }catch(err){
            console.log(err)
        }
    }
}    
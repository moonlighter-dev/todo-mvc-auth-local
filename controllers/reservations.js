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
    // createAppointment: async (req, res) => {
    //     // const todaysDate = Date.now()
    //     // console.log(todaysDate.getDate())
    //     try {
    //         if (req.user.status === "provider") {
    //             const patients = await User.find({ status: "patient" })
    //             res.render('./appointments/newAppointment.ejs', {user: req.user, patients: patients, provider: req.user })
    //         } else {
    //             const providers = await User.find({ status: "provider" })
    //             res.render('./appointments/newAppointment.ejs', { user: req.user, patient: req.user, providers: providers })                
    //         }
    //     } catch(err) {
    //         console.log(err)
    //     }

    // },
    newReservation: async (req, res) => {
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
    // editAppointment: async (req, res)=>{
    //     try {
    //         let appointment = await Appointment.findOne({ _id: req.params.id })
    //         let patient = await User.findOne({ _id: appointment.patientid })
    //         let provider = await User.findOne({ _id: appointment.providerid })
    //         res.render('./appointments/editAppointment.ejs', { appointment: appointment, patient: patient, provider: provider, user: req.user })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    checkin: async (req, res) => {
        try{
            let todaysDate = new Date()
            let reservation = await Reservation.findOneAndUpdate({
                _id: req.params.id
            },{
                inDate: todaysDate,
            })
            console.log('Your reservation has been updated')
            // console.log(reservation)
            res.json(reservation)
        }catch(err){
            console.log(err)
        }
    },
    cancelReservation: async (req, res)=>{
        // console.log(req.params.id)
        try{
            await Reservation.findOneAndDelete({ _id:req.params.id })
            console.log('Deleted Reservation')
        }catch(err){
            console.log(err)
        }
    }
}    
const Appointment = require('../models/Appointment')
const User = require('../models/User')

module.exports = {
    getAppointments: async (req,res)=>{
        console.log(req.user)
        try{
            if (req.user.status === "provider") {
                const appointments = await Appointment.find()
                const totalAppointments = await Appointment.countDocuments()
                res.json( {
                    appointments: appointments, 
                    totalAppointments: totalAppointments,
                    user: req.user,
                })
            } else {
                const appointments = await Appointment.find({patientid:req.user.id})
                const totalAppointments = await Appointment.countDocuments({patientid:req.user.id})
                res.render('appointments.ejs', {appointments: appointments, totalAppointments: totalAppointments, user: req.user})                 
            }
        }catch(err){
            console.log(err)
        }
    },
    createAppointment: async (req, res) => {
        // const todaysDate = Date.now()
        // console.log(todaysDate.getDate())
        try {
            const providers = await User.find({ status: "provider" })
            const patient = await User.findOne({ _id: req.params.id })
            res.render('newAppointment.ejs', { user: req.user, patient, providers })
        } catch(err) {
            console.log(err)
        }

    },
    newAppointment: async (req, res) => {
        try{
            if (req.user.status === "provider") {
                await Appointment.create({
                    date: req.body.date,
                    time: req.body.time,
                    patientid: req.body.patientid,
                    providerid: req.user.id,
                })                
            }

            console.log('Appointment has been added!')
            res.redirect('/patient')
        }catch(err){
            console.log(err)
        }
    },
    showAppointment: async (req, res) => {
        try {
            let appointment = await Appointment.find({_id: req.body.id})
            res.render(`/patient/${req.user.id}/${appointment.id}/edit`, {user: req.user, appointment: appointment})
        } catch(err) {
            console.log(err)
        }
        
    },
    editAppointment: async (req, res)=>{
        try{
            await Appointment.findOneAndUpdate({
                _id: req.body.id
            },{
                date: req.body.date,
                providerid: req.body.providerid,
            })
            console.log('Your appointment has been updated')
            res.redirect('/patient')
        }catch(err){
            console.log(err)
        }
    },
    cancelAppointment: async (req, res)=>{
        console.log(req.body.id)
        try{
            await Todo.findOneAndDelete({_id:req.body.id})
            console.log('Deleted Appointment')
            res.redirect('/patient')
        }catch(err){
            console.log(err)
        }
    }
}    
const Appointment = require('../models/Appointment')
const User = require('../models/User')

module.exports = {
    getAppointments: async (req,res)=>{
        try{
            if (req.user.status === "provider") {
                const appointments = await Appointment.find({ providerid: req.user.id })
                const totalAppointments = await Appointment.countDocuments({ providerid: req.user.id })
                const patients = await User.find({ status: "patient" })
                res.render('appointments.ejs', {
                    patients: patients,
                    appointments: appointments, 
                    totalAppointments: totalAppointments,
                    user: req.user,
                })
            } else {
                const appointments = await Appointment.find({patientid:req.user.id})
                const totalAppointments = await Appointment.countDocuments({patientid:req.user.id})
                const providers = await User.find({ status: "provider" })
                // console.log(appointments, providers)
                res.render('appointments.ejs', {appointments: appointments, totalAppointments: totalAppointments, providers: providers, user: req.user})                 
            }
        }catch(err){
            console.log(err)
        }
    },
    createAppointment: async (req, res) => {
        // const todaysDate = Date.now()
        // console.log(todaysDate.getDate())
        try {
            if (req.user.status === "provider") {
                const patients = await User.find({ status: "patient" })
                res.render('newAppointment.ejs', {user: req.user, patients: patients, provider: req.user })
            } else {
                const providers = await User.find({ status: "provider" })
                res.render('newAppointment.ejs', { user: req.user, patient: req.user, providers: providers })                
            }
        } catch(err) {
            console.log(err)
        }

    },
    newAppointment: async (req, res) => {
        try{
            let appointment
            if (req.user.status === "provider") {
                appointment = await Appointment.create({
                    date: req.body.date,
                    time: req.body.time,
                    patientid: req.body.patientid,
                    providerid: req.user.id,
                })
                console.log('Appointment has been added!')
            } else {
                appointment = await Appointment.create({
                    date: req.body.date,
                    time: req.body.time,
                    patientid: req.user.id,
                    providerid: req.body.providerid,
                })
                console.log('Appointment has been added!')
            }
            res.redirect('/appointments/' + appointment._id)
        
        }catch(err){
            console.log(err)
        }
    },
    showAppointment: async (req, res) => {
        try {
            let appointment = await Appointment.findOne({ _id: req.params.id })
            let patient = await User.findOne({ _id: appointment.patientid })
            let provider = await User.findOne({ _id: appointment.providerid })
            res.render('appointment.ejs', { patient: patient, provider: provider, user: req.user, appointment: appointment })                
        } catch(err) {
            console.log(err)
        }
        
    },
    editAppointment: async (req, res)=>{
        try {
            let appointment = await Appointment.findOne({ _id: req.params.id })
            let patient = await User.findOne({ _id: appointment.patientid })
            let provider = await User.findOne({ _id: appointment.providerid })
            res.render('editAppointment.ejs', { appointment: appointment, patient: patient, provider: provider, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    updateAppointment: async (req, res) => {
        try{
            let appointment = await Appointment.findOneAndUpdate({
                _id: req.params.id
            },{
                diagnosis: req.body.diagnosis,
                procedure: req.body.procedure,
                patientSummary: req.body.patientSummary,
            })
            console.log('Your appointment has been updated')
            // console.log(appointment)
            res.redirect('/patients/' + appointment.patientid)
        }catch(err){
            console.log(err)
            res.redirect('/patients/')
        }
    },
    cancelAppointment: async (req, res)=>{
        // console.log(req.params.id)
        try{
            await Appointment.findOneAndDelete({ _id:req.params.id })
            console.log('Deleted Appointment')
            res.redirect('/appointments')
        }catch(err){
            console.log(err)
            res.redirect('/appointments')
        }
    }
}    
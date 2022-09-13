const Appointment = require('../models/Appointment')

module.exports = {
    getDashboard: async (req,res)=>{
        console.log(req.user)
        try{
            const patients = await Patient.find({ })
            const totalPatients = await Patient.countDocuments({ })
            const appointments = await Appointment.find({providerid: req.user.id})
            res.render('patients.ejs', {patients: patients, totalPatients: totalPatients, appointments: appointments, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    newAppointment: async (req, res)=>{
        try{
            await Appointment.create({
                date: req.body.date,
                patientid: req.patient.id,
                providerid: req.user.id,
            })
            console.log('Appointment has been added!')
            res.redirect('/provider')
        }catch(err){
            console.log(err)
        }
    },
    editPatient: async (req, res)=>{
        try{
            await User.findOneAndUpdate({
                _id: req.body.patientid
            },{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })
            console.log('Updated!')
            res.redirect('/provider')
        }catch(err){
            console.log(err)
        }
    },
    editAppointment: async (req, res)=>{
        try{
            await Appointment.findOneAndUpdate({
                _id: req.body.id
            },{
                date: req.body.date,
            })
            console.log('Your appointment has been updated')
            res.redirect('/provider')
        }catch(err){
            console.log(err)
        }
    },
    cancelAppointment: async (req, res)=>{
        console.log(req.body.id)
        try{
            await Todo.findOneAndDelete({_id:req.body.id})
            console.log('Deleted Appointment')
            res.redirect('/provider')
        }catch(err){
            console.log(err)
        }
    }
}    
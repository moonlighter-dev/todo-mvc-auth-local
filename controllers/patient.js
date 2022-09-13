const Appointment = require('../models/Appointment')

module.exports = {
    getDashboard: async (req,res)=>{
        console.log(req.user)
        try{
            const appointments = await Appointment.find({patientid:req.user.id})
            const totalAppointments = await Appointment.countDocuments({patientid:req.user.id})
            res.render('appointments.ejs', {appointments: appointments, totalAppointments: totalAppointments, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    newAppointment: async (req, res)=>{
        try{
            await Appointment.create({
                date: req.body.date,
                patientid: req.user.id,
                providerid: req.body.providerid,
            })
            console.log('Appointment has been added!')
            res.redirect('/patient')
        }catch(err){
            console.log(err)
        }
    },
    editPatient: async (req, res)=>{
        try{
            await User.findOneAndUpdate({
                _id: req.user.id
            },{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })
            console.log('Updated!')
            res.redirect('/patient')
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
const User = require('../models/User')
const Appointment = require('../models/Appointment')

module.exports = {
    getPatients: async (req,res)=>{
        console.log(req.user)
        try{
            if (req.user.status === "provider"){
                const patients = await User.find({ status: "patient" })
                const totalPatients = patients.length
                res.render('patients.ejs', { patients: patients, totalPatients: totalPatients, user: req.user })                
            } else {
                console.log('Patients cannot be retrieved by other patients.')
                res.redirect('/appointments')
            }
        }catch(err){
            console.log(err)
        }
    },
    editPatient: async (req, res)=>{
        try {
            let patient = await User.findOne({ _id: req.params.id })
            res.render('editPatient.ejs', { patient: patient, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    updatePatient: async (req, res) => {
        try{
            const patient = await User.findOneAndUpdate({
                _id: req.params.id
            },{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })
            console.log('Updated!')
            res.redirect('/patients/' + patient.id)
        }catch(err){
            console.log(err)
        }
    },
    showPatient: async (req, res) => {
        try {
            const currentPatient = await User.findOne({ _id: req.params.id })
            const providers = await User.find({ status: "provider" })
            const appointments = await Appointment.find({
                patientid: currentPatient.id
            })
            console.log(appointments, providers)
            res.render('patient.ejs', { currentPatient, appointments, providers: providers, user: req.user }) 
        } catch(err) {
            console.log(err)
        }
    },
    deletePatient: async (req, res)=>{
        console.log(req.params.id)
        try{
            await User.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Patient')
            res.redirect('/patients')
        }catch(err){
            console.log(err)
        }
    }
}    
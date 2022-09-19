const User = require('../models/User')

module.exports = {
    getPatients: async (req,res)=>{
        console.log(req.user)
        try{
            if (req.user.status === "provider"){
                const patients = await User.find({ status: "patient" })
                const totalPatients = patients.length
                res.render('patients.ejs', {patients: patients, totalPatients: totalPatients, user: req.user})                
            } else {
                console.log('Patients cannot be retrieved by other patients.')
                res.redirect('/appointments')
            }
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
            res.redirect('/patients/' + req.user.id)
        }catch(err){
            console.log(err)
        }
    },
    showPatient: async (req, res) => {
        try {
            let patient = await User.find({_id: req.params.id})
            res.render('/patient', {user: req.user, patient: patient})
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
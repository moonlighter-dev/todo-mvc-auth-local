module.exports = {
    getIndex: (req,res)=>{
        console.log('Rendering index.ejs')
        res.render('index.ejs')
    }
}
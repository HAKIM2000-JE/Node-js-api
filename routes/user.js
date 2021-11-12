const express = require('express')
const router = express.Router()
 const User = require('../models/User')



 router.get('/', async (req, res)=>{
     const user = await User.find().sort().then(document => res.send(document))
 })


 
router.get('/new',  (req, res) => {
    res.render('user/new', { user: new user() })


})


 router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user == null) { res.redirect('/') }
    res.render('users/show', { user: user })
})





router.post('/', async (req, res, next) => {
    req.user = new User()
    
    
    next()
    
    


}, saveuserAndRedirect('new'))




function saveuserAndRedirect(path) {
    return async (req, res) => {
        let user = req.user
        
            
                user.username= req.username
                user.password=req.password
                
               



               
              

       
        try {
            user = await user.save()

            
       
          
           res.redirect(`/users/${user.id}`)
        } catch (e) {
            console.log(e)
            res.render(`users/${path}`, { user: user })
            
        }
    }
}


module.exports = router

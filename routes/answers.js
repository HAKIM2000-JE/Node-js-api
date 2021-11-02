const express = require('express')
const router = express.Router()


const Answer = require('../models/answer')
// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync('../views/answers/show', 'utf8');
// var options = { format: 'Letter' };

const {  ensureGuest } = require('../middleware/auth')



const nodemailer = require('nodemailer');
const log = console.log;


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prigmatest@gmail.com', // TODO: your gmail account
        pass: 'prigma1234'// TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'prigmatest@gmail.com', // TODO: email sender
    to: 'darkboyhakim@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};


const send = (email)=>{
    mailOptions.to=email
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });

}
/*Admin Section  */


router.get('/new',  (req, res) => {
    res.render('answers/new', { answer: new Answer() })


})

router.get('/',  async (req, res) => {
    const answers = await Answer.find().sort({ createdAt: 'desc' })

    res.render('answers/index', { answers: answers })
})



router.get('/:id', async (req, res) => {
    const answer = await Answer.findById(req.params.id)
    if (answer == null) { res.redirect('/') }
    res.render('answers/show', { answer: answer })
})



router.post('/', async (req, res, next) => {
    req.answer = new Answer()
    
    next()
    
    


}, saveAnswerAndRedirect('new'))


router.get('/edit/:id',  async (req, res) => {
    const answer = await Answer.findById(req.params.id)
    res.render('answers/edit', { answer: answer})
})

router.put('/:id', async (req, res, next) => {
    req.answer = await Answer.findById(req.params.id)
    next()
}, saveAnswerAndRedirect('edit'))


function saveAnswerAndRedirect(path) {
    return async (req, res) => {
        let answer = req.answer
        
            
                answer.activity= req.activity
                answer.sector=req.sector
                answer.email=req.email
                answer.firstname=req.firstname
                answer.lastname=req.lastname
                answer.phone=req.phone,
                answer.score1= req.score1
                answer.score2= req.score2
                answer.score3= req.score3
                answer.score4= req.score4
                answer.score5= req.score5
                answer.score6= req.score6
                answer.score7= req.score7
                answer.score8= req.score8
                answer.score9= req.score9
                answer.score10= req.score10
                answer.score11= req.score11
                answer.score12= req.score12
                score13=req.score13,
                score14=req.score14,
                GlobalComplexity=req.GlobalComplexity
                Pricingmaturity=req.Pricingmaturity
                hr = req.hr 
                tool=req.tool
                data=req.data
                organization = req.organization
                process =req.process
                zone = req.zone




                let mailOptions = {
                    from: 'abdelhakimjebabra7@gmail.com', // TODO: email sender
                    to:answer.email , // TODO: email receiver
                    subject: 'Princing maturity Test Result',
                    text: 'Wooohooo it works!!'
                };
            

              

       
        try {
            answer = await answer.save()
            send(req.email)
          
           res.redirect(`/answers/${answer.id}`)
        } catch (e) {
            console.log(e)
            res.render(`answers/${path}`, { answer: answer })
            
        }
    }
}




router.delete('/generate', async (req, res) => {
    pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
})






router.delete('/:id', async (req, res) => {
    await Answer.findByIdAndDelete(req.params.id)
    res.redirect('/answers')
})


/* End of Admin Section */



/* Clien Section */
 router.post('/client/save' ,  (req , res)=>{
     const data= req.body
     console.log(data)
     const newAnswer = new Answer(data)

     newAnswer.save((error)=>{
         if(error){
             res.status(500).json({msg:error})
             
         }else{
             res.json({
                 msg: 'Data has been saved'
             })
         }
     })

  
  



     
 })


/* End of client Section */


module.exports = router
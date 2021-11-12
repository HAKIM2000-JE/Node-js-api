const express = require('express')
const router = express.Router()


const  Film = require('../models/film')
// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync('../views/films/show', 'utf8');
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
    res.render('films/new', { film: new film() })


})

router.get('/',  async (req, res) => {
    const films = await Film.find().sort({ createdAt: 'desc' }).then(document => res.send(document))

    console.log( 'from mongo'+  films)


    

    
})



router.get('/:id', async (req, res) => {
    const film = await film.findById(req.params.id)
    if (film == null) { res.redirect('/') }
    res.render('films/show', { film: film })
})



router.post('/', async (req, res, next) => {
    req.film = new Film()
    
    next()
    
    


}, savefilmAndRedirect('new'))


router.get('/edit/:id',  async (req, res) => {
    const film = await Film.findById(req.params.id)
    res.render('films/edit', { film: film})
})

router.put('/:id', async (req, res, next) => {
    req.film = await Film.findById(req.params.id)
    next()
}, savefilmAndRedirect('edit'))


function savefilmAndRedirect(path) {
    return async (req, res) => {
        let film = req.film
        
            
                film.title= req.original_name
                film.id=req.id
                film.poster_path=req.poster_path  
                film.vote_average=req.vote_average
              
                film.orginal_title=req.orginal_title
                film.overview= req.overview
                film.relase_date= req.relase_date
               



                let mailOptions = {
                    from: 'abdelhakimjebabra7@gmail.com', // TODO: email sender
                    to:film.email , // TODO: email receiver
                    subject: 'Princing maturity Test Result',
                    text: 'Wooohooo it works!!'
                };
            

              

       
        try {
            film = await film.save()
            send(req.email)
          
           res.redirect(`/films/${film.id}`)
        } catch (e) {
            console.log(e)
            res.render(`films/${path}`, { film: film })
            
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
    await Film.findByIdAndDelete(req.params.id)
    res.redirect('/films')
})


/* End of Admin Section */



/* Clien Section */
 router.post('/client/save' ,  (req , res)=>{
     const data= req.body
     console.log(data)
     const newfilm = new Film(data)

     newfilm.save((error)=>{
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
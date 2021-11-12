const mongoose= require('mongoose')

const marked = require('marked')

const createDomPurify = require('dompurify')

const { JSDOM } = require('jsdom')


const dompurify = createDomPurify(new JSDOM().window)


const articleSchema= new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String
    },
   
   
})
 








module.exports = mongoose.model('Article', articleSchema)
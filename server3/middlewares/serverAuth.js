'use strict'

module.exports = function serverAuth (req,res,next) {
    console.log('req.headers-----', req.headers)
    if(req.headers.headserver === process.env.KEYSECRET) {
        next()
    } else {
        res.status(401).json({
            msg: 'You don\'t have Head Server authorization'
        })
    }
}
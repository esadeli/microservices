'use strict'

module.exports = function serverAuth (req,res,next) {
    if(req.headers.headserver === process.env.KEYSECRET) {
        next()
    } else {
        res.status(401).json({
            msg: 'You don\'t have Head Server authorization'
        })
    }
}
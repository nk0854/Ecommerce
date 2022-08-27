const expressJwt=require('express-jwt')

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    })
    .unless({
        path: [
            // {url:/\/v1\/products(.*)/,method:['GET','OPTIONS']},
            // {url:/\/v1\/categories(.*)/,method:['GET','OPTIONS']},
            // {url:/\/v1\/orders(.*)/,method:['GET','OPTIONS']},
            // {url:/\/v1\/public\/uploads(.*)/,method:['GET','OPTIONS']},
            // {url:/\/v1\/users\/login/, method:['POST','OPTIONS']},
            // {url:/\/v1\/users\/register/, method:['POST','OPTIONS']}
            {url:/(.*)/},
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}
module.exports = authJwt;
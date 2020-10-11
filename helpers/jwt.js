const jwt = require("jsonwebtoken");


/**
 *  Function yo generate JSON Web Tokens
 */
const generateJWT = ( uid, name ) => {

   return new Promise( (resolve, reject) => {

      const payload = { uid, name };

      jwt.sign( payload, process.env.SECRET_JWT_SEED, {
         expiresIn: '2h'
      }, (err, token) => {

         // Conditional, If err exits
         if (err) {
            console.log(err);
            reject('There is a problem, token can not generate');
         }

         resolve(token);
         
      })

   });

}

module.exports = {
   generateJWT
} 
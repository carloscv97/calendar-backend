/**
 * 
 *  This middleware verify form erros
 * 
 */
const { response } = require('express');
const { validationResult } = require('express-validator');


const verifyFields = (req, res = response, next) => {

   // Errors Handles
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         ok: false,
         errors: errors.mapped()
      })
   }

   next();
}

module.exports = {
   verifyFields
}
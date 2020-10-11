const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

/**
 *  Login / Auth of user
 */
const login = async (req, res = response) => {

   const { email, password } = req.body

   try {

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            ok: false,
            msg: 'There is not an account with that email'
         });
      }

      /* Confirm Passwords */
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {

         res.status(400).json({
            ok: false,
            msg: 'Password Invalid'
         });

      }

      /* Generate JWT ( JSON Web Token ) */
      const token = await generateJWT(user.id, user.name);

      res.json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      })


   } catch (err) {

      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      });

   }

}

/**
 *  Store new use en DB
 */
const store = async (req, res = response) => {


   const { email, password } = req.body

   try {

      let user = await User.findOne({ email });

      /* Verification if there is an account with request email */
      if (user) {
         return res.status(400).json({
            ok: false,
            msg: 'There is already an account with that email'
         });
      }

      user = new User(req.body);

      /* Encrypt User Password */
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      /* Generate JWT ( JSON Web Token ) */
      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      })

   } catch (err) {

      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      })

   }

}

/**
 *  Renew or refresh of token
 */
const revalidateToken = async(req, res = response) => {

   const { uid, name } = req;

   /* Generate a new Json Web Token */
   const token = await generateJWT( uid, name);

   res.status(201).json({
      ok: true,
      token
   })

}


module.exports = {
   login,
   store,
   revalidateToken
}
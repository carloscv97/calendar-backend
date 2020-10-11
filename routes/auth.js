
/**
 *  Auth Router 
 *  host + /api/auth
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { login, store, revalidateToken } = require('../controllers/authController');
const { verifyFields } = require('../middlewares/verifyFields');
const verifyJWT  = require('../middlewares/verifyJWT');

/* Login Route */
router.post(
   '/',
   [
      check('email','Email is required').isEmail(),
      check('password','Password is required').isLength({ min: 6 }),
      verifyFields
   ],
   login 
);

/* Store new User */
router.post(
   '/register',
   [
      check('name','Name is required').not().isEmpty(),
      check('email','Email is required').isEmail(),
      check('password','Password is required and 6  characteres minimum').isLength({ min: 6 }),
      verifyFields
   ],
   store
);

/* Refresh or revalidate token */
router.get( '/renew', verifyJWT, revalidateToken );


module.exports = router;
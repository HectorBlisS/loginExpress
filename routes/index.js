const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/products', (req,res,next)=>{
  Product.find()
  .populate('user')
  .then(products=>{
    res.send(products);
  })
  .catch(e=>next(e))
});

router.get('/users', (req,res,next)=>{
  User.find()
  .then(users=>{
    setTimeout(()=>{
      res.json(users);
    },5000)
    
  })
  .catch(e=>next(e))
})
;


function chekIfAdmin(req,res,next){
  if(req.user.role === "ADMIN") return next();
  res.send('Tu no tienes permiso! skse!');
}

const checkRole = (role) => (req,res,next) => {
    if(req.isAuthenticated() && req.user.role === role) return next();
    return res.send('no tienes permiso');
};
 
//checkRole('role')


//admin panel
router.get('/admin', checkRole('ADMIN'), (req,res,next)=>{
  res.send('te tengo un monton de chismes (analitics) manito!');
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

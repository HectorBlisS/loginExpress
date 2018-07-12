const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

//multer
const multer = require('multer');
const uploads = multer({dest: './public/assets'});
//cloudinary
const uploadCloud = require('../helpers/cloudinary');

router.get('/products/new', (req,res)=>{
  res.render('newProduct');
});

router.post('/products/new', 
uploadCloud.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'photos', maxCount: 8 }
]), 
(req,res,next)=>{
  req.body.pics = [];
  for(file of req.files.photos){
    req.body.pics.push(file.url)
  }
  Product.create(req.body)
  .then(product=>{
    res.send(product);
  })
  .catch(e=>next(e))
})

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

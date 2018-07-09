const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

function isAuthenticated(req,res,next){
    if(req.session.currentUser){
        return next()
    }else{
        res.redirect('/login');
    }
}

function isLoggedIn(req,res,next){
    if(req.session.currentUser){
        res.redirect('/private')
    }else{
        next();
    }
}

router.get('/logout', (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })

});

router.get('/private', isAuthenticated, (req,res)=>{
    res.send("esto es privao");
});

router.get('/login', isLoggedIn, (req,res)=>{
    res.render('auth/login')
});

router.post('/login', (req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        
        if(!user) {
            req.body.error = "Este usuario no existe";
            return res.render('auth/login', req.body)
        }
        if( bcrypt.compareSync(req.body.password, user.password) ){
            req.session.currentUser = user;
            res.redirect('/private');
        }else{
            req.body.error = "La contraseña no es correcta";
            return res.render('auth/login', req.body)
        }
    })
    .catch(e=>next(e))
});


router.get('/signup', (req,res)=>{
    res.render('auth/signup');
});

//1 crear la ruta post (recibe)
//2 necesitamos chear las contraseñas que coincidan
//3 crear al usuario en la db
router.post('/signup', (req,res,next)=>{
    if(req.body.password !== req.body.password2){
        req.body.error = 'escribe bien la contraseña!';
        return res.render('auth/signup', req.body)
    }
    //encriptar la contraseña
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hash;
    User.create(req.body)
    .then(user=>res.send(user))
    .catch(e=>next(e))
})


module.exports = router;
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log(req.user)
        return next()
    }else{
        res.redirect('/login');
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/private')
    }else{
        next();
    }
}

router.get('/logout', (req,res,next)=>{
    req.logout();
    res.send('cerrado ??? ');
    // req.session.destroy(()=>{
    //     res.redirect('/login');
    // })

});

router.get('/private', isAuthenticated, (req,res)=>{
    res.send("esto es privao");
});

router.get('/login', isLoggedIn, (req,res)=>{
    res.render('auth/login')
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{

    res.redirect('/private');

    // User.findOne({email:req.body.email})
    // .then(user=>{
        
    //     if(!user) {
    //         req.body.error = "Este usuario no existe";
    //         return res.render('auth/login', req.body)
    //     }
    //     if( bcrypt.compareSync(req.body.password, user.password) ){
    //         req.session.currentUser = user;
    //         res.redirect('/private');
    //     }else{
    //         req.body.error = "La contraseña no es correcta";
    //         return res.render('auth/login', req.body)
    //     }
    // })
    // .catch(e=>next(e))
});


router.get('/signup', (req,res)=>{
    res.render('auth/signup');
});

//1 crear la ruta post (recibe)
//2 necesitamos chear las contraseñas que coincidan
//3 crear al usuario en la db
router.post('/signup', (req,res,next)=>{

    User.register(req.body, req.body.password)
    .then(user=>res.redirect('/login'))
    .catch(e=>next(e));


    // if(req.body.password !== req.body.password2){
    //     req.body.error = 'escribe bien la contraseña!';
    //     return res.render('auth/signup', req.body)
    // }
    // //encriptar la contraseña
    // const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // req.body.password = hash;
    // User.create(req.body)
    // .then(user=>res.send(user))
    // .catch(e=>next(e))
})


module.exports = router;
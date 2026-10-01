import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import './auth/google.js';
const app = express();

//Session setup
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

//Passport setup
app.use(passport.initialize());
app.use(passport.session());

//Common Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');//just for practise
app.use(express.static('public'));//just for practise

//Routes
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { 
        failureRedirect: '/',
        successRedirect: '/profile'
    })
);

const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

app.get('/profile', authCheck, (req, res) => {
    // console.log(req.user);
    res.send(`<h1>Welcome ${req.user.displayName}</h1>
        <img src="${req.user.photos[0].value}" alt="Profile" width="100" height="100" />
        <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

const port = process.env.PORT;

//Listen
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
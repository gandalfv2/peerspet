const { Pet, User } = require('./models');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { promisify } = require('util');
const { UUIDV4 } = require('sequelize/dist');
const hashPass = promisify(crypto.pbkdf2)
crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (..) => {

})

passport.use(new LocalStrategy(function verify(username, password, cb) {
    User.findOne({ username: username })
        .then(user => {
            hashPass(password, user.salt, 310000, 32, 'sha256')
                .then(hashedPassword => {
                    if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                        throw new Error('Incorrect username or password.')
                    }
                    return cb(null, user);
                })
                .catch(err => { 
                    if (err) { return cb(err); }
                })
        })
        .catch(error => {
            // user not found
            return cb(new Error('User not found'))
        })
}));


function login(req, res) {
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }, function (req, res) {
        res.redirect('/me');
    })
}

function signup(req, res) {
    const payload = req.body;
    salt = UUIDV4()
        User.create(payload)
            .then(rs => {
                res.send('User created')
            })
            .catch(err => {
                res.send({ error: err });
            })
}

function listPets(req, res) {
    const pets = Pet.findAll();
    res.json(pets)
}

function viewPet(req, res) {
    const petId = req.params.id;
    const pet = Pet.findOne({ id: petId })
    res.json(pet)
}

function buyPet(req, res) {
    const myId = 4;
    const petId = req.params.id;
    const pet = Pet.findOne({ id: petId })
    await pet.update({ purchased_by: myId, available: false });
    res.send('Purchase done')
}
function viewMyAccount(req, res) {
    const myId = 4;
    const myInfo = User.findOne({ id: myId });
    return res.json(myInfo)
}

function viewMyPets(req, res) {
    const myId = 4;
    const pets = Pet.findAll({ purchased_by: myId })
    return res.json(pets)
}
function addPet(req, res) {
    const myId = 4;
    const { name } = req.body
    const pet = new Pet({
        name,
        available: true,
        sold_by: myId
    })
    pet.save()
    return res.send('Pet added')
}

module.exports = {
    login,
    signup,
    listPets,
    viewPet,
    viewMyPets,
    buyPet,
    viewMyAccount,
    addPet
}
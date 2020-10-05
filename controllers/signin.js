const handleSignin = (req, res, db, bcrypt) => {
    const email = req.body.email;
    const password = req.body.password;
    // const {email, password} = req.body;
    db.select('email','hash').from('login')
    .where('email', '=',email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('could not signIn!'))
}

module.exports = {
    handleSignin: handleSignin
};
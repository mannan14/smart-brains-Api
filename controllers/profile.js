const handleProfile = (req, res, db) => { 
    //:id is a syntax that 
    //can be got by req.params
    const { id }=  req.params;
    db.select('*').from('users').where(
        {
        id: id
        })
        .then(user => {
       if(user.length)
        {
            res.json(user[0])
        }
        else
        {
             res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))}


module.exports = {
    handleProfile: handleProfile
};
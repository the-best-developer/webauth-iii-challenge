const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const usersDb = require('../database/users.js');
const Auth = require('../auth/auth')

router.post('/register', async (req, res) => {
    let newUser = req.body;

    try{
        if (!newUser.username || !newUser.password || !newUser.department) {
            return res.status(500).json({message: "missing username, password, or department"});
        }

        newUser.password = bcrypt.hashSync(newUser.password, 14);
        const addedUser = await usersDb('users').insert(newUser);
        const selectedUser = await usersDb('users').where({id: addedUser[0]}).first();
            
        return res.status(200).json(selectedUser);
    }

    catch (err) {
        return res.status(500).json({err: err.message})
    }
});



router.post('/login', async (req, res) => {
    let user = req.body;

    try{
        if (!user.username || !user.password) {
            return res.status(500).json({message: "missing username or password"})
        }
        const selectedUser = await usersDb('users').where({ username: user.username }).first();
        
        if (!selectedUser) {
            return res.status(500).json({message: "Could not user"})
        };
        
        if (!bcrypt.compareSync(user.password, selectedUser.password)) {
            return res.status(500).json({message: "Incorrect password"})
        }

        const token = Auth.generateToken(user);
        
        return res.status(200).json({message: `Logged in as ${selectedUser.username}!`, token: token })
    }
    catch (err) {
        return res.status(500).json({err: err.message})
    }
});

router.get('/users', Auth.tokenCheck, async (req, res) => {
    
    try{
        const allUsers = await usersDb('users');
        
        return res.status(200).json( allUsers)
    }
    catch (err) {
        return res.status(500).json({err: err.message})
    }
});

module.exports = router;
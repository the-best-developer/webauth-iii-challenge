const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const usersDb = require('../database/users.js');

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


module.exports = router;
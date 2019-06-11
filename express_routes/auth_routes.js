const express = require('express');
const router = express.Router()

router.post('/register', async (req, res) => {
    const {username} = req.body

    const user = new User({username})

    try {
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (e) {
        res.status(401).send(e.message)
    } 
})

module.exports = router;
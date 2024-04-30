const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

// Get user's favorite cryptocurrencies
router.get('/favorites', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ favorites: user.favorites || [] });
    } catch (error) {
        res.status(500).send({ message: "Error fetching favorites", error });
    }
});

// Update user's favorite cryptocurrencies
router.post('/api/users/:username/favorites', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const { username } = req.params;
    const { favorites } = req.body;

    try {
        const user = await User.findOneAndUpdate({ username: username }, { $set: { favorites: favorites } }, { new: true });
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update favorites', error: error });
    }
});


module.exports = router;
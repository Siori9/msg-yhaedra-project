const express = require('express');
const router = express.Router();
const { User, Conversation } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456789';

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: { model: Conversation, as: 'conversations' },
        });
        if (user) res.json(user);
        else res.status(404).json({ error: 'Utilisateur non trouvé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) res.status(204).send();
        else res.status(404).json({ error: 'Utilisateur non trouvé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }


        if (password !== user.password) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ id: user.id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

router.get('/:userId/conversations', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const conversations = await Conversation.findAll({
            include: [
                {
                    model: User,
                    as: 'participants',
                    where: { id: userId },
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                }
            ],
            order: [['updatedAt', 'DESC']],
        });

        res.json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;


module.exports = router;


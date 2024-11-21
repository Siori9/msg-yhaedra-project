const express = require('express');
const router = express.Router();
const { Message, User, Conversation } = require('../models');

router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: [
                { model: User, as: 'expediteur', attributes: ['id', 'name', 'email'] },
                { model: Conversation },
            ],
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/conversation/:conversationId', async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: { conversationId: req.params.conversationId },
            include: [{ model: User, as: 'expediteur', attributes: ['id', 'name'] }],
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Message.destroy({ where: { id: req.params.id } });
        if (deleted) res.status(204).send();
        else res.status(404).json({ error: 'Message non trouvé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


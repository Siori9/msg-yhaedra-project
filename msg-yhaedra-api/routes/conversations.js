const express = require('express');
const router = express.Router();
const { Conversation, User, Message } = require('../models');
const {Op} = require("sequelize");

router.post('/', async (req, res) => {
    const { participants } = req.body;

    try {
        const users = await User.findAll({
            where: {
                email: { [Op.in]: participants },
            },
        });

        if (users.length !== participants.length) {
            return res.status(404).json({
                message: 'Un ou plusieurs utilisateurs sont introuvables.',
                found: users.map((user) => user.email),
                missing: participants.filter(
                    (email) => !users.find((user) => user.email === email)
                ),
            });
        }

        const conversation = await Conversation.create();

        await conversation.addParticipants(users);

        res.status(201).json({
            message: 'Conversation créée avec succès.',
            conversation,
            participants: users,
        });
    } catch (error) {
        console.error('Erreur lors de la création de la conversation :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const conversations = await Conversation.findAll({
            include: [{ model: User, as: 'participants', attributes: ['id', 'name'] }],
        });
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findByPk(req.params.id, {
            include: [
                { model: User, as: 'participants', attributes: ['id', 'name'] },
                { model: Message, as: 'messages' },
            ],
        });
        if (conversation) res.json(conversation);
        else res.status(404).json({ error: 'Conversation non trouvée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:id/users', async (req, res) => {
    try {
        const conversation = await Conversation.findByPk(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation non trouvée' });
        }
        const { userId } = req.body;
        await conversation.addParticipant(userId); // Association d'un nouvel utilisateur
        res.status(200).json({ message: 'Utilisateur ajouté à la conversation' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Conversation.destroy({ where: { id: req.params.id } });
        if (deleted) res.status(204).send();
        else res.status(404).json({ error: 'Conversation non trouvée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

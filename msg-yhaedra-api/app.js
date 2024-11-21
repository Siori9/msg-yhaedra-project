const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const conversationRoutes = require('./routes/conversations');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200', // Remplacez par l'URL de votre application Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/conversations', conversationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const moderationRoutes = require('./routes/moderation');

const app = express();
app.use(express.json());

app.use('/api/moderation', moderationRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

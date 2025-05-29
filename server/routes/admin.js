const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/clients', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  const clients = await User.find({ role: 'client' });
  res.json(clients);
});

router.put('/hold/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  const client = await User.findById(req.params.id);
  client.status = 'held';
  await client.save();
  res.json(client);
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://naatudealsofficial:naatudeals8977244642@cluster0.cvnxsq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));

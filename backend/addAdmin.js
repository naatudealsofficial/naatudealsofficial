const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure this path matches your project structure

// MongoDB connection string
const mongoUri = 'mongodb://localhost:27017/productmanagement';

// User credentials
const username = 'admin12345';
const password = 'password';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();
    console.log('Admin user added successfully');

    // Close connection
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });


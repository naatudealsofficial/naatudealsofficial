const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://naatudealsofficial:naatudealsofficialpassword@cluster0.8r4rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

//'mongodb+srv://admin1:admin123@cluster0.79bcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


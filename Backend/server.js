
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/product'); // Import routes
const adminRoutes = require("./Routes/admin");
const messageRoutes = require("./Routes/message");
const facilityRoutes = require("./Routes/facility");
const path = require('path');
const cookieParser = require("cookie-parser");
const { getEnvironmentVariable } = require('./Helper');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');


const prodOrigins = [
  getEnvironmentVariable('ORIGIN_1'),
  getEnvironmentVariable('ORIGIN_2'),
  getEnvironmentVariable('ORIGIN_3'),
  getEnvironmentVariable('ORIGIN_4'),
];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = getEnvironmentVariable('NODE_ENV') === 'production' ? prodOrigins : devOrigin;
app.use(
  cors({
    origin: (origin, callback) => {
      if (getEnvironmentVariable('NODE_ENV') === 'production') {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by cors`));
        }
      } else {
        callback(null, true);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});





// Use routes
app.use('/messages', messageRoutes);
app.use('/products', productRoutes);
app.use("/admin", adminRoutes);
app.use("/facility", facilityRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

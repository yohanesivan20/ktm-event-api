const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/conn-db')


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.use('/api/user', userRoutes)

connectDB.sync().then(() => console.log("Database synced")).catch(err => console.error(err))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


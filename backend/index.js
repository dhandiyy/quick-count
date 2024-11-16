const express = require('express');
require('dotenv').config()

const app = express();
const tpsRouter = require('./routes/tps.route')
const paslonRouter = require('./routes/paslon.route')
const middleware = require('./utils/middleware')

const PORT = process.env.PORT;

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/tps', tpsRouter);
app.use('/api/paslon', paslonRouter )


app.listen(PORT, () => {
	console.log(`Server berhasil running di port:${PORT}`)
})
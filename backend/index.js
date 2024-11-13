const express = require('express');

const app = express();
const tpsRouter = require('./routes/tps')
const middleware = require('./utils/middleware')

const port = 3001;
app.use(middleware.requestLogger)
app.use('/tps', tpsRouter)


app.listen(port, () => {
	console.log("Server berhasil running di port:3001")
})
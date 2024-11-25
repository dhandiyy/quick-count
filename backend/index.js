const express = require('express');
require('dotenv').config()

const app = express();

const tpsRouter = require('./routes/tps.route')
const paslonRouter = require('./routes/paslon.route')
const adminRouter = require('./routes/admin.route')
const hasilSuaraRouter = require('./routes/hasilSuara.route')
const loginRouter = require('./routes/login.route')
const desaRouter = require('./routes/desa.route')
const kecamatanRouter = require('./routes/kecamatan.route')

const middleware = require('./utils/middleware')
const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

app.use(express.json());
app.use(middleware.requestLogger);
app.use('/bukti', express.static('public/images'));


app.use('/api/login', loginRouter)

app.use('/api/tps', tpsRouter);
app.use('/api/paslon', paslonRouter )
app.use('/api/admin', adminRouter)
app.use('/api/hasilsuara', hasilSuaraRouter)
app.use('/api/desa', desaRouter)
app.use('/api/kecamatan', kecamatanRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
	console.log(`Server berhasil running di port:${PORT}`)
})
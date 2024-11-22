const router = require('express').Router()
const desaController = require('../controllers/desa.controller')

router.get('/', desaController.getAllDesa);
router.get('/:id', desaController.getDesaById)

module.exports = router
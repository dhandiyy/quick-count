const router = require('express').Router()
const kecamatanController = require('../controllers/kecamatan.controller')

router.get('/', kecamatanController.getAllKecamatan);
router.get('/:id', kecamatanController.getKecamatanById)

module.exports = router
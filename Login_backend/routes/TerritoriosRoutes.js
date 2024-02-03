const router = require('express').Router()

const TerritoriosController = require('../controllers/TerritoriosController')
const verificarToken = require('../helpers/verificarToken')

router.post('/subir', verificarToken, TerritoriosController.Subir)

module.exports = router
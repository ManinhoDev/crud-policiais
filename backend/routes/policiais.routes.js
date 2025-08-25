const router = require('express').Router();
const { criar, listar } = require('../controllers/policiais.controller');


router.post('/', criar); // POST /policiais
router.get('/', listar); // GET /policiais?cpf=... ou ?rg=...


module.exports = router;
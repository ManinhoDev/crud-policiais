const { cpf } = require('cpf-cnpj-validator');


async function criar(req, res, next) {
try {
const erro = validarCampos(req.body);
if (erro) return res.status(400).json({ message: erro });


const { rg_civil, rg_militar, cpf: cpfStr, data_nascimento, matricula } = req.body;


const matEnc = encrypt(matricula);


const sql = `INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula)
VALUES (?, ?, ?, ?, ?)`;
const params = [rg_civil, rg_militar, cpfStr, data_nascimento, matEnc];


const [result] = await pool.query(sql, params);


return res.status(201).json({
id: result.insertId,
rg_civil,
rg_militar,
cpf: cpfStr,
data_nascimento,
matricula, // devolvemos já em claro
});
} catch (err) {
if (err && err.code === 'ER_DUP_ENTRY') {
return res.status(400).json({ message: 'RG/CPF já cadastrado' });
}
return next(err);
}
}


async function listar(req, res, next) {
try {
const { cpf: cpfFiltro, rg } = req.query;
let sql = 'SELECT * FROM policiais';
const params = [];
if (cpfFiltro) {
sql += ' WHERE cpf = ?';
params.push(cpfFiltro);
} else if (rg) {
sql += ' WHERE rg_civil = ? OR rg_militar = ?';
params.push(rg, rg);
}


const [rows] = await pool.query(sql, params);


const saida = rows.map(r => ({
id: r.id,
rg_civil: r.rg_civil,
rg_militar: r.rg_militar,
cpf: r.cpf,
data_nascimento: r.data_nascimento,
matricula: (() => { try { return decrypt(r.matricula); } catch { return '[erro decriptação]'; } })(),
}));


res.json(saida);
} catch (err) {
next(err);
}
}


module.exports = { criar, listar };
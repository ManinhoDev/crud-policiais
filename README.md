🚓 CRUD Policiais

Sistema completo de cadastro e listagem de policiais, desenvolvido em Node.js (Express), Angular 19 e MySQL.
Inclui validação de CPF, criptografia AES-256-GCM da matrícula e formulário reativo no frontend.

📌 Tecnologias Utilizadas

Backend: Node.js + Express + Sequelize

Banco de Dados: MySQL

Frontend: Angular 19 (Reactive Forms)

Segurança: AES-256-GCM (Crypto Node.js), dotenv

⚙️ Funcionalidades

✅ Cadastro de policiais com validação de CPF
✅ Criptografia da matrícula antes de salvar no banco
✅ Listagem com filtro por nome e CPF
✅ Arquitetura limpa (MVC no backend e services no Angular)
✅ Integração completa entre Frontend e Backend

🛠️ Instalação e Configuração
🔹 1. Clonar o Repositório
git clone https://github.com/seu-usuario/crud-policiais.git
cd crud-policiais

🔹 2. Configuração do Backend
cd backend
npm install


Crie o arquivo .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=suasenha
DB_NAME=policiais_db
SECRET_KEY=uma_chave_segura_aqui
SECRET_IV=iv_seguro_aqui


Rodar migrações (ou script SQL manualmente):

npx sequelize-cli db:migrate


Iniciar servidor:

npm start


Servidor rodando em: http://localhost:3000

🔹 3. Configuração do Frontend
cd frontend
npm install


Rodar aplicação:

ng serve


Frontend disponível em: http://localhost:4200

🧪 Testando a API
Criar Policial
curl -X POST http://localhost:3000/api/policiais \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos Silva","cpf":"12345678909","matricula":"12345"}'

Listar Policiais
curl http://localhost:3000/api/policiais

📂 Estrutura do Projeto
crud-policiais/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   ├── app.js
│   └── .env
│
│── frontend/
│   ├── src/app/
│   │   ├── services/
│   │   ├── components/
│   │   └── app.module.ts
│   └── angular.json
│
└── README.md

👨‍💻 Autor

Projeto desenvolvido por 3º SGT CRISTOVAO 

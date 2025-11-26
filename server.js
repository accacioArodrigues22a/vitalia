
//COMANDO PARA RODAR O BACKEND: npx nodemon server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors({
    origin: true, // Aceita qualquer origem (necessário para a nuvem dinâmica)
    credentials: true // Permite cookies e headers de autorização
}));

// ==================================================================
// 1. CONEXÃO COM O BANCO (USANDO POOL PARA EVITAR QUEDAS) 🔌
// ==================================================================
const db = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_02ta',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste rápido de conexão (Opcional, só pra ver no terminal)
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar no MySQL:', err.message);
    } else {
        console.log('✅ Pool de conexões ativo e conectado!');
        connection.release(); // Devolve a conexão pro pool
    }
});

// ==================================================================
// 2. ROTAS DA API
// ==================================================================

// --- ROTA DE CADASTRO (VERIFICA DUPLICIDADE) ---
app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome || req.body.name;
    const email = req.body.email;
    const senha = req.body.senha || req.body.password;

    if (!senha || !nome || !email) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // 1. Verifica se email já existe
    db.query("SELECT email FROM vitalia_usuarios WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro no servidor ao verificar email." });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: "E-mail já cadastrado! Tente outro." });
        }

        // 2. Insere novo usuário
        const sqlInsert = "INSERT INTO vitalia_usuarios (name, email, password, score) VALUES (?, ?, ?, 0)";
        db.query(sqlInsert, [nome, email, senha], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro ao cadastrar usuário." });
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
        });
    });
});

// --- ROTA DE LOGIN ---
app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha || req.body.password;
    
    const sql = "SELECT * FROM vitalia_usuarios WHERE email = ? AND password = ?";

    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
        
        if (results.length > 0) {
            const usuario = results[0];
            res.json({ 
                message: "Login realizado", 
                id: usuario.id, 
                nome: usuario.name 
            });
        } else {
            res.status(401).json({ error: "E-mail ou senha incorretos." });
        }
    });
});

// --- ROTA PONTUAÇÃO ---
app.post('/salvar-pontuacao', (req, res) => {
    const { userId, pontos } = req.body;

    if (!userId) return res.status(400).json({ error: "ID do usuário obrigatório" });

    // 1. Busca pontuação atual
    const sqlSelect = "SELECT score FROM vitalia_usuarios WHERE id = ?";
    db.query(sqlSelect, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar pontuação" });
        }

        if (results.length > 0) {
            const currentScore = results[0].score || 0;

            // 2. Só atualiza se a nova pontuação for MAIOR (Recorde)
            if (pontos > currentScore) {
                const sqlUpdate = "UPDATE vitalia_usuarios SET score = ? WHERE id = ?";
                db.query(sqlUpdate, [pontos, userId], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Erro ao atualizar pontuação" });
                    }
                    res.json({ message: "Novo recorde salvo!", newRecord: true });
                });
            } else {
                res.json({ message: "Pontuação menor que o recorde.", newRecord: false });
            }
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    });
});

// --- ROTA RANKING ---
app.get('/ranking', (req, res) => {
    // Pega os top 3 para o pódio
    const sql = "SELECT name, score FROM vitalia_usuarios ORDER BY score DESC LIMIT 3";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar ranking" });
        }
        res.json(results);
    });
});

// ==================================================================
// 3. INICIALIZAÇÃO DO SERVIDOR (Híbrido: Local e Vercel) 🚀
// ==================================================================

// Se estiver rodando localmente (node server.js), abre a porta 3333
if (require.main === module) {
    app.listen(3333, () => console.log('🚀 Backend rodando localmente na porta 3333'));
}

// Exporta o app para a Vercel usar como Serverless Function
module.exports = app;
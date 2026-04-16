const db = require("../database/database");

// criar tarefa
exports.createTask = (req, res) => {
  const { title, description } = req.body;
  const user_id = req.userId;

  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const query = `
    INSERT INTO tasks (title, description, user_id)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, description, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar tarefa" });
    }

    return res.status(201).json({
      id: this.lastID,
      title,
      description,
    });
  });
};

// listar tarefas do usuário
exports.getTasks = (req, res) => {
  const user_id = req.userId;
  let { status, page = 1, limit = 5 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Page e limit devem ser maiores que 0" });
  }

  let query = `
    SELECT tasks.*, users.name as user_name, users.email
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    WHERE tasks.user_id = ?
  `;

  let params = [user_id];

  if (status) {
    query += ` AND tasks.status = ?`;
    params.push(status);
  }

  const offset = (page - 1) * limit;

  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar tarefas" });
    }

    return res.status(200).json(rows);
  });
};

// deletar tarefa
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;

  const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;

  db.run(query, [id, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar tarefa" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    return res.json({ message: "Tarefa deletada com sucesso" });
  });
};

// atualizar tarefa
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const user_id = req.userId;

  if (!title || !status) {
    return res.status(400).json({ error: "Título e status são obrigatórios" });
  }

  const query = `
    UPDATE tasks
    SET title = ?, description = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.run(query, [title, description, status, id, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    return res.json({ message: "Tarefa atualizada com sucesso" });
  });
};
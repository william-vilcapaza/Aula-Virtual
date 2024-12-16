const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // 'uploads/' es el directorio donde se guardarán los archivos


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'inventario',
  database: 'aula_virtual'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error del servidor' });
      return;
    }
    
    if (results.length === 0) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  });
});

// Obtener todos los usuarios
app.get('/api/usuarios', authenticateToken, (req, res) => {
  db.query('SELECT id, nombre, email, rol FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});

// Crear usuario
app.post('/api/usuarios', authenticateToken, async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)', 
    [nombre, email, hashedPassword, rol], 
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al crear usuario' });
        return;
      }
      res.status(201).json({ id: result.insertId, nombre, email, rol });
    }
  );
});

// Actualizar usuario
app.put('/api/usuarios/:id', authenticateToken, async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const { id } = req.params;
  let hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  let query = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ?';
  let params = [nombre, email, rol];

  if (hashedPassword) {
    query += ', password = ?';
    params.push(hashedPassword);
  }

  query += ' WHERE id = ?';
  params.push(id);

  db.query(query, params, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar usuario' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json({ id, nombre, email, rol });
  });
});

// Eliminar usuario
app.delete('/api/usuarios/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar usuario' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// Obtener todas las materias (cursos)
app.get('/api/cursos', authenticateToken, (req, res) => {
  db.query('SELECT id, nombre, horas, horario FROM materia', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los cursos' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los cursos con descripción
app.get('/api/cursosestudiante', authenticateToken, (req, res) => {
  db.query('SELECT id, nombre AS title, descripcion FROM materia', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los cursos' });
      return;
    }
    res.json(results);
  });
});


// Crear un nuevo curso
app.post('/api/cursos', authenticateToken, (req, res) => {
  const { nombre, horas, horario } = req.body;

  db.query('INSERT INTO materia (nombre, horas, horario) VALUES (?, ?, ?)', 
    [nombre, horas, horario], 
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al crear el curso' });
        return;
      }
      res.status(201).json({ id: result.insertId, nombre, horas, horario });
    }
  );
});

// Actualizar un curso
app.put('/api/cursos/:id', authenticateToken, (req, res) => {
  const { nombre, horas, horario } = req.body;
  const { id } = req.params;

  db.query('UPDATE materia SET nombre = ?, horas = ?, horario = ? WHERE id = ?', 
    [nombre, horas, horario, id], 
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al actualizar el curso' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Curso no encontrado' });
        return;
      }
      res.json({ id, nombre, horas, horario });
    }
  );
});

// Eliminar un curso
app.delete('/api/cursos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM materia WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar el curso' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }
    res.json({ message: 'Curso eliminado correctamente' });
  });
});

// Tareas
// Obtener todas las tareas para un curso específico
app.get('/api/tareas/:cursoId', authenticateToken, (req, res) => {
  const { cursoId } = req.params;

  db.query('SELECT id, titulo, descripcion, fecha_entrega, estado FROM tareas WHERE curso_id = ?', [cursoId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener las tareas' });
      return;
    }
    res.json(results);
  });
});


// Crear una nueva tarea
app.post('/api/tareas', authenticateToken, (req, res) => {
  const { titulo, descripcion, fecha_entrega, curso_id } = req.body;

  db.query(
    'INSERT INTO tareas (titulo, descripcion, fecha_entrega, curso_id) VALUES (?, ?, ?, ?)',
    [titulo, descripcion, fecha_entrega, curso_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al crear la tarea' });
        return;
      }
      res.status(201).json({ id: result.insertId, titulo, descripcion, fecha_entrega, curso_id });
    }
  );
});

// Actualizar una tarea
app.put('/api/tareas/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_entrega, estado } = req.body;

  db.query(
    'UPDATE tareas SET titulo = ?, descripcion = ?, fecha_entrega = ?, estado = ? WHERE id = ?',
    [titulo, descripcion, fecha_entrega, estado, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Tarea no encontrada' });
        return;
      }
      res.json({ id, titulo, descripcion, fecha_entrega, estado });
    }
  );
});

// Eliminar una tarea
app.delete('/api/tareas/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM tareas WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar la tarea' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  });
});

// Subir un archivo para una tarea específica
app.post('/api/tareas/upload/:taskId', authenticateToken, upload.single('archivo'), async (req, res) => {
  const { taskId } = req.params;
  const filePath = req.file ? req.file.path : null;

  if (!filePath) {
    return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
  }

  try {
    // Actualiza la tarea con la ruta del archivo
    await db.query('UPDATE tareas SET archivo = ? WHERE id = ?', [filePath, taskId]);
    res.json({ success: true, filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al subir el archivo', error });
  }
});

app.get('/api/foros', authenticateToken, (req, res) => {
  const query = `
    SELECT foro.id, foro.titulo AS title, foro.descripcion AS description, materia.nombre AS subject
    FROM foro
    INNER JOIN materia ON foro.materia_id = materia.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los foros' });
      return;
    }

    // Aseguramos una respuesta estructurada y manejable
    const formattedResults = results.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      subject: row.subject,
    }));

    res.json(formattedResults);
  });
});



app.post('/api/foros', authenticateToken, (req, res) => {
  const { titulo, descripcion, materia_id } = req.body;
  const query = 'INSERT INTO foro (titulo, descripcion, materia_id) VALUES (?, ?, ?)';
  
  db.query(query, [titulo, descripcion, materia_id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al crear el foro' });
      return;
    }
    res.status(201).json({ id: result.insertId, titulo, descripcion, materia_id });
  });
});


app.put('/api/foros/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, materia_id } = req.body;
  const query = 'UPDATE foro SET titulo = ?, descripcion = ?, materia_id = ? WHERE id = ?';
  
  db.query(query, [titulo, descripcion, materia_id, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar el foro' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Foro no encontrado' });
      return;
    }
    res.json({ id, titulo, descripcion, materia_id });
  });
});


app.delete('/api/foros/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM foro WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar el foro' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Foro no encontrado' });
      return;
    }
    res.json({ message: 'Foro eliminado correctamente' });
  });
});


app.get('/api/foros/materia/:materia_id', authenticateToken, (req, res) => {
  const { materia_id } = req.params;
  const query = `
    SELECT foro.id, foro.titulo, foro.descripcion
    FROM foro
    WHERE foro.materia_id = ?;
  `;
  
  db.query(query, [materia_id], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los foros de la materia' });
      return;
    }
    res.json(results);
  });
});

// Obtener todas las materias (cursosteacher)
app.get('/api/cursosteacher', authenticateToken, (req, res) => {
  db.query('SELECT id, nombre, horas, horario FROM materia', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los cursos' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los cursos con descripción
app.get('/api/cursosestudianteteacher', authenticateToken, (req, res) => {
  db.query('SELECT id, nombre AS title, descripcion FROM materia', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los cursos' });
      return;
    }
    res.json(results);
  });
});


// Crear un nuevo curso
app.post('/api/cursosteacher', authenticateToken, (req, res) => {
  const { nombre, horas, horario } = req.body;

  db.query('INSERT INTO materia (nombre, horas, horario) VALUES (?, ?, ?)', 
    [nombre, horas, horario], 
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al crear el curso' });
        return;
      }
      res.status(201).json({ id: result.insertId, nombre, horas, horario });
    }
  );
});

// Actualizar un curso
app.put('/api/cursosteacher/:id', authenticateToken, (req, res) => {
  const { nombre, horas, horario } = req.body;
  const { id } = req.params;

  db.query('UPDATE materia SET nombre = ?, horas = ?, horario = ? WHERE id = ?', 
    [nombre, horas, horario, id], 
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error al actualizar el curso' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Curso no encontrado' });
        return;
      }
      res.json({ id, nombre, horas, horario });
    }
  );
});

// Eliminar un curso
app.delete('/api/cursosteacher/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM materia WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar el curso' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }
    res.json({ message: 'Curso eliminado correctamente' });
  });
});

// Obtener un solo curso por su ID
app.get('/api/cursosestudiante/:id', authenticateToken, (req, res) => {
  const courseId = req.params.id; // Obtén el ID del curso desde la URL
  db.query('SELECT id, nombre AS title, descripcion FROM materia WHERE id = ?', [courseId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener el curso' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }

    res.json(results[0]); // Devuelve solo el curso encontrado
  });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


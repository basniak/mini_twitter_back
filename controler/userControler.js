const { pool } = require("../banco/database");

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      // throw error;
      response.status(500).json(error);
    }
    response.status(200).json(results.rows);
  });
};

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       response.status(500).json(error);
//     }
//     response.status(200).json(results.rows);
//   });
// };

const createUser = (request, response) => {
  const { username, email, uid } = request.body;

  pool.query(
    "INSERT INTO users (username, email, uid) VALUES ($1, $2, $3)",
    [username, email, uid],
    (error, results) => {
      if (error) {
        // throw error;
        response.status(500).json(error);
      } else {
        response.status(201).json({ sucesso: `User created with uid: ${uid}` });
      }
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        // throw error;
        response.status(500).json(error);
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       // throw error;
//       response.status(500).json(error);
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

// default { getUsers, updateUser, createUser };

// = { getUsers, updateUser, createUser };
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.createUser = createUser;

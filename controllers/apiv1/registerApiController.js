"use strict";
const UserManager = require("../../managers/userManager");
const { validationResult } = require("express-validator");
/**
 * Hay que recibir el formulario con el username, email, password
 * Verificar en la base de datos si el username o email no se repiten con otro usuario
 * No se repite, aceptar. Si no, indicar al usuario que cambie username y/o email.
 * Revisar loginJWT para buscar usuario en DB, crear token hacer login
 * Revisar jwtAuth para el checkeo de tokens
 * Falta hacer ruta POST ("/register", registerApiController.add)
 * Debe logear al usuario y enviar correo de confirmacion de email?
 */
class RegisterApiController {
  
  async create(req, res, next) {
    try {
      // Request credentials
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      
      // Return if errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Find user by email or username
      const user = await UserManager.findOne({
        $or: [{ email: email }, { username: username }]
      });

      // Check if user doesn't exist
      const userResponse = await UserManager.checkUniqueUserInDB(
        user,
        username,
        email,
        password
      );

      if (userResponse.success) {
        UserManager.save(userResponse.data);
      }

      delete userResponse.data.password;
      
      res.json(userResponse);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RegisterApiController();

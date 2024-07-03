import { Router } from "express";
import UserController from "../controllers/userController.js";
import login_auth from "../middleware/login_auth.js";
import two_factor_permission from "../middleware/two_factor_auth.js";
//import verify_password from "../middleware/verify_password_auth.js";

const user_router = Router();

user_router
  .post("/user", UserController.createUser)
  
  .get("/user", login_auth, UserController.getUser)
  .patch("/user", login_auth, UserController.updateUser)

  .patch("/user/danger", login_auth, two_factor_permission, UserController.dangerUpdateUser)
//  .delete("/user");

  //Autenticações
  .post("/user/login", UserController.login)
  .post("/user/verifyPassword", login_auth, UserController.verifyPassword);

export default user_router;
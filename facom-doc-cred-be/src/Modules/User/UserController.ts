import { AppDataSource } from "@typeorm/data-source";
import { User } from "@typeorm/entity/User";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import UserRepository from "./UserRepository";

class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(AppDataSource.getRepository(User));
  }

  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await this.userRepository.create({
        email,
        password,
      });

      return response.json(user);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }
}

export default UserController;

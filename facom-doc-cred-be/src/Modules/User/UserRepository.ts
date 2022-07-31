import { DeepPartial, Repository } from "typeorm";
import { User } from "@typeorm/entity/User";

export type UserDTO = DeepPartial<User>;

class UserRepository {
  constructor(private ormRepository: Repository<User>) {}

  public async create({ email, password }: UserDTO) {
    const user = this.ormRepository.create({ email, password });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;

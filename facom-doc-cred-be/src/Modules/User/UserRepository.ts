import { DeepPartial, Repository } from "typeorm";
import { User } from "@typeorm/entity/User";

export type UserDTO = DeepPartial<User>;

class UserRepository {
  constructor(private ormRepository: Repository<User>) {}

  public async create({ email }: UserDTO) {
    const user = this.ormRepository.create({ email });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email = "") {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }
}

export default UserRepository;

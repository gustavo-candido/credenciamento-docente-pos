import { DeepPartial, Repository } from "typeorm";
import { User } from "@typeorm/entity/User";

export type UserDTO = DeepPartial<User>;

class UserRepository {
  constructor(private ormRepository: Repository<User>) {}

  public async create({ email, is_adm = false }: UserDTO) {
    const user = this.ormRepository.create({ email, is_adm });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email = "") {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }
}

export default UserRepository;

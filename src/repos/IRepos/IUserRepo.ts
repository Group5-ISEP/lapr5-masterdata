import { Repo } from "../../core/infra/Repo";

import { User } from "../../domain/user";

export interface IUserRepo extends Repo<User> {
	findByEmail (email: string): Promise<User>;
	save(user: User): Promise<User>;
  }
  
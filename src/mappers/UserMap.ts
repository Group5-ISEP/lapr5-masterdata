import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IUserDTO from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

//import { UserPassword } from "../domain/userPassword";


export class UserMap extends Mapper<User> {

    public static toDTO( user: User): IUserDTO {
        return {
            email: user.email,
            password: user.password,
            type: user.type
        } as IUserDTO;
    }

  public static async toDomain (raw: any): Promise<User> {
    //const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});

    const userOrError = User.create({
      email: raw.email,
      password: raw.password,
      type: raw.type,
    }, new UniqueEntityID(raw.base_user_id))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      email: user.email,
      password: user.password,
      type: user.type,
    }
    return a;
  }
}
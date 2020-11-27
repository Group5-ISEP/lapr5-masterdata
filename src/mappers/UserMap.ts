import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IUserDTO from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

//import { UserPassword } from "../domain/userPassword";


export class UserMap extends Mapper<User> {

    public static toDTO( user: User): IUserDTO {
        return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role
        } as IUserDTO;
    }

  public static async toDomain (raw: any): Promise<User> {
    //const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      password: raw.password,
      role: raw.role,
    }, new UniqueEntityID(raw.base_user_id))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      base_user_id: user.id.toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }
    return a;
  }
}
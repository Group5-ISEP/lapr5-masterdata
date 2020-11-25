import { Result } from "../../core/logic/Result";
import IUserDTO from "../../dto/IUserDTO";

export default interface IUserService {
	getByEmail(email: string): Promise<Result<IUserDTO>>;
	createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
	updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}
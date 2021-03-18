import UserRepository from "../../infra/persistence/UserRepository";
import User from "../../domain/User";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";
import { 
    NO_USER_FOUND,
    PASSWORD_INCORRECT,
} from '../../constants/errorExceptions';

export const makeSignInUser = (
    userRepository: UserRepository
) => async (userNameOrEmail: string, password: string) => {
    const user: User = await userRepository.getUserByNameOrEmail(userNameOrEmail);
    
    if (!user) {
        throw new Error(NO_USER_FOUND);
    }

    if (!userRepository.comparePasswords(password, user.password)) {
        throw new Error(PASSWORD_INCORRECT);
    }

    return user.id;
};

const signInUser = makeSignInUser(new UserMongoRepository());

export default signInUser;
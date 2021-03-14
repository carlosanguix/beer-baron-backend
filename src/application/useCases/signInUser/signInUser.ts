import UserRepository from "../../../infra/persistence/UserRepository";
import User from "../../../domain/User";
import UserMongoRepository from "../../../infra/persistence/UserMongoRepository";

const makeSignInUser = (
    userRepository: UserRepository
) => async (userNameOrEmail: string, password: string) => {
    const user: User = await userRepository.getUserByNameOrEmail(userNameOrEmail);
    
    if (!user || 
        !userRepository.comparePasswords(password, user.password)) {
        throw new Error('Name or password are incorrects');
    }

    return user.id;
};

const signInUser = makeSignInUser(new UserMongoRepository());

export default signInUser;
import UserRepository from "../../infra/persistence/UserRepository";
import User from "../../domain/User";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";

export const makeSignInUser = (
    userRepository: UserRepository
) => async (userNameOrEmail: string, password: string) => {
    const user: User = await userRepository.getUserByNameOrEmail(userNameOrEmail);
    
    if (!user) {
        throw new Error('No user found');
    }

    if (!userRepository.comparePasswords(password, user.password)) {
        throw new Error('Password incorrect');
    }

    return user.id;
};

const signInUser = makeSignInUser(new UserMongoRepository());

export default signInUser;
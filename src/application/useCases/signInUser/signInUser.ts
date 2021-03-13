import UserRepository from "../../../infra/persistence/UserRepository";
import User from "../../../domain/User";
import UserMongoRepository from "../../../infra/persistence/UserMongoRepository";

const makeSignInUser = (
    userRepository: UserRepository
) => async (userNameOrEmail: string, password: string) => {
    const user: User = await userRepository.getByNameOrEmail(userNameOrEmail);
    
    if (!user) {
        throw new Error('Not found');
    }

    if (!userRepository.comparePasswords(password, user.password)) {
        throw new Error('Incorrect password');
    }

    const userFormatted = {
        name: user.name,
        surname: user.surname,
        email: user.email,
    };

    return userFormatted;
};

const signInUser = makeSignInUser(new UserMongoRepository());

export default signInUser;
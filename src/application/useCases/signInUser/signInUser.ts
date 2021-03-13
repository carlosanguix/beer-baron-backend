import UserRepository from "../../../domain/user.repository";
import UserMongo from "../../../infra/persistence/userMongo.datasource";
import User from "../../../domain/User";

const signInUser = (
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

const signInUserWithRepository = signInUser(new UserMongo());

export default signInUserWithRepository;
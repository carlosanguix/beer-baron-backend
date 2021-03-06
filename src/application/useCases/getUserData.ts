import UserRepository from "../../infra/persistence/UserRepository";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";
import User from "../../domain/User";

const makeGetUserData = (
    userRepository: UserRepository
) => async (id: string) => {
    const user: User = await userRepository.getUserById(id);

    if (!user) {
        throw new Error('No user found with that id');
    }

    return {
        name: user.name,
        surname: user.surname,
        email: user.email,
    };
};

const getUserData = makeGetUserData(new UserMongoRepository());

export default getUserData;
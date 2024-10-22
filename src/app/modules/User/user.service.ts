import { User } from "./user.model";


const getAllUser = async () => {
    const result = await User.find();
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await User.findById(id);
    console.log("userr",result)
    return result;
};

const updateUser = async(
    payload: Record<string, unknown>,
    id: string
) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    
    return result;
};


export const UserService = {
    updateUser,
    getAllUser,
    getSingleUser,
    
};
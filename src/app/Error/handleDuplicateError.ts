import { TErrorSources } from "../interfase/error";


const handleDuplicateError = (err: any) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorSources: TErrorSources = [
        {
            path: "",
            message: `${extractMessage} already exists`,
        },
    ];

    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSources,
    };
};

export default handleDuplicateError;
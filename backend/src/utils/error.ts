export const createError = (status:any, message:any) => {
    const err = new Error();
    err.name = status;
    err.message = message;
    return err;
};
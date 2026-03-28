export const miscOperations = {
    // Instead of a string, use a function that returns a string
    login: (user: string, pass: string) => `login/${user}/${pass}`,
};

// exports.miscOperations = {
//     login: (user: string, pass: string) => `login/${user}/${pass}`,
// }
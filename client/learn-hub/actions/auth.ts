export const isTutor = async (validateToken : string): Promise<boolean> => {
    if (validateToken === 'tutor') {
        return true;
    }

    return false;
}

export const isUser = async (validateToken : string): Promise<boolean> => {
    if (validateToken === 'user') {
        return true;
    }

    return false;
}

export const isAdmin = async (validateToken : string): Promise<boolean> => {
    if (validateToken === 'admin') {
        return true;
    }

    return false;
}
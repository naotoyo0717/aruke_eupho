import getCurrentUser from './getCurrentUser';

export default async function GetUserId() {
    const currentUser = await getCurrentUser();

    if (currentUser && currentUser.id) {
        return currentUser.id;
    } else {
        throw new Error('User not found');
    }
}


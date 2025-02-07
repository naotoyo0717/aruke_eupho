export const fetchPostContact = async (email: string, title: string, content: string) => {
    try {
        const response = await fetch('/api/postContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                title: title,
                content: content,
            }),
        });
        if(!response.ok) {
            throw new Error('postContactが失敗しました。');
        }
        console.log("成功");
        return true;
    } catch (error) {
        console.error('postContactに失敗しました。',error);
        return false;
    }
}
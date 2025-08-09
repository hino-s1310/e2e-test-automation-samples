// ログインテスト用ユーザーデータ
export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const loginUsers: User[] = [
    {
        name: '山田一郎',
        email: 'ichiro@example.com',
        password: 'password',
        confirmPassword: 'password'
    },
    {
        name: '松本さくら',
        email: 'sakura@example.com',
        password: 'pass1234',
        confirmPassword: 'pass1234'
    },
    {
        name: '林潤',
        email: 'jun@example.com',
        password: 'pa55w0rd!',
        confirmPassword: 'pa55w0rd!'
    },
    {
        name: '木村良樹',
        email: 'yoshiki@example.com',
        password: 'pass-pass',
        confirmPassword: 'pass-pass'
    },
];

export const signupUsers: User[] = [
    {
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
        confirmPassword: 'password'
    },
];

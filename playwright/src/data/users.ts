// ログインテスト用ユーザーデータ
export interface User {
    name: string;
    email: string;
    password: string;
}

export const testUsers: User[] = [
    {
        name: '鈴木一郎',
        email: 'ichiro@example.com',
        password: 'password'
    },
    {
        name: '松本さくら',
        email: 'sakura@example.com',
        password: 'pass1234'
    },
    {
        name: '林潤',
        email: 'jun@example.com',
        password: 'pa55w0rd!'
    },
    {
        name: '木村良樹',
        email: 'yoshiki@example.com',
        password: 'pass-pass'
    },
];

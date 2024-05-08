/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: {
                    label: 'password',
                    type: 'password',
                    required: true,
                },
            },
            async authorize(credentials: any) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}api/v1/login`,
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
                const _res = await response.json();

                if (_res.success === false) {
                    console.log('_res success false', _res);
                    throw new Error(
                        JSON.stringify({ errors: _res.msg, status: false }),
                    );
                } else {
                    console.log('res', _res);
                    const user = {
                        user_info: _res.user,
                        token_info: _res.token,
                    };

                    return user as unknown as User;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('[signIn][user]', user);
            console.log('[signIn][account]', account);
            console.log('[signIn][profile]', profile);
            console.log('[signIn][email]', email);
            console.log('[signIn][credentials]', credentials);

            return true;
        },

        async jwt({ token, account, user }: any) {
            console.log('[jwt][token]', token);
            console.log('[jwt][account]', account);
            console.log('[jwt][user]', user);

            if (account?.provider == 'google') {
                const email = user?.email;
                const name = user?.name;
                const google_id = user?.id;

                const data = {
                    email: email,
                    name: name,
                    google_id: google_id,
                };

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}api/v1/login-google`,
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
                const _res = await response.json();

                if (_res.success === false) {
                    console.log('_res success false google', _res);
                    return false;
                }
                console.log('res google', _res);

                const newToken = {
                    accessToken: '',
                };

                newToken.accessToken = _res?.token?.token;
                return newToken;
            }

            if (account) {
                token.accessToken = user?.token_info?.accessToken;
            }

            return token;
        },
        async session({ session, token, user }: any) {
            console.log('[session][session]', session);
            console.log('[session][token]', token);
            console.log('[session][user]', user);

            /*const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}api/admin/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                },
            );

            const _res = await response.json();
            if (_res.success === false) {
                throw new Error(
                    JSON.stringify({ errors: _res.msg, status: false }),
                );
            } else {
                const user = {
                    id: _res.user.id,
                    name: _res.user.first_name,
                    email: _res.user.email,
                    accessToken: token.accessToken,
                };

                session.user = user as User;
            }*/

            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

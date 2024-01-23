import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                parseUserObject: {}
            },
            async authorize(parseUserObject: any) {
                if(parseUserObject){
                    return parseUserObject
                }else{
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
};

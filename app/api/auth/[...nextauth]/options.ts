import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                parseUserToken: {}
            },
            async authorize(credentials:any) {
                let user = credentials?.parseUserToken;
                if(credentials?.parseUserToken){
                    return user;
                }else{
                   throw new Error("something went wrong!!");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
};

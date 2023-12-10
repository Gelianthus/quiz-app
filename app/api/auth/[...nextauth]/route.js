import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/models/User";
import mongoConnection from "@/lib/mongoConnection";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			try {
				await mongoConnection();
				const profileExist = await User.findOne({
					email: user.email,
				});
				if (!profileExist) {
					await User.create({
						email: user.email,
						username: user.name,
					});
					return true;
				}
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

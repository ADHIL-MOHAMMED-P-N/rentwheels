import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        /* to ask which google account on every time click on login */
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //On successfull signin
    async signIn({ profile }) {
      //1.connect to db
      await connectDB();
      //2.check if user exists
      const userExists = await User.findOne({ email: profile.email }); //after successfull sigin we get profile
      //3.If not add user to db
      if (!userExists) {
        //shorten the usename
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4.return true to allow sign in to
      return true;
    },
    //modifying the session object
    async session({ session }) {
      //1. Get user from db
      const user = await User.findOne({ email: session.user.email });
      //2. Assign the user id to session
      session.user.id = user._id.toString();
      //3. return session
      return session;
    },
  },
};

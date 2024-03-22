import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
/* useSession ReactJS hook that works only on client. So instead use getServerSession */
//use this function to get user from session
export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

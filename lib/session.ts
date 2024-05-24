import { getIronSession } from "iron-session"; 
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function loginWithId(user: { id: number }) {
  const session = await getSession();
  session.id = user.id;
  await session.save();
}
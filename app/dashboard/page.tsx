import { auth } from "@/libs/auth/auth";
import UserHomeScreen from "@/libs/pages/user/UserHomeScreen";
import { logout } from "@/libs/util/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  // Get session data, return to login if for some reason isnt logged in
  const session = await auth();
  if (!session?.user?.name) {
    await logout();
    redirect('/login');
  }

  return <UserHomeScreen username={session.user?.name}/>;
}
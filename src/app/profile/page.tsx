// pages/profile/index.tsx
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default function ProfilePage() {
  (async () => {
    const session = await getServerSession(authOptions);
  console.log('session edit data', session)
  })()



  return (
    <>
      <h1>Profile</h1>
      <div>
        <Link href="/profile/editPassword">
          <button>Edit Password</button>
        </Link>
      </div>
      <div>
        <Link href="/profile/editData">
          <button>Edit Data</button>
        </Link>
      </div>
    </>
  );
}

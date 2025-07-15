import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-gray-800 min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}

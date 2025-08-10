import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div>
      <Button variant="secondary" size="default" className="mt-8 rounded-full">
        <FcGoogle />
        FAZER LOGIN COM GOOGLE
      </Button>
    </div>
  );
}

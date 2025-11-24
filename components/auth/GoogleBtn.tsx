import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {};

export default function GoogleBtn({}: Props) {
  return (
    <Button
      className="border font-normal text-black"
      variant={"white"}
      type="button"
    >
      <FcGoogle />
      Continue with Google
    </Button>
  );
}

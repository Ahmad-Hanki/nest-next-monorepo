import { Button } from "./ui/button";

const GoogleButton = () => {
  return (
    <div>
      <Button variant={"outline"} asChild>
        <a href={`${process.env.NEXT_PUBLIC_REST_API_URL}/auth/google/login`}>
          Continue with Google
        </a>
      </Button>
    </div>
  );
};

export { GoogleButton };

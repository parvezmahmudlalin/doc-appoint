"use client";

import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log(data, error);

    if (error) {
      alert("Login failed");
      return;
    }

    if (data) {
      router.push("/");
      router.refresh(); // 
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // 
    });
  };

  return (
  <div className="max-w-2xl mt-12 p-5 mx-auto">
    <Card className="p-8 rounded-3xl shadow-2xl border border-white/40 bg-white/80 backdrop-blur-xl">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-600">
          Login
        </h1>

        <p className="text-gray-500 mt-2 text-sm">
          Access your account securely
        </p>
      </div>

      {/* Form */}
      <Form onSubmit={onSubmit} className="flex flex-col gap-5">

        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label>Password</Label>
          <Input placeholder="Enter password" />
          <FieldError />
        </TextField>

       
      

        {/* Login Button */}
        <Button
          type="submit"
          className="h-11 w-full bg-cyan-600 text-white"
        >
          Login
        </Button>
      </Form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <Separator className="flex-1" />
        <span className="text-sm text-gray-500">
          OR
        </span>
        <Separator className="flex-1" />
      </div>

      {/* Social Login */}
      <Button
        variant="bordered"
        onClick={handleGoogleSignin}
        className= "w-full flex items-center gap-2"
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      {/* Register Link */}
      <p className="text-center text-sm mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-cyan-600 font-semibold hover:underline"
        >
          Register
        </a>
      </p>

    </Card>
  </div>
);
};

export default LoginPage;
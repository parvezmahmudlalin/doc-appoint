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
      router.refresh(); // 🔥 IMPORTANT FIX
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // 🔥 IMPORTANT FIX
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-cyan-50 to-slate-100 px-4">
      <Card className="p-10 rounded-3xl shadow-2xl border border-white/40 bg-white/80 backdrop-blur-xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-cyan-600">
            DocAppoint
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Secure login to manage appointments
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-6">

          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="doctor@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter password" />
            <Description>Min 8 characters</Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="h-11 w-full bg-cyan-600 text-white"
          >
            Log in
          </Button>
        </Form>

        <div className="flex items-center gap-3 my-5">
          <Separator className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="bordered"
          onClick={handleGoogleSignin}
          className="w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
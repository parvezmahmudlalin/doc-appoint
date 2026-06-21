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
console.log(data,error )
    if (data) {
      router.push("/");
    }

    if (error) {
      alert("Login failed");
    }
  };


  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-cyan-50 to-slate-100 px-4">

      <Card className=" p-10 rounded-3xl shadow-2xl border border-white/40 bg-white/80 backdrop-blur-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-cyan-600">
            DocAppoint
          </h1>

          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            Secure login to manage your appointments and connect with trusted doctors
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-6">

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Email address
            </Label>

            <Input
              placeholder="doctor@example.com"
              className="h-11 rounded-xl border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "At least 8 characters required";
              }
              if (!/[A-Z]/.test(value)) {
                return "Include at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Include at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Password
            </Label>

            <Input
              placeholder="Enter your password"
              className="h-11 rounded-xl border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            <Description className="text-xs text-gray-500">
              Must contain 8+ characters, 1 uppercase letter, and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Login Button */}
          <Button
            type="submit"
            className="h-11 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
           Log in
          </Button>
        </Form>

        {/* Divider */}
      <div className="flex items-center gap-3 w-full">
  <Separator className="flex-1" />
  <div className="whitespace-nowrap text-sm text-gray-500">
    Or sign up with
  </div>
  <Separator className="flex-1" />
</div>

        {/* Google Login */}
        <Button
          
          variant="bordered" onClick={handleGoogleSignin}
          className="h-11 w-full rounded-xl border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} DocAppoint. All rights reserved.
        </p>

      </Card>
    </div>
  );
};

export default LoginPage;
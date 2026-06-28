"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Avatar,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";

const UpdateProfile = () => {
  const { data, refetch } = authClient.useSession();
  const user = data?.user;

  // Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || undefined,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }

      await refetch();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      {/* Open Button */}
      <Button
        color="primary"
        size="lg"
        className="font-semibold shadow-md"
      >
        <BiEdit className="text-lg" />
        Update Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-lg rounded-3xl overflow-hidden">
            <Modal.CloseTrigger />


            {/* Header */}
            <div className="bg-linear-to-r from-blue-500 to-red-100 p-8 text-white">
              <div className="flex flex-col items-center gap-3">
                <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Update Profile</h2>
                  <p className="text-sm text-white/80">
                    Keep your account information updated
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <Modal.Body className="p-6">
              <Surface
                variant="default"
                className="border rounded-2xl p-5 shadow-sm"
              >
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Name */}
                  <TextField>
                    <Label>Full Name</Label>
                    <Input
                     
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </TextField>

                  {/* Image URL */}
                  <TextField>
                    <Label>Profile Image URL</Label>
                    <Input
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/profile.jpg"
                    />
                  </TextField>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button slot="close" variant="flat">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      slot="close"
                      color="primary"
                      className="font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfile;
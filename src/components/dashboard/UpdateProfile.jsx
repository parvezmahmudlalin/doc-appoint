"use client";

import React from "react";
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

const UpdateProfile = () => {
  const { data, refetch } = authClient.useSession();

  const user = data?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const image = e.target.image.value.trim();

    try {
      const result = await authClient.updateUser({
        name,

        
        image: image || undefined,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }

      await refetch();

      toast.success("Profile updated successfully!");

    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
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

            <div className="bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 p-8 text-white">

              <div className="flex flex-col items-center gap-3">

                <Avatar
                  src={user?.image || undefined}
                  name={user?.name || "User"}
                  className="h-20 w-20 border-4 border-white/30"
                />

                <div className="text-center">

                  <h2 className="text-2xl font-bold">
                    Update Profile
                  </h2>

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

                <form
                  onSubmit={onSubmit}
                  className="space-y-5"
                >

                  {/* Name */}

                  <TextField>

                    <Label>
                      Full Name
                    </Label>

                    <Input
                      name="name"
                      defaultValue={user?.name ?? ""}
                      placeholder="Enter full name"
                    />

                  </TextField>

                  {/* Image */}

                  <TextField>

                    <Label>
                      Profile Image URL
                    </Label>

                    <Input
                      name="image"
                      defaultValue={user?.image ?? ""}
                      placeholder="https://example.com/profile.jpg"
                    />

                  </TextField>

                  {/* Email */}


                  {/* Buttons */}

                  <div className="flex justify-end gap-3 pt-4">

                    <Button
                      slot="close"
                      variant="flat"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      slot="close"
                      color="primary"
                      className="font-semibold"
                    >
                      Save Changes
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
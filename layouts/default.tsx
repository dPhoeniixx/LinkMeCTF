import {
  Link,
  NavbarContent,
  NavbarItem,
  Navbar,
  Button,
  NavbarBrand,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Head } from "./head";

import { LockIcon, MailIcon } from "@/components/icons";
import useUserInfo from "@/utils/useUserInfo";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useUserInfo();
  const [loggedIn, setLoggedIn] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isShowSignUpModel, setShowSignUpModel] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Replace with your actual endpoint
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        // @ts-ignore
        setUserInfo(data);
        setLoggedIn(data.hasOwnProperty("message"));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        isShowSignUpModel == "false" ? "/api/auth/signin" : "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        },
      );

      if (response.ok) {
        toast(
          isShowSignUpModel == "true"
            ? "Your sign-up was successful and you are now automatically logged in."
            : "Your sign-in was successful.",
        );
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        toast((await response.json()).message);
      }
    } catch (error) {
      // @ts-ignore
      toast(error.message);
    }
  };

  // @ts-ignore
  // @ts-ignore
  const safeUserInfo: Exclude<UserInfoType, Function> = userInfo as Exclude<UserInfoType, Function>;

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          {!loggedIn && (
            <NavbarItem>
              <Link aria-current="page" href="/settings">
                Settings
              </Link>
            </NavbarItem>
          )}
          <NavbarItem>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {loggedIn ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link
                  onPress={() => {
                    setShowSignUpModel("false");
                    onOpen();
                  }}
                >
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  onPress={() => {
                    setShowSignUpModel("true");
                    onOpen();
                  }}
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href={`/profile/${safeUserInfo.id}`}>Your Link</Link>
              </NavbarItem>

              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="#"
                  variant="flat"
                  onPress={() => {
                    fetch("/api/auth/logout")
                      .then(() => location.reload())
                      .catch((error) => console.error(error));
                  }}
                >
                  Log out
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isShowSignUpModel == "true" ? <>Sign Up</> : <>Sign In</>}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={<MailIcon />}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  endContent={<LockIcon />}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSubmit()}>
                  {isShowSignUpModel == "true" ? <>Sign Up</> : <>Sign In</>}
                </Button>
                <ToastContainer />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <main className=" mx-auto max-w-7xl px-6 flex-grow">{children}</main>
    </div>
  );
}

import {
  Link,
  button as buttonStyles,
  Input,
  Modal,
  ModalContent,
  Button,
  ModalBody,
  useDisclosure,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { title } from "@/components/primitives";
import { MailIcon, LockIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Create&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
          <br />
          <h1 className={title()}>Public Figure Profile.</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}

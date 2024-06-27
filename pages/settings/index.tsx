import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tab,
  Image,
  Tabs,
  Textarea,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import useUserInfo from "@/utils/useUserInfo";
import DefaultLayout from "@/layouts/default";
import "react-toastify/dist/ReactToastify.css";

export default function DocsPage({}) {
  const [userInfo, updateUserInfo] = useUserInfo();
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("/api/captcha");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const refreshCaptcha = () => {
    setCaptchaUrl(`/api/captcha?_=${Date.now()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    let body = { ...userInfo, captcha: captchaInput };

    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      alert((await response.json()).message);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <DefaultLayout>
      <Tabs aria-label="Options">
        <Tab key="publicInfo" title="Public Info">
          <Card>
            <CardBody>
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  type="text"
                  value={userInfo.firstName}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  type="text"
                  value={userInfo.lastName}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Job"
                  name="job"
                  placeholder="Enter your job"
                  type="text"
                  value={userInfo.job}
                  onChange={handleChange}
                />
                <Textarea
                  className="max-w-xs"
                  label="Bio"
                  name="bio"
                  placeholder="Enter your bio"
                  value={userInfo.bio}
                  onChange={handleChange}
                />

                <Button fullWidth color="primary" onPress={onOpen}>
                  Save
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="publicAccounts" title="Public Accounts">
          <Card>
            <CardBody>
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Linkedin Handle"
                  name="linkedInId"
                  placeholder="@linkedin"
                  type="email"
                  value={userInfo.linkedInId}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Hackerone Handle"
                  name="HackerOneHandle"
                  placeholder="@hackerone"
                  type="text"
                  value={userInfo.HackerOneHandle}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Bugcrowd Handle"
                  name="BugCrowdHandle"
                  placeholder="@bugcrowd"
                  type="text"
                  value={userInfo.BugCrowdHandle}
                  onChange={handleChange}
                />

                <Button fullWidth color="primary" onPress={onOpen}>
                  Save
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Modal
        closeButton
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 id="modal-title">Verify CAPTCHA</h1>
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="Captcha"
                  height="80px"
                  src={captchaUrl}
                  width="100%"
                />
                <Button color="default" onPress={refreshCaptcha}>
                  Refresh CAPTCHA
                </Button>
                <Input
                  fullWidth
                  color="primary"
                  placeholder="Enter CAPTCHA"
                  size="lg"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    handleSaveInfo();
                    onClose();
                  }}
                >
                  Verify
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DefaultLayout>
  );
}

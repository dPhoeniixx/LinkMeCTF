import { useState, useEffect } from "react";

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  job: string;
  linkedInId: string;
  HackerOneHandle: string;
  BugCrowdHandle: string;
};

function useUserInfo(): [UserInfo, (newUserInfo: UserInfo) => void] {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    firstName: "",
    lastName: "",
    bio: "",
    job: "",
    linkedInId: "",
    HackerOneHandle: "",
    BugCrowdHandle: "",
  });

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  };

  return [userInfo, updateUserInfo];
}

export default useUserInfo;
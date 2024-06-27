import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";

import { Head } from "@/layouts/head";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    job: "",
    linkedInId: "",
    HackerOneHandle: "",
    BugCrowdHandle: "",
  });

  const handleDownload = () => {
    // Create an anchor element
    const a = document.createElement('a');
    a.href = "/api/screenshot";
    a.download = "card.png"; // Provide a default file name if none is provided
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!slug) {
        // Early return if slug is undefined or not yet available
        return;
      }
      try {
        const response = await fetch("/api/user/" + slug);
        const data = await response.json();

        setUserInfo(data);
        document.body.setAttribute("data-loaded", "true");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserData();
  }, [slug]);

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        <div className="container">
          <div className="card-container">
            <div className="descripcion">
              <h1>
                {userInfo.firstName} {userInfo.lastName}
              </h1>
              <h2>{userInfo.job}</h2>
              <p>{userInfo.bio}</p>
              <div className="icons justify-center flex">
                {userInfo.HackerOneHandle && (
                  <Link>
                    <svg
                      height="24"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        paddingRight: "3px",
                      }}
                      viewBox="0 0 512 512"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect fill="#ffffff" height="512" rx="15%" width="512" />
                      <path d="M174 56c-10 1-23 5-25 16v367c2 9 11 15 20 16h14c9-2 20-7 21-17a116708 116708 0 0 0 0-366c-3-11-15-15-25-16h-5zM333 200c-7 1-13 2-17 5l-74 47c-4 3-5 8-5 12 2 12 8 21 17 27 7 4 18 7 25 2l29-19v165c3 10 12 15 21 17h10c9-2 19-5 23-14l1-3a18494 18494 0 0 0 0-222c-1-12-16-16-26-17h-4z" />
                    </svg>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "12px",
                        verticalAlign: "middle",
                      }}
                    >
                      @{userInfo.HackerOneHandle}
                    </span>
                  </Link>
                )}
                {userInfo.BugCrowdHandle && (
                  <Link>
                    <svg
                      height="24"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        paddingRight: "3px",
                      }}
                      viewBox="0 0 512 512"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect fill="#ffffff" height="512" rx="15%" width="512" />
                      <path
                        d="m38.5 260.4 107.1 185.1h219.5l109.1-185.1L365.1 66.5H145.6zm178.7-115.7c7.6 4.7 8.1 8.3 8.1 47v31.2l6.8-6.2c3.8-3.4 11.1-8.1 16.3-10.7c8.4-3.9 11.6-4.4 26.6-4.2c18.2 0 28.5 3 41.6 12.2c13.5 9.5 25.7 31.1 29.1 51.2c7.3 44.7-9.2 83.6-42.2 99.3c-10.9 5.1-12.7 5.4-30.2 5.4c-16.5 0-19.8-.5-28.1-4.4c-5.1-2.4-12.2-7.2-15.6-10.4l-6.5-5.9v18.1h-38.6V273c0-51.9-.5-94.9-1.2-95.5c-.6-.7-5.2-1.7-10-2.2l-8.8-.9V158.6c-.2-11.1.5-16.2 1.8-17c1.2-.7 11.9-1 23.7-.9c18.5.4 22.2.9 27.2 4zM258 236.4c-22.3 5.2-33.9 22.7-33.5 50.9c.2 28 14.6 47.6 36 49.1c13.8 1 22.5-1.9 31.3-10.7c18.4-18 19-59.2 1.4-77.9c-8.9-9.3-23.7-14.1-35.2-11.4z"
                        fill="#f26922"
                      />
                    </svg>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "12px",
                        verticalAlign: "middle",
                      }}
                    >
                      @{userInfo.BugCrowdHandle}
                    </span>
                  </Link>
                )}
                {userInfo.linkedInId && (
                  <Link>
                    <svg
                      height="24"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        backgroundColor: "#FFF",
                        borderRadius: "3px",
                      }}
                      viewBox="0 0 48 48"
                      width="24"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                      y="0px"
                    >
                      <path
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"
                        fill="#0078d4"
                      />
                      <path
                        d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364 c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274 L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479 C18,16.523,16.521,18,14.485,18H18v19H11z"
                        opacity=".05"
                      />
                      <path
                        d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677 c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638 c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001 c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                        opacity=".07"
                      />
                      <path
                        d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12 c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698 c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19 c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                        fill="#fff"
                      />
                    </svg>

                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "12px",
                        verticalAlign: "middle",
                        paddingLeft: "3px",
                      }}
                    >
                      @{userInfo.linkedInId}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button onPress={handleDownload}>Print Card</Button>
      </main>
    </div>
  );
};

export default ProfilePage;

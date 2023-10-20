import { useEffect, useState } from "react";
import { BACKEND_API_URL , UI_RPC_METHOD_USER_READ } from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { useBackgroundClient } from "@coral-xyz/recoil";
import { Typography } from "@mui/material";

import { useNavigation } from "../../../common/Layout/NavStack";

export function ChangeName() {
  const nav = useNavigation();
  const background = useBackgroundClient();
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  useEffect(() => {
    const title = nav.title;
    nav.setOptions({ headerTitle: "Change Name" });
    return () => {
      nav.setOptions({ headerTitle: title });
    };
  }, []);

  useEffect(() => {
    async function getNames() {
      const userCredentials = await background.request({
        method: UI_RPC_METHOD_USER_READ,
        params: [],
      });
      const user = await fetch(`${BACKEND_API_URL}/users/me`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + userCredentials.jwt,
          "Content-Type": "application/json",
        },
      });
      const userData = await user.json();
      setCurrentFirstName(userData.firstname);
      setCurrentLastName(userData.lastname);
      setNewFirstName(userData.firstname);
      setNewLastName(userData.lastname);
    }
    getNames();
  }, []);

  const changeName = async () => {
    const userCredentials = await background.request({
      method: UI_RPC_METHOD_USER_READ,
      params: [],
    });
    const body = JSON.stringify({
      firstname: newFirstName,
      lastname: newLastName,
    });
    const res = await fetch(`${BACKEND_API_URL}/users/changeName`, {
      method: "PUT",
      //@ts-ignore
      body: body,
      headers: {
        authorization: "Bearer " + userCredentials.jwt,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeName();
        }}
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <div style={{ flex: 1, flexGrow: 1 }}>
          <Typography align="center" sx={{ marginBottom: "10px" }}>
            First Name
          </Typography>
          <Inputs error={false}>
            <InputListItem
              isFirst
              isDisabled
              cursor="not-allowed"
              value={currentFirstName}
              onChange={(e) => {}}
              placeholder="First Name"
              type="text"
              button={false}
              title="Current"
            />
            <InputListItem
              isLast
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="Enter New First Name"
              type="text"
              button={false}
              title="New"
            />
          </Inputs>
          <Typography
            align="center"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Last Name
          </Typography>
          <Inputs error={false}>
            <InputListItem
              isFirst
              isDisabled
              cursor="not-allowed"
              value={currentLastName}
              onChange={(e) => {}}
              placeholder="Last Name"
              type="text"
              button={false}
              title="Current"
            />
            <InputListItem
              isLast
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder="Enter New Last Name"
              type="text"
              button={false}
              title="New"
            />
          </Inputs>
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton label="Change name" type="submit" disabled={false} />
        </div>
      </form>
    </div>
  );
}

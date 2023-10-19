import { useEffect, useState } from "react";
import {
 BACKEND_API_URL,  UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
  UI_RPC_METHOD_PASSWORD_UPDATE } from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { useBackgroundClient } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { Button, Typography } from "@mui/material";

import { SubtextParagraph } from "../../../common";
import { useDrawerContext } from "../../../common/Layout/Drawer";
import { useNavigation } from "../../../common/Layout/NavStack";

export function ChangeName() {
  const theme = useCustomTheme();
  const { close } = useDrawerContext();
  const nav = useNavigation();
  const background = useBackgroundClient();
  const [currentPassword, setCurrentPassword] = useState("");
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
    // const res = await fetch(`${BACKEND_API_URL}/users`, {
    //   method: "POST",
    //   credentials: "omit",
    //   body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  }, []);

  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (async () => {
            const isCurrentCorrect = await background.request({
              method: UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
              params: [currentPassword],
            });

            // setCurrentPasswordError(!isCurrentCorrect);
            // setPasswordMismatchError(mismatchError);

            // if (!isCurrentCorrect || mismatchError) {
            //   return;
            // }

            // await background.request({
            //   method: UI_RPC_METHOD_PASSWORD_UPDATE,
            //   params: [currentPassword, newPw1],
            // });

            close();
          })();
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

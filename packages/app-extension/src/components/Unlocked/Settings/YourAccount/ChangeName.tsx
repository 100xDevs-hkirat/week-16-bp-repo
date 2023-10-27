import { useEffect, useState } from "react";
import {
  UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
  UI_RPC_METHOD_PASSWORD_UPDATE,
} from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { useAuthentication, useBackgroundClient, useUser } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { Button, Typography } from "@mui/material";

import { SubtextParagraph } from "../../../common";
import { useDrawerContext } from "../../../common/Layout/Drawer";
import { useNavigation } from "../../../common/Layout/NavStack";

export function ChangeName() {
  const theme = useCustomTheme();
  const { close } = useDrawerContext();
  const nav = useNavigation();
  const { checkAuthentication } = useAuthentication();
  const user = useUser();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const background = useBackgroundClient();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newfirstname, setNewfirstname] = useState("");
  const [newlastname, setNewlastname] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const missingNewName = newfirstname.trim() === "" && newlastname.trim() === "";

  useEffect(() => {
    const title = nav.title;
    nav.setOptions({ headerTitle: "Change name" });
    (async () => {
      const result = user.jwt ? await checkAuthentication(user.jwt) : null;
      if(result) {
        setFirstname(result.firstname)
        setLastname(result.lastname);
      }
    })();
    return () => {
      nav.setOptions({ headerTitle: title });
    };
  }, [user]);

  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          
        }}
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <div style={{ flex: 1, flexGrow: 1 }}>
          <Inputs error={currentPasswordError}>
            <InputListItem
              isFirst
              isLast
              value={newfirstname}
              onChange={(e) => setNewfirstname(e.target.value)}
              placeholder={`${firstname}`}
              type="text"
              button={false}
              title="First"
            />
            <InputListItem
              isLast
              value={newlastname}
              onChange={(e) => setNewlastname(e.target.value)}
              placeholder={`${lastname}`}
              type="text"
              button={false}
              title="Last"
            />
          </Inputs>

        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton
            label="Change name"
            type="submit"
            disabled={missingNewName}
          />
        </div>
      </form>
    </div>
  );
}

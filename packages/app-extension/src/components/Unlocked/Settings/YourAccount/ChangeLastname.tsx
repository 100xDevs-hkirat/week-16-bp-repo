import { useEffect, useState } from "react";
import {
  BACKEND_API_URL,
  UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
  UI_RPC_METHOD_PASSWORD_UPDATE,
} from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { useBackgroundClient } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { Button, Typography } from "@mui/material";
import { resolve } from "dns";

import { SubtextParagraph } from "../../../common";
import { useDrawerContext } from "../../../common/Layout/Drawer";
import { useNavigation } from "../../../common/Layout/NavStack";

export const ChangeLastname = () => {
  const [lastname, setLastname] = useState("");

  const init = async () => {
    const response = await fetch(`${BACKEND_API_URL}/users/me`);
    const json = await response.json();

    if (!response.ok) throw new Error(json.message || "There was an error");
    setLastname(json.lastname);
    console.log(JSON.stringify(json));
    console.log("firstname", json.firstname);
    console.log("lastname", json.lastname);
  };
  useEffect(() => {
    init();
  }, []);
  const handleOnClick = () => {
    init();
  };
  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("new lastname", lastname);
          (async () => {
            const response = await fetch(`${BACKEND_API_URL}/users/profile`, {
              method: "POST",
              body: JSON.stringify({
                lastname,
              }),
              headers: {
                "Content-type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error("failed to update");
            }
            const res = await response.json();
            console.log(res);
          })();
        }}
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <div style={{ flex: 1, flexGrow: 1 }}>
          <InputListItem
            // isFirst
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter New Lastname"
            button={false}
            title="New"
          />
          {/* </Inputs> */}
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton
            label="Change Lastname"
            type="submit"
            // disabled={missingNewPw}
          />
        </div>
      </form>
    </div>
  );
};

import { useEffect, useState } from "react";
import {
  BACKEND_API_URL,
  UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
  UI_RPC_METHOD_PASSWORD_UPDATE,
} from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { metadataAtom, useBackgroundClient } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { Button, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

import { SubtextParagraph } from "../../../common";
import { useDrawerContext } from "../../../common/Layout/Drawer";
import { useNavigation } from "../../../common/Layout/NavStack";

export function ChangeName() {
  const theme = useCustomTheme();
  const { close } = useDrawerContext();
  const nav = useNavigation();
  const [metaData, setMetaData] = useRecoilState(metadataAtom);
  const [firstname, setFirstname] = useState(metaData.firstname);
  const [lastname, setLastname] = useState(metaData.lastname);
  const [lNameError, setLNameError] = useState(false);
  const [fNameError, setFNameError] = useState(false);

  useEffect(() => {
    const title = nav.title;
    nav.setOptions({ headerTitle: "Change Firstname/Lastname" });
    return () => {
      nav.setOptions({ headerTitle: title });
    };
  }, []);

  return (
    <div style={{ paddingTop: "16px", height: "100%", margin: "16px" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (async () => {
            // const isCurrentCorrect = await background.request({
            //   method: UI_RPC_METHOD_KEYRING_STORE_CHECK_PASSWORD,
            //   params: [currentPassword],
            // });fetch
            setMetaData({ firstname, lastname });
            const response = await fetch(`${BACKEND_API_URL}/users/metadata`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                firstname,
                lastname,
              }),
            });

            const json = await response.json();
            console.log(json);

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
          <Inputs error={fNameError}>
            <InputListItem
              isFirst
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="firstname"
              type="text"
              button={false}
              title="Firstname"
            />
            <InputListItem
              isLast
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="lastname"
              type="text"
              button={false}
              title="Lastname"
            />
          </Inputs>
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton label="Update Firstname/Lastname" type="submit" />
        </div>
      </form>
    </div>
  );
}

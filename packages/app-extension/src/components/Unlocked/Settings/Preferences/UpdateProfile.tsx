import { useEffect, useState } from "react";
import { BACKEND_API_URL,UI_RPC_METHOD_KEYRING_AUTO_LOCK_SETTINGS_UPDATE  } from "@coral-xyz/common";
import {
  ListItem,
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from "@coral-xyz/react-common";
import { metatdataAtom,useAutoLockSettings, useBackgroundClient  } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { LockClock } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { send } from "process";
import { useRecoilState, useRecoilValue } from "recoil";

import { useNavigation } from "../../../common/Layout/NavStack";

import { Checkmark } from "./Solana/ConnectionSwitch";

export function UpdateProfile() {
  const nav = useNavigation();
  const theme = useCustomTheme();
  const initialMetadata = useRecoilValue(metatdataAtom);
  const [metadata, setMetadata] = useRecoilState(metatdataAtom);
  const [firstName, setFirstName] = useState(initialMetadata.firstName);
  const [lastName, setLastName] = useState(initialMetadata.lastName);
  useEffect(() => {
    nav.setOptions({ headerTitle: "Update User" });
  }, []);

  const updateProfile = async () => {
    const response = await fetch(`${BACKEND_API_URL}/users/metadata`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    });
    setMetadata({
      firstName,
      lastName,
    });

    nav.pop();
  };

  return (
    <div
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textAlign: "center",
        alignContent: "center",
        color: theme.custom.colors.secondary,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridAutoRows: "max-content",
          rowGap: 12,
        }}
      >
        <div style={{ marginBottom: -2 }}>
          <TextInput
            placeholder="First Name"
            type="string"
            required={false}
            error={false}
            value={firstName}
            setValue={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextInput
            placeholder="Last Name"
            type="string"
            required={false}
            error={false}
            value={lastName}
            setValue={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <PrimaryButton label="Set" type="submit" onClick={updateProfile} />
      </div>
    </div>
  );
}

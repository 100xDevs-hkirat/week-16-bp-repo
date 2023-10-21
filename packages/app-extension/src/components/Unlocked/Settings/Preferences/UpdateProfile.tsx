import { useEffect, useState } from "react";
import { UI_RPC_METHOD_KEYRING_AUTO_LOCK_SETTINGS_UPDATE } from "@coral-xyz/common";
import {
  ListItem,
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from "@coral-xyz/react-common";
import { useAutoLockSettings, useBackgroundClient } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { LockClock } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { useNavigation } from "../../../common/Layout/NavStack";

import { Checkmark } from "./Solana/ConnectionSwitch";

export function UpdateProfile() {
  const nav = useNavigation();
  const theme = useCustomTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    nav.setOptions({ headerTitle: "Update User" });
  }, []);

  const save = async (e?: React.FormEvent) => {
    // fetch reqeust
    nav.pop();
  };

  return (
    <form
      onSubmit={save}
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
            placeholder="First name"
            type="string"
            required={false}
            error={false}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={firstName}
            setValue={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: -2 }}>
          <TextInput
            placeholder="Last name"
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
        <PrimaryButton label="Set" type="submit" />
      </div>
    </form>
  );
}

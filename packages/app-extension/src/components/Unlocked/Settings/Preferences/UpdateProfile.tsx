import { useState } from "react";
import { BACKEND_API_URL } from "@coral-xyz/common";
import { PrimaryButton, TextInput } from "@coral-xyz/react-common";
import { metadataAtom } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { useRecoilValue } from "recoil";

import { useNavigation } from "../../../common/Layout/NavStack";

export function PreferencesUpdateProfile() {
  const theme = useCustomTheme();
  const nav = useNavigation();
  const initialMetaData = useRecoilValue(metadataAtom);
  const [firstName, setFirstName] = useState(initialMetaData.firstName);
  const [lastName, setLastName] = useState(initialMetaData.lastName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${BACKEND_API_URL}/users/metadata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      nav.pop();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
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
            required
            error={false}
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
            required
            error={false}
            value={lastName}
            setValue={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <PrimaryButton label="Update" type="submit" />
      </div>
    </form>
  );
}

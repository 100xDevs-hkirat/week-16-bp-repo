import { useState } from "react";
import { BACKEND_API_URL } from "@coral-xyz/common";
import { PrimaryButton, TextInput } from "@coral-xyz/react-common";
import { userMetadata } from "@coral-xyz/recoil";
import { useRecoilState, useRecoilValue } from "recoil";

import { useNavigation } from "../../common/Layout/NavStack";

export const UpdateProfile = () => {
  const [metadata, setMetadata] = useRecoilState(userMetadata);
  const [firstName, setFirstName] = useState(metadata?.firstName || "");
  const [lastName, setLastName] = useState(metadata?.lastName || "");
  const nav = useNavigation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "16px",
      }}
    >
      <div>
        <TextInput
          value={firstName}
          placeholder="first name"
          type="string"
          setValue={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextInput
          value={lastName}
          placeholder="last name"
          type="string"
          setValue={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <PrimaryButton
        label="Update"
        type="submit"
        onClick={async () => {
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
        }}
      />
    </div>
  );
};

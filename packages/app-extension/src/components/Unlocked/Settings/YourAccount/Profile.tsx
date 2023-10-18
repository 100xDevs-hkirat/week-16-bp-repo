import { useEffect, useState } from "react";
import {
  BACKEND_API_URL,
  UI_RPC_METHOD_USER_PROFILE_UPDATE,
} from "@coral-xyz/common";
import { InputListItem, Inputs, PrimaryButton } from "@coral-xyz/react-common";
import { useBackgroundClient, useUserProfile } from "@coral-xyz/recoil";
import { Box, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";

import { useDrawerContext } from "../../../common/Layout/Drawer";
import { useNavigation } from "../../../common/Layout/NavStack";

const Profile = () => {
  const nav = useNavigation();
  const userProfile = useUserProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const background = useBackgroundClient();
  const { close } = useDrawerContext();

  useEffect(() => {
    const title = nav.title;
    nav.setOptions({ headerTitle: "Update User Profile" });
    if (userProfile) {
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
    }
    return () => {
      nav.setOptions({ headerTitle: title });
    };
  }, []);

  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          (async () => {
            await background.request({
              method: UI_RPC_METHOD_USER_PROFILE_UPDATE,
              params: [firstName, lastName],
            });
          })();
          close();
        }}
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <div style={{ flex: 1, flexGrow: 1 }}>
          <Inputs error={false}>
            <InputListItem
              isFirst
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder=""
              type="text"
              button={false}
              title="F. Name"
            />
            <InputListItem
              isLast
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder=""
              type="text"
              button={false}
              title="L. Name"
            />
          </Inputs>
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton
            label="Change profile"
            type="submit"
            disabled={firstName.length === 0 ? lastName.length === 0 : null}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;

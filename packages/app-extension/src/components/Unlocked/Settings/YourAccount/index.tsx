import { useEffect } from "react";
import { useKeyringHasMnemonic } from "@coral-xyz/recoil";

import { useNavigation } from "../../../common/Layout/NavStack";
import { SettingsList } from "../../../common/Settings/List";

export function YourAccount() {
  const nav = useNavigation();
  const hasMnemonic = useKeyringHasMnemonic();

  const menuItems = {
    "Change Password": {
      onClick: () => nav.push("change-password"),
    },
    "Change Firstname": {
      onClick: () => nav.push("change-firstname"),
    },
    "Change Lastname": {
      onClick: () => nav.push("change-lastname"),
    },
    ...(hasMnemonic
      ? {
          "Show Secret Recovery Phrase": {
            onClick: () => nav.push("show-secret-phrase-warning"),
          },
        }
      : {}),
    "Log out": {
      onClick: () => nav.push("logout"),
    },
  };

  useEffect(() => {
    nav.setOptions({ headerTitle: "Your Account" });
  }, []);

  return <SettingsList menuItems={menuItems} />;
}

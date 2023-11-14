import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "@coral-xyz/common";
import { InputListItem, PrimaryButton } from "@coral-xyz/react-common";

export const ChangeFirstname = () => {
  const [firstname, setFirstname] = useState("");

  const init = async () => {
    const response = await fetch(`${BACKEND_API_URL}/users/me`);
    const json = await response.json();

    if (!response.ok) throw new Error(json.message || "There was an error");
    setFirstname(json.firstname);
    console.log(JSON.stringify(json));
    console.log(json.firstname);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ paddingTop: "16px", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("new firstname", firstname);
          (async () => {
            const res = await fetch(`${BACKEND_API_URL}/users/profile`, {
              method: "POST",
              body: JSON.stringify({
                firstname,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            if (!res.ok) {
              throw new Error("failed to fetch");
            }
            const obj = await res.json();
            console.log(obj);
          })();
        }}
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <div style={{ flex: 1, flexGrow: 1 }}>
          <InputListItem
            // isFirst
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter New Firstname"
            button={false}
            title="New"
          />
          {/* </Inputs> */}
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryButton
            label="Change Firstname"
            type="submit"
            // disabled={missingNewPw}
          />
        </div>
      </form>
    </div>
  );
};

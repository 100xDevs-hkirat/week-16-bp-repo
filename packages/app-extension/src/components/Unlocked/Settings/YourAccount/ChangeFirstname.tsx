import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "@coral-xyz/common";

export const ChangeFirstname = () => {
  const [lastname, setLastname] = useState("");

  const init = async () => {
    const response = await fetch(`${BACKEND_API_URL}/users/userById`);
    const json = await response.json();

    if (!response.ok) throw new Error(json.message || "There was an error");
    console.log(JSON.stringify(json));
  };
  useEffect(() => {
    init();
  }, []);

  return <>"firstname"</>;
};

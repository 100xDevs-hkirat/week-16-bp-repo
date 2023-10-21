import { BACKEND_API_URL } from "@coral-xyz/common";
import { atom, selector } from "recoil";

export const userMetadata = atom<{
  firstName: string;
  lastName: string;
} | null>({
  key: "userMetadata",
  default: selector({
    key: "userMetadataSelector",
    get: async ({ get }) => {
      const response = await fetch(`${BACKEND_API_URL}/users/metadata`, {
        method: "GET",
      });
      const json = await response.json();
      return {
        firstName: json.firstName,
        lastName: json.lastName,
      };
    },
  }),
});

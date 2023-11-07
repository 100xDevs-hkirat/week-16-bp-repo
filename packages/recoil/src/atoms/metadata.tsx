import { BACKEND_API_URL } from "@coral-xyz/common";
import { atom, selector } from "recoil";

export const metadataAtom = atom<{
  firstname: string;
  lastname: string;
}>({
  key: "metadataAtom",
  default: selector({
    key: "metadataAtomSelector",
    get: async ({ get: any }) => {
      const metadata = await fetch(`${BACKEND_API_URL}/users/metadata`, {
        method: "GET",
      });
      const json = await metadata.json();
      return {
        firstname: json.firstname,
        lastname: json.lastname,
      };
    },
  }),
});

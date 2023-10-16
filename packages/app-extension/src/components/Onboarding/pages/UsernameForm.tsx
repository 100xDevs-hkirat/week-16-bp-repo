import { type FormEvent, useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "@coral-xyz/react-common";
import { useCustomTheme } from "@coral-xyz/themes";
import { AlternateEmail } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";

import { Header, SubtextParagraph } from "../../common";

export const UsernameForm = ({
  inviteCode,
  onNext,
}: {
  inviteCode: string;
  onNext: (username: string, firstName: string, lastName: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorIdentity, setErrorIdentity] = useState(0);
  const theme = useCustomTheme();

  useEffect(() => {
    setError("");
  }, [username]);
  //Error for firstname and lastname
  useEffect(() => {
    setErrorFirstName("");
  }, [firstName]);

  useEffect(() => {
    setErrorLastName("");
  }, [lastName]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch(`https://auth.xnfts.dev/users/${username}`, {
          headers: {
            "x-backpack-invite-code": String(inviteCode),
          },
        });
        const json = await res.json();
        if (!res.ok) {
          setErrorIdentity(1);
          throw new Error(json.message || "There was an error");
        }
        if (!firstName.match(/^[A-Za-z\s'-]+$/)) {
          setErrorIdentity(2);
          throw new Error("Invalid characters in name");
        }
        if (!lastName.match(/^[A-Za-z\s'-]+$/)) {
          setErrorIdentity(3);
          throw new Error("Invalid characters in name");
        }
        onNext(username, firstName, lastName);
      } catch (err: any) {
        if (errorIdentity == 1) {
          setError(err.message);
        } else if (errorIdentity == 2) {
          setErrorFirstName(err.message);
        } else if (errorIdentity == 3) {
          setErrorLastName(err.message);
        }
        console.log(err.message);
      }
    },
    [username, firstName, lastName]
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box style={{ margin: "24px" }}>
        <Header text="Claim your username" />
        <SubtextParagraph style={{ margin: "16px 0" }}>
          Others can see and find you by this username, and it will be
          associated with your primary wallet address.
          <br />
          <br />
          Choose wisely if you'd like to remain anonymous.
          <br />
          <br />
          Have fun!
        </SubtextParagraph>
      </Box>
      <Box
        style={{
          marginLeft: "16px",
          marginRight: "16px",
          marginBottom: "16px",
        }}
      >
        <Box style={{ marginBottom: "16px" }}>
          <TextInput
            inputProps={{
              name: "username",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="Username"
            type="text"
            value={username}
            setValue={(e) => {
              setUsername(
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
              );
            }}
            error={error ? true : false}
            errorMessage={error}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmail
                  style={{
                    color: theme.custom.colors.secondary,
                    fontSize: 18,
                    marginRight: -2,
                    userSelect: "none",
                  }}
                />
              </InputAdornment>
            }
          />
        </Box>
        <Box style={{ marginBottom: "16px" }}>
          <TextInput
            inputProps={{
              name: "firstName",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="First Name"
            type="text"
            value={firstName}
            setValue={(e) => {
              setFirstName(
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
              );
            }}
            error={errorFirstName ? true : false}
            errorMessage={errorFirstName}
            // startAdornment={
            //   <InputAdornment position="start">
            //     <AlternateEmail
            //       style={{
            //         color: theme.custom.colors.secondary,
            //         fontSize: 18,
            //         marginRight: -2,
            //         userSelect: "none",
            //       }}
            //     />
            //   </InputAdornment>
            // }
          />
        </Box>
        <Box style={{ marginBottom: "16px" }}>
          <TextInput
            inputProps={{
              name: "lastName",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="Last Name"
            type="text"
            value={lastName}
            setValue={(e) => {
              setLastName(
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
              );
            }}
            error={errorFirstName ? true : false}
            errorMessage={errorFirstName}
            // startAdornment={
            //   <InputAdornment position="start">
            //     <AlternateEmail
            //       style={{
            //         color: theme.custom.colors.secondary,
            //         fontSize: 18,
            //         marginRight: -2,
            //         userSelect: "none",
            //       }}
            //     />
            //   </InputAdornment>
            // }
          />
        </Box>
        <PrimaryButton
          style={{ marginBottom: "10px" }}
          label="Continue"
          type="submit"
        />
      </Box>
    </form>
  );
};

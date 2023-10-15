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
  onNext: (username: string, firstname: string, lastname: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const theme = useCustomTheme();

  useEffect(() => {
    setError("");
  }, [username]);

  useEffect(() => {
    setFirstnameError("");
  }, [firstname]);
  useEffect(() => {
    setLastnameError("");
  }, [lastname]);
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch(`https://auth.xnfts.dev/users/${username}`, {
          headers: {
            "x-backpack-invite-code": String(inviteCode),
          },
        });
        console.log(res);
        const json = await res.json();

        console.log(json.message);
        if (!res.ok) {
          if (firstname.length < 3 || firstname.length > 15) {
            setFirstnameError("First Name should be between 3-15 characters ");
          }

          if (lastname.length < 3 || lastname.length > 15) {
            setLastnameError("Last Name should be between 3-15 characters ");
          }
          setError(json.message);
          throw new Error(json.message || "There was an error");
        }
        if (firstname.length < 3 || firstname.length > 15) {
          setFirstnameError("First Name should be between 3-15 characters ");
          if (lastname.length < 3 || lastname.length > 15) {
            setLastnameError("Last Name should be between 3-15 characters ");
          }
          throw new Error("invalid firstname");
        }

        if (lastname.length < 3 || lastname.length > 15) {
          setLastnameError("Last Name should be between 3-15 characters ");
          throw new Error("invalid firstname");
        }

        onNext(username, firstname, lastname);
      } catch (err: any) {
        console.log(err);
      }
    },
    [username, firstname, lastname]
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
              name: "firstname",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="First Name"
            type="text"
            value={firstname}
            setValue={(e) => {
              setFirstname(e.target.value);
            }}
            error={firstnameError ? true : false}
            errorMessage={firstnameError}
          />
        </Box>
        <Box style={{ marginBottom: "16px" }}>
          <TextInput
            inputProps={{
              name: "lastname",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="Last Name"
            type="text"
            value={lastname}
            setValue={(e) => {
              setLastname(e.target.value);
            }}
            error={lastnameError ? true : false}
            errorMessage={lastnameError}
          />
        </Box>
        <PrimaryButton label="Continue" type="submit" />
      </Box>
    </form>
  );
};

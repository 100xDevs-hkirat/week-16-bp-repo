import { type FormEvent, useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "@coral-xyz/react-common";
import { useCustomTheme } from "@coral-xyz/themes";
import { AccountCircle,AlternateEmail } from "@mui/icons-material";
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
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [error, setError] = useState("");
  const theme = useCustomTheme();

  useEffect(() => {
    setError("");
    setErrFirstName("");
    setErrLastName("");
  }, [username, firstName, lastName]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        if (firstName === "" || lastName === "" || username === "") {
          throw new Error("field empty");
        }
        const res = await fetch(`https://auth.xnfts.dev/users/${username}`, {
          headers: {
            "x-backpack-invite-code": String(inviteCode),
          },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "There was an error");

        onNext(username, firstName, lastName);
      } catch (err: any) {
        if (err.message === "field empty") {
          if (firstName === "" && lastName === "" && username === "") {
            setError("can't be empty");
            setErrFirstName("can't be empty");
            setErrLastName("can't be empty");
          } else if (firstName === "" && lastName === "") {
            setErrFirstName("can't be empty");
            setErrLastName("can't be empty");
          } else if (firstName === "" && username === "") {
            setError("can't be empty");
            setErrFirstName("can't be empty");
          } else if (lastName === "" && username === "") {
            setError("can't  be empty");
            setErrLastName("can't be empty");
          } else if (firstName === "") setErrFirstName("can't be empty");
          else if (lastName === "") setErrLastName("can't be empty");
          else setError("can't be empty");
        } else setError(err.message);
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
      <Box
        style={{
          marginLeft: "16px",
          marginRight: "16px",
          marginBottom: "16px",
        }}
      >
        <Header text="Claim your username" />
        <SubtextParagraph style={{ margin: "8px 0" }}>
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
        <Box style={{ marginBottom: "2px" }}>
          <TextInput
            inputProps={{
              name: "firstname",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="First name"
            type="text"
            value={firstName}
            setValue={(e) => {
              setFirstName(e.target.value.toLowerCase().replace(/[^a-z]/g, ""));
            }}
            error={errFirstName ? true : false}
            errorMessage={errFirstName}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle
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
        <Box style={{ marginBottom: "2px" }}>
          <TextInput
            inputProps={{
              name: "lastname",
              autoComplete: "off",
              spellCheck: "false",
              autoFocus: true,
            }}
            placeholder="Last name"
            type="text"
            value={lastName}
            setValue={(e) => {
              setLastName(e.target.value.toLowerCase().replace(/[^a-z]/g, ""));
            }}
            error={errLastName ? true : false}
            errorMessage={errLastName}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle
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
        <PrimaryButton label="Continue" type="submit" />
      </Box>
    </form>
  );
};

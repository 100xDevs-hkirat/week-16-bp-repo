import { useEffect, useState } from "react";
import type {
  KeyringType,
  PrivateKeyWalletDescriptor,
  SignedWalletDescriptor,
  WalletDescriptor,
} from "@coral-xyz/common";
import { getCreateMessage } from "@coral-xyz/common";
import { useOnboarding, useRpcRequests } from "@coral-xyz/recoil";

import { useSteps } from "../../../hooks/useSteps";
import { CreatePassword } from "../../common/Account/CreatePassword";
import { ImportWallets } from "../../common/Account/ImportWallets";
import { MnemonicInput } from "../../common/Account/MnemonicInput";
import { PrivateKeyInput } from "../../common/Account/PrivateKeyInput";
import { WithContaineredDrawer } from "../../common/Layout/Drawer";
import { NavBackButton, WithNav } from "../../common/Layout/Nav";

import { AlreadyOnboarded } from "./AlreadyOnboarded";
import { BlockchainSelector } from "./BlockchainSelector";
import { CreateOrImportWallet } from "./CreateOrImportWallet";
import { Finish } from "./Finish";
import { HardwareOnboard } from "./HardwareOnboard";
import { InviteCodeForm } from "./InviteCodeForm";
import { KeyringTypeSelector } from "./KeyringTypeSelector";
import { NotificationsPermission } from "./NotificationsPermission";
import { UsernameForm } from "./UsernameForm";

export const OnboardAccount = ({
  onRecover,
  containerRef,
  navProps,
  isAddingAccount,
  isOnboarded,
}: {
  onRecover: () => void;
  containerRef: any;
  navProps: any;
  isAddingAccount?: boolean;
  isOnboarded?: boolean;
}) => {
  const { step, nextStep, prevStep } = useSteps();
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    onboardingData,
    setOnboardingData,
    handleSelectBlockchain,
    handlePrivateKeyInput,
  } = useOnboarding();
  const { signMessageForWallet } = useRpcRequests();
  const {
    inviteCode,
    action,
    keyringType,
    mnemonic,
    blockchain,
    signedWalletDescriptors,
    selectedBlockchains,
  } = onboardingData;

  useEffect(() => {
    // Reset blockchain keyrings on certain changes that invalidate the addresses
    setOnboardingData({
      signedWalletDescriptors: [],
    });
  }, [action, keyringType, mnemonic, setOnboardingData]);

  const steps = [
    <InviteCodeForm
      key="InviteCodeForm"
      onClickRecover={onRecover}
      onSubmit={(inviteCode) => {
        setOnboardingData({ inviteCode });
        nextStep();
      }}
    />,
    <UsernameForm
      key="UsernameForm"
      inviteCode={inviteCode!}
      onNext={(username, firstname, lastname) => {
        setOnboardingData({ username, firstname, lastname });
        nextStep();
      }}
    />,
    <CreateOrImportWallet
      key="CreateOrImportWallet"
      onNext={(action) => {
        setOnboardingData({ action });
        nextStep();
      }}
    />,
    <KeyringTypeSelector
      key="KeyringTypeSelector"
      action={action}
      onNext={(keyringType: KeyringType) => {
        setOnboardingData({ keyringType });
        nextStep();
      }}
    />,
    // Show the seed phrase if we are creating based on a mnemonic
    ...(keyringType === "mnemonic"
      ? [
        <MnemonicInput
          key="MnemonicInput"
          readOnly={action === "create"}
          buttonLabel={action === "create" ? "Next" : "Import"}
          onNext={async (mnemonic) => {
              setOnboardingData({ mnemonic });
              nextStep();
            }}
          />,
        ]
      : []),
    ...(keyringType === "private-key"
      ? // If keyring type is a private key we don't need to display the blockchain
        // selector
        [
          <PrivateKeyInput
            key="PrivateKeyInput"
            onNext={(result: PrivateKeyWalletDescriptor) => {
              handlePrivateKeyInput(result);
              nextStep();
            }}
          />,
        ]
      : [
        <BlockchainSelector
          key="BlockchainSelector"
          selectedBlockchains={selectedBlockchains}
          onClick={async (blockchain) => {
              await handleSelectBlockchain({
                blockchain,
              });
              // If wallet is a ledger, step through the ledger onboarding flow
              // OR if action is an import then open the drawer with the import accounts
              // component
              if (keyringType === "ledger" || action === "import") {
                setOpenDrawer(true);
              }
            }}
          onNext={nextStep}
          />,
        ]),
    ...(!isAddingAccount
      ? [
        <CreatePassword
          key="CreatePassword"
          onNext={async (password) => {
              setOnboardingData({ password });
              nextStep();
            }}
          />,
        ]
      : []),
    <NotificationsPermission key="NotificationsPermission" onNext={nextStep} />,
    <Finish key="Finish" isAddingAccount={isAddingAccount} />,
  ];

  if (isOnboarded && step !== steps.length - 1) {
    return <AlreadyOnboarded />;
  }

  return <div>{steps[step]}</div>;
};

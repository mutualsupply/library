import { ConnectKitButton } from "connectkit";
import { shortenAddress } from "utils";
import { Button } from "./ui/button";

const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        const displayName = ensName || shortenAddress(address);
        return (
          <Button onClick={show}>
            {isConnected ? displayName : "Connect"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
export default ConnectButton;

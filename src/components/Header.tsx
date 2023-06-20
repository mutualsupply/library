import { ConnectKitButton } from "connectkit";
import { Deploy } from "./Deploy";
import { Title } from "./Title";

export function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <Title />
      <div className="flex items-center gap-8">
        <Deploy />
        <ConnectKitButton />
      </div>
    </div>
  );
}

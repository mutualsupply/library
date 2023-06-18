import { ConnectKitButton } from 'connectkit'
import { Caisson } from './Caisson'
import { Deploy } from './Deploy'

export function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <Caisson />
      <div className="flex items-center gap-8">
        <Deploy />
        <ConnectKitButton />
      </div>
    </div>
  )
}

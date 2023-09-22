import { signIn, signOut, useSession } from "next-auth/react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { cn } from "utils"
import { Button } from "../../ui/button"
import Github from "../../icons/Github"
import Image from "next/image"
import ConnectButton from "../../ConnectButton"
import { Link } from "../../Links"

export interface CaseStudyAccordionProps {
  value: string
}

export default function SignInAccordion({ value }: CaseStudyAccordionProps) {
  const { data: session } = useSession()
  const isLoggedIn = session?.user?.name
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="font-otBrut text-primary text-2xl">
        1. Sign in
      </AccordionTrigger>
      <AccordionContent>
        <div className={cn("font-aspekta")}>
          {isLoggedIn && (
            <div className={cn("flex", "flex-col", "gap-3")}>
              <div className={cn("text-lg", "font-medium")}>
                Signed into Github
              </div>
              <div className={cn("flex", "flex-col", "items-start")}>
                <Button
                  variant={"outline"}
                  className={cn(
                    "inline-flex",
                    "items-center",
                    "gap-3",
                    "border-solid",
                    "w-52",
                  )}
                >
                  <Github />
                  <div className={cn("inline-flex", "gap-1", "items-center")}>
                    {session?.user?.image && (
                      <Image
                        src={session.user.image}
                        height={25}
                        width={25}
                        alt={"pfp"}
                        className={cn("rounded-full")}
                      />
                    )}
                    {session?.user?.name && (
                      <span className={cn("text-black")}>
                        {session?.user?.name}
                      </span>
                    )}
                  </div>
                </Button>
                <Button
                  variant="link"
                  onClick={() => signOut()}
                  className={cn("p-0", "font-light")}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <div className={cn("flex", "flex-col", "gap-3")}>
              <div className={cn("text-lg", "font-medium", "font-aspekta")}>
                Sign in to Github (required)
              </div>
              <div>
                Submit your thoughts to the Library and save drafts of your work
                in progress.
              </div>
              <Link
                isExternal
                href="https://github.com/join"
                className={cn("text-black")}
              >
                Need help creating an account?
              </Link>
              <div>
                <Button
                  className={cn(
                    "rounded-sm",
                    "text-purple",
                    "inline-flex",
                    "items-center",
                    "gap-2",
                    "border-solid",
                    "border-purple",
                    "max-w-14",
                  )}
                  variant={"outline"}
                  onClick={() => {
                    signIn("github", {
                      callbackUrl: `${window.location.origin}/create-case`,
                    })
                  }}
                >
                  <Github /> <span>Sign in</span>
                </Button>
              </div>
            </div>
          )}
          <div
            className={cn("flex", "flex-col", "gap-3", "mt-6", "font-light")}
          >
            <div className={cn("text-lg", "font-medium")}>
              Connect to Optimism (optional)
            </div>
            <div>
              MUTUAL will distribute on-chain credentials to authors with
              reports accepted into the library.
            </div>
            <div>
              <span className="font-medium">
                Contributors can also receive $OP from our (Box Tops for
                Education vibes) rewards program
              </span>{" "}
              for submissions analyzing product experiences inside the Optimism
              ecosystem.{" "}
              <Link isExternal href="https://mutual.supply">
                Learn more.
              </Link>
            </div>
            <div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

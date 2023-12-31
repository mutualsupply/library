"use client";

import { usePrivy } from "@privy-io/react-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn, shortenAddress } from "utils";
import { Button, OPButton } from "../../components/ui/button";

import Image from "next/image";
import { useState } from "react";
import { StatusIndicator } from "../../components/StatusIndicator";
import Github from "../../components/icons/Github";
import OptimismLogo from "../../components/icons/Optimism";
import Plus from "../../components/icons/Plus";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";
import useDrafts from "../../hooks/useDrafts";
import { NEW_CASE_PAGE_NAME } from "../../lib/constants";

const Submit = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const isLoggedIn = session?.user?.name;
	const { login, logout, authenticated, user } = usePrivy();
	const [accordionValue, setAccordionValue] = useState<string>("");
	const openLogin = () => setAccordionValue("login");
	const closeLogin = () => setAccordionValue("");
	const { data: drafts } = useDrafts();
	return (
		<div className={cn("flex flex-col md:flex-row md:gap-6")}>
			<div className={cn("md:max-w-[320px] w-full")}>
				<Accordion
					value={accordionValue}
					type="single"
					collapsible
					className={cn("w-full")}
				>
					<AccordionItem value={"login"}>
						<AccordionTrigger
							onClick={() => {
								if (accordionValue) {
									closeLogin();
								} else {
									openLogin();
								}
							}}
							className="font-aspekta text-black text-lg font-light"
						>
							Sign in
						</AccordionTrigger>
						<AccordionContent>
							<div className={cn("font-aspekta")}>
								<div className={cn("text-sm", "font-medium", "font-aspekta")}>
									Github (required)
								</div>
								<div>Submit + save drafts</div>
								<div>
									{!isLoggedIn && (
										<Button
											variant={"purple"}
											onClick={() => {
												signIn("github", {
													callbackUrl: `${window.location.origin}/submit`,
												}).then((res) => {
													if (res?.error) {
														console.error(res.error);
													} else {
														router.push("/submit");
													}
												});
											}}
											className={cn("flex items-center gap-2 mt-2 w-full")}
										>
											<Github /> <span className={cn("text-sm")}>Sign in</span>
										</Button>
									)}
									{isLoggedIn && (
										<div>
											<Button
												variant={"purple"}
												className={cn("flex items-center gap-2 w-full")}
											>
												<div
													className={cn("inline-flex", "gap-1", "items-center")}
												>
													{session?.user?.image ? (
														<Image
															src={session.user.image}
															height={25}
															width={25}
															alt={"pfp"}
															className={cn("rounded-full")}
														/>
													) : (
														<Github />
													)}
													{session?.user?.name && (
														<span className={cn("text-black text-sm")}>
															{session?.user?.name}
														</span>
													)}
												</div>
											</Button>
											<div className={cn("w-full flex justify-center")}>
												<Button
													variant="link"
													onClick={() => signOut()}
													className={cn("p-0", "font-medium", "text-xs")}
												>
													Logout
												</Button>
											</div>
										</div>
									)}
								</div>

								<div className={cn("mt-4")}>
									<div className={cn("text-sm", "font-medium")}>
										Optimism (optional)
									</div>
									<div>Receive on-chain credit for your work</div>
								</div>
							</div>
							{!authenticated && (
								<div>
									<Button
										className={cn(
											"text-red flex items-center gap-2 mt-2 w-full",
										)}
										variant="op"
										onClick={() => login()}
									>
										<OptimismLogo />
										<span className={cn("text-sm")}>Connect</span>
									</Button>
								</div>
							)}
							{authenticated && user?.wallet?.address && (
								<div className={cn("mt-2", "flex")}>
									<OPButton
										onClick={() => logout()}
										className={cn("group/button w-full")}
									>
										<div className={cn("flex items-center gap-1 font-medium")}>
											<span className={cn("group-hover/button:block hidden")}>
												disconnect
											</span>
											<span className={cn("group-hover/button:hidden block")}>
												connected
											</span>
											<span>{shortenAddress(user.wallet.address)}</span>
										</div>
									</OPButton>
								</div>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			<div className={cn("grow flex justify-center items-start mt-6 md:mt-56")}>
				<div className={cn("max-w-[800px] w-full border border-dashed p-4")}>
					<div className={cn("flex justify-between items-center")}>
						<span className={cn("font-otBrut text-primary flex gap-2")}>
							<span className={cn("text-2xl")}>Thoughts</span>
							{drafts && drafts.length > 0 && (
								<span className={cn("text-base")}>{drafts.length}</span>
							)}
						</span>
						<Button
							className={cn(
								"bg-black text-white border-black px-6 py-2 text-sm flex items-center gap-2 font-spline",
							)}
							size="pill"
							onClick={() => {
								if (isLoggedIn) {
									router.push(NEW_CASE_PAGE_NAME);
								} else {
									openLogin();
								}
							}}
						>
							<span>
								<Plus className={cn("text-white w-4")} />
							</span>
							<span>New</span>
						</Button>
					</div>

					{drafts && drafts.length > 0 && (
						<div className={cn("mt-6 max-h-72 overflow-y-scroll")}>
							{drafts.map((draft, index) => (
								<div
									key={`draft-${draft.id}`}
									className={cn(
										"font-aspekta flex items-center justify-between px-3 py-2",
										{ "bg-tertiary/30": index % 2 === 0 },
									)}
								>
									<div className={cn("text-sm")}>{draft.content?.title}</div>
									<StatusIndicator caseStudy={draft} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Submit;

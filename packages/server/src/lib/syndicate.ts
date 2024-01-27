// const syndicate = new SyndicateClient({
// 	token: env.SYNDICATE_API_KEY,
// });

// export async function mintToUser(to: string) {
// 	const transaction = await syndicate.transact.sendTransaction({
// 		projectId: env.SYNDICATE_PROJECT_ID,
// 		contractAddress: env.SYNDICATE_CONTRACT_ADDRESS,
// 		chainId: env.SYNDICATE_CHAIN_ID,
// 		functionSignature: "mintTo(address to)",
// 		args: {
// 			to,
// 		},
// 	});
// 	console.log(
// 		`[syndicate] minted to ${to} with tx: ${transaction.transactionId}`,
// 	);
// }

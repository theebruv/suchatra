import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const itemsData: Prisma.ItemCreateInput[] = [
	{
		name: "Item 1",
		description: "Description 1",
		price: 100,
		sku: "SKU1",
		color: "red",
	},
	{
		name: "Item 2",
		description: "Description 2",
		price: 200,
		sku: "SKU2",
		color: "blue",
	},
	{
		name: "Item 3",
		description: "Description 3",
		price: 300,
		sku: "SKU3",
		color: "green",
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const item of itemsData) {
		const newItem = await prisma.item.create({
			data: item,
		});
		console.log(`Created an item with id: ${newItem.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

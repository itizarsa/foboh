import { Products } from "./schema.js"
import { db } from "./database.js"

await db.insert(Products).values([
	{
		title: "High Garden Pinot Noir 2021",
		sku: "HGVPIN216",
		category: "Alcoholic Beverage",
		subCategory: "Wine",
		segment: "Red",
		brand: "High Garden",
		basePrice: 279.06
	},
	{
		title: "Koyama Methode Brut Nature NV",
		sku: "KOYBRUNV6",
		category: "Alcoholic Beverage",
		subCategory: "Wine",
		segment: "Sparkling",
		brand: "Koyama Wines",
		basePrice: 120.0
	},
	{
		title: "Koyama Riesling 2018",
		sku: "KOYNR1837",
		category: "Alcoholic Beverage",
		subCategory: "Wine",
		segment: "Port/Dessert",
		brand: "Koyama Wines",
		basePrice: 215.04
	},
	{
		title: "Koyama Tussock Riesling 2019",
		sku: "KOYRIE19",
		category: "Alcoholic Beverage",
		subCategory: "Wine",
		segment: "White",
		brand: "Koyama Wines",
		basePrice: 215.04
	},
	{
		title: "Lacourte-Godbillon Brut Cru NV",
		sku: "LACBNATNV6",
		category: "Alcoholic Beverage",
		segment: "Sparkling",
		brand: "Lacourte-Godbillon",
		basePrice: 409.32
	}
])

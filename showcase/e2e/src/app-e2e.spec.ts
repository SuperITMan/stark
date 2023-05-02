import { test, expect, Page } from "@playwright/test";
import {ElementHandle} from "playwright-core";

async function waitForAngular(page) {
	await page.evaluate(async () => {
		// @ts-expect-error
		if (window.getAllAngularTestabilities) {
			// @ts-expect-error
			await Promise.all(window.getAllAngularTestabilities().map(whenStable));
			// @ts-expect-error
			async function whenStable(testability) {
				return new Promise((res) => testability.whenStable(res) );
			}
		}
	});
}

// test.describe("General tests:", () => {
// 	/*test.beforeAll(async ({page}) => {
// 		await page.goto("http://localhost:3000");
// 	})*/
//
// 	/*test.describe.configure({ mode: 'serial' });
// 	let page: Page;
// 	test.beforeAll(async ({ browser }) => {
// 		page = await browser.newPage();
// 		await page.goto("http://localhost:3000", {waitUntil: "domcontentloaded"})
// 	});
//
// 	test.afterAll(async () => {
// 		await page.close();
// 	});*/
//	
// 	test("should have title 'Stark Showcase'", async({ page }) => {
// 		await page.goto("http://localhost:3000");
// 		const title = await page.title()
// 		expect(title).toBe("Stark Showcase");
// 	});
//
// 	test("should have stark logo", async ({page}) => {
// 		await page.goto("http://localhost:3000", {waitUntil: "networkidle"});
// 		await waitForAngular(page);
// 		const element = page.locator(".stark-app-bar stark-app-logo");
// 		expect(await element.count()).toBe(1);
// 	});
// });

test.describe("General tests:", () => {
	test.describe.configure({ mode: 'serial' });
	let page1: Page;
	test.beforeAll(async ({ browser }) => {
		page1 = await browser.newPage();
		await page1.goto("http://localhost:3000", {waitUntil: "networkidle"})
		await waitForAngular(page1);
	});

	test.afterAll(async () => {
		await page1.close();
	});

	test("should have title 'Stark Showcase'", async() => {
		const title = await page1.title()
		expect(title).toBe("Stark Showcase");
	});

	test("should have stark logo", async () => {
		//await page.goto("http://localhost:3000", {waitUntil: "networkidle"})
		const element = page1.locator(".stark-app-bar stark-app-logo");
		expect(await element.count()).toBe(1);
	});
});

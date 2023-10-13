"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://www.amazon.com/s?k=amazon+basics&page=7";
(async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const productsHandles = await page.$$(".puis-card-container > .a-section.a-spacing-base");
    let totalProducts = [];
    for (const productHandle of productsHandles) {
        const product = {
            title: await page.evaluate((document) => document.querySelector(".a-section h2 > a > span")?.textContent, productHandle),
            price: await page.evaluate((document) => document.querySelector(".a-price > .a-offscreen")?.textContent, productHandle),
            image: await page.evaluate((document) => document.querySelector(".s-image")?.getAttribute("src"), productHandle),
        };
        totalProducts.push(product);
    }
    console.log(totalProducts);
    console.log(totalProducts.length);
    await browser.close();
})();
//# sourceMappingURL=index.js.map
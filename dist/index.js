"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://www.amazon.com/s?k=amazon+basics&page=1";
(async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });
    let isBtnDisabled = false;
    while (!isBtnDisabled) {
        await page.waitForSelector(`.puis-card-container`);
        const items = await page.evaluate(() => {
            const products = Array.from(document.querySelectorAll(".puis-card-container > .a-section.a-spacing-base")).map((product) => {
                const p = {
                    title: product.querySelector(".a-section h2 > a > span")?.textContent,
                    price: product.querySelector(".a-price > .a-offscreen")?.textContent,
                    image: product.querySelector(".s-image")?.getAttribute("src"),
                };
                return p;
            });
            return products;
        });
        console.log(items);
        await page.waitForSelector(".s-pagination-item.s-pagination-next", {
            visible: true,
        });
        const isDisabled = (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;
        isBtnDisabled = isDisabled;
        if (!isDisabled) {
            await Promise.all([
                page.click(".s-pagination-item.s-pagination-next"),
                page.waitForNavigation({ waitUntil: "networkidle2" }),
            ]);
        }
    }
    await browser.close();
})();
//# sourceMappingURL=index.js.map
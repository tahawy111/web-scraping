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
    await page.goto(url, { waitUntil: "load" });
    const isDisabled = (await page.$(".s-pagination-item.s-pagination-disabled")) !== null;
    console.log(isDisabled);
    await browser.close();
})();
//# sourceMappingURL=class.js.map
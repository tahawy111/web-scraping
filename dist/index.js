"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(async () => {
    const browser = await puppeteer_1.default.launch({
        defaultViewport: null,
        userDataDir: "./tmp",
    });
    const page = await browser.newPage();
    await page.goto("https://www.amazon.eg/s?k=iphone&crid=17O42F9BHNEZI&sprefix=iphone%2Caps%2C279&ref=nb_sb_noss_1");
    const productHandles = await page.$$("div.a-section.a-spacing-base");
    for (const card of productHandles) {
        console.log(await card.$(".a-size-base-plus"));
    }
    await browser.close();
})();
//# sourceMappingURL=index.js.map
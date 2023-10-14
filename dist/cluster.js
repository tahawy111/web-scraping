"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_cluster_1 = require("puppeteer-cluster");
const fs_1 = __importDefault(require("fs"));
const urls = [
    "https://www.amazon.com/s?k=amazonbasics&pd_rd_r=03e5e33c-4faf-452d-8173-4a34efcf3524&pd_rd_w=EQNRr&pd_rd_wg=PygJX&pf_rd_p=9349ffb9-3aaa-476f-8532-6a4a5c3da3e7&pf_rd_r=8RYH7VRZ4HSKWWG0NEX3&ref=pd_gw_unk",
    "https://www.amazon.com/s?k=oculus&i=electronics-intl-ship&pd_rd_r=03e5e33c-4faf-452d-8173-4a34efcf3524&pd_rd_w=iMBhG&pd_rd_wg=PygJX&pf_rd_p=5c71b8eb-e4c7-4ea1-bf40-b57ee72e089f&pf_rd_r=8RYH7VRZ4HSKWWG0NEX3&ref=pd_gw_unk",
];
(async () => {
    const cluster = await puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 100,
        monitor: true,
        puppeteerOptions: {
            headless: false,
            defaultViewport: null,
            userDataDir: "./tmp",
        },
    });
    cluster.on("taskerror", (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
    });
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        let isBtnDisabled = false;
        while (!isBtnDisabled) {
            await page.waitForSelector('[data-cel-widget="search_result_0"]');
            const productsHandles = await page.$$("div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item");
            for (const producthandle of productsHandles) {
                let title = "Null";
                let price = "Null";
                let img = "Null";
                try {
                    title = await page.evaluate((el) => el.querySelector("h2 > a > span").textContent, producthandle);
                }
                catch (error) { }
                try {
                    price = await page.evaluate((el) => el.querySelector(".a-price > .a-offscreen").textContent, producthandle);
                }
                catch (error) { }
                try {
                    img = await page.evaluate((el) => el.querySelector(".s-image").getAttribute("src"), producthandle);
                }
                catch (error) { }
                if (title !== "Null") {
                    fs_1.default.appendFile("results.csv", `${title.replace(/,/g, ".")},${price},${img}\n`, function (err) {
                        if (err)
                            throw err;
                    });
                }
            }
            await page.waitForSelector("li.a-last", { visible: true });
            const is_disabled = (await page.$("li.a-disabled.a-last")) !== null;
            isBtnDisabled = is_disabled;
            if (!is_disabled) {
                await Promise.all([
                    page.click("li.a-last"),
                    page.waitForNavigation({ waitUntil: "networkidle2" }),
                ]);
            }
        }
    });
    for (const url of urls) {
        await cluster.queue(url);
    }
    await cluster.idle();
    await cluster.close();
})();
//# sourceMappingURL=cluster.js.map
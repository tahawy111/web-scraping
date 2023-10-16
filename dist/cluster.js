"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_cluster_1 = require("puppeteer-cluster");
const urls = [
    "https://www.amazon.eg/s?k=iphone&crid=17MGTPY30SD08&sprefix=iphone%2Caps%2C180&ref=nb_sb_noss_1",
    "https://www.amazon.eg/s?k=mouse+pad&crid=3DMXC7CCTHSXK&sprefix=mouse+pad%2Caps%2C131&ref=nb_sb_noss_1",
];
(async () => {
    const cluster = await puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100,
        puppeteerOptions: {
            headless: "new",
        },
    });
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        for (const url of urls) {
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
        }
    });
    for (const url of urls) {
        cluster.queue(url);
    }
    await cluster.idle();
    await cluster.close();
})();
//# sourceMappingURL=cluster.js.map
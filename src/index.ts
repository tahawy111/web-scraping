// Import puppeteer
import puppeteer, { Browser } from "puppeteer";

const url = "https://books.toscrape.com";

(async () => {
  // Launch the browser
  const browser: Browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(url);

  const bookData = await page.evaluate(() => {
    const bookPods = Array.from(document.querySelectorAll(".product_pod"));
    const data = bookPods.map((book: any) => ({
      title: book.querySelector("h3 a[title]").textContent,
      price: book.querySelector(".price_color").textContent,
      inStock: book.querySelector(".instock.availability").textContent,
      imgSrc: book.querySelector("img").src,
      starRating: book.querySelector("p.star-rating").classList[1],
    }));
    return data;
  });
  console.log(bookData);

  // Close browser.
  await browser.close();
})();

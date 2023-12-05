import puppeteer from "puppeteer";

const URL =
  "https://money.usnews.com/loans/personal-loans/articles/how-to-get-a-low-interest-rate-on-a-personal-loan";
const main = async () => {
  const broswer = await puppeteer.launch();
  const page = await broswer.newPage();
  await page.goto(URL);
  const data_points = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".data-point")).map((point) => {
      const label = point.__data__.label_formatted;
      const value=point.__data__.row_values[0];
      return {label,value }
    });
  });
  console.log(data_points);
};

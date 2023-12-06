import puppeteer from "puppeteer";

const URL = "https://flo.uri.sh/visualisation/14682314/embed?auto=1";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(URL);

  // Wait for the object to be available on the page
  await page.waitForFunction('window._Flourish_data !== undefined');

  const fl_data = await page.evaluate(() => {
    return window._Flourish_data;
  });

  // Print or process the data
  console.log(fl_data);
  fl_data.data.forEach(value=>{
    console.log(value.label,value.value[0])
  })
  // Close the browser
  await browser.close();
})();


//  const main = async () => {
//    try {
//      const broswer = await puppeteer.launch({ headless: 'new' });
//      const page = await broswer.newPage();
//      await page.goto(URL);
//      await page.waitForSelector(".data-point");
//      // await new Promise(r => setTimeout(r, 5000));
//      const data_points = await page.evaluate(() => {
//          return Array.from(document.querySelectorAll(".data-point")).map(
//           (point) => {
//             const label = point.__data__.label_formatted;
//             const value = point.__data__.row_values[0];
//             return { label, value };
//           }
//         );
//      });
//      console.log(data_points);
//      await broswer.close();
//    } catch (error) {
//      console.log(error);
//    }
//  };

//  main();

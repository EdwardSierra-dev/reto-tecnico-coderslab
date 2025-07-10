import { expect, test } from '@playwright/test';

test ('purchase product', async ({ page }) => {

  const data = ['standard_user','secret_sauce'];
  const checkoutData = ['Edward', 'Sierra', '080001'];

  // go to the website
  await page.goto('https://saucedemo.com');

  // login
  await page.getByPlaceholder('Username').fill(data[0]);
  await page.getByPlaceholder('Password').fill(data[1]);
  await page.getByText('Login').click();

  // save items in array
  const items = await page.locator('#inventory_container .inventory_item').all();

  // select random item
  const selectRandomItem = Math.floor(Math.random() * items.length);

  // get random item in array
  const getRandomItem = items[selectRandomItem];

  // add random item in cart
  await getRandomItem.getByRole('button', {name: 'Add to cart'}).click();
  
  // enter to cart and confirm item
  await page.locator('//a[contains(@class,\'shopping_cart_link\')]').click();
  await page.getByRole('button', {name: 'Checkout'}).click();
  
  // fill the information
  await page.getByPlaceholder('First Name').fill(checkoutData[0]);
  await page.getByPlaceholder('Last Name').fill(checkoutData[1]);
  await page.getByPlaceholder('Zip/Postal Code').fill(checkoutData[2]);

  await page.getByRole('button', {name: 'Continue'}).click();
  await page.getByRole('button', {name: 'Finish'}).click();
  
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await page.getByRole('button', {name: 'Back Home'}).click();
  
  
  //await page.pause();
});
import { expect, test } from '@playwright/test';

test ('checkout with empty fields', async ({ page }) => {

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
  
  // continue without information
  await page.getByRole('button', {name: 'Continue'}).click();
  await expect(page.getByText('Error: First Name is required')).toBeVisible();
  
  //await page.pause();
});
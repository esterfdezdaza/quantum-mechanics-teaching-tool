// @ts-check
const { test, expect } = require('@playwright/test');

test('Has title', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/quantum-mechanics-teaching-tool/index.html');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Quantum Mechanics Teaching Tool/);
});


test('Get started links', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/quantum-mechanics-teaching-tool/index.html');

  // Click the get started link.
  await page.getByRole('link', { name: 'Compton Effect V1' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Compton Effect Visualization One' })).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: 'Compton Effect V2' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Compton Effect' })).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: 'Potential Well' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Infinite Potential Well' })).toBeVisible();
});

test('Input boxes V1', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/QuantumMechanics/index.html');

  // Enter value to input box.
  await page.getByRole('textbox').first().fill("6 * 10^ -12")

  await expect(page.getByRole('textbox').nth(3)).toHaveValue('0.35731')
  await expect(page.getByRole('textbox').nth(2)).toHaveValue('1.0471975511965976')
  await expect(page.getByRole('textbox').nth(1)).toHaveValue('3.41 * 10^ -12')

});

test('Input boxes V3', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/potentialWell/');

  // Enter value to input box.
  await page.getByRole('textbox').first().fill("0")
  await page.getByRole('textbox').nth(1).fill("1")

  await expect(await page.getByTestId('result').first().innerText()).toBe('1')
  
  
});

test('Input sliders for V2', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/quantum-mechanics-teaching-tool/visualisations/compton-effect-v2.html');
  //await page.goto('http://127.0.0.1:5502/visualisations/compton-effect-v2.html')

  await moveSlider(page, 0, 0.5)
  await moveSlider(page, 1, 0.4)
  await moveSlider(page, 2, 0.9)
  await moveSlider(page, 3, 0.7)
  
});

/**
 * Move the nth slider the set amount (0-1) on page.
 */
async function moveSlider(page, nth, amount) {
  const sliderTrack = page.frameLocator('#visualisation').first().getByRole("slider").nth(nth)

  const sliderOffsetWidth = await sliderTrack.evaluate(el => {
      return el.getBoundingClientRect().width
  })

  // Using the hover method to place the mouse cursor then moving it to the right
  await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } })
  await page.mouse.down()
  await sliderTrack.hover({ force: true, position: { x: sliderOffsetWidth * amount, y: 0 } })
  await page.mouse.up()
}
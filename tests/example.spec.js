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

async function setSliderValue(page, sliderXPath, valueAsPercent) {
  // Find the slider element using the provided XPath and obtain its bounding box
  const slider = await page.locator(sliderXPath).first()
  console.log("slider: " + slider)
  const s = await page.getByRole('slider', { id: "slider"}).first()
  console.log("other method: " + s)
  const sliderBound = await page.locator(sliderXPath).boundingBox();

  // Use page.evaluate to obtain the current slider value from the HTML using the same XPath
  const currentSliderValue = await page.evaluate(`document.evaluate("${sliderXPath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value`);

  // Calculate the target X and Y coordinates for the mouse cursor based on the current slider value
  const targetX = sliderBound.x + (sliderBound.width * currentSliderValue / 100);
  const targetY = sliderBound.y + sliderBound.height / 2;

  // Move the mouse cursor to the calculated position
  await page.mouse.move(targetX, targetY);

  // Simulate a mouse click by pressing the mouse button
  await page.mouse.down();

  // Move the mouse cursor to the desired position by the provided valueAsPercent
  await page.mouse.move(
      sliderBound.x + (sliderBound.width * valueAsPercent) / 100,
      sliderBound.y + sliderBound.height / 2,
  );

  // Release the mouse button to complete the interaction
  await page.mouse.up();
}

test('Input boxes V2', async ({ page }) => {
  await page.goto('https://esterfdezdaza.github.io/quantum-mechanics-teaching-tool/visualisations/compton-effect-v2.html');

  //const slider = await page.locator("//*[@id = 'slider']").boundingBox()
  //console.log("slider: " + slider)
  const s = await page.getByRole("slider").first().innerHTML()
  console.log("other method: " + s)

  //await setSliderValue(page, "//*[@id = 'slider']", 3);

  
});


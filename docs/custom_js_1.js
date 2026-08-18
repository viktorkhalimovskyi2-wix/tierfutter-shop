/*custom js code*/
console.log('test_14')
document.addEventListener("DOMContentLoaded", function() {
  const inputs = document.querySelectorAll('[data-hook="options-buttons-container"] input[type="checkbox"], [data-hook="options-buttons-container"] input[type="radio"]');
  console.log(`Знайдено ${inputs.length} опцій`);

  inputs.forEach((input, index) => {
    const labelText = input.getAttribute("aria-label") || input.id;
    console.log(`➡️ Клікаю по "${labelText}"`);

    // справжній клік
    input.click();

    // додаткові події
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    console.log(`✔️ Опція "${labelText}" вибрана`);
  });
});

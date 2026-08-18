/*custom js code*/
console.log('test_13')
document.addEventListener("DOMContentLoaded", function() {
  const groups = document.querySelectorAll('[data-hook="options-buttons-container"]');
  console.log(`Знайдено ${groups.length} груп опцій`);

  groups.forEach((group, index) => {
    const input = group.querySelector('input[type="checkbox"], input[type="radio"]');
    if (input) {
      const labelText = input.getAttribute("aria-label") || input.id;
      console.log(`➡️ Група #${index + 1}: клікаю по "${labelText}"`);

      // справжній клік по input
      input.click();

      // додатково тригеримо події, щоб React/Wix оновив state
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));

      console.log(`✔️ Опція "${labelText}" вибрана через input.click()`);
    } else {
      console.error(`❌ У групі #${index + 1} немає input`);
    }
  });

  // фінальна перевірка: чи всі групи мають вибрані опції
  setTimeout(() => {
    const wrappers = document.querySelectorAll('[data-hook="box-selection-option-wrapper"][data-checked="true"]');
    if (wrappers.length === groups.length) {
      console.log("✅ Усі параметри вибрані, кошик має бути активний");
    } else {
      console.warn("⚠️ Не всі параметри активувались, кошик може лишатись неактивним");
    }
  }, 1000);
});


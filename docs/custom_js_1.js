/*custom js code*/
console.log('test_8')
document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);

  dropdowns.forEach((dropdown, index) => {
    const textEl = dropdown.querySelector('[data-hook="dropdown-base-text"]');
    if (textEl) {
      console.log(`➡️ Dropdown #${index + 1} мав значення: "${textEl.textContent.trim()}"`);
      // тут можна задати дефолтне значення
      textEl.textContent = "Автовибір";
      console.log(`✔️ Dropdown #${index + 1} тепер має значення: "${textEl.textContent.trim()}"`);

      // тригеримо подію, щоб Wix оновив стан
      const evt = new Event("change", { bubbles: true });
      dropdown.dispatchEvent(evt);
      console.log(`✔️ Подія change відправлена для dropdown #${index + 1}`);
    } else {
      console.error(`❌ Dropdown #${index + 1} не має текстового елемента`);
    }
  });
});

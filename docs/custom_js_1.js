/*custom js code*/
console.log('test_11')
document.addEventListener("DOMContentLoaded", function() {
  const groups = document.querySelectorAll('[data-hook="options-buttons-container"]');
  console.log(`Знайдено ${groups.length} груп опцій`);

  groups.forEach((group, index) => {
    const firstOption = group.querySelector('input[type="checkbox"], input[type="radio"]');
    if (firstOption) {
      const label = firstOption.getAttribute("aria-label") || firstOption.id;
      console.log(`➡️ Група #${index + 1}: вибираю "${label}"`);
      firstOption.checked = true; // позначаємо як вибране
      firstOption.dispatchEvent(new Event("change", { bubbles: true })); // тригеримо подію
      console.log(`✔️ Вибрано першу опцію у групі #${index + 1}`);
    } else {
      console.error(`❌ У групі #${index + 1} немає опцій`);
    }
  });
});

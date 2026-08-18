/*custom js code*/
console.log('test_15')
document.addEventListener("DOMContentLoaded", function() {
  const groups = document.querySelectorAll('[data-hook="options-buttons-container"]');
  console.log(`Знайдено ${groups.length} груп опцій`);

  groups.forEach((group, index) => {
    const wrapper = group.querySelector('[data-hook="box-selection-option-wrapper"]');
    const label = group.querySelector('[data-hook="box-selection-option"]');
    const target = label || wrapper;

    if (target) {
      const input = target.querySelector('input');
      const labelText = input ? input.getAttribute("aria-label") : `Група ${index+1}`;
      console.log(`➡️ Група #${index + 1}: клікаю по "${labelText}"`);

      target.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
      target.dispatchEvent(new MouseEvent("pointerup", { bubbles: true }));
      target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      target.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      console.log(`✔️ Опція "${labelText}" вибрана через клік по wrapper/label`);
    } else {
      console.error(`❌ У групі #${index + 1} немає wrapper/label`);
    }
  });
});

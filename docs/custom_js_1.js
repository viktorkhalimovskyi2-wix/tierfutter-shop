/*custom js code*/
console.log('test_12')
document.addEventListener("DOMContentLoaded", function() {
  const groups = document.querySelectorAll('[data-hook="options-buttons-container"]');
  console.log(`Знайдено ${groups.length} груп опцій`);

  groups.forEach((group, index) => {
    const wrapper = group.querySelector('[data-hook="box-selection-option-wrapper"]');
    const label = group.querySelector('[data-hook="box-selection-option"]');
    const input = label ? label.querySelector('input') : null;

    if (wrapper && label && input) {
      const labelText = input.getAttribute("aria-label") || input.id;
      console.log(`➡️ Група #${index + 1}: клікаю по "${labelText}"`);

      // симулюємо реальний клік
      ["pointerdown","pointerup","mousedown","mouseup","click"].forEach(type => {
        const evt = new MouseEvent(type, { bubbles: true, cancelable: true });
        label.dispatchEvent(evt);
        console.log(`✔️ Подія ${type} для: "${labelText}"`);
      });

      // перевіряємо чи Wix оновив стан
      setTimeout(() => {
        if (wrapper.getAttribute("data-checked") !== "true") {
          console.warn(`⚠️ Wix не оновив стан для "${labelText}", виставляю вручну`);
          wrapper.setAttribute("data-checked", "true");
          wrapper.classList.add("oergy8m--checked");
          label.classList.add("ot0_u5K--checked");
          const textEl = label.querySelector('[data-hook^="box-selection-text-option"]');
          if (textEl) textEl.classList.add("Fz8Gvk");
        }
        console.log(`✔️ Опція "${labelText}" активована`);
      }, 500);
    } else {
      console.error(`❌ У групі #${index + 1} немає кнопок`);
    }
  });
});

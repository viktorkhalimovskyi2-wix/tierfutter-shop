/*custom js code*/
console.log('test_6')
function simulateFullClick(el, label = "") {
  if (!el) {
    console.error(`❌ Елемент для кліку не знайдено: ${label}`);
    return;
  }
  console.log(`🖱️ Симулюю клік по елементу: ${label}`);
  el.focus();
  ["pointerdown","pointerup","mousedown","mouseup","click"].forEach(type => {
    const evt = new MouseEvent(type, { bubbles: true, cancelable: true });
    el.dispatchEvent(evt);
    console.log(`✔️ Подія ${type} відправлена для: ${label}`);
  });
}

function selectFirstOption(dropdown, index) {
  console.log(`➡️ Обробка dropdown #${index + 1}, aria-label="${dropdown.getAttribute("aria-label")}"`);
  simulateFullClick(dropdown, `dropdown #${index + 1}`);

  const optionsContainerId = dropdown.getAttribute("aria-controls");
  let elapsed = 0;
  const interval = 200;
  const timeout = 5000;
  let retried = false;

  const checkInterval = setInterval(() => {
    elapsed += interval;
    const optionsContainer = document.getElementById(optionsContainerId);

    if (optionsContainer) {
      clearInterval(checkInterval);
      console.log(`✔️ Контейнер з опціями знайдено для dropdown #${index + 1}`);

      const firstOption = optionsContainer.querySelector('[role="option"], li, button, div');
      if (firstOption) {
        console.log(`✔️ Знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        simulateFullClick(firstOption, `перша опція dropdown #${index + 1}`);
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
      } else {
        console.error(`❌ У контейнері dropdown #${index + 1} немає опцій`);
      }
    }

    if (elapsed >= timeout) {
      clearInterval(checkInterval);
      if (!retried) {
        console.warn(`⏱️ Таймаут, повторна спроба для dropdown #${index + 1}`);
        retried = true;
        simulateFullClick(dropdown, `dropdown #${index + 1} повторно`);
        selectFirstOption(dropdown, index); // друга спроба
      } else {
        console.error(`⏱️ Контейнер для dropdown #${index + 1} так і не з’явився`);
      }
    }
  }, interval);
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);

  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

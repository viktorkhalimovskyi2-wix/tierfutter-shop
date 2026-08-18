/*custom js code*/
console.log('test_5')
// Функція для симуляції реального кліку миші
function simulateClick(el, label = "") {
  if (!el) {
    console.error(`❌ Елемент для кліку не знайдено: ${label}`);
    return;
  }
  console.log(`🖱️ Симулюю клік по елементу: ${label}`);
  ["mousedown", "mouseup", "click"].forEach(type => {
    const evt = new MouseEvent(type, { bubbles: true, cancelable: true });
    el.dispatchEvent(evt);
    console.log(`✔️ Подія ${type} відправлена для: ${label}`);
  });
}

// Основна функція для вибору першої опції
function selectFirstOption(dropdown, index) {
  console.log(`➡️ Обробка dropdown #${index + 1}, aria-label="${dropdown.getAttribute("aria-label")}"`);
  simulateClick(dropdown, `dropdown #${index + 1}`);

  const optionsContainerId = dropdown.getAttribute("aria-controls");
  let elapsed = 0;
  const interval = 200;
  const timeout = 5000;

  const checkInterval = setInterval(() => {
    elapsed += interval;
    const optionsContainer = document.getElementById(optionsContainerId);

    if (optionsContainer) {
      clearInterval(checkInterval);
      console.log(`✔️ Контейнер з опціями знайдено для dropdown #${index + 1}`);

      const firstOption = optionsContainer.querySelector('[role="option"], li, button, div');
      if (firstOption) {
        console.log(`✔️ Знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        simulateClick(firstOption, `перша опція dropdown #${index + 1}`);
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
      } else {
        console.error(`❌ У контейнері dropdown #${index + 1} немає опцій`);
      }
    }

    if (elapsed >= timeout) {
      clearInterval(checkInterval);
      console.error(`⏱️ Таймаут: контейнер для dropdown #${index + 1} не з’явився за ${timeout / 1000} секунд`);
    }
  }, interval);
}

// Запуск після завантаження сторінки
document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);

  if (dropdowns.length === 0) {
    console.warn("⚠️ Dropdown-и не знайдено. Перевір селектор.");
  }

  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

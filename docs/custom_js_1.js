/*custom js code*/
console.log('test_4')
function selectFirstOption(dropdown, index) {
  dropdown.click();
  console.log(`✔️ Відкрито список для dropdown #${index + 1}`);

  const optionsContainerId = dropdown.getAttribute("aria-controls");
  let elapsed = 0;
  const interval = 200; // перевірка кожні 200 мс
  const timeout = 5000; // максимум 5 секунд

  const checkInterval = setInterval(() => {
    elapsed += interval;
    const optionsContainer = document.getElementById(optionsContainerId);

    if (optionsContainer) {
      clearInterval(checkInterval);

      const firstOption = optionsContainer.querySelector('[role="option"], li, button, div');
      if (firstOption) {
        console.log(`✔️ Знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        firstOption.click();
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
      } else {
        console.error(`❌ У контейнері dropdown #${index + 1} немає опцій`);
      }
    }

    if (elapsed >= timeout) {
      clearInterval(checkInterval);
      console.error(`⏱️ Таймаут: контейнер для dropdown #${index + 1} не з’явився за ${timeout/1000} секунд`);
    }
  }, interval);
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);
  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

/*custom js code*/
console.log(25)
document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);

  if (dropdowns.length === 0) {
    console.warn("⚠️ Dropdown-и не знайдено. Перевір селектор.");
  }

  dropdowns.forEach((dropdown, index) => {
    try {
      console.log(`➡️ Обробка dropdown #${index + 1}, aria-label="${dropdown.getAttribute("aria-label")}"`);

      dropdown.click();
      console.log(`✔️ Відкрито список для dropdown #${index + 1}`);

      setTimeout(() => {
        // шукаємо контейнер із опціями, який з’являється після кліку
        const optionsContainer = document.querySelector('[id^="dropdown-options-container_"]');
        if (!optionsContainer) {
          console.error(`❌ Контейнер з опціями не знайдено для dropdown #${index + 1}`);
          return;
        }

        const firstOption = optionsContainer.querySelector("li, button, div");
        if (!firstOption) {
          console.error(`❌ У контейнері dropdown #${index + 1} немає опцій`);
          return;
        }

        console.log(`✔️ Знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        firstOption.click();
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
      }, 500); // трохи більша пауза, щоб DOM встиг відрендеритись
    } catch (err) {
      console.error(`❌ Помилка при обробці dropdown #${index + 1}:`, err);
    }
  });
});

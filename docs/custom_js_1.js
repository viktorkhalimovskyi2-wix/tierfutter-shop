/*custom js code*/
console.log(test_3)
document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);

  dropdowns.forEach((dropdown, index) => {
    console.log(`➡️ Обробка dropdown #${index + 1}, aria-label="${dropdown.getAttribute("aria-label")}"`);

    dropdown.click();
    console.log(`✔️ Відкрито список для dropdown #${index + 1}`);

    // чекаємо появи контейнера саме для цього dropdown
    const optionsContainerId = dropdown.getAttribute("aria-controls");
    const checkInterval = setInterval(() => {
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
    }, 200); // перевіряємо кожні 200 мс
  });
});

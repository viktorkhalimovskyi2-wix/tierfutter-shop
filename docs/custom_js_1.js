/*custom js code*/
console.log('test_9')
function simulateClick(el, label = "") {
  if (!el) return;
  console.log(`🖱️ Клік по: ${label}`);
  ["pointerdown","pointerup","mousedown","mouseup","click"].forEach(type => {
    el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true }));
    console.log(`✔️ Подія ${type} для: ${label}`);
  });
}

function selectFirstOption(dropdown, index, attempt = 1) {
  console.log(`➡️ Dropdown #${index + 1}, спроба ${attempt}`);
  simulateClick(dropdown, `dropdown #${index + 1}`);

  const optionsContainerId = dropdown.getAttribute("aria-controls");
  const timeout = 5000;
  let elapsed = 0;
  const interval = 200;

  const checkInterval = setInterval(() => {
    elapsed += interval;
    const optionsContainer = document.getElementById(optionsContainerId);

    if (optionsContainer) {
      clearInterval(checkInterval);
      console.log(`✔️ Контейнер знайдено для dropdown #${index + 1}`);

      const firstOption = optionsContainer.querySelector('[role="option"], li, button, div');
      if (firstOption) {
        console.log(`✔️ Перша опція: "${firstOption.textContent.trim()}"`);
        simulateClick(firstOption, `опція dropdown #${index + 1}`);
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
      } else {
        console.error(`❌ Немає опцій у dropdown #${index + 1}`);
      }
    }

    if (elapsed >= timeout) {
      clearInterval(checkInterval);
      if (attempt < 2) {
        console.warn(`⏱️ Таймаут, повторна спроба для dropdown #${index + 1}`);
        selectFirstOption(dropdown, index, attempt + 1);
      } else {
        console.error(`❌ Dropdown #${index + 1}: після двох спроб опції не з’явились`);
      }
    }
  }, interval);
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);
  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

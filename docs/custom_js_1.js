/*custom js code*/
console.log('test_7')
function simulateFullInteraction(el, label = "") {
  console.log(`🖱️ Симулюю взаємодію з: ${label}`);
  el.focus();
  ["pointerdown","pointerup","mousedown","mouseup","click"].forEach(type => {
    const evt = new MouseEvent(type, { bubbles: true, cancelable: true });
    el.dispatchEvent(evt);
    console.log(`✔️ Подія ${type} відправлена для: ${label}`);
  });
  const keyEvt = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
  el.dispatchEvent(keyEvt);
  console.log(`✔️ Відправлено keydown ArrowDown для: ${label}`);
}

function selectFirstOption(dropdown, index, attempt = 1) {
  console.log(`➡️ Обробка dropdown #${index + 1}, спроба ${attempt}`);
  simulateFullInteraction(dropdown, `dropdown #${index + 1}`);

  const optionsContainerId = dropdown.getAttribute("aria-controls");

  const observer = new MutationObserver((mutations, obs) => {
    const optionsContainer = document.getElementById(optionsContainerId);
    if (optionsContainer) {
      const firstOption = optionsContainer.querySelector('[role="option"], li, button, div');
      if (firstOption) {
        console.log(`✔️ Знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        simulateFullInteraction(firstOption, `перша опція dropdown #${index + 1}`);
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
        obs.disconnect();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
    if (attempt < 2) {
      console.warn(`⏱️ Таймаут: опції для dropdown #${index + 1} не з’явились. Повторна спроба...`);
      selectFirstOption(dropdown, index, attempt + 1);
    } else {
      console.error(`❌ Dropdown #${index + 1}: після двох спроб опції не з’явились`);
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);
  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

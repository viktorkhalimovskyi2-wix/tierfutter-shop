/*custom js code*/
console.log('test_10')
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

  const label = dropdown.getAttribute("aria-label");
  const timeout = 5000;
  let done = false;

  const observer = new MutationObserver((mutations, obs) => {
    const optionsContainers = document.querySelectorAll('[id^="dropdown-options-container_"]');
    optionsContainers.forEach(container => {
      const firstOption = container.querySelector('[role="option"], li, button, div');
      if (firstOption && !done) {
        done = true;
        console.log(`✔️ Для "${label}" знайдено першу опцію: "${firstOption.textContent.trim()}"`);
        simulateClick(firstOption, `опція dropdown #${index + 1}`);
        console.log(`✔️ Вибрано першу опцію у dropdown #${index + 1}`);
        obs.disconnect();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
    if (!done) {
      if (attempt < 2) {
        console.warn(`⏱️ Таймаут: опції для "${label}" не з’явились. Повторна спроба...`);
        selectFirstOption(dropdown, index, attempt + 1);
      } else {
        console.error(`❌ Dropdown "${label}": після двох спроб опції не з’явились`);
      }
    }
  }, timeout);
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('button[data-hook="dropdown-base"]');
  console.log(`Знайдено ${dropdowns.length} dropdown-ів`);
  dropdowns.forEach((dropdown, index) => selectFirstOption(dropdown, index));
});

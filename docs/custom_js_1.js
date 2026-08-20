/*custom js code*/
console.log('test_16_7')
document.addEventListener("DOMContentLoaded", function() {
function selectAllOptions() {
  const allDivs = document.getElementsByTagName("div");
  const optionContainers = [];

  for (let i = 0; i < allDivs.length; i++) {
    const el = allDivs[i];
    if (el.id && el.id.startsWith("view-more-options-")) {
      optionContainers.push(el);
    }
  }

  console.log(`Знайдено ${optionContainers.length} контейнерів`);

  optionContainers.forEach((container, index) => {
    // пробуємо спершу input
    let target = container.querySelector("input");
    if (!target) {
      // якщо input нема — беремо label
      target = container.querySelector("label");
    }

    if (!target) {
      console.warn(`❌ У контейнері #${index} (${container.id}) не знайдено ні input, ні label`);
      return;
    }

    const reactPropsKey = Object.keys(target).find(k => k.startsWith("__reactProps"));
    const reactProps = target[reactPropsKey];

    if (reactProps) {
      if (reactProps.onChange) {
        console.log(`➡️ Викликаю onChange для контейнера #${index}: id=${container.id}`);
        reactProps.onChange({
          target,
          currentTarget: target,
          bubbles: true,
          isTrusted: true
        });
      } else if (reactProps.onClick) {
        console.log(`➡️ Викликаю onClick для контейнера #${index}: id=${container.id}`);
        reactProps.onClick({
          target,
          currentTarget: target,
          bubbles: true,
          isTrusted: true
        });
      } else {
        console.error(`❌ У React-пропсах контейнера #${index} немає onChange/onClick`);
      }
    } else {
      console.error(`❌ Не знайдено __reactProps у контейнера #${index}`);
    }
  });
}

// Викликати функцію коли потрібно вибрати всі параметри
selectAllOptions();


});

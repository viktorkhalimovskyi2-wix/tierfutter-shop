/*custom js code*/
console.log('test_16_6')
document.addEventListener("DOMContentLoaded", function() {
function selectAllOptions() {
  // знаходимо всі div з id, що починається на "view-more-options-"
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
    const input = container.querySelector("input");
    if (!input) {
      console.warn(`❌ У контейнері #${index} (${container.id}) не знайдено input`);
      return;
    }

    // знаходимо ключ __reactProps
    const reactPropsKey = Object.keys(input).find(k => k.startsWith("__reactProps"));
    const reactProps = input[reactPropsKey];

    if (reactProps && reactProps.onChange) {
      console.log(`➡️ Викликаю onChange для input у контейнері #${index}: id=${container.id}`);
      reactProps.onChange({
        target: input,
        currentTarget: input,
        bubbles: true,
        isTrusted: true
      });
    } else {
      console.error(`❌ Не знайдено onChange у React-пропсах для контейнера #${index}`);
    }
  });
}

// Викликати функцію коли потрібно вибрати всі параметри
selectAllOptions();

});

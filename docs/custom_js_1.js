/*custom js code*/
console.log('test_16_8')
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
    const input = container.querySelector("input");
    if (!input) {
      console.warn(`❌ У контейнері #${index} (${container.id}) не знайдено input`);
      return;
    }

    const reactPropsKey = Object.keys(input).find(k => k.startsWith("__reactProps"));
    const reactProps = input[reactPropsKey];

    if (reactProps) {
      // перевіряємо всі можливі хендлери
      if (reactProps.onChange) {
        console.log(`➡️ Викликаю onChange для контейнера #${index}`);
        reactProps.onChange({ target: input, currentTarget: input, bubbles: true, isTrusted: true });
      } else if (reactProps.onClick) {
        console.log(`➡️ Викликаю onClick для контейнера #${index}`);
        reactProps.onClick({ target: input, currentTarget: input, bubbles: true, isTrusted: true });
      } else if (reactProps.onInput) {
        console.log(`➡️ Викликаю onInput для контейнера #${index}`);
        reactProps.onInput({ target: input, currentTarget: input, bubbles: true, isTrusted: true });
      } else {
        console.error(`❌ У React-пропсах контейнера #${index} немає onChange/onClick/onInput`);
      }
    } else {
      console.error(`❌ Не знайдено __reactProps у контейнера #${index}`);
    }
  });
}

// Викликати функцію коли потрібно вибрати всі параметри
selectAllOptions();


});

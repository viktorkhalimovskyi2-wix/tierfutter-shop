/*custom js code*/
console.log('test_16_9')
document.addEventListener("DOMContentLoaded", function() {
function findReactProps(element) {
  // піднімаємось вгору по DOM і шукаємо __reactProps
  let current = element;
  while (current) {
    const key = Object.keys(current).find(k => k.startsWith("__reactProps"));
    if (key) return current[key];
    current = current.parentNode;
  }
  return null;
}

function selectAllOptions() {
  const allDivs = document.querySelectorAll("div[id^='view-more-options-']");
  console.log(`Знайдено ${allDivs.length} контейнерів`);

  allDivs.forEach((container, index) => {
    const input = container.querySelector("input");
    if (!input) {
      console.warn(`❌ У контейнері #${index} (${container.id}) не знайдено input`);
      return;
    }

    const reactProps = findReactProps(input);

    if (reactProps) {
      if (reactProps.onChange) {
        console.log(`➡️ Викликаю onChange для контейнера #${index}`);
        reactProps.onChange({ target: input, currentTarget: input, bubbles: true, isTrusted: true });
      } else if (reactProps.onClick) {
        console.log(`➡️ Викликаю onClick для контейнера #${index}`);
        reactProps.onClick({ target: input, currentTarget: input, bubbles: true, isTrusted: true });
      } else {
        console.error(`❌ У React-пропсах контейнера #${index} немає onChange/onClick`);
      }
    } else {
      console.error(`❌ Не знайдено __reactProps навіть у батьківських вузлах контейнера #${index}`);
    }
  });
}

selectAllOptions();



});

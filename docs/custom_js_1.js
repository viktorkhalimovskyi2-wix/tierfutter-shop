/*custom js code*/
console.log('test_16_5')
document.addEventListener("DOMContentLoaded", function() {
  const addToCartBtn = document.querySelector('button[data-hook="add-to-cart"]');
  let alreadyTriggered = false; // прапорець, щоб уникнути циклу

  if (addToCartBtn) {
    console.log("✔️ Кнопка 'Додати в кошик' знайдена");

    addToCartBtn.addEventListener("click", (event) => {
      // якщо вже запускали — виходимо
      if (alreadyTriggered) return;
      alreadyTriggered = true;

      console.log("➡️ Перехоплено клік по 'Додати в кошик'");
      event.preventDefault();
      event.stopPropagation();

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

      // клікаємо по першому label у кожному контейнері
      optionContainers.forEach((container, index) => {
        const label = container.getElementsByTagName("label")[0];
        if (label) {
          console.log(`➡️ Клікаю по label у контейнері #${index}: id=${container.id}`);
          label.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
      });

      // повторний клік по кнопці кошика після вибору параметрів
      setTimeout(() => {
        console.log("➡️ Повторний клік по кнопці 'Додати в кошик'");
        addToCartBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }, 300);
    }, true);
  } else {
    console.error("❌ Кнопка 'Додати в кошик' не знайдена");
  }
});

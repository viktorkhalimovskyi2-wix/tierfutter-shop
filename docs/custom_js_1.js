/*custom js code*/
console.log('test_16_4')
document.addEventListener("DOMContentLoaded", function() {
  // знаходимо кнопку "Додати в кошик"
  const addToCartBtn = document.querySelector('button[data-hook="add-to-cart"]');

  if (addToCartBtn) {
    console.log("✔️ Кнопка 'Додати в кошик' знайдена");

    // слухаємо клік користувача
    addToCartBtn.addEventListener("click", (event) => {
      console.log("➡️ Користувач натиснув 'Додати в кошик'");

      // 1. Зупиняємо стандартну дію кнопки (щоб не вилізло повідомлення про помилку)
      event.preventDefault();
      event.stopPropagation();

      // 2. Вибираємо параметри (наприклад, view-more-options-0)
      const container = document.getElementById("view-more-options-0");
      if (container) {
        const label = container.getElementsByTagName("label")[0];
        if (label) {
          console.log("➡️ Клікаю по label:", label);

          // симулюємо кліки по label
          label.dispatchEvent(new MouseEvent("click", { bubbles: true }));

          console.log("✔️ Опція у view-more-options-0 вибрана");
        }
      }

      // 3. Після вибору параметрів повторно клікаємо по кнопці кошика
      setTimeout(() => {
        console.log("➡️ Повторний клік по кнопці 'Додати в кошик'");
        addToCartBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }, 300); // невелика затримка, щоб Wix встиг оновити state
    }, true); // true = перехоплюємо подію на фазі захоплення
  } else {
    console.error("❌ Кнопка 'Додати в кошик' не знайдена");
  }
});


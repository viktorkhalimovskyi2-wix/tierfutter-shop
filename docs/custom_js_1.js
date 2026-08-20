/*custom js code*/
console.log('test_16_3')
document.addEventListener("DOMContentLoaded", function() {
  // отримуємо контейнер по id
  let container = document.getElementById("view-more-options-0");

  if (container) {
    // знаходимо перший label всередині контейнера
    let label = container.getElementsByTagName("label")[0];

    if (label) {
      console.log("➡️ Клікаю по label:", label);

      // симулюємо клік
      label.click();

      console.log("✔️ Клік по label виконано");
    } else {
      console.error("❌ Label всередині контейнера не знайдено");
    }
  } else {
    console.error("❌ Контейнер view-more-options-0 не знайдено");
  }
});

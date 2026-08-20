/*custom js code*/
console.log('test_16_2')
document.addEventListener("DOMContentLoaded", function() {
  // отримуємо контейнер по id
  const container = document.getElementById("view-more-options-0");

  if (container) {
    // знаходимо перший label всередині контейнера
    const label = container.getElementsByTagName("label")[0];

    if (label) {
      console.log("➡️ Клікаю по label:", label);

      // симулюємо справжній клік
      label.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
      label.dispatchEvent(new MouseEvent("pointerup", { bubbles: true }));
      label.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      label.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      label.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      console.log("✔️ Клік по label виконано");
    } else {
      console.error("❌ Label всередині контейнера не знайдено");
    }
  } else {
    console.error("❌ Контейнер view-more-options-0 не знайдено");
  }
});

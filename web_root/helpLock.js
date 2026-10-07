// Фиксация положения переключателя справки при раскрытии/сворачивании.
//
// Проблема: при раскрытии блока справки (кнопка "Show Help" или панель
// "Как пользоваться условиями") страница смещалась, и заголовок блока уходил
// за верхний край экрана. Пользователю приходилось прокручивать вверх.
//
// Решение: перед переключением запоминаем положение нажатой кнопки на экране,
// а после отрисовки возвращаем прокрутку так, чтобы кнопка осталась на том же
// месте. Текст справки при этом раскрывается вниз от кнопки.

// Ограничение высоты раскрытой справки: длинный текст прокручивается внутри
// блока, а страница и кнопка остаются на месте.
export const HELP_BOX_STYLE = 'max-height:70vh;overflow-y:auto;';

// Ближайший предок с собственной вертикальной прокруткой (например, блок
// справки с ограничением высоты) либо окно.
function scrollParent(el) {
  let n = el.parentElement;
  while (n && n !== document.body) {
    const oy = window.getComputedStyle(n).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight) return n;
    n = n.parentElement;
  }
  return window;
}

export function lockToggle(ev) {
  const raw = ev && ev.target;
  if (!raw || typeof raw.closest !== 'function') return;
  const el = raw.closest('button, summary, [role="button"], .cursor-pointer') || raw;
  const before = el.getBoundingClientRect().top;

  let cancelled = false;
  const cancel = () => { cancelled = true; };
  // Если пользователь сам начал прокрутку, больше ничего не корректируем.
  window.addEventListener('wheel', cancel, { once: true, passive: true });
  window.addEventListener('touchmove', cancel, { once: true, passive: true });
  window.addEventListener('keydown', cancel, { once: true });

  const fix = () => {
    if (cancelled || !el.isConnected) return;
    const delta = el.getBoundingClientRect().top - before;
    if (Math.abs(delta) > 1) {
      const sp = scrollParent(el);
      sp.scrollBy(0, delta);
    }
  };

  requestAnimationFrame(() => {
    fix();
    requestAnimationFrame(fix);
  });
  // Повторная проверка для содержимого, которое дорисовывается позже
  // (например, панель условий подгружает данные с устройства).
  setTimeout(fix, 150);
  setTimeout(() => {
    fix();
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchmove', cancel);
    window.removeEventListener('keydown', cancel);
  }, 500);
}

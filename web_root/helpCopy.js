
// Блок справки с кнопкой "Копировать справку".
//
// Зачем: пользователь раскрывает справку и хочет сохранить её в удобном
// виде или передать нейросети. Выделять мышью длинный текст с таблицами
// неудобно, поэтому в правом верхнем углу блока справки есть кнопка,
// которая копирует справку целиком одним нажатием.
//
// Что копируется: весь текст справки (включая части, скрытые за прокруткой
// блока) в формате Markdown - заголовки, списки, таблицы, жирный текст и
// код сохраняют структуру, а лишнего оформления нет.
//
// Кнопка закреплена (sticky) внутри прокручиваемой области, поэтому остаётся
// на виду, пока пользователь листает длинную справку, и всегда стоит левее
// полосы прокрутки.
//
// Использование:
//   ${showHelp && html`<${HelpBox} language=${language} class="mt-6">${content}<//>`}
//   class    - классы внешней обёртки (отступы, позиционирование)
//   boxClass - дополнительные классы самого блока (например, цвет текста)

import { html, useState, useRef, useEffect } from './bundle.js';

const BOX_STYLE = 'max-height:70vh;max-height:70dvh;overflow-y:auto;';

// ---------------------------------------------------------------------------
// DOM -> Markdown
// ---------------------------------------------------------------------------
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEMPLATE']);
const BLOCK_TAGS = new Set([
  'P', 'DIV', 'SECTION', 'ARTICLE', 'ASIDE', 'HEADER', 'FOOTER', 'MAIN',
  'FIGURE', 'FIGCAPTION', 'DETAILS', 'DL', 'LI', 'DD',
]);

// Оборачивает текст маркером, сохраняя пробелы по краям снаружи маркера.
function wrapInline(marker, s) {
  const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  return m[2] ? m[1] + marker + m[2] + marker + m[3] : s;
}

function block(s) {
  const t = s.trim();
  return t ? '\n\n' + t + '\n\n' : '';
}

function toMd(node, pre) {
  if (node.nodeType === 3) {
    const v = node.nodeValue.replace(/\u00a0/g, ' ');
    return pre ? v : v.replace(/\s+/g, ' ');
  }
  if (node.nodeType !== 1) return '';

  const tag = node.tagName.toUpperCase();
  if (SKIP_TAGS.has(tag)) return '';
  if (node.hidden || node.getAttribute('aria-hidden') === 'true') return '';
  if (node.hasAttribute('data-copy-skip')) return '';

  const kids = (p = pre) => Array.from(node.childNodes).map((c) => toMd(c, p)).join('');

  if (/^H[1-6]$/.test(tag)) {
    const t = kids().trim().replace(/\s*\n\s*/g, ' ');
    return t ? block('#'.repeat(Number(tag[1])) + ' ' + t) : '';
  }

  switch (tag) {
    case 'BR':
      return '\n';
    case 'HR':
      return '\n\n---\n\n';
    case 'B':
    case 'STRONG':
      return wrapInline('**', kids());
    case 'I':
    case 'EM':
      return wrapInline('*', kids());
    case 'CODE':
      if (pre) return kids();
      return wrapInline('`', node.textContent.replace(/\s+/g, ' '));
    case 'PRE': {
      const code = node.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
      return code ? '\n\n```\n' + code + '\n```\n\n' : '';
    }
    case 'A': {
      const href = node.getAttribute('href') || '';
      const text = kids();
      const m = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (/^https?:\/\//i.test(href) && m[2]) return m[1] + '[' + m[2] + '](' + href + ')' + m[3];
      return text;
    }
    case 'UL':
    case 'OL': {
      const ordered = tag === 'OL';
      let n = parseInt(node.getAttribute('start') || '1', 10);
      if (!Number.isFinite(n)) n = 1;
      const items = Array.from(node.children)
        .filter((c) => c.tagName.toUpperCase() === 'LI')
        .map((li) => {
          const body = toMd(li, pre).trim().replace(/\n{2,}/g, '\n');
          const marker = ordered ? (n++) + '. ' : '- ';
          return marker + body.replace(/\n/g, '\n' + ' '.repeat(marker.length));
        });
      return items.length ? '\n\n' + items.join('\n') + '\n\n' : '';
    }
    case 'TABLE': {
      const rows = Array.from(node.rows).map((tr) =>
        Array.from(tr.cells).map((c) =>
          toMd(c, pre).replace(/\s*\n+\s*/g, ' ').replace(/\|/g, '\\|').trim()
        )
      ).filter((r) => r.length);
      if (!rows.length) return '';
      const w = Math.max(...rows.map((r) => r.length));
      const norm = rows.map((r) => { const x = r.slice(); while (x.length < w) x.push(''); return x; });
      const line = (r) => '| ' + r.join(' | ') + ' |';
      return '\n\n' + [line(norm[0]), line(new Array(w).fill('---'))]
        .concat(norm.slice(1).map(line)).join('\n') + '\n\n';
    }
    case 'BLOCKQUOTE': {
      const t = kids().trim();
      return t ? '\n\n' + t.split('\n').map((l) => '> ' + l).join('\n') + '\n\n' : '';
    }
    case 'SUMMARY':
    case 'DT': {
      const t = kids().trim().replace(/\s*\n\s*/g, ' ');
      return t ? block('**' + t + '**') : '';
    }
    default:
      return BLOCK_TAGS.has(tag) ? block(kids()) : kids();
  }
}

// Превращает DOM блока справки в чистый Markdown-текст.
export function helpToText(root) {
  const raw = toMd(root, false);
  // Код в ``` ``` не трогаем: пробелы и пустые строки внутри него значимы.
  const out = raw.split(/(```[\s\S]*?```)/g).map((part, i) => (
    i % 2 ? part : part
      .replace(/[ \t]+\n/g, '\n')
      .replace(/(\S) {2,}/g, '$1 ')
      .replace(/\n{3,}/g, '\n\n')
  )).join('');
  return out.trim() + '\n';
}

// ---------------------------------------------------------------------------
// Копирование в буфер обмена.
// navigator.clipboard работает только в защищённом контексте (HTTPS или
// localhost), а устройство обычно открывают по http://<ip> в локальной сети.
// Поэтому при отсутствии/отказе используем document.execCommand('copy')
// через временный textarea (тот же приём, что у кнопки "copy SN" на
// странице 1-Wire).
// ---------------------------------------------------------------------------
export function copyText(text) {
  const legacy = () => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  };
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => legacy());
  }
  return Promise.resolve(legacy());
}

// ---------------------------------------------------------------------------
// Иконки (inline SVG, без внешних файлов: страницы упаковываются в прошивку)
// ---------------------------------------------------------------------------
const iconCopy = () => html`
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="14" height="17" rx="3"></rect>
    <path d="M7 5V4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-1"></path>
  </svg>`;

const iconOk = () => html`
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
  </svg>`;

// ---------------------------------------------------------------------------
// Кнопка копирования
// ---------------------------------------------------------------------------
export function HelpCopyButton({ getRoot, language }) {
  const [state, setState] = useState('idle'); // idle | ok | err
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const isRu = language === 'ru';
  const title = isRu ? 'Скопировать справку целиком' : 'Copy the whole help text';
  const label = state === 'ok'
    ? (isRu ? 'Скопировано' : 'Copied')
    : state === 'err'
      ? (isRu ? 'Не удалось' : 'Copy failed')
      : '';

  const onClick = async (e) => {
    e.stopPropagation();
    const root = getRoot();
    const ok = root ? await copyText(helpToText(root)) : false;
    setState(ok ? 'ok' : 'err');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1800);
  };

  const colors = state === 'ok'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:!bg-emerald-900/40 dark:!text-emerald-300 dark:!border-emerald-600'
    : state === 'err'
      ? 'bg-rose-50 text-rose-700 border-rose-300 dark:!bg-rose-900/40 dark:!text-rose-300 dark:!border-rose-600'
      : 'bg-white/90 text-slate-600 border-slate-300 hover:bg-white hover:text-teal-600 hover:border-teal-400 dark:!bg-slate-800 dark:!text-slate-200 dark:!border-slate-500 dark:hover:!text-teal-300';

  return html`
    <button
      type="button"
      onClick=${onClick}
      title=${title}
      aria-label=${title}
      class="mt-3 mr-3 inline-flex items-center gap-1.5 h-9 px-2.5 rounded-full border shadow-sm text-xs font-semibold transition-colors active:scale-95 ${colors}"
    >
      ${state === 'ok' ? iconOk() : iconCopy()}
      ${label && html`<span>${label}</span>`}
    </button>`;
}

// ---------------------------------------------------------------------------
// Блок справки
// ---------------------------------------------------------------------------
export function HelpBox({ language, class: cls = '', boxClass = '', children }) {
  const boxRef = useRef(null);
  return html`
    <div class="w-full ${cls}">
      <div
        ref=${boxRef}
        data-help-box="1"
        class="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full ${boxClass}"
        style=${BOX_STYLE}
      >
        <div class="sticky top-0 z-20 h-0 flex justify-end" data-copy-skip="1">
          <${HelpCopyButton} getRoot=${() => boxRef.current} language=${language} />
        </div>
        ${children}
      </div>
    </div>`;
}

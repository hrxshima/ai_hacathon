/* PICK ME AGAIN — interactive logic. Vanilla JS, no dependencies. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- источники (из листа «Источники» CASE_READY) ---------- */
const SOURCES = {
  S01: ['Circular economy: definition, importance and benefits', 'Европейский парламент', 'https://www.europarl.europa.eu/topics/en/article/20151201STO05603/circular-economy-definition-importance-and-benefits'],
  S02: ['Sustainable and Circular Textiles Strategy', 'Европейская комиссия', 'https://environment.ec.europa.eu/strategy/textiles-strategy_en'],
  S03: ['New EU rules to stop the destruction of unsold clothes and shoes', 'Европейская комиссия', 'https://environment.ec.europa.eu/news/new-eu-rules-stop-destruction-unsold-clothes-and-shoes-2026-02-09_en'],
  S04: ['Ban on destruction of unsold clothes and shoes enters into application', 'Европейская комиссия', 'https://environment.ec.europa.eu/news/ban-destruction-unsold-clothes-and-shoes-enters-application-2026-07-17_en'],
  S05: ['Rethinking business models for a thriving fashion industry', 'Ellen MacArthur Foundation', 'https://www.ellenmacarthurfoundation.org/fashion-business-models/overview'],
  S06: ['Circular business models in the fashion industry — new study', 'Ellen MacArthur Foundation', 'https://www.ellenmacarthurfoundation.org/news/circular-business-models-in-the-fashion-industry'],
  S07: ['H&M Group: публикация отчётности за 2024 год', 'H&M Group', 'https://hmgroup.com/news/h-m-hennes-mauritz-ab-publishes-its-annual-and-sustainability-report-2024/'],
  S08: ['H&M Group: публикация отчётности за 2025 год', 'H&M Group', 'https://hmgroup.com/news/h-m-hennes-mauritz-ab-publishes-its-annual-and-sustainability-report-2025/'],
  S09: ['Materials', 'H&M Group', 'https://hmgroup.com/sustainability/product-lifecycle/materials/'],
  S10: ['Фонд «Второе дыхание»: направления работы', 'Фонд «Второе дыхание»', 'https://vtoroe.ru/'],
  S11: ['Матрасы из отходов начали выпускать в России', 'Российский экологический оператор', 'https://reo.ru/tpost/bl0mehayj1-matrasi-iz-othodov-nachali-vipuskat-v-ro'],
  S14: ['Опрос: три четверти россиян продлевают жизнь ненужным вещам', 'Российский экологический оператор', 'https://reo.ru/tpost/r1scfpb4n1-opros-tri-chetverti-rossiyan-prodlevayut'],
  S15: ['Пряжу из старой одежды начнут производить в Ивановской области', 'Российский экологический оператор', 'https://reo.ru/tpost/ffz5tj3141-pryazhu-iz-staroi-odezhdi-nachnut-proizv'],
  S16: ['Patagonia Worn Wear', 'Patagonia', 'https://www.patagonia.com/worn-wear/'],
  S17: ['Transforming the Textile Industry: Learning to Manage Waste, Better', 'UNEP', 'https://wedocs.unep.org/entities/publication/44b5ed72-939d-4db5-8b3c-7e306c13208d']
};
const sx = (...ids) => `<div class="sxs">${ids.map(i => `<button class="sx" data-src="${i}">${i}</button>`).join(' ')}</div>`;

/* ---------- кукла и одежда ---------- */
const FIT = {
  "jeans": {
    "before": {
      "left": 13.364478149746512,
      "top": 34.12906258393769,
      "width": 78.78828507981733,
      "height": 48.26590532292275,
      "clip": [
        0.7328072153325818,
        3.6076662908680945,
        0.5073280721533258,
        3.6076662908680945
      ]
    },
    "repaired": {
      "left": 1.9478098788443605,
      "top": 32.3820926120771,
      "width": 106.88536812674745,
      "height": 48.94187068151988,
      "clip": [
        0.9765625,
        15.0390625,
        1.6276041666666667,
        12.6953125
      ]
    },
    "remade": {
      "left": 11.438893264390645,
      "top": 24.153792362481127,
      "width": 80.64924836489402,
      "height": 36.455583650559895,
      "clip": [
        19.986979166666664,
        0.87890625,
        22.981770833333336,
        0.78125
      ]
    }
  },
  "tshirt": {
    "before": {
      "left": 18.333088774761556,
      "top": 17.765308201280813,
      "width": 68.16140865737343,
      "height": 19.540377512245673,
      "clip": [
        0.4329004329004329,
        0.42194092827004215,
        0.4329004329004329,
        0.42194092827004215
      ]
    },
    "repaired": {
      "left": 15.913141838623432,
      "top": 13.036565977742448,
      "width": 72.65647494344279,
      "height": 28.068636587906365,
      "clip": [
        7.03125,
        0.87890625,
        13.4765625,
        0.87890625
      ]
    },
    "remade": {
      "left": 19.377556984219755,
      "top": 17.565359477124183,
      "width": 66.07247223845705,
      "height": 20.751633986928105,
      "clip": [
        0.39370078740157477,
        0.42016806722689076,
        0.39370078740157477,
        0.42016806722689076
      ]
    }
  },
  "cardigan": {
    "before": {
      "left": 9.310344827586206,
      "top": 10.72462246196985,
      "width": 86.29116526780598,
      "height": 41.032216701394454,
      "clip": [
        12.174479166666668,
        0.09765625,
        16.145833333333336,
        0.0
      ]
    },
    "repaired": {
      "left": 9.310344827586206,
      "top": 9.65513192681574,
      "width": 86.20689655172413,
      "height": 43.53159806148352,
      "clip": [
        13.932291666666666,
        0.0,
        20.833333333333336,
        0.0
      ]
    },
    "remade": {
      "left": 8.362585174478628,
      "top": 17.560078385533057,
      "width": 86.7231055131117,
      "height": 25.83319008491766,
      "clip": [
        0.33670033670033667,
        0.2976190476190476,
        0.33670033670033667,
        0.2976190476190476
      ]
    }
  },
  "jacket": {
    "before": {
      "left": 1.0916256157635467,
      "top": 15.931562048044826,
      "width": 101.12118226600985,
      "height": 25.954847688263495,
      "clip": [
        0.3574620196604111,
        0.1422475106685633,
        0.0,
        0.2844950213371266
      ]
    },
    "repaired": {
      "left": 4.482758620689655,
      "top": 9.961307038028194,
      "width": 95.86206896551724,
      "height": 43.636115703888045,
      "clip": [
        12.5,
        0.0,
        17.7734375,
        0.0
      ]
    },
    "remade": {
      "left": 12.07943599050677,
      "top": 14.722720098445736,
      "width": 80.66871422588301,
      "height": 27.026155155890773,
      "clip": [
        4.065620542082739,
        5.971479500891266,
        3.9942938659058487,
        5.971479500891266
      ]
    }
  }
};
const ORDER = ['jeans', 'tshirt', 'cardigan', 'jacket'];
const FILE_NAMES = { jeans: 'pants', tshirt: 'tshirt', cardigan: 'cardigan', jacket: 'jacket' };
const CLOTHES_VERSION = {"cardigan_remade": "df4c0a7bb7", "tshirt_remade": "622b1996f3", "pants_before": "2f3d50bd22", "cardigan_before": "6049e9c587", "tshirt_before": "c286db1ac7", "pants_remade": "5838ecdc07", "jacket_repaired": "e3a722981c", "jacket_remade": "f370ab1a19", "cardigan_repaired": "6b195f4c77", "jacket_before": "3945b0fff8", "tshirt_repaired": "5114601f01", "pants_repaired": "c23b6e5fde"};
const img = (id, st) => { const name = `${FILE_NAMES[id]}_${st}`; return `assets/clothes/${name}.png?v=${CLOTHES_VERSION[name]}`; };
const onDoll = img;

const ITEMS = {
  jeans:   { name: 'Джинсы',   state: 'Порванные колени, пятна',
    card: 'Джинсы всё ещё можно носить, но колени порвались. Можно восстановить повреждения, переделать вещь или передать дальше — в зависимости от состояния.',
    main: 'repair', off: [], done: { repair: 'Колено укрепили заплаткой. Джинсы снова можно носить.', remake: 'Из джинсов сделали юбку. Фасон изменился, материал остался в использовании.' } },
  tshirt:  { name: 'Футболка', state: 'Пятна, ткань ещё крепкая',
    card: 'Футболка потеряла прежний вид, хотя ткань ещё пригодна. Иногда такая вещь подходит для переделки.',
    main: 'remake', off: [], done: { repair: 'Повреждения устранили, сохранив первоначальный фасон футболки.', remake: 'Из существующей вещи сделали новый фасон. Это переделка, а не переработка волокна.' } },
  cardigan:{ name: 'Кардиган', state: 'Дырка на рукаве',
    card: 'Небольшая дырка ещё не означает, что вещь отслужила своё. Её можно попробовать заштопать.',
    main: 'repair', off: [], done: { repair: 'Дырку заштопали. Вещь осталась в гардеробе.', remake: 'Кардиган переделали, изменив фасон и добавив декоративные детали.' } },
  jacket:  { name: 'Куртка',   state: 'Неисправная молния',
    card: 'Куртка цела, но молния сломалась. Починка фурнитуры может вернуть её в использование.',
    main: 'repair', off: [], done: { repair: 'Молнию заменили. Куртка снова пригодна к использованию.', remake: 'Из куртки сделали жилет: рукава убрали, основную часть вещи сохранили.' } }
};

const ACTIONS = [
  ['keep', 'Оставить и носить', 'Если вещь всё ещё пригодна и нравится, продолжать носить её — тоже способ продлить срок использования.', ['S01', 'S05']],
  ['repair', 'Ремонтировать', 'Ремонт восстанавливает функцию вещи: например, можно заштопать дырку или заменить молнию.', ['S05']],
  ['remake', 'Переделать', 'Переделка — создание нового фасона или изделия из уже существующей вещи. Она не равна переработке материала в новое волокно.', ['S05']],
  ['give', 'Передать / продать', 'Пригодная одежда может перейти к другому человеку. Экологический эффект зависит, в том числе, от того, заменяет ли она покупку новой вещи.', ['S05', 'S10']],
  ['collect', 'Сдать на сбор', 'Собранную вещь ждёт сортировка. Её дальнейшая судьба зависит от состояния и возможностей оператора.', ['S10', 'S17']],
  ['waste', 'Отходы', 'Если других доступных путей нет, вещь может стать отходом. Это не значит, что любую повреждённую одежду нужно сразу выбрасывать.', ['S17']]
];
const ACT = Object.fromEntries(ACTIONS.map(a => [a[0], a]));
const LEDGER = [
  ['keep', 'Осталось в гардеробе'], ['repair', 'Отремонтировано'], ['remake', 'Переделано'],
  ['give', 'Передано другому человеку'], ['collect', 'Отправлено на сбор текстиля'], ['waste', 'Стало отходом']
];
const STATUS = { keep: 'ОСТАЛАСЬ', repair: 'ОТРЕМОНТИРОВАНА', remake: 'ПЕРЕДЕЛАНА', give: 'ПЕРЕДАНА', collect: 'СДАНА НА СБОР', waste: 'ОТХОДЫ' };

const ROUTES = [
  ['Повторное использование', 'Одежду в хорошем состоянии могут передать людям, которым она нужна, или вернуть в оборот через повторную продажу.', ['S10']],
  ['Благотворительный магазин', 'Часть пригодных вещей может продаваться в благотворительном магазине, помогая финансировать программы организации.', ['S10']],
  ['Ветошь и наполнители', 'Непригодный для носки текстиль иногда используют для изготовления обтирочной ветоши, регенерированного волокна, наполнителей и других технических материалов. Это не то же самое, что новая одежда.', ['S10', 'S11']],
  ['Новые проекты переработки', 'В Ивановской области планируют производить пряжу из вторичного текстиля.', ['S15']],
  ['Отходы', 'Часть вещей после сортировки может оказаться непригодной для дальнейшего использования или переработки и стать отходами.', []]
];

const TIMELINE = [
  ['11.03.2020', 'План циркулярной экономики ЕС', 'Евросоюз принял план действий по циркулярной экономике. Позднее на его основе развивались отраслевые меры для текстиля.', 'ПРИНЯТО', ['S02'], false],
  ['30.03.2022', 'Стратегия устойчивого текстиля', 'Еврокомиссия приняла стратегию устойчивого и циркулярного текстиля. Она определяет направления изменений, в том числе долговечность и ремонтопригодность одежды.', 'ПРИНЯТА', ['S02'], false],
  ['19.07.2026', 'Запрет уничтожения непроданной одежды для крупных компаний', 'Для крупных компаний в ЕС начал применяться запрет уничтожать непроданную одежду, аксессуары и обувь; существуют оговорённые исключения.', 'ДЕЙСТВУЕТ', ['S03', 'S04'], false],
  ['Февраль 2027', 'Единый формат раскрытия данных', 'С февраля 2027 года для раскрытия информации о непроданных товарах, направляемых на уничтожение, предусмотрена единая форма отчётности.', 'ПРЕДСТОЯЩЕЕ ТРЕБОВАНИЕ', ['S03'], true],
  ['19.07.2030', 'Запрет для средних предприятий', 'Запрет на уничтожение непроданной одежды начнёт распространяться и на средние предприятия.', 'ЗАПЛАНИРОВАННОЕ ПРИМЕНЕНИЕ', ['S03', 'S04'], true]
];

/* ---------- state ---------- */
const state = { fitSel: 'jeans', wSel: 'jeans', choice: {}, reached: 1 };
const stOf = (id) => {
  const c = state.choice[id];
  if (!c || c === 'keep') return 'before';
  if (c === 'repair') return 'repaired';
  if (c === 'remake') return 'remade';
  return 'gone';
};

// Keep images and controls mounted: swapping a garment must not change page geometry or focus.
function renderDoll(el, layers, opts = {}) {
  const revision = (Number(el.dataset.revision) || 0) + 1;
  el.dataset.revision = revision; el.classList.add('is-loading');
  if (!$('.base', el)) {
    const base = new Image();
    base.src = 'assets/doll/doll.webp'; base.alt = 'Кукла-манекен'; base.className = 'base';
    el.appendChild(base);
  }
  $$('img[data-k]', el).forEach(im => {
    if (!layers.some(layer => layer.id === im.dataset.k)) im.remove();
  });
  layers.forEach(({ id, st }) => {
    let im = $(`img[data-k="${id}"]`, el);
    const changed = im && im.dataset.st !== st;
    if (!im) { im = new Image(); im.alt = ''; im.dataset.k = id; }
    const fit = FIT[id][st];
    im.src = onDoll(id, st); im.dataset.st = st;
    im.style.cssText = `left:${fit.left}%;top:${fit.top}%;width:${fit.width}%;height:${fit.height}%;clip-path:inset(${fit.clip.map(n => n + '%').join(' ')})`;
    im.classList.toggle('is-focus', opts.focus === id);
    im.classList.toggle('is-new', !!(opts.animate && changed));
    el.appendChild(im);
  });
  Promise.all($$('img', el).map(im => im.decode().catch(() => {}))).then(() => {
    if (Number(el.dataset.revision) === revision) el.classList.remove('is-loading');
  });
}

/* ---------- 01 примерочная ---------- */
const stageOrder = id => ORDER.slice(0, Math.max(2, ORDER.indexOf(id) + 1));
$('#fitItems').innerHTML = ORDER.map(id => `
  <button class="item" aria-pressed="false" data-id="${id}">
    <img src="${img(id, 'before')}" width="54" height="54" alt="">
    <span><b>${ITEMS[id].name}</b><small>${ITEMS[id].state}</small></span>
  </button>`).join('');
function fittingCard(id) {
  const it = ITEMS[id], n = ORDER.indexOf(id) + 1;
  return `<span class="mono acc kick">ВЕЩЬ 0${n} / 04</span>
    <h3>${it.name}</h3><span class="mono dim state">${it.state.toUpperCase()}</span><p>${it.card}</p>`;
}
function renderFitting() {
  $$('#fitItems .item').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === (state.fitSel || '')));
  $('#fitCard').innerHTML = fittingCard(state.fitSel);
  renderDoll($('#dollFitting'), stageOrder(state.fitSel).map(id => ({ id, st: 'before' })), { focus: state.fitSel });
}
$('#fitItems').addEventListener('click', (e) => {
  const b = e.target.closest('.item'); if (!b) return;
  state.fitSel = b.dataset.id || null; renderFitting(); sfx('tick');
});

/* ---------- 04 мастерская ---------- */
const workshopLayers = (ids = ORDER) => ids.filter(id => stOf(id) !== 'gone').map(id => ({ id, st: stOf(id) }));
$('#wItems').innerHTML = ORDER.map(id => `<button class="w-item" aria-pressed="false" data-id="${id}">
  <img src="${img(id, 'before')}" width="64" height="64" alt=""><b>${ITEMS[id].name}</b><small></small></button>`).join('');
$('#wActions').innerHTML = ACTIONS.map(([k, label]) => `<button class="act" data-act="${k}" aria-pressed="false">${label}</button>`).join('');
function renderWorkshop(animate = false) {
  $('#progress').textContent = `РЕШЕНО ${Object.keys(state.choice).length} / 4`;
  $$('#wItems .w-item').forEach(b => {
    const id = b.dataset.id, c = state.choice[id], st = stOf(id), sel = (state.wSel || '') === id;
    if (!id) { b.setAttribute('aria-pressed', sel); return; }
    b.setAttribute('aria-pressed', sel);
    b.classList.toggle('is-gone', st === 'gone'); b.classList.toggle('is-done', !!c);
    $('img', b).src = img(id, st === 'gone' ? 'before' : st);
    $('small', b).textContent = c ? STATUS[c] : (sel ? 'ВЫБРАНА' : 'НЕ РЕШЕНО');
  });
  const it = ITEMS[state.wSel], cur = state.choice[state.wSel];
  $('#wTitle').textContent = it ? `${it.name}: ${it.state.toLowerCase()}` : 'Пустой манекен';
  $$('#wActions .act').forEach(b => {
    const k = b.dataset.act;
    b.disabled = !it || it.off.includes(k);
    b.classList.toggle('act--main', k === it?.main); b.classList.toggle('is-chosen', cur === k);
    b.setAttribute('aria-pressed', cur === k);
    b.textContent = ACT[k][1] + (cur === k ? ' ✓' : '');
  });
  $('#wCard').innerHTML = workshopCard(state.wSel, cur);
  $('#nextItemBtn').disabled = !cur;
  renderDoll($('#dollWorkshop'), workshopLayers(stageOrder(state.wSel)), { focus: state.wSel, animate });
  renderFinal();
}
function workshopCard(id, cur) {
  if (!cur) return `<span class="mono acc kick">${ITEMS[id].name.toUpperCase()}</span><h3>${ITEMS[id].name}</h3><p>${ITEMS[id].card}</p>`;
  const [, label, next, src] = ACT[cur], did = ITEMS[id].done[cur];
  return `<span class="mono acc kick">${ITEMS[id].name.toUpperCase()} · ${label.toUpperCase()}</span>
    ${did ? `<div class="q"><b>Что сделали?</b><p>${did}</p></div>` : ''}
    <div class="q"><b>Что происходит с вещью дальше?</b><p>${next}</p></div>
    <div class="q"><b>Источник</b>${sx(...src)}</div>`;
}
$('#wItems').addEventListener('click', (e) => {
  const b = e.target.closest('.w-item'); if (!b) return;
  state.wSel = b.dataset.id; state.reached = Math.max(state.reached, ORDER.indexOf(state.wSel)); renderWorkshop(); sfx('tick');
});
$('#wActions').addEventListener('click', (e) => {
  const b = e.target.closest('.act'); if (!b || b.disabled) return;
  const a = b.dataset.act;
  state.choice[state.wSel] = a;
  renderWorkshop(true);
  if (a === 'repair' || a === 'remake') { sfx('sew'); runStitch(); }
  else if (a === 'collect') sfx('thunk');
  else if (a === 'waste') sfx('drop');
  else sfx('tick');
});
$('#nextItemBtn').addEventListener('click', () => {
  const next = ORDER.find(id => !state.choice[id]);
  if (next) {
    state.wSel = next; state.reached = Math.max(state.reached, ORDER.indexOf(next)); renderWorkshop();
    // This is an explicit navigation action; selecting clothes itself never scrolls the page.
    $('#wItems').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    $(`#wItems [data-id="${next}"]`).focus({ preventScroll: true });
  } else {
    $('#industry').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
  sfx('tick');
});
function runStitch() { const s = $('#stitch'); s.classList.remove('is-run'); void s.getBBox(); s.classList.add('is-run'); }

// Reserve the tallest card at its actual width, so different copy never resizes the background.
function sizeCards() {
  const fit = $('#fitCard'), work = $('#wCard');
  const cases = [[fit, ORDER.map(fittingCard)], [work, ORDER.flatMap(id =>
    [workshopCard(id), ...ACTIONS.filter(([k]) => !ITEMS[id].off.includes(k)).map(([k]) => workshopCard(id, k))])]];
  cases.forEach(([card, variants]) => {
    const probe = card.cloneNode(false);
    probe.removeAttribute('id'); probe.removeAttribute('aria-live'); probe.setAttribute('aria-hidden', 'true');
    probe.classList.add('card-measure');
    probe.style.width = card.getBoundingClientRect().width + 'px';
    card.parentElement.appendChild(probe);
    let height = 0;
    variants.forEach(html => { probe.innerHTML = html; height = Math.max(height, probe.getBoundingClientRect().height); });
    probe.remove(); card.style.minHeight = Math.ceil(height) + 'px';
  });
}
let cardWidth = '';
const cardSizer = new ResizeObserver(() => {
  const widths = [$('#fitCard'), $('#wCard')].map(el => el.getBoundingClientRect().width).join(',');
  if (widths === cardWidth) return;
  cardWidth = widths; sizeCards();
});
cardSizer.observe($('#fitCard')); cardSizer.observe($('#wCard'));
if (document.fonts) document.fonts.ready.then(sizeCards);

/* ---------- финал ---------- */
function renderFinal() {
  renderDoll($('#dollBefore'), ORDER.slice(0, state.reached + 1).map(id => ({ id, st: 'before' })));
  renderDoll($('#dollAfter'), workshopLayers(ORDER.slice(0, state.reached + 1)));
  $('#ledger').innerHTML = LEDGER.map(([k, title]) => {
    const list = ORDER.filter(id => state.choice[id] === k).map(id => ITEMS[id].name.toLowerCase()).join(', ');
    return `<div class="led"><span>${title}</span><span>${list || '—'}</span></div>`;
  }).join('');
}
const ba = $('#ba'), baR = $('#baRange');
const setSplit = (v, anim) => {
  if (anim && !reduced) {
    const from = +baR.value, t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 700), e = 1 - Math.pow(1 - k, 3), x = from + (v - from) * e;
      ba.style.setProperty('--split', x + '%'); baR.value = x; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  } else { ba.style.setProperty('--split', v + '%'); baR.value = v; }
  $('#baBefore').classList.toggle('is-on', v >= 50); $('#baBefore').setAttribute('aria-pressed', v >= 50);
  $('#baAfter').classList.toggle('is-on', v < 50); $('#baAfter').setAttribute('aria-pressed', v < 50);
};
baR.addEventListener('input', () => setSplit(+baR.value));
$('#baBefore').addEventListener('click', () => { setSplit(100, true); sfx('tick'); });
$('#baAfter').addEventListener('click', () => { setSplit(0, true); sfx('tick'); });
$('#restartBtn').addEventListener('click', () => {
  state.choice = {}; state.wSel = 'jeans'; state.fitSel = 'jeans'; state.reached = 1;
  renderFitting(); renderWorkshop(); setSplit(0);
  $('#fitting').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
});

/* ---------- магазин: модель ---------- */
const model = $('#model');
model.classList.add('is-circular');
$$('#model .toggle button').forEach(b => b.addEventListener('click', () => {
  $$('#model .toggle button').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
  model.classList.toggle('is-circular', b.dataset.model === 'circular');
  sfx('tick');
}));

/* ---------- отходы: контейнер и маршруты ---------- */
$('#routeList').innerHTML = ROUTES.map(([t, x, s], i) => `
  <div class="route">
    <button class="route__head" aria-expanded="false"><span class="mono acc">0${i + 1}</span><b>${t}</b><span class="route__pm" aria-hidden="true">+</span></button>
    <div class="route__body"><div><p>${x}</p>${s.length ? sx(...s) : ''}</div></div>
  </div>`).join('');
const cBtn = $('#containerBtn');
cBtn.addEventListener('click', () => {
  const open = cBtn.getAttribute('aria-expanded') !== 'true';
  cBtn.setAttribute('aria-expanded', open);
  $('.container__label').textContent = open ? 'Контейнер открыт' : 'Нажми на контейнер';
  $$('.route').forEach((r, i) => setTimeout(() => r.classList.toggle('is-on', open), open ? i * 280 : 0));
  if (open) setTimeout(() => toggleRoute($('.route'), true), 300);
  sfx('thunk');
});
function toggleRoute(r, force) {
  const h = $('.route__head', r), open = force ?? h.getAttribute('aria-expanded') !== 'true';
  h.setAttribute('aria-expanded', open); r.classList.toggle('is-open', open);
  $('.route__pm', r).textContent = open ? '−' : '+';
}
$('#routeList').addEventListener('click', (e) => {
  const h = e.target.closest('.route__head'); if (!h) return;
  toggleRoute(h.parentElement); sfx('tick');
});
/* ---------- шкала ЕС ---------- */
$('#tlItems').innerHTML = TIMELINE.map(([d, t, x, st, s, fut], i) => `
  <div class="tl__item ${fut ? 'is-future' : ''}">
    <span class="tl__date">${d}</span>
    <button class="tl__head" aria-expanded="false"><span>${t}</span><span class="tl__pm" aria-hidden="true">+</span></button>
    <span class="mono tl__st">${st}</span>
    <div class="tl__body"><div><p>${x}</p>${sx(...s)}</div></div>
  </div>`).join('');
$('#tlItems').addEventListener('click', (e) => {
  const h = e.target.closest('.tl__head'); if (!h) return;
  const it = h.parentElement, open = h.getAttribute('aria-expanded') !== 'true';
  h.setAttribute('aria-expanded', open); it.classList.toggle('is-open', open);
  $('.tl__pm', it).textContent = open ? '−' : '+'; sfx('tick');
});

/* ---------- источники: ярлыки и всплывающая карточка ---------- */
const used = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10', 'S11', 'S14', 'S15', 'S16', 'S17'];
$('#srcList').innerHTML = used.map(id => { const [t, p, u] = SOURCES[id];
  return `<li id="src-${id}"><span class="mono">${id}</span><span><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a><br><em>${p}</em></span></li>`; }).join('');
const pop = $('#srcPop');
let popFor = null;
function showPop(btn) {
  const id = btn.dataset.src, s = SOURCES[id]; if (!s) return;
  if (popFor === btn && !pop.hidden) { hidePop(); return; }
  popFor = btn;
  $('#srcPopId').textContent = id; $('#srcPopTitle').textContent = s[0]; $('#srcPopPub').textContent = s[1];
  $('#srcPopLink').href = s[2];
  pop.style.setProperty('--acc', getComputedStyle(btn).getPropertyValue('--acc') || '#8BC83D');
  pop.hidden = false;
  const r = btn.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
  let x = Math.min(innerWidth - pw - 12, Math.max(12, r.left));
  let y = r.bottom + 8; if (y + ph > innerHeight - 12) y = r.top - ph - 8;
  pop.style.left = x + 'px'; pop.style.top = Math.max(12, y) + 'px';
  $$('.sx[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  btn.setAttribute('aria-expanded', 'true');
}
function hidePop() { pop.hidden = true; if (popFor) popFor.setAttribute('aria-expanded', 'false'); popFor = null; }
document.addEventListener('click', (e) => {
  const b = e.target.closest('.sx');
  if (b) { e.stopPropagation(); showPop(b); sfx('tick'); return; }
  if (!e.target.closest('#srcPop')) hidePop();
});
$('#srcPopClose').addEventListener('click', hidePop);
addEventListener('keydown', (e) => { if (e.key === 'Escape') hidePop(); });
addEventListener('scroll', () => { if (!pop.hidden) hidePop(); }, { passive: true });

/* ---------- появление, счётчики ---------- */
const counted = new WeakSet();
function countUp(el) {
  if (counted.has(el)) return; counted.add(el);
  const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
  if (reduced) { el.textContent = to.toFixed(dec).replace('.', ','); return; }
  const t0 = performance.now(), dur = 1400;
  const step = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = (to * e).toFixed(dec).replace('.', ','); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
const io = new IntersectionObserver((ents) => ents.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('is-in');
  $$('.count', en.target).forEach(countUp);
  if (en.target.classList.contains('threshold--curtain')) { en.target.classList.add('is-open'); sfx('curtain'); }
  io.unobserve(en.target);
}), { threshold: 0.2 });
$$('.reveal, .threshold').forEach(el => io.observe(el));

/* ---------- активная локация ---------- */
const locs = $$('.loc');
locs.forEach(l => l.style.setProperty('--acc', l.dataset.accent));
let active = null;
function updateActive() {
  const mid = innerHeight * 0.45; let cur = locs[0];
  for (const l of locs) if (l.getBoundingClientRect().top <= mid) cur = l;
  if (cur === active) return; active = cur;
  document.documentElement.style.setProperty('--acc', cur.dataset.accent);
  $$('.loc-nav a').forEach(a => a.classList.toggle('is-on', a.dataset.nav === cur.dataset.loc));
  $('#topbarLoc').textContent = cur.dataset.label;
  audio.setScene(cur.dataset.loc);
}
function parallax() {
  if (reduced) return;
  $$('.parallax').forEach(bg => {
    if (bg.closest('#fitting, #workshop') || matchMedia('(max-width: 760px)').matches) { bg.style.transform = 'none'; return; }
    const r = bg.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    bg.style.transform = `translate3d(0, ${(-r.top * 0.12).toFixed(1)}px, 0) scale(1.04)`;
  });
}
let ticking = false;
addEventListener('scroll', () => { if (ticking) return; ticking = true;
  requestAnimationFrame(() => { updateActive(); parallax(); ticking = false; }); }, { passive: true });

/* ---------- видеопролог ---------- */
const sec = $('#prologue'), vid = $('#prologueVideo'), replay = $('#replayBtn');
const showTitle = () => sec.classList.add('is-title');
const endedVideo = () => { sec.classList.add('is-ended'); sec.classList.remove('needs-play'); showTitle(); };
// Set the DOM properties as well as attributes before play(), as required by mobile WebKit.
vid.muted = true; vid.defaultMuted = true; vid.playsInline = true;
async function playPrologue(restart = false) {
  if (restart) vid.currentTime = 0;
  sec.classList.remove('is-ended');
  try {
    await vid.play(); sec.classList.remove('needs-play');
  } catch (error) {
    // Keep the poster visible and the existing replay button usable when autoplay is blocked.
    if (error.name !== 'AbortError') { sec.classList.add('needs-play'); showTitle(); }
  }
}
vid.addEventListener('playing', () => sec.classList.remove('needs-play', 'is-ended'));
vid.addEventListener('timeupdate', () => {
  $('#recTime').textContent = '00:00:' + String(Math.floor(vid.currentTime)).padStart(2, '0');
  if (vid.currentTime > Math.max(0, (vid.duration || 8) - 3)) showTitle();
});
vid.addEventListener('ended', endedVideo);
vid.addEventListener('error', () => { sec.classList.add('needs-play'); showTitle(); vid.controls = true; });
if (reduced) { vid.removeAttribute('autoplay'); vid.pause(); endedVideo(); }
else playPrologue();
setTimeout(showTitle, 6500);
replay.addEventListener('click', () => { playPrologue(true); sfx('tick'); });
sec.addEventListener('click', e => {
  if (sec.classList.contains('needs-play') && !e.target.closest('button, a')) playPrologue();
});

/* ---------- звук: синтезируется в браузере ---------- */
const audio = (() => {
  let ctx = null, master, hum, pad = [], padGain, noiseGain, noiseFilter, on = false, scene = 'prologue';
  const SCENES = {
    prologue: { hum: .012, pad: [110, 164.8], padG: .018, noise: .02, nf: 300 },
    fitting:  { hum: .010, pad: [220, 277.2], padG: .022, noise: .004, nf: 800 },
    shop:     { hum: .030, pad: [164.8, 174.6], padG: .016, noise: .006, nf: 1200 },
    waste:    { hum: .008, pad: [55, 82.4], padG: .03, noise: .04, nf: 180 },
    workshop: { hum: .016, pad: [146.8, 220], padG: .02, noise: .006, nf: 600 },
    industry: { hum: .010, pad: [196, 246.9], padG: .018, noise: .004, nf: 700 },
    final:    { hum: .006, pad: [261.6, 392], padG: .02, noise: .002, nf: 900 }
  };
  function noiseBuffer() {
    const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = b.getChannelData(0);
    let last = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    return b;
  }
  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    hum = ctx.createGain(); hum.connect(master);
    [100, 200, 300, 400].forEach((f, i) => { const o = ctx.createOscillator(); o.frequency.value = f; const g = ctx.createGain(); g.gain.value = [1, .5, .25, .12][i]; o.connect(g).connect(hum); o.start(); });
    padGain = ctx.createGain(); const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    padGain.connect(lp).connect(master);
    for (let i = 0; i < 2; i++) { const o = ctx.createOscillator(); o.type = 'triangle'; o.connect(padGain); o.start(); pad.push(o);
      const lfo = ctx.createOscillator(); lfo.frequency.value = .07 + i * .05; const lg = ctx.createGain(); lg.gain.value = 1.5; lfo.connect(lg).connect(o.detune); lfo.start(); }
    const n = ctx.createBufferSource(); n.buffer = noiseBuffer(); n.loop = true;
    noiseFilter = ctx.createBiquadFilter(); noiseFilter.type = 'lowpass';
    noiseGain = ctx.createGain(); n.connect(noiseFilter).connect(noiseGain).connect(master); n.start();
  }
  function setScene(s) {
    scene = s; if (!ctx) return;
    const c = SCENES[s] || SCENES.prologue, t = ctx.currentTime;
    hum.gain.setTargetAtTime(c.hum, t, .8); padGain.gain.setTargetAtTime(c.padG, t, .8);
    pad.forEach((o, i) => o.frequency.setTargetAtTime(c.pad[i], t, 1.2));
    noiseGain.gain.setTargetAtTime(c.noise, t, .8); noiseFilter.frequency.setTargetAtTime(c.nf, t, .8);
  }
  function toggle() { if (!ctx) init(); on = !on; ctx.resume(); master.gain.setTargetAtTime(on ? 1 : 0, ctx.currentTime, .3); setScene(scene); return on; }
  function blip(type) {
    if (!ctx || !on) return;
    const t = ctx.currentTime;
    if (type === 'sew') {
      for (let i = 0; i < 16; i++) { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'square'; o.frequency.value = 1400 + Math.random() * 200;
        const st = t + i * 0.055; g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(.05, st + .002); g.gain.exponentialRampToValueAtTime(.0001, st + .03);
        o.connect(g).connect(master); o.start(st); o.stop(st + .04); }
      return;
    }
    const o = ctx.createOscillator(), g = ctx.createGain();
    const P = { tick: ['sine', 880, .05, .08], thunk: ['sine', 70, .3, .5], drop: ['triangle', 220, .12, .7], curtain: ['sine', 330, .03, 1.2] }[type] || ['sine', 600, .04, .1];
    o.type = P[0]; o.frequency.setValueAtTime(P[1], t);
    if (type === 'drop') o.frequency.exponentialRampToValueAtTime(60, t + .6);
    if (type === 'thunk') o.frequency.exponentialRampToValueAtTime(40, t + .4);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(P[2], t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + P[3]);
    o.connect(g).connect(master); o.start(t); o.stop(t + P[3] + .05);
  }
  return { toggle, setScene, blip };
})();
function sfx(t) { audio.blip(t); }
$('#soundBtn').addEventListener('click', (e) => {
  const on = audio.toggle(), b = e.currentTarget;
  b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Выключить звук' : 'Включить звук');
  $('#soundLabel').textContent = on ? 'ЗВУК ВКЛ' : 'ЗВУК ВЫКЛ';
});

/* ---------- init ---------- */
renderFitting(); renderWorkshop(); sizeCards(); setSplit(0); updateActive(); parallax();
})();

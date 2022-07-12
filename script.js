//min и max первого ренджа
const CREDIT_MIN = 0;
const CREDIT_MAX = 15000000;

//min и max второго ренджа
const FIRST_CONRIBUTION_MIN = 0;
const FIRST_CONRIBUTION_MAX = 15000000;

//min и max третьего ренджа
const RETURN_PERIOD_MIN = 1;
const RETURN_PERIOD_MAX = 50;

//Первый рендж (Стоимость недвижимости)
const creditText = document.getElementById("creditText");
const creditRange = document.getElementById("creditRange");

//Второй рендж (Первоначальный взнос)
const firstContributionText = document.getElementById("firstContributionText");
const firstContributionRange = document.getElementById(
  "firstContributionRange"
);

//Третий рендж (Срок кредита)
const returnPeriodText = document.getElementById("returnPeriodText");
const returnPeriodRange = document.getElementById("returnPeriodRange");

//Форматер превращающий в красивые числа (Будет не 1000000, а 1 000 000, с отстпами)
const formatterNumber = new Intl.NumberFormat("ru");

//Форматер который будет добавлять иконку рубля (Р) вконец числа (Будет не 1000000, а 1 000 000, с отстпами)
const formatterCurrency = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
});

//Созданный вручную форматер, форматируем года, код взял из инета, написал просто (года,лет, год js)
const formatterDate = {
  format(years) {
    var txt;
    count = years % 100;
    if (count >= 5 && count <= 20) {
      txt = "лет";
    } else {
      count = count % 10;
      if (count == 1) {
        txt = "год";
      } else if (count >= 2 && count <= 4) {
        txt = "года";
      } else {
        txt = "лет";
      }
    }
    return `${years} ${txt}`;
  },
};

//Универсальная функция, благодоря которой будут работать все 3 инпута с рэнджами,передаем параметры в функцию (Инпут, рэндж, форматНамбер, форматКуренсу(Не для всех), минимальное значение и максимальное значение)
function setDoubleHandler(inputText, range, formNum, formGoal, min, max) {
  //Добавляем атрибут мин и макс ренджу взависимости от переданных значений
  range.setAttribute("min", min);
  range.setAttribute("max", max);

  //Ставим все ренджи и инпуты на середину
  range.value = min + max / 2;
  inputText.value = formGoal.format(parseInt(min + max / 2));
  //На инпут с текстом вешаем событие инпут
  inputText.addEventListener("input", function (e) {
    //При каждом изменении в инпуте, мы создаем переменную намбер (Содержимое инпута)
    let number = "";

    //Делаем перебор всего содержимого в инпуте
    for (const letter of this.value) {
      //И сортируем, даем воодить только цифры от 0 до 9
      if ("0123456789".includes(letter)) {
        //И пушим в переменную намбер, теперь отображаться будут только цифры
        number += letter;
      }
    }

    //Проверка, если минимальное число больше содержимого в инпуте, то будет ставиться всегда минимальное число
    if (number < min) {
      number = min;
    }

    //Проверка, если максимальное число меньше содержимого в инпуте, то будет ставиться всегда максимальное число
    if (number > max) {
      number = max;
    }

    //Рэндж будет изменяться при изменении числа в инпуте
    range.value = number;

    //Парсим содержимое в инпуте, превращаем в число
    number = parseInt(number);

    //Все число в инпуте мы превращаем с помощью форматера в красивое число (Будет не 1000000, а 1 000 000, с отстпами)
    number = formNum.format(number);

    //Разрешаем вводить в инпут только числа
    this.value = number;
  });

  //Когда инпут будет терять фокус
  inputText.addEventListener("blur", function (e) {
    //Когда инпут будет терять фокус, мы создаем переменную намбер (Содержимое инпута)
    let number = "";

    for (const letter of this.value) {
      //И сортируем, даем воодить только цифры от 0 до 9
      if ("0123456789".includes(letter)) {
        //И пушим в переменную намбер, теперь отображаться будут только цифры
        number += letter;
      }
    }

    //Содержимое данного инпута при потере фокуса будет форматироваться и добавляться иконка рубля (Р)
    this.value = formGoal.format(number);
  });

  //При фокусе на инпут
  inputText.addEventListener("focus", function (e) {
    //Когда инпут будет в фокусе, мы создаем переменную намбер (Содержимое инпута)
    let number = "";

    for (const letter of this.value) {
      //И сортируем, даем воодить только цифры от 0 до 9
      if ("0123456789".includes(letter)) {
        //И пушим в переменную намбер, теперь отображаться будут только цифры
        number += letter;
      }
    }

    //Содержимое данного инпута при наличии фокуса будет забираться иконка рубля (Р) и будет красивое число (1 000 000)
    this.value = formNum.format(number);
  });

  //При изменении рэнджа, мы весим событие инпут
  range.addEventListener("input", function (e) {
    //При изменении рэнджа, мы содержимое текста в инпуте меняем на value рэнджа
    inputText.value = formGoal.format(this.value);
  });
}

//Создаем функцию и сразу объявляем все переданные в нее значения - в массив args
function setReaction(...args) {
  //Из массива мы удаляем последний length (Функцию mainProcess)
  let handler = args.splice(-1)[0];

  //Делаем перебор всего массива (Включая функцию)
  for (const element of args) {
    //На каждый элемент массива вешаем событие инпут
    element.addEventListener("input", function (e) {
      //При изменении любого инпута мы в функцию добавляем this.e (Текущая информация в mainProcess) и this.args.slice() можно и без this.args.slice()
      handler.call(this, e, args.slice());
    });
  }
}

//Функция основного процесса вызывающаяся при изменении любого инпута/рэнджа для пересчета информации
function mainProcess() {
  //Забираем value всех рэнджей для расчетов
  const credit = parseInt(creditRange.value);
  const firstContribution = parseInt(firstContributionRange.value);
  const returnPeriod = parseInt(returnPeriodRange.value);

  //Делаем счет процентной ставки, которая будет зависеть от периода
  let percent = 10 + Math.log(returnPeriod) / Math.log(0.5);

  //Превращаем процент в число и округлям до 2 цифр после запятой
  percent = parseInt(percent * 100 + 1) / 100;

  //Вставляем процент на страницу
  document.getElementById("percentNumber").value = percent + " %";

  //Делаем расчет Общей выплаты
  let commonDebit = parseInt(
    parseInt((((credit - firstContribution) / 100) * percent).toFixed(0)) +
      (credit - firstContribution)
  );

  //Делаем расчет Переплаты
  let subpaymentDebit = parseInt((credit - firstContribution) / 100) * percent;

  //Делаем расчет Итога в месяц
  let paymentDebit = (commonDebit / parseInt(returnPeriod) / 12).toFixed(0);

  //Вставляем Общую выплату
  document.getElementById("common").textContent =
    formatterCurrency.format(commonDebit);

  //Вставляем Переплату
  document.getElementById("subpayment").textContent =
    formatterCurrency.format(subpaymentDebit);

  //Вставляем Итог в месяц
  document.getElementById("payment").textContent =
    formatterCurrency.format(paymentDebit);
}

//Вызываем функцию setReaction в массив которой передаем все инпуты и ренджи и функцию основного процесса
setReaction(
  creditText,
  creditRange,
  firstContributionText,
  firstContributionRange,
  returnPeriodText,
  returnPeriodRange,
  mainProcess
);

//Передаем значения для первого ренджа
setDoubleHandler(
  creditText,
  creditRange,
  formatterNumber,
  formatterCurrency,
  CREDIT_MIN,
  CREDIT_MAX
);

//Передаем значения для второго ренджа
setDoubleHandler(
  firstContributionText,
  firstContributionRange,
  formatterNumber,
  formatterCurrency,
  FIRST_CONRIBUTION_MIN,
  FIRST_CONRIBUTION_MAX
);

//Передаем значения для третьего ренджа (Меняем курренсу, на года,лет,год)
setDoubleHandler(
  returnPeriodText,
  returnPeriodRange,
  formatterNumber,
  formatterDate,
  RETURN_PERIOD_MIN,
  RETURN_PERIOD_MAX
);

//Вызываем функцию основной процесс, для того, что бы сразу отображалась инфа
mainProcess();

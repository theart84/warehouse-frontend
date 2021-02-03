export const normalizeName = (name) => {
  switch (name) {
    case 'Ж1':
      return 'Желтау-1';
    case 'Ж2':
      return 'Желтау-2';
    case 'Ж3':
      return 'Желтау-3';
    case 'Ж5':
      return 'Желтау-5';
    case 'Ж7':
      return 'Желтау-7';
    case 'Ж9':
      return 'Желтау-9';
    case 'Ж11':
      return 'Желтау-11';
    case 'ЖН':
      return 'Желтау-Надежда';
    case 'КСВ':
      return 'Куртинский светлый';
    case 'КТ':
      return 'Куртинский темный';
    case 'Капал Аросан':
      return 'Капал-Аросан';
    case 'Сары-Тас':
      return 'Сары-Тас';
  }
};

export const normalizeNumber = (number) => {
  if (!number) {
    return '0';
  }
  if (String(number).length === 1) {
    return `${number}.00`;
  } if (String(number).length === 3) {
    return `${number}0`;
  }
  return String(number);
};

export const normalizeDate = (date) => {
  if (!date) {
    return;
  }
  return new Date(date).toLocaleDateString();
};

export const titles: Record<string, string> = {
  'default': 'ЕТИС',
  'stu.teach_plan': 'Учебный план',
  'ebl_stu.ebl_choice': 'Элективы',
  'stu.tpr': 'Оставить отзыв',
  'stu.teachers': 'Преподаватели',
  'stu.sc_portfolio': 'Портфолио',
  'stu.timetable': 'Расписание',
  'stu.change_pass_form': 'Изменить пароль',
  'stu.change_pass': 'Изменить пароль',
  'stu_email_pkg.change_email': 'Изменить почту',
  'stu.announce': 'Объявления',
  'stu.teacher_notes': 'Сообщения',
  'est_pkg.show_list': 'Обратная связь',
  'stu.signs': 'Оценки',
  'stu.absence': 'Пропущенные',
  'stu.orders': 'Приказы',
  'stu_jour.group_tt': 'Журнал посещений',
  'stu.ses': 'Образовательный стандарт',
  'stu.electr': 'Электронные ресурсы',
  'stu.about': 'О ресурсе',
  'cert_pkg.stu_certif': 'Заказ справок',
  'stu.term_test': 'Анкетирование',
  'stu.special_est_list': 'Опросы',
  'stu.fcl_choice': 'Факультативы',
};

export function changeTitle() {
  let text = titles.default;
  const page = window.location.pathname.split('/').pop();
  if (page in titles) {
    text += ' - ' + titles[page];
  }
  const title = document.querySelector('title');
  title.textContent = text;
}

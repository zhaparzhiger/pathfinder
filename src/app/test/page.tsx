'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import ProfileDropdown from '@/components/ProfileDropdown';
import { saveTestResult } from '@/app/actions';

const questions = [
  {
    id: 1,
    question: {
      ru: "Школе выделили бюджет на создание крутой зоны отдыха. Какую роль в проекте ты выберешь?",
      kz: "Мектепке демалыс аймағын құруға бюджет бөлінді. Жобада қандай рөлді таңдайсың?",
      en: "The school allocated a budget for a cool lounge area. What role will you choose?"
    },
    options: [
      { text: { ru: "Буду сам собирать мебель и подключать освещение", kz: "Жиһазды өзім жинап, жарықты қосамын", en: "Assembling furniture and setting up lighting" }, type: 'R' },
      { text: { ru: "Изучу чертежи здания для безопасности и удобства", kz: "Қауіпсіздік пен қолайлылық үшін сызбаларды зерттеймін", en: "Studying blueprints for safety and comfort" }, type: 'I' },
      { text: { ru: "Придумаю уникальный дизайн и нарисую мурал", kz: "Бірегей дизайн ойлап тауып, қабырғаға сурет саламын", en: "Designing the look and painting a mural" }, type: 'A' },
      { text: { ru: "Проведу опрос среди учеников об их предпочтениях", kz: "Оқушылар арасында сауалнама жүргіземін", en: "Surveying students about their preferences" }, type: 'S' },
      { text: { ru: "Договорюсь с поставщиками и буду руководить командой", kz: "Жеткізушілермен келісіп, команданы басқарамын", en: "Negotiating with suppliers and leading the team" }, type: 'E' },
      { text: { ru: "Составлю смету расходов и буду следить за бюджетом", kz: "Шығындар сметасын жасап, бюджетті қадағалаймын", en: "Creating a budget and tracking expenses" }, type: 'C' }
    ]
  },
  {
    id: 2,
    question: {
      ru: "Твой класс запускает научно-популярный YouTube-канал. Чем займешься ты?",
      kz: "Сенің сыныбың ғылыми-танымал YouTube-арнасын ашуда. Немен айналысасың?",
      en: "Your class is launching a science YouTube channel. What will you do?"
    },
    options: [
      { text: { ru: "Буду отвечать за оборудование: камеры и свет", kz: "Жабдықтарға жауап беремін: камералар мен жарық", en: "Managing equipment: cameras and lighting" }, type: 'R' },
      { text: { ru: "Стану сценаристом: буду искать научные факты", kz: "Сценарист боламын: ғылыми фактілерді іздеймін", en: "Writing scripts and researching science facts" }, type: 'I' },
      { text: { ru: "Займусь монтажом и спецэффектами", kz: "Монтажбен және эффектілермен айналысамын", en: "Video editing and special effects" }, type: 'A' },
      { text: { ru: "Буду брать интервью и общаться с подписчиками", kz: "Интервью алып, оқырмандармен сөйлесемін", en: "Interviewing guests and engaging with subscribers" }, type: 'S' },
      { text: { ru: "Стану продюсером: буду искать рекламодателей", kz: "Продюсер боламын: жарнама берушілерді іздеймін", en: "Producing: seeking sponsors and promotion" }, type: 'E' },
      { text: { ru: "Составлю график съемок и буду вести архив", kz: "Түсірілім кестесін жасап, архивті жүргіземін", en: "Scheduling shoots and managing the archive" }, type: 'C' }
    ]
  },
  {
    id: 3,
    question: {
      ru: "Представь, что вы с друзьями заблудились в незнакомом месте. Твои действия?",
      kz: "Достарыңмен бейтаныс жерде адасып қалдыңдар делік. Сенің әрекетің?",
      en: "Imagine you and your friends got lost in an unfamiliar place. What do you do?"
    },
    options: [
      { text: { ru: "Попробую починить навигатор или сориентируюсь по компасу", kz: "Навигаторды жөндеп немесе компаспен бағдарлаймын", en: "Fixing the GPS or using a compass and map" }, type: 'R' },
      { text: { ru: "Проанализирую приметы и логически вычислю путь", kz: "Белгілерді талдап, жолды логикалық түрде есептеймін", en: "Analyzing landmarks to logically find the way back" }, type: 'I' },
      { text: { ru: "Предложу оригинальный способ привлечь внимание", kz: "Назар аударудың ерекше тәсілін ұсынамын", en: "Suggesting a creative way to get attention" }, type: 'A' },
      { text: { ru: "Успокою тех, кто паникует, и поддержу группу", kz: "Үрейленгендерді тыныштандырып, топты қолдаймын", en: "Calming those panicking and keeping the group together" }, type: 'S' },
      { text: { ru: "Возьму командование на себя и решу, куда идти", kz: "Басқаруды қолға алып, қайда баратынымызды шешемін", en: "Taking charge and deciding which direction to go" }, type: 'E' },
      { text: { ru: "Вспомню хронометраж пути и изначальные инструкции", kz: "Жол уақытын және бастапқы нұсқауларды еске түсіремін", en: "Recalling the timing and original instructions" }, type: 'C' }
    ]
  },
  {
    id: 4,
    question: {
      ru: "Вам нужно подготовить проект по экологии. Какую часть работы ты возьмешь?",
      kz: "Экология бойынша жоба дайындау керек. Жұмыстың қай бөлігін аласың?",
      en: "You need to prepare an ecology project. Which part will you take?"
    },
    options: [
      { text: { ru: "Сконструирую модель очистного фильтра", kz: "Тазартқыш сүзгінің моделін құрастырамын", en: "Building a model of a water filter or device" }, type: 'R' },
      { text: { ru: "Проведу химический анализ состава воды", kz: "Судың құрамына химиялық талдау жүргіземін", en: "Conducting chemical analysis of water samples" }, type: 'I' },
      { text: { ru: "Подготовлю яркий перформанс или презентацию", kz: "Жарқын перформанс немесе презентация дайындаймын", en: "Creating a creative performance or presentation" }, type: 'A' },
      { text: { ru: "Организую волонтерский штаб для уборки парка", kz: "Паркті тазалау үшін еріктілер штабын ұйымдастырамын", en: "Organizing a volunteer squad for park cleanup" }, type: 'S' },
      { text: { ru: "Выступлю на защите проекта, чтобы убедить жюри", kz: "Жюриді сендіру үшін жобаны қорғап шығамын", en: "Presenting to convince the jury of our solution" }, type: 'E' },
      { text: { ru: "Соберу все данные в таблицу и оформлю отчет", kz: "Барлық деректерді кестеге жинап, есепті рәсімдеймін", en: "Organizing data into tables and formatting the report" }, type: 'C' }
    ]
  },
  {
    id: 5,
    question: {
      ru: "Ты решил заработать деньги на каникулах. Какую подработку выберешь?",
      kz: "Каникулда ақша тапқың келді. Қандай жұмысты таңдайсың?",
      en: "You decided to earn some money during holidays. What job will you choose?"
    },
    options: [
      { text: { ru: "Ремонт велосипедов или сборка компьютеров", kz: "Велосипед жөндеу немесе компьютер жинау", en: "Repairing bikes or assembling computers" }, type: 'R' },
      { text: { ru: "Помощник в лаборатории или сбор данных", kz: "Зертханада көмекші болу немесе деректер жинау", en: "Lab assistant or data collection aide" }, type: 'I' },
      { text: { ru: "Создание логотипов или кастомизация одежды", kz: "Логотип жасау немесе киімді кастомизациялау", en: "Designing logos or customizing clothes" }, type: 'A' },
      { text: { ru: "Репетиторство или работа вожатым", kz: "Репетиторлық немесе вожатый болу", en: "Tutoring younger kids or being a camp counselor" }, type: 'S' },
      { text: { ru: "Перепродажа востребованных товаров в интернете", kz: "Интернетте танымал тауарларды қайта сату", en: "Reselling popular goods through an online shop" }, type: 'E' },
      { text: { ru: "Работа с документами или ввод данных", kz: "Құжаттармен жұмыс немесе деректерді енгізу", en: "Working with documents or data entry" }, type: 'C' }
    ]
  },
  {
    id: 6,
    question: {
      ru: "На выставке профессий будущего тебя больше всего привлек стенд:",
      kz: "Болашақ мамандықтар көрмесінде сені қандай стенд қызықтырды:",
      en: "At a future careers exhibition, you are drawn to the stand for:"
    },
    options: [
      { text: { ru: "Инженерия биопротезов и робототехника", kz: "Биопротездер инженериясы және робототехника", en: "Bionic engineering and robotics" }, type: 'R' },
      { text: { ru: "Генетические исследования и космобиология", kz: "Генетикалық зерттеулер және космобиология", en: "Genetic research and astrobiology" }, type: 'I' },
      { text: { ru: "Виртуальная архитектура и геймдизайн", kz: "Виртуалды архитектура және геймдизайн", en: "Virtual architecture and game design" }, type: 'A' },
      { text: { ru: "Дистанционная медицина и арт-терапия", kz: "Қашықтықтан медицина және арт-терапия", en: "Telemedicine and art therapy" }, type: 'S' },
      { text: { ru: "Управление городами и венчурные инвестиции", kz: "Қалаларды басқару және венчурлық инвестициялар", en: "City management and venture capital" }, type: 'E' },
      { text: { ru: "Кибербезопасность и большие данные", kz: "Киберқауіпсіздік және үлкен деректер", en: "Cybersecurity and Big Data management" }, type: 'C' }
    ]
  },
  {
    id: 7,
    question: {
      ru: "Представь, что ты создаешь компьютерную игру. Что ты будешь делать?",
      kz: "Компьютерлік ойын жасап жатырсың делік. Сен не істейсің?",
      en: "Imagine you are creating a computer game. What will you do?"
    },
    options: [
      { text: { ru: "Прописывать физику движений и механику", kz: "Қозғалыс физикасын және механиканы жазу", en: "Coding physics and interaction mechanics" }, type: 'R' },
      { text: { ru: "Разрабатывать алгоритмы искусственного интеллекта", kz: "Жасанды интеллект алгоритмдерін жасау", en: "Developing AI algorithms for NPCs" }, type: 'I' },
      { text: { ru: "Рисовать персонажей и придумывать стиль", kz: "Кейіпкерлерді салып, стильді ойлап табу", en: "Drawing characters and visual styling" }, type: 'A' },
      { text: { ru: "Продумывать систему диалогов и общения", kz: "Диалогтар мен қарым-қатынас жүйесін ойластыру", en: "Designing dialogue systems and social interaction" }, type: 'S' },
      { text: { ru: "Заниматься маркетингом и продажами", kz: "Маркетингпен және сатумен айналысу", en: "Marketing the game to maximize sales" }, type: 'E' },
      { text: { ru: "Тестировать игру на баги и ошибки", kz: "Ойынды багтар мен қателерге тесттен өткізу", en: "Testing for bugs and documenting errors" }, type: 'C' }
    ]
  },
  {
    id: 8,
    question: {
      ru: "Какое хобби тебе ближе всего?",
      kz: "Саған қандай хобби жақынырақ?",
      en: "Which hobby is closest to you?"
    },
    options: [
      { text: { ru: "Моделирование или занятия в мастерской", kz: "Модельдеу немесе шеберханадағы жұмыс", en: "Modeling, cooking, or workshop crafts" }, type: 'R' },
      { text: { ru: "Шахматы или программирование", kz: "Шахмат немесе бағдарламалау", en: "Chess, programming, or reading encyclopedias" }, type: 'I' },
      { text: { ru: "Фотография или игра на инструментах", kz: "Фотография немесе аспапта ойнау", en: "Photography, playing music, or dancing" }, type: 'A' },
      { text: { ru: "Волонтерство или психология", kz: "Волонтерлік немесе психология", en: "Volunteering, psychology, or team games" }, type: 'S' },
      { text: { ru: "Дебаты или блогерство", kz: "Дебаттар немесе блогерлік", en: "Debating, student council, or blogging" }, type: 'E' },
      { text: { ru: "Коллекционирование или ведение дневника", kz: "Коллекция жинау немесе күнделік жүргізу", en: "Collecting, numismatics, or journaling" }, type: 'C' }
    ]
  },
  {
    id: 9,
    question: {
      ru: "Если бы ты писал книгу, о чем бы она была?",
      kz: "Егер кітап жазсаң, ол не туралы болар еді?",
      en: "If you were to write a book, what would it be about?"
    },
    options: [
      { text: { ru: "Практическое руководство «Как собрать вездеход»", kz: "«Жол талғамайтын көлікті қалай жинау керек» нұсқаулығы", en: "A DIY guide: 'How to Build an All-Terrain Vehicle'" }, type: 'R' },
      { text: { ru: "Научное исследование «Тайны физики»", kz: "«Физика құпиялары» ғылыми зерттеуі", en: "Research: 'Secrets of Quantum Physics'" }, type: 'I' },
      { text: { ru: "Фэнтези-роман с необычным миром", kz: "Ерекше әлемі бар фэнтези-роман", en: "A fantasy novel with unique worlds" }, type: 'A' },
      { text: { ru: "Поучительная история о дружбе", kz: "Достық туралы ғибратты оқиға", en: "A moving story about friendship and help" }, type: 'S' },
      { text: { ru: "Биография успешного человека", kz: "Табысты адамның өмірбаяны", en: "Biography of a leader or business strategy" }, type: 'E' },
      { text: { ru: "Справочник-энциклопедия фактов", kz: "Фактілер жинақталған энциклопедия", en: "An encyclopedia with strict classification" }, type: 'C' }
    ]
  },
  {
    id: 10,
    question: {
      ru: "Ты пришел в кружок робототехники. Что тебе интереснее?",
      kz: "Робототехника үйірмесіне келдің. Саған не қызығырақ?",
      en: "You joined a robotics club. What interests you most?"
    },
    options: [
      { text: { ru: "Скручивать детали и паять платы", kz: "Бөлшектерді бұрап, платаларды дәнекерлеу", en: "Assembling parts and soldering boards" }, type: 'R' },
      { text: { ru: "Изучать теорию и писать код", kz: "Теорияны зерттеп, код жазу", en: "Studying theory and coding sensors" }, type: 'I' },
      { text: { ru: "Придумывать внешний вид робота", kz: "Роботтың сыртқы түрін ойлап табу", en: "Designing the robot's appearance and form" }, type: 'A' },
      { text: { ru: "Работать в паре, обучая новичков", kz: "Жұптасып жұмыс істеп, жаңадан келгендерді үйрету", en: "Working in pairs, teaching beginners" }, type: 'S' },
      { text: { ru: "Организовать соревнования и искать спонсоров", kz: "Жарыстар ұйымдастырып, демеушілер іздеу", en: "Organizing competitions and seeking sponsors" }, type: 'E' },
      { text: { ru: "Следить за наличием деталей и вести учет", kz: "Бөлшектердің бар-жоғын қадағалап, есеп жүргізу", en: "Inventory management and tracking repairs" }, type: 'C' }
    ]
  },
  {
    id: 11,
    question: {
      ru: "Тебе предложили организовать благотворительную ярмарку. Твой выбор?",
      kz: "Саған қайырымдылық жәрмеңкесін ұйымдастыру ұсынылды. Сенің таңдауың?",
      en: "You were asked to organize a charity fair. Your choice?"
    },
    options: [
      { text: { ru: "Оборудую торговые места и налажу освещение", kz: "Сауда орындарын жабдықтап, жарық жүргіземін", en: "Setting up stalls and managing lighting" }, type: 'R' },
      { text: { ru: "Рассчитаю оптимальное количество товаров", kz: "Тауарлардың оңтайлы санын есептеймін", en: "Calculating optimal inventory levels" }, type: 'I' },
      { text: { ru: "Сделаю креативную афишу и оформлю зону", kz: "Креативті афиша жасап, аймақты безендіремін", en: "Designing posters and decorating the venue" }, type: 'A' },
      { text: { ru: "Буду встречать гостей и рассказывать о проекте", kz: "Қонақтарды қарсы алып, жоба туралы айтамын", en: "Welcoming guests and explaining the cause" }, type: 'S' },
      { text: { ru: "Уговорю знаменитостей прийти на открытие", kz: "Ашылу салтанатына танымал адамдарды шақырамын", en: "Persuading celebrities to attend the opening" }, type: 'E' },
      { text: { ru: "Буду вести учет билетов и собранных денег", kz: "Билеттер мен жиналған ақшаның есебін жүргіземін", en: "Tracking ticket sales and donations" }, type: 'C' }
    ]
  },
  {
    id: 12,
    question: {
      ru: "Что для тебя важнее всего в будущей работе?",
      kz: "Болашақ жұмыста сен үшін не маңызды?",
      en: "What is most important to you in a future job?"
    },
    options: [
      { text: { ru: "Возможность видеть физический результат", kz: "Нақты физикалық нәтижені көру мүмкіндігі", en: "Seeing a physical result (built house, working motor)" }, type: 'R' },
      { text: { ru: "Возможность постоянно делать открытия", kz: "Үнемі жаңалықтар ашу мүмкіндігі", en: "Opportunity to learn and make discoveries" }, type: 'I' },
      { text: { ru: "Свобода творчества и отсутствие рамок", kz: "Шығармашылық еркіндік және шектеулердің болмауы", en: "Creative freedom and lack of strict limits" }, type: 'A' },
      { text: { ru: "Ощущение того, что я приношу пользу людям", kz: "Адамдарға пайда әкеліп жатқанымды сезіну", en: "Feeling that I am helping real people" }, type: 'S' },
      { text: { ru: "Высокий доход, статус и руководство", kz: "Жоғары табыс, мәртебе және басқару", en: "High income, status, and leadership" }, type: 'E' },
      { text: { ru: "Стабильность, четкие задачи и график", kz: "Тұрақтылық, нақты тапсырмалар мен кесте", en: "Stability, clear tasks, and predictable schedule" }, type: 'C' }
    ]
  },
  {
    id: 13,
    question: {
      ru: "В школе проводят день самоуправления. Какую должность займешь?",
      kz: "Мектепте өзін-өзі басқару күні өтуде. Қандай лауазымды иеленесің?",
      en: "It's student government day at school. Which position will you take?"
    },
    options: [
      { text: { ru: "Завхоз: проверю мебель и технику", kz: "Шаруашылық меңгерушісі: жиһаз бен техниканы тексеремін", en: "Facility manager: checking furniture and tech" }, type: 'R' },
      { text: { ru: "Методист: составлю программу обучения", kz: "Әдіскер: оқу бағдарламасын жасаймын", en: "Methodologist: designing the day's curriculum" }, type: 'I' },
      { text: { ru: "Учитель музыки или рисования", kz: "Музыка немесе сурет мұғалімі", en: "Teacher of Music or Art" }, type: 'A' },
      { text: { ru: "Школьный психолог или соцпедагог", kz: "Мектеп психологы немесе әлеуметтік педагог", en: "School psychologist or counselor" }, type: 'S' },
      { text: { ru: "Директор школы: буду принимать решения", kz: "Мектеп директоры: шешімдер қабылдаймын", en: "School Principal: making strategic decisions" }, type: 'E' },
      { text: { ru: "Секретарь: буду следить за расписанием", kz: "Хатшы: кесте мен бұйрықтарды қадағалаймын", en: "Secretary: managing schedules and records" }, type: 'C' }
    ]
  },
  {
    id: 14,
    question: {
      ru: "Представь, что ты строишь город на Марсе. Чем займешься?",
      kz: "Марста қала салып жатырсың делік. Немен айналысасың?",
      en: "Imagine building a city on Mars. What will you do?"
    },
    options: [
      { text: { ru: "Монтажом систем жизнеобеспечения", kz: "Тіршілікті қамтамасыз ету жүйелерін монтаждау", en: "Installing life support systems and domes" }, type: 'R' },
      { text: { ru: "Исследованием почвы и поисками воды", kz: "Топырақты зерттеу және су іздеу", en: "Researching Mars soil and searching for water" }, type: 'I' },
      { text: { ru: "Проектированием футуристических парков", kz: "Футуристік парктерді жобалау", en: "Designing futuristic domes and parks" }, type: 'A' },
      { text: { ru: "Поддержанием здоровья колонистов", kz: "Колонистердің денсаулығын қолдау", en: "Maintaining the mental health of colonists" }, type: 'S' },
      { text: { ru: "Распределением ресурсов и управлением", kz: "Ресурстарды бөлу және басқару", en: "Resource allocation and colony management" }, type: 'E' },
      { text: { ru: "Контролем запасов воздуха и журналом", kz: "Ауа қорын бақылау және журнал жүргізу", en: "Air supply control and logging entries" }, type: 'C' }
    ]
  },
  {
    id: 15,
    question: {
      ru: "Как ты ведешь себя в командной игре (квиз, спорт)?",
      kz: "Командалық ойында өзіңді қалай ұстайсың?",
      en: "How do you behave in a team game (quiz or sport)?"
    },
    options: [
      { text: { ru: "Я делаю всю «черновую» работу для победы", kz: "Жеңіс үшін барлық «қара» жұмысты істеймін", en: "Doing the hard physical work needed for victory" }, type: 'R' },
      { text: { ru: "Я анализирую тактику противника", kz: "Қарсыластың тактикасын талдаймын", en: "Analyzing opponent tactics and finding weaknesses" }, type: 'I' },
      { text: { ru: "Я придумываю неожиданные и красивые ходы", kz: "Күтпеген және әдемі жүрістер ойлап табамын", en: "Coming up with unexpected creative moves" }, type: 'A' },
      { text: { ru: "Я поддерживаю командный дух", kz: "Командалық рухты қолдаймын", en: "Supporting team spirit and helping those who fail" }, type: 'S' },
      { text: { ru: "Я капитан, который ведет всех к цели", kz: "Мен барлығын мақсатқа жетелейтін капитанмын", en: "Acting as Captain, leading and negotiating" }, type: 'E' },
      { text: { ru: "Я слежу за временем, счетом и правилами", kz: "Уақытты, есепті және ережелерді қадағалаймын", en: "Tracking time, scores, and keeping the rules" }, type: 'C' }
    ]
  },
  {
    id: 16,
    question: {
      ru: "Какая новость в ленте тебя точно заинтересует?",
      kz: "Лентадағы қандай жаңалық сені міндетті түрде қызықтырады?",
      en: "Which news item would definitely interest you?"
    },
    options: [
      { text: { ru: "Обзор нового мощного процессора", kz: "Жаңа қуатты процессорға шолу", en: "Review of a new powerful CPU or car" }, type: 'R' },
      { text: { ru: "Статья о расшифровке древнего генома", kz: "Ежелгі геномды шифрды ашу туралы мақала", en: "Article about decoding ancient human genomes" }, type: 'I' },
      { text: { ru: "Подборка самых необычных зданий мира", kz: "Әлемдегі ең ерекше ғимараттар жинағы", en: "Gallery of the world's most unique buildings" }, type: 'A' },
      { text: { ru: "История о том, как волонтеры спасли поселок", kz: "Еріктілердің ауылды қалай құтқарғаны туралы оқиға", en: "Story about volunteers saving a village" }, type: 'S' },
      { text: { ru: "Рейтинг самых молодых миллиардеров", kz: "Әлемдегі ең жас миллиардерлер рейтингі", en: "List of the world's youngest billionaires" }, type: 'E' },
      { text: { ru: "Новые правила подачи документов в вузы", kz: "ЖОО-ға құжат тапсырудың жаңа ережелері", en: "New rules for university applications" }, type: 'C' }
    ]
  },
  {
    id: 17,
    question: {
      ru: "Тебе подарили 1 000 000 тенге. На что потратишь?",
      kz: "Саған 1 000 000 теңге сыйлады. Неге жұмсайсың?",
      en: "You were gifted 1,000,000 tenge. What will you spend it on?"
    },
    options: [
      { text: { ru: "Куплю профессиональный инструмент", kz: "Кәсіби құрал-сайман сатып аламын", en: "Buying professional tools or a powerful PC" }, type: 'R' },
      { text: { ru: "Оплачу доступ к научным базам данных", kz: "Ғылыми базаларға немесе курстарға төлеймін", en: "Paying for science databases or online courses" }, type: 'I' },
      { text: { ru: "Куплю крутую камеру или материалы", kz: "Керемет камера немесе материалдар аламын", en: "Buying a pro camera or creative supplies" }, type: 'A' },
      { text: { ru: "Передам часть денег в приют", kz: "Ақшаның бір бөлігін баспанаға беремін", en: "Donating a portion to a shelter or charity" }, type: 'S' },
      { text: { ru: "Вложу в развитие своего проекта", kz: "Өз жобамның дамуына инвестиция саламын", en: "Investing in my own project or shares" }, type: 'E' },
      { text: { ru: "Положу на депозит под проценты", kz: "Пайыздық депозитке салып, есебін жүргіземін", en: "Putting it in a high-interest savings account" }, type: 'C' }
    ]
  },
  {
    id: 18,
    question: {
      ru: "Если бы ты попал на необитаемый остров, кем бы ты был?",
      kz: "Егер иен аралға түссең, кім болар едің?",
      en: "If you were on a deserted island, who would you be?"
    },
    options: [
      { text: { ru: "Строителем хижин и охотником", kz: "Күрке салушы және аңшы", en: "Builder of huts and the hunter" }, type: 'R' },
      { text: { ru: "Картографом и исследователем флоры", kz: "Картограф және флора зерттеушісі", en: "Cartographer and flora/fauna researcher" }, type: 'I' },
      { text: { ru: "Создателем наскальных рисунков", kz: "Жартастағы суреттерді салушы", en: "Storyteller and creator of cave paintings" }, type: 'A' },
      { text: { ru: "Миротворцем, решающим споры", kz: "Дауларды шешетін бітістіруші", en: "Peacemaker resolving survivor disputes" }, type: 'S' },
      { text: { ru: "Лидером племени, планирующим спасение", kz: "Құтқаруды жоспарлайтын тайпа көсемі", en: "Leader of the tribe, planning the escape" }, type: 'E' },
      { text: { ru: "Хранителем склада провизии", kz: "Азық-түлік қоймасының күзетшісі", en: "Keeper of the food and water supply" }, type: 'C' }
    ]
  },
  {
    id: 19,
    question: {
      ru: "Что ты выберешь в качестве дипломной работы?",
      kz: "Дипломдық жұмыс ретінде нені таңдайсың?",
      en: "What would you choose as your graduation thesis?"
    },
    options: [
      { text: { ru: "Работающий прототип устройства", kz: "Құрылғының жұмыс істейтін прототипі", en: "A working prototype of a device" }, type: 'R' },
      { text: { ru: "Теоретическое исследование с графиками", kz: "Графиктері көп теориялық зерттеу", en: "Theoretical research with complex data sets" }, type: 'I' },
      { text: { ru: "Арт-проект или сценарий фильма", kz: "Арт-жоба немесе фильм сценарийі", en: "An art project, exhibition, or screenplay" }, type: 'A' },
      { text: { ru: "Программу обучения для детей", kz: "Балаларға арналған оқыту бағдарламасы", en: "Training or adaptation program for children" }, type: 'S' },
      { text: { ru: "Бизнес-план реального предприятия", kz: "Нақты кәсіпорынның бизнес-жоспары", en: "A business plan for a real startup" }, type: 'E' },
      { text: { ru: "Анализ эффективности работы системы", kz: "Жүйе жұмысының тиімділігін талдау", en: "Efficiency analysis of a system or organization" }, type: 'C' }
    ]
  },
  {
    id: 20,
    question: {
      ru: "Как друзья описывают тебя чаще всего?",
      kz: "Достарың сені жиі қалай сипаттайды?",
      en: "How do your friends describe you most often?"
    },
    options: [
      { text: { ru: "Умелый — всегда знает, как что-то починить", kz: "Шебер — әрқашан нені қалай жөндеуді біледі", en: "Skillful — always knows how to fix things" }, type: 'R' },
      { text: { ru: "Умный — ходячая энциклопедия", kz: "Ақылды — бәрін талдайтын энциклопедия", en: "Smart — a walking encyclopedia, analytical" }, type: 'I' },
      { text: { ru: "Творческий — вечно что-то придумывает", kz: "Шығармашыл — үнемі ерекше бірдеңе ойлайды", en: "Creative — always coming up with unique ideas" }, type: 'A' },
      { text: { ru: "Добрый — всегда выслушает и поможет", kz: "Мейірімді — әрқашан тыңдап, көмекке келеді", en: "Kind — always listens and helps out" }, type: 'S' },
      { text: { ru: "Пробивной — всех организует", kz: "Пысық — барлығын ұйымдастыра алады", en: "Driven — gets things done and leads everyone" }, type: 'E' },
      { text: { ru: "Надежный — у него всё по полочкам", kz: "Сенімді — бәрі рет-ретімен және уақытылы", en: "Reliable — everything is organized and on time" }, type: 'C' }
    ]
  }
];

export default function TestPage({ user }: { user: any }) {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      startTransition(async () => {
        const counts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        newAnswers.forEach(ans => { counts[ans] = (counts[ans] || 0) + 1; });
        const sortedTypes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const personalityType = sortedTypes.slice(0, 2).map(t => t[0]).join('');
        
        await saveTestResult(personalityType);
        router.push('/results');
      });
    }
  };

  const t = {
    ru: {
      question: "Вопрос",
      of: "из",
      complete: "Завершено",
      analyzing: "Анализируем ваши ответы...",
      wait: "Пожалуйста, подождите, пока мы рассчитываем ваш карьерный путь.",
      previous: "Назад",
      choose: "Что вам ближе?"
    },
    kz: {
      question: "Сұрақ",
      of: "ішінен",
      complete: "аяқталды",
      analyzing: "Жауаптарыңызды талдаудамыз...",
      wait: "Сіздің оңтайлы мансап жолыңызды есептегенше күте тұрыңыз.",
      previous: "Артқа",
      choose: "Сізге не жақын?"
    },
    en: {
      question: "Question",
      of: "of",
      complete: "Complete",
      analyzing: "Analyzing your responses...",
      wait: "Please wait while we calculate your optimal career path.",
      previous: "Previous",
      choose: "What do you prefer?"
    }
  }[language] || { question: "Question", of: "of", complete: "Complete", analyzing: "Analyzing...", wait: "Wait...", previous: "Previous", choose: "Choose" };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#191c1c] font-sans overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5">
        <div className="flex justify-between items-center max-w-[1040px] mx-auto px-4 sm:px-8 h-16 sm:h-20">
          <a href="/" className="text-xl sm:text-2xl font-bold text-[#6FA8A3] tracking-tighter">Pathfinder</a>
          <nav className="flex gap-4 sm:gap-8 items-center">
            <div className="flex gap-2 text-[10px] sm:text-sm font-bold">
              <span className={`cursor-pointer px-1 ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
              <span className="text-slate-200">|</span>
              <span className={`cursor-pointer px-1 ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
              <span className="text-slate-200">|</span>
              <span className={`cursor-pointer px-1 ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
            {user && <ProfileDropdown user={user} />}
          </nav>
        </div>
      </header>

      <main className="pt-[100px] sm:pt-[160px] pb-10 sm:pb-[120px] max-w-[1040px] mx-auto px-4 sm:px-8">
        {isPending ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 animate-in">
            <div className="w-16 h-16 border-4 border-[#6FA8A3]/20 border-t-[#6FA8A3] rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-bold mb-4">{t.analyzing}</h2>
            <p className="text-slate-500 max-w-sm">{t.wait}</p>
          </div>
        ) : (
          <div className="max-w-[720px] mx-auto">
            <div className="mb-8 sm:mb-16">
              <div className="flex justify-between items-end mb-4 px-1">
                <span className="text-[#6FA8A3] font-bold text-sm sm:text-base uppercase tracking-widest">
                  {t.question} {currentStep + 1} {t.of} {questions.length}
                </span>
                <span className="text-slate-400 font-bold text-xs sm:text-sm">{Math.round(progress)}% {t.complete}</span>
              </div>
              <div className="w-full h-2 sm:h-3 bg-[#E6DFD5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6FA8A3] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(111,168,163,0.4)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-8 sm:mb-12 leading-tight text-center sm:text-left">
              {currentQuestion.question[language as keyof typeof currentQuestion.question] || currentQuestion.question['ru']}
            </h1>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {currentQuestion.options.map((option: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  disabled={isPending} 
                  className="group relative bg-white border border-[#E6DFD5] p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm hover:border-[#6FA8A3] transition-all duration-300 text-left flex items-center justify-between active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="text-slate-800 text-sm sm:text-base pr-4 font-bold leading-snug">
                    {option.text[language as keyof typeof option.text] || option.text['ru']}
                  </span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-slate-100 group-hover:border-[#6FA8A3] flex items-center justify-center transition-all flex-shrink-0 bg-slate-50 group-hover:bg-[#6FA8A3]/10">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#6FA8A3] scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-8 text-slate-400 font-bold hover:text-[#6FA8A3] transition-colors flex items-center gap-2 mx-auto sm:mx-0"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                {t.previous}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

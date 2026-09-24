import { Article } from '@/types/article';

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'arch-01',
    source: 'ARCHDAILY',
    sourceUrl: 'https://www.archdaily.com',
    publishedAt: '2026-09-24',
    category: 'architecture',
    badge: 'ГЛАВНЫЙ МАТЕРИАЛ ДНЯ',
    isDailyFeatured: true,
    mainImage: '/images/projects/skoltech-main.jpg',
    gallery: [
      {
        url: '/images/projects/skoltech-main.jpg',
        caption: {
          ru: 'Панорама внешнего кольца Сколтеха с солнцезащитными ламелями из сибирской лиственницы',
          en: 'Panoramic view of the Skoltech campus outer ring with vertical Siberian larch louvers',
        },
      },
      {
        url: '/images/projects/skoltech-1.jpg',
        caption: {
          ru: 'Шедовая пилообразная кровля и стык кольцевых корпусов с внутренними дворами',
          en: 'Sawtooth clerestory roofscape and the intersection of annular blocks with landscaped courtyards',
        },
      },
      {
        url: '/images/projects/skoltech-gallery-1.jpg',
        caption: {
          ru: 'Входная группа и ритмика фасадных панелей исследовательских кластеров',
          en: 'Main entrance pavilion showing facade rhythm and academic cluster interfaces',
        },
      },
      {
        url: '/images/projects/skoltech-gallery-2.jpg',
        caption: {
          ru: 'Узел крепления деревянных элементов внешней солнцезащиты к термоизолированному контуру',
          en: 'Detail of timber shading fins mounted on the thermally insulated envelope',
        },
      },
    ],
    title: {
      ru: 'Институт науки и технологий Сколтех: кольцевой кампус от Herzog & de Meuron',
      en: 'Skolkovo Institute of Science and Technology Ring Campus / Herzog & de Meuron',
    },
    summary: {
      ru: 'Монументальный университетский комплекс Сколтех диаметром 280 метров в форме трех взаимосвязанных колец. Швейцарские архитекторы Herzog & de Meuron объединили русское деревянное зодчество, шедовую промышленную кровлю и передовые лаборатории мирового класса.',
      en: 'A monumental 280-meter diameter academic ring campus designed by Swiss architects Herzog & de Meuron, fusing vernacular timber tectonics, sawtooth industrial daylighting, and high-tolerance laboratory infrastructure.',
    },
    content: {
      ru: {
        lead: 'Кампус Сколковского института науки и технологий (Сколтех), спроектированный базельским бюро Herzog & de Meuron, представляет собой один из самых масштабных академических комплексов Европы общей площадью свыше 134 000 м². Проект удостоен всемирного архитектурного гран-при Prix Versailles в категории «Университетские кампусы».',
        sections: [
          {
            heading: 'Кольцевая типология и радиальный генеральный план',
            text: 'Основа архитектурной концепции — идеальный круг диаметром 280 метров, сформированный тремя пересекающимися кольцевыми объемами: Восточным, Западным и Центральной Агорой. Внешнее непрерывное кольцо отдано под профессорские кабинеты, кафедры и семинарские залы. Во внутреннем пространстве сформирована строгая ортогональная сетка лабораторных корпусов. Такая композиция позволила радикально сократить пешеходные маршруты между исследовательскими группами и создала условия для междисциплинарных открытий.',
          },
          {
            heading: 'Тектоника фасадов: лиственница и экструдированный алюминий',
            text: 'Фасадная оболочка кампуса решена через контраст двух материальностей. На криволинейных поверхностях внешнего кольца установлены массивные вертикальные ламели из термомодифицированной сибирской лиственницы. Древесина реагирует на сезонные циклы и со временем приобретает благородный серебристо-платиновый оттенок. В то же время прямоугольные блоки лабораторий обшиты белыми алюминиевыми кассетами, подчеркивающими стерильную точность научной работы.',
          },
          {
            heading: 'Шедовая кровля и сценарии естественного освещения',
            text: 'Кровля комплекса общей площадью 45 000 м² представляет собой систему непрерывных шедовых фонарей, ориентированных строго на север. Это решение отсылает к исторической фабричной архитектуре XIX века и гарантирует равномерное рассеянное освещение рабочих мест без бликов и перегрева высокоточного оптического оборудования.',
          },
          {
            heading: 'Внутренняя Агора и общественная жизнь кампуса',
            text: 'Центральное ядро здания — Агора — многосветный атриум, объединяющий студенческий амфитеатр, библиотеку, конференц-залы и рекреации. В интерьерах доминируют натуральный массив дуба, брашированный архитектурный бетон и стальные фермы перекрытий. Широкие пандусы плавно перетекают с уровня на уровень, формируя единый академический променад.',
          },
        ],
        quote: {
          text: '«Сколтех задуман не как набор изолированных кафедр, а как непрерывная экосистема для мысли. Кольцевая геометрия физически объединяет ученых разных дисциплин».',
          author: 'Жак Херцог, лауреат Притцкеровской премии, Herzog & de Meuron',
        },
      },
      en: {
        lead: 'The Skolkovo Institute of Science and Technology (Skoltech), masterplanned and designed by Swiss Pritzker-winning practice Herzog & de Meuron, spans 134,000 m² and was honored with the global Prix Versailles in the University Campus category.',
        sections: [
          {
            heading: 'Ring Typology and Masterplan Layout',
            text: 'The scheme is configured as a monumental 280-meter diameter circle comprising three interlocking circular volumes: the East Ring, Central Agora, and West Ring. The outer perimeter houses academic faculty offices, administration, and seminar rooms. Infill orthogonal blocks host high-tolerance research laboratories oriented strictly on an east-west axis for uniform daylight calibration.',
          },
          {
            heading: 'Facade Tectonics and Natural Materiality',
            text: 'The building skin is characterized by vertical shading fins. On the outer circular rings, these fins are crafted from Siberian larch that matures into a distinguished silvery-gray patina under harsh winter climates. In contrast, laboratory blocks feature white powder-coated aluminum louvers.',
          },
          {
            heading: 'Sawtooth Roofscape and Northern Illumination',
            text: 'A signature connected sawtooth roofscape measuring over 45,000 m² provides exceptional thermal insulation while flooding laboratory bays with uniform, glare-free northern daylight through clerestory windows, cutting cooling loads.',
          },
          {
            heading: 'The Agora and Public Circulation',
            text: 'The heart of the scheme is the Agora—a stepped multi-level atrium uniting student amphitheaters, research library, and informal lounges. Monolithic oak wall panelling, exposed structural concrete, and wide ramps create an intuitive academic promenade.',
          },
        ],
        quote: {
          text: '“Skoltech is conceived as an integrated ecosystem that breaks academic silos. The ring geometry encourages encounters across different scientific fields.”',
          author: 'Jacques Herzog, Herzog & de Meuron',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/905951/skolkovo-institute-of-science-and-technology-herzog-and-de-meuron',
    readTimeMinutes: 7,
    projectSpecs: {
      architect: 'Herzog & de Meuron',
      location: 'Сколково, Москва, Россия',
      year: 2018,
      area: '134 000 м²',
      photographer: 'Iwan Baan',
      typology: 'Академический кампус, Исследовательский центр',
    },
  },
  {
    id: 'arch-02',
    source: 'ARCHDAILY',
    sourceUrl: 'https://www.archdaily.com',
    publishedAt: '2026-09-24',
    category: 'interior',
    badge: 'СВЕЖИЙ ВЫПУСК',
    mainImage: '/images/projects/vitrahaus-main.jpg',
    gallery: [
      {
        url: '/images/projects/vitrahaus-main.jpg',
        caption: {
          ru: 'Стеклянные торцы консольных архетипических объемов VitraHaus в Вайле-на-Рейне',
          en: 'Glazed gable facades of the stacked archetypal volumes at VitraHaus, Weil am Rhein',
        },
      },
      {
        url: '/images/projects/vitrahaus-gallery-2.jpg',
        caption: {
          ru: 'Консольные выносы до 15 метров, формирующие драматическую композицию на холме кампуса Vitra',
          en: 'Cantilevers projecting up to 15 meters across the landscaped Vitra Campus',
        },
      },
      {
        url: '/images/projects/vitrahaus-gallery-3.jpg',
        caption: {
          ru: 'Панорамное остекление верхнего шоурума с видом на предгорья Шварцвальда',
          en: 'Top-floor showroom panoramic glazing overlooking the Black Forest foothills',
        },
      },
      {
        url: '/images/projects/vitrahaus-gallery-4.jpg',
        caption: {
          ru: 'Винтовая лестничная шахта и геометрия пересечения внутренних пространств',
          en: 'Helical staircase core and overlapping spatial geometry inside VitraHaus',
        },
      },
    ],
    title: {
      ru: 'VitraHaus: стек дом-архетипов и флагманский шоурум дизайна от Herzog & de Meuron',
      en: 'VitraHaus Flagship Showroom / Herzog & de Meuron',
    },
    summary: {
      ru: 'Флагманский шоурум Vitra Home Collection в Вайле-на-Рейне, представляющий собой вертикальную стопку из двенадцати двускатных домов с консолями до 15 метров. Внутри — череда домашних интерьеров и видовых окон на три страны.',
      en: 'The flagship Vitra Home Collection showroom in Weil am Rhein, conceived as a vertical stack of twelve pitched-roof archetypal houses with 15-meter cantilevers framing sweeping tri-border vistas.',
    },
    content: {
      ru: {
        lead: 'VitraHaus — это не просто выставочное пространство знаменитого мебельного бренда, а архитектурный манифест идеи «Urhaus» — архетипического жилого дома с двускатной крышей. Пять уровней здания образованы пересечением двенадцати вытянутых объемов.',
        sections: [
          {
            heading: 'Концепция «вертикальной деревни»',
            text: 'Архитекторы отказались от традиционной коробки торгового павильона в пользу хаотичной на вид, но математически выверенной композиции из домов-модулей. Укладывая один объем на другой с поворотом осей, авторы создали эффект многоярусной деревни. Консольные свесы достигают 15 метров, нависая над открытой центральной площадью кампуса.',
          },
          {
            heading: 'Интерьерная хореография и видовые раструбы',
            text: 'Маршрут посетителя начинается на верхнем этаже, куда ведет скоростной лифт, и разворачивается вниз по спирали. Каждый переход между пересекающимися домиками оформлен винтовой лестницей. Торцы каждого объема полностью остеклены, работая как гигантские видоискатели, обращенные на виноградники Туллингер-Хилл, реку Рейн и Базель.',
          },
          {
            heading: 'Монолитная угольная штукатурка фасада',
            text: 'Внешние стены покрыты минеральной штукатуркой графитово-угольного цвета. Этот однородный темный тон визуально объединяет разрозненные геометрические объемы и заставляет здание растворяться в вечерних сумерках, в то время как освещенные интерьеры сияют, как парящие в воздухе витрины.',
          },
        ],
        quote: {
          text: '«Мы вернулись к самому первичному представлению о доме с двускатной крышей и помножили его на динамику современного музея».',
          author: 'Пьер де Мерон, Herzog & de Meuron',
        },
      },
      en: {
        lead: 'VitraHaus stands on the Vitra Campus in Weil am Rhein as the flagship home for the Vitra Home Collection. Composed of twelve stacked archetypal gable houses, it reinterprets domestic scale within public architecture.',
        sections: [
          {
            heading: 'The Vertical Village Concept',
            text: 'Instead of an anonymous commercial showroom box, the architects stacked elongated gable houses on top of each other. The intersecting volumes generate dramatic interior junctions and cantilevered overhangs up to 15 meters, framing the central open plaza.',
          },
          {
            heading: 'Interior Choreography and Framed Vistas',
            text: 'Visitors take an elevator to the fifth floor and descend through winding sculptural stairs. Each end of the twelve volumes is sealed with floor-to-ceiling glass, acting as giant lens apertures directed toward the Black Forest, Swiss border, and Rhine valley.',
          },
          {
            heading: 'Charcoal Stucco Monolith',
            text: 'The exterior skin is coated with dark charcoal mineral stucco, unifying the complex intersections. At night, the exterior recedes into darkness, turning the illuminated showrooms into floating lanterns.',
          },
        ],
        quote: {
          text: '“The primary pitched-roof house archetype was scaled and stacked to create an intimate spatial journey through contemporary furniture design.”',
          author: 'Pierre de Meuron, Herzog & de Meuron',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/50533/vitrahaus-herzog-de-meuron',
    readTimeMinutes: 5,
    projectSpecs: {
      architect: 'Herzog & de Meuron',
      location: 'Вайль-на-Рейне, Германия',
      year: 2010,
      area: '4 100 м²',
      photographer: 'Iwan Baan',
      typology: 'Шоурум, Музейное пространство, Интерьеры',
    },
  },
  {
    id: 'arch-03',
    source: 'DEZEEN',
    sourceUrl: 'https://www.dezeen.com',
    publishedAt: '2026-09-24',
    category: 'culture',
    badge: 'МУЗЕЙНЫЙ ДАЙДЖЕСТ',
    mainImage: '/images/projects/tate_modern-main.jpg',
    gallery: [
      {
        url: '/images/projects/tate_modern-main.jpg',
        caption: {
          ru: 'Здание Blavatnik Building галереи Tate Modern на фоне исторической трубы электростанции Бэнксайд',
          en: 'The Tate Modern Blavatnik Building rising behind Bankside Power Station chimney',
        },
      },
      {
        url: '/images/projects/tate_modern-gallery-1.jpg',
        caption: {
          ru: 'Перфорированная кирпичная кладка нового корпуса, пропускающая свет сквозь щелевые швы',
          en: 'Perforated brick lattice facade screening daylight into exhibition galleries',
        },
      },
      {
        url: '/images/projects/tate_modern-gallery-2.jpg',
        caption: {
          ru: 'Монументальный Турбинный зал и циклопические подземные Резервуары для перформансов',
          en: 'The monumental Turbine Hall connecting directly to the subterranean Tanks for live art',
        },
      },
      {
        url: '/images/projects/tate_modern-gallery-3.jpg',
        caption: {
          ru: 'Круговая смотровая терраса верхнего этажа с видом на Собор Святого Павла и Сити',
          en: 'Open top-floor viewing terrace overlooking St Paul\'s Cathedral across the Thames',
        },
      },
    ],
    title: {
      ru: 'Tate Modern: трансформация электростанции и кирпичная пирамида Blavatnik Building',
      en: 'Tate Modern Expansion & Blavatnik Building / Herzog & de Meuron',
    },
    summary: {
      ru: 'Лондонский флагман современного искусства Tate Modern на берегу Темзы. От легендарной конверсии промышленной электростанции Джайлса Гилберта Скотта до возведения 10-этажной пирамиды Blavatnik Building с ажурной кирпичной решеткой.',
      en: 'The transformation of London’s Bankside Power Station into the world’s foremost contemporary museum, crowned by the 10-storey twisted brick pyramid of the Blavatnik Building over subterranean oil tanks.',
    },
    content: {
      ru: {
        lead: 'Tate Modern на южном берегу Темзы — безусловный эталон ревитализации промышленного наследия XX века. В 2016 году музей получил масштабное расширение — пирамидальный корпус Blavatnik Building, возведенный прямо над подземными нефтяными резервуарами (The Tanks).',
        sections: [
          {
            heading: 'От электростанции Бэнксайд к Турбинному залу',
            text: 'Историческая электростанция, спроектированная сэром Джайлсом Гилбертом Скоттом, была выведена из эксплуатации в 1981 году. Архитекторы Herzog & de Meuron сохранили брутальный индустриальный каркас, превратив колоссальный Турбинный зал длиной 152 метра в общественную городскую улицу, доступную для всех жителей Лондона.',
          },
          {
            heading: 'Геометрия Blavatnik Building и ажурный кирпич',
            text: 'Новый 65-метровый корпус представляет собой усеченную пирамиду с гранями, скручивающимися по диагонали. Фасад облицован 336 000 штуками перфорированного темно-коричневого кирпича, в точности созвучного исторической кладке электростанции. Кирпичные экраны фильтруют солнечный свет днем и создают мерцающий ажурный узор ночью.',
          },
          {
            heading: 'Резервуары (The Tanks) и культура перформанса',
            text: 'В основании башни сохранились гигантские бетонные цилиндры, где раньше хранилась нефть. Это первые в истории мирового музейного дела пространства, спроектированные специально для живого перформанса, экспериментального звука и видеоарта.',
          },
        ],
        quote: {
          text: '«Мы хотели создать здание, которое не спорит с промышленным гигантом Скотта, а вырастает из его основания, как геологическое образование».',
          author: 'Жак Херцог, Herzog & de Meuron',
        },
      },
      en: {
        lead: 'Tate Modern on London’s Bankside is the benchmark of industrial heritage transformation. In 2016, the museum completed the Blavatnik Building—a 10-storey twisted pyramid rising above the subterranean oil tanks.',
        sections: [
          {
            heading: 'From Bankside Power Station to Turbine Hall',
            text: 'Originally designed by Sir Giles Gilbert Scott, Bankside Power Station was decommissioned in 1981. Herzog & de Meuron preserved the monumental brick shell, transforming the 152-meter Turbine Hall into an indoor civic avenue free to the public.',
          },
          {
            heading: 'Pyramidal Geometry and Perforated Brick Lattice',
            text: 'The 65-meter Blavatnik Building features a truncated pyramid volume with twisted brick planes. The envelope is formed by 336,000 bricks creating a perforated screen that filters light into galleries during the day and glows like a beacon at night.',
          },
          {
            heading: 'The Subterranean Tanks for Performance',
            text: 'At the foundation level lie three circular subterranean oil tanks, converted into the world\'s first museum spaces dedicated solely to live art, sound installations, and video performance.',
          },
        ],
        quote: {
          text: '“The brickwork does not compete with Scott’s industrial monument; rather, it grows out of its foundations like a geological crystalline formation.”',
          author: 'Jacques Herzog, Herzog & de Meuron',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/788076/tate-modern-switch-house-herzog-and-de-meuron',
    readTimeMinutes: 8,
    projectSpecs: {
      architect: 'Herzog & de Meuron',
      location: 'Лондон, Великобритания',
      year: 2016,
      area: '22 492 м²',
      photographer: 'Iwan Baan',
      typology: 'Музей современного искусства, Редевелопмент',
    },
  },
  {
    id: 'arch-04',
    source: 'DEZEEN',
    sourceUrl: 'https://www.dezeen.com',
    publishedAt: '2026-09-24',
    category: 'urbanism',
    badge: 'ГОРОДСКАЯ РЕВИВАЛИЗАЦИЯ',
    mainImage: '/images/projects/coal_drops_yard-main.jpg',
    gallery: [
      {
        url: '/images/projects/coal_drops_yard-main.jpg',
        caption: {
          ru: '«Целующиеся крыши» угольных складов Coal Drops Yard в Кингс-Кросс',
          en: 'The “kissing roofs” of the Victorian coal drops viaduct at King\'s Cross, London',
        },
      },
      {
        url: '/images/projects/coal_drops_yard-gallery-1.jpg',
        caption: {
          ru: 'Консольные изогнутые перекрытия из валлийского сланца и структурного остекления',
          en: 'Cantilevered curved roofs clad in Welsh slate with panoramic structural glazing',
        },
      },
      {
        url: '/images/projects/coal_drops_yard-gallery-2.jpg',
        caption: {
          ru: 'Пешеходная галерея под викторианскими чугунными арками угольных эстакад',
          en: 'Pedestrian shopping colonnade beneath restored Victorian cast-iron viaduct arches',
        },
      },
    ],
    title: {
      ru: 'Coal Drops Yard в Лондоне: как Томас Хизервик соединил викторианские склады',
      en: 'Coal Drops Yard Retail & Cultural District / Heatherwick Studio',
    },
    summary: {
      ru: 'Превращение двух угольных складов викторианской эпохи 1850-х годов в общественное и торговое пространство. Студия Томаса Хизервика продлила исторические кровли навстречу друг другу, создав парящую смотровую площадку и подвесной зал.',
      en: 'Heatherwick Studio extended the slate gables of two 1850s Victorian coal drop viaducts towards each other until they touch, creating a hovering public deck and lively covered square in King’s Cross.',
    },
    content: {
      ru: {
        lead: 'Coal Drops Yard в лондонском районе Кингс-Кросс стал кульминацией одного из крупнейших девелоперских проектов Европы. Два кирпичных корпуса угольных складов середины XIX века были соединены изогнутыми кровлями, сформировавшими знаменитые «целующиеся крыши».',
        sections: [
          {
            heading: 'Индустриальная память Кингс-Кросс',
            text: 'Построенные в 1850 и 1860 годах угольные эстакады служили местом выгрузки сотен тонн угля, прибывавшего по железной дороге из северных графств Англии. К концу XX века комплекс пришел в запустение и использовался как ночные клубы и мастерские. Задача архитекторов заключалась в сохранении исторической ткани с интеграцией новых общественных функций.',
          },
          {
            heading: 'Инженерное чудо смыкания кровель',
            text: 'Вместо возведения стандартного перекрытия между зданиями Хизервик приподнял внутренние скаты крыш восточного и западного корпусов и изогнул их навстречу друг другу. В точке соприкосновения кровли консольно висят над площадью на высоте 8 метров без единой промежуточной опоры на уровне земли.',
          },
          {
            heading: 'Валлийский сланец и стальные конструкции',
            text: 'Для облицовки изогнутых объемов крыш был открыт тот же самый валлийский карьер, откуда поставлялся сланец для оригинальных крыш в XIX веке. В подвесном верхнем зале расположились видовой ресторан и культурный центр с панорамным обзором обновленного канала Риджентс.',
          },
        ],
        quote: {
          text: '«Мы не хотели вставлять стеклянную коробку между старыми кирпичными стенами. Мы заставили сами исторические крыши ожить, изогнуться и соприкоснуться в воздухе».',
          author: 'Томас Хизервик, основатель Heatherwick Studio',
        },
      },
      en: {
        lead: 'Coal Drops Yard at King\'s Cross revitalized two 1850s Victorian coal drop viaducts into a dynamic retail and cultural quarter, centered around Heatherwick Studio’s signature soaring roofs that reach across to touch in mid-air.',
        sections: [
          {
            heading: 'Industrial Rail Heritage',
            text: 'Erected between 1850 and 1860, the long brick viaducts received coal cars directly from northern England to power London. By the late 20th century, the site fell into disrepair. The intervention required opening the viaducts to pedestrian public life.',
          },
          {
            heading: 'The Engineering of Kissing Roofs',
            text: 'Rather than inserting an indifferent glass roof between the warehouses, the design team lifted the inner rooflines of both linear buildings, sweeping them inwards until they meet in a 35-meter unsupported span hovering over the central yard.',
          },
          {
            heading: 'Welsh Slate and Steel Frame',
            text: 'To clad the curving roof forms, slate was sourced from the very same quarry in Wales that supplied the original 19th-century tiles. The suspended upper room houses cultural exhibits overlooking the Regent\'s Canal.',
          },
        ],
        quote: {
          text: '“We didn’t want to drop an alien glass box between these magnificent brick buildings. Instead, we let the Victorian roofs themselves rise up and touch.”',
          author: 'Thomas Heatherwick, Heatherwick Studio',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/904676/coal-drops-yard-heatherwick-studio',
    readTimeMinutes: 6,
    projectSpecs: {
      architect: 'Heatherwick Studio',
      location: 'Лондон, Великобритания',
      year: 2018,
      area: '9 300 м²',
      photographer: 'Luke Hayes',
      typology: 'Ревитализация, Общественное пространство, Торговый квартал',
    },
  },
  {
    id: 'arch-05',
    source: 'DESIGNBOOM',
    sourceUrl: 'https://www.designboom.com',
    publishedAt: '2026-09-23',
    category: 'architecture',
    badge: 'ИНЖЕНЕРНАЯ ТЕКТОНИКА',
    mainImage: '/images/projects/vessel-main.jpg',
    gallery: [
      {
        url: '/images/projects/vessel-main.jpg',
        caption: {
          ru: 'Скульптурная стальная башня Vessel высотой 46 метров на площади Хадсон-Ярдс',
          en: 'The 46-meter Vessel copper-colored steel honeycomb tower at Hudson Yards Plaza, NYC',
        },
      },
      {
        url: '/images/projects/vessel-gallery-1.jpg',
        caption: {
          ru: 'Геометрия 154 лестничных пролетов и 2 500 ступеней, вдохновленная ступенчатыми колодцами Индии',
          en: 'Honeycomb geometry of 154 stair flights and 2,500 steps inspired by Indian stepwells',
        },
      },
      {
        url: '/images/projects/vessel-gallery-2.jpg',
        caption: {
          ru: 'Медно-бронзовая полированная обшивка нижней грани консольных пролетов',
          en: 'Copper-colored mirror-polished steel cladding reflecting visitors and Manhattan pavement',
        },
      },
      {
        url: '/images/projects/vessel-gallery-3.jpg',
        caption: {
          ru: 'Вид из центрального атриума в зенит на открытое небо Нью-Йорка',
          en: 'View looking vertically up through the open-air central Oculus toward the Manhattan sky',
        },
      },
    ],
    title: {
      ru: 'Vessel в Нью-Йорке: стальной сотовый амфитеатр от Heatherwick Studio',
      en: 'Vessel Interactive Landmark at Hudson Yards / Heatherwick Studio',
    },
    summary: {
      ru: 'Интерактивная скульптурная доминанта района Хадсон-Ярдс на Манхэттене. Конструкция состоит из 154 взаимосвязанных лестничных маршей и 80 смотровых площадок, облицованных зеркальной бронзовой сталью.',
      en: 'The interactive centerpiece of Manhattan\'s Hudson Yards development, comprising 154 interconnected staircases, 2,500 steps, and 80 landings clad in polished copper-colored steel.',
    },
    content: {
      ru: {
        lead: 'Vessel — масштабная пространственная скульптура в сердце нового района Hudson Yards в западной части Манхэттена. Проект переосмыслил типологию традиционного памятника, превратив его в общественный вертикальный амфитеатр для активного восхождения.',
        sections: [
          {
            heading: 'Вдохновение индийскими баори',
            text: 'Главным источником вдохновения для Томаса Хизервика послужили древнеиндийские ступенчатые колодцы (баори), в которых тысячи каменных ступеней сходятся к центру в завораживающем геометрическом порядке. Здание сужается к основанию до 15 метров в диаметре и расширяется к вершине до 46 метров.',
          },
          {
            heading: 'Инженерная сборка в Италии и доставка морем',
            text: 'Конструкция собиралась из 75 гигантских модулей из конструкционной стали, изготовленных в итальянском Монфальконе. Готовые элементы были доставлены в порт Нью-Йорка на баржах по реке Гудзон и смонтированы с ювелирной точностью на месте за полгода.',
          },
          {
            heading: 'Зеркальное отражение Манхэттена',
            text: 'Нижние грани всех консольных маршей облицованы листами нержавеющей стали с медно-титановым PVD-напылением. Зеркальная поверхность отражает пешеходов, брусчатку площади и огни окружающих небоскребов, создавая кинетический визуальный калейдоскоп.',
          },
        ],
        quote: {
          text: '«Мы хотели создать не статичный монумент, на который смотрят со стороны, а конструкцию, которую люди покоряют собственными ногами».',
          author: 'Томас Хизервик, Heatherwick Studio',
        },
      },
      en: {
        lead: 'Vessel forms the public centerpiece of Hudson Yards on Manhattan’s West Side. Reimagining the civic monument, it acts as a vertical climbing amphitheater offering 80 interconnected viewpoints.',
        sections: [
          {
            heading: 'Inspiration from Ancient Stepwells',
            text: 'Heatherwick drew inspiration from subterranean Indian stepwells (baoris), where rhythmic flights of stone steps converge in geometric harmony. The tower flares outwards from a 15-meter base to a 46-meter top diameter.',
          },
          {
            heading: 'Precision Prefabrication in Italy',
            text: 'The primary structure consists of 75 massive steel components fabricated in Monfalcone, Italy. Shipped across the Atlantic by barge, the pieces were bolted together with mechanical tolerance measured in millimeters.',
          },
          {
            heading: 'Reflective Copper Cladding',
            text: 'Underbellies of each landing are clad in mirror-finish copper PVD-coated steel, capturing reflections of visitors and the shifting Hudson River light.',
          },
        ],
        quote: {
          text: '“We didn’t want to build a sculpture you just stare at from afar. We wanted something you physically activate by climbing.”',
          author: 'Thomas Heatherwick, Heatherwick Studio',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/913699/vessel-public-landmark-heatherwick-studio',
    readTimeMinutes: 5,
    projectSpecs: {
      architect: 'Heatherwick Studio',
      location: 'Нью-Йорк, США',
      year: 2019,
      area: '2 210 м²',
      photographer: 'Michael Moran',
      typology: 'Общественная скульптура, Смотровая площадка',
    },
  },
  {
    id: 'arch-06',
    source: 'WALLPAPER*',
    sourceUrl: 'https://www.wallpaper.com',
    publishedAt: '2026-09-23',
    category: 'culture',
    badge: 'КУЛЬТУРНАЯ ТРАНСФОРМАЦИЯ',
    mainImage: '/images/projects/the_shed-main.jpg',
    gallery: [
      {
        url: '/images/projects/the_shed-main.jpg',
        caption: {
          ru: 'Телескопическая раздвижная оболочка The Shed из мембран ETFE на площади Хадсон-Ярдс',
          en: 'The movable ETFE-clad telescopic kinetic shell of The Shed deployed over the plaza',
        },
      },
      {
        url: '/images/projects/the_shed-gallery-1.jpg',
        caption: {
          ru: 'Шестифутовые стальные колеса рельсового механизма и диагональные фермы каркаса',
          en: 'Six-foot diameter forged steel bogie wheels on tracks deploying the outer enclosure',
        },
      },
      {
        url: '/images/projects/the_shed-gallery-2.jpg',
        caption: {
          ru: 'Подушки из полупрозрачного ETFE, обеспечивающие теплоизоляцию и рассеянный свет',
          en: 'Translucent ETFE air cushions providing acoustic and climate enclosure inside the hall',
        },
      },
      {
        url: '/images/projects/the_shed-gallery-3.jpg',
        caption: {
          ru: 'Универсальный трансформируемый зал The McCourt вместимостью до 3 000 зрителей',
          en: 'The McCourt multifunctional performance and visual art hall holding 3,000 guests',
        },
      },
    ],
    title: {
      ru: 'The Shed в Нью-Йорке: кинетический культурный центр с раздвижной оболочкой',
      en: 'The Shed Kinetic Arts Center / Diller Scofidio + Renfro & Rockwell Group',
    },
    summary: {
      ru: 'Культурный центр в Нью-Йорке, оснащенный раздвижным телескопическим павильоном из подушек ETFE. Стальная внешняя оболочка перемещается по рельсам на стальных колесах, удваивая площадь здания за пять минут.',
      en: 'A transformable arts center in New York featuring an expandable outer shell clad in translucent ETFE pillows, rolling on industrial bogies to enclose an 1,600 m² open plaza in five minutes.',
    },
    content: {
      ru: {
        lead: 'The Shed — первый в мире мультидисциплинарный арт-центр с кинетической архитектурой промышленного масштаба. Спроектированный бюро Diller Scofidio + Renfro в партнерстве с Rockwell Group, центр способен адаптироваться к любым видам современного искусства — от симфонических концертов до цифровых инсталляций.',
        sections: [
          {
            heading: 'Кинетическая архитектура и рельсовая механика',
            text: 'Главная особенность здания — внешняя стальная оболочка весом 3 600 тонн, перемещающаяся на шести парах сдвоенных колес диаметром 1,8 метра по железнодорожным рельсам. Привод мощностью всего 15 лошадиных сил выдвигает купол над прилегающей площадью за 5 минут, формируя герметичный зал The McCourt площадью 1 600 м².',
          },
          {
            heading: 'Фасадные подушки из ETFE',
            text: 'Оболочка затянута двухслойными подушками из полимера ETFE (этилен-тетрафторэтилен). Они обладают весом, составляющим всего 1% от массы эквивалентного стеклопакета, превосходными теплоизоляционными характеристиками и выдерживают штормовые ветра Атлантики.',
          },
          {
            heading: 'Свобода трансформации пространства',
            text: 'Основное восьмиэтажное стационарное здание включает две галереи без колонн, театр Tisch Lights на 500 мест и творческую лабораторию The Lizzie and Jonathan Tisch Skylight. Концепция основана на принципе архитектурного серванта: инфраструктура готова к переконфигурации за считанные часы.',
          },
        ],
        quote: {
          text: '«The Shed — это архитектура, способная меняться вместе с искусством будущего, о природе которого мы сегодня даже не догадываемся».',
          author: 'Элизабет Диллер, Diller Scofidio + Renfro',
        },
      },
      en: {
        lead: 'The Shed is an arts center dedicated to commissioning original works across all disciplines. Designed by Diller Scofidio + Renfro with Rockwell Group, its telescoping ETFE outer shell rolls on industrial rail tracks.',
        sections: [
          {
            heading: 'Kinetic Engineering on Rail Bogies',
            text: 'The defining feature is a 4,000-ton movable shell that slides along rails on twelve 1.8-meter steel wheels. Driven by four 15-horsepower motors, the shell glides forward in five minutes to enclose the 1,600 m² McCourt hall.',
          },
          {
            heading: 'Translucent ETFE Cushion Facade',
            text: 'Clad in lightweight fluoropolymer ETFE pillows, the kinetic shell is acoustically insulated and thermally regulated while weighing only a fraction of conventional architectural glazing.',
          },
          {
            heading: 'Column-Free Cultural Infrastructures',
            text: 'The permanent 8-level building includes two column-free museum gallery suites, a rehearsal center, and the 500-seat Kenneth C. Griffin Theater designed for theatrical premieres.',
          },
        ],
        quote: {
          text: '“We built architecture that can physically respond to future artistic practices that haven\'t even been conceived yet.”',
          author: 'Elizabeth Diller, Diller Scofidio + Renfro',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/914639/the-shed-a-center-for-the-arts-diller-scofidio-plus-renfro',
    readTimeMinutes: 7,
    projectSpecs: {
      architect: 'Diller Scofidio + Renfro & Rockwell Group',
      location: 'Нью-Йорк, США',
      year: 2019,
      area: '18 500 м²',
      photographer: 'Iwan Baan',
      typology: 'Культурный центр, Кинетическая архитектура',
    },
  },
  {
    id: 'arch-07',
    source: 'DOMUS',
    sourceUrl: 'https://www.domusweb.it',
    publishedAt: '2026-09-22',
    category: 'architecture',
    badge: 'ИСТОРИЧЕСКАЯ РЕКОНСТРУКЦИЯ',
    mainImage: '/images/projects/fondaco_tedeschi-main.jpg',
    gallery: [
      {
        url: '/images/projects/fondaco_tedeschi-main.jpg',
        caption: {
          ru: 'Фасад Il Fondaco dei Tedeschi XVI века у подножия моста Риальто на Гранд-канале',
          en: '16th-century Fondaco dei Tedeschi palace facade at Rialto Bridge on the Grand Canal, Venice',
        },
      },
      {
        url: '/images/projects/fondaco_tedeschi-gallery-1.jpg',
        caption: {
          ru: 'Центральный внутренний двор (корте) со стеклянной крышей и красным эскалатором OMA',
          en: 'Central atrium court with steel-and-glass skylight and signature red escalator by OMA',
        },
      },
      {
        url: '/images/projects/fondaco_tedeschi-gallery-2.jpg',
        caption: {
          ru: 'Смотровая деревянная терраса на крыше с 360-градусным видом на купола Венеции',
          en: 'Wooden rooftop viewing terrace providing panoramic views of Venetian spires and canals',
        },
      },
      {
        url: '/images/projects/fondaco_tedeschi-gallery-3.jpg',
        caption: {
          ru: 'Сочетание терраццо, исторического известняка и латунных витрин в галереях',
          en: 'Juxtaposition of traditional terrazzo, Istrian stone, and modern brass vitrines',
        },
      },
    ],
    title: {
      ru: 'Il Fondaco dei Tedeschi в Венеции: реновация дворца XVI века от Рема Колхаса (OMA)',
      en: 'Il Fondaco dei Tedeschi Restoration / OMA (Rem Koolhaas)',
    },
    summary: {
      ru: 'Превращение купеческого подворья XVI века у моста Риальто в общественное пространство и универмаг культуры. Бюро Рема Колхаса OMA деликатно отреставрировало аркады и открыло панорамную террасу над Гранд-каналом.',
      en: 'OMA\'s restoration and masterly adaptation of Venice\'s 16th-century German merchants palazzo by the Rialto Bridge into a contemporary civic, retail, and public rooftop observatory.',
    },
    content: {
      ru: {
        lead: 'Il Fondaco dei Tedeschi, возведенный в 1506 году после пожара на Гранд-канале, служил штаб-квартирой немецких купцов в Венеции. Проект бюро OMA под руководством Рема Колхаса и Ипполито Пестеллини Лапарелли вернул зданию статус открытого городского узла.',
        sections: [
          {
            heading: 'Пять веков трансформаций',
            text: 'Здание пережило множество кардинальных перестроек: от таможни времен Наполеона до Главного почтамта Италии при Муссолини с введением брутальных железобетонных перекрытий в 1930-х. Архитекторы OMA не стали идеализировать одну эпоху, а выявили все исторические наслоения.',
          },
          {
            heading: 'Внутренний двор и подвесной атриум',
            text: 'Исторический внутренний двор вымощен красным веронским мрамором и белым истрийским камнем. Над двором парит стеклянный световой фонарь на тончайшей стальной структуре. Диагональный эскалатор с отделкой из красного поликарбоната проводит посетителей через аркады прямо наверх.',
          },
          {
            heading: 'Панорамная терраса над Венецией',
            text: 'На крыше палаццо была демонтирована глухая надстройка 1950-х годов и сооружена парящая деревянная площадка. Она стала первой общедоступной видовой террасой на Гранд-канале, открывающей 360-градусную панораму колоколен, собора Сан-Марко и лагуны.',
          },
        ],
        quote: {
          text: '«Реконструкция в Венеции — это всегда баланс между почтением к камню и смелостью современного жеста. Мы вернули Фондако в ткань общественной жизни города».',
          author: 'Рем Колхас, основатель OMA',
        },
      },
      en: {
        lead: 'Il Fondaco dei Tedeschi, rebuilt in 1506 following a devastating fire, was the bustling commercial trading post of German merchants in Renaissance Venice. OMA\'s masterly intervention unlocked this historic monolith for public access.',
        sections: [
          {
            heading: 'Layered Stratigraphy of Five Centuries',
            text: 'Having served as a customs house under Napoleon and the central postal headquarters in the 1930s with brutalist concrete insertions, OMA embraced this layered history rather than reconstructing an artificial singular Renaissance moment.',
          },
          {
            heading: 'Courtyard and The Red Escalator',
            text: 'The central cloistered court is paved in Istrian stone and red Verona marble. A suspended glass roof shelters the public piazza, while an architectural blood-red escalator guides visitors through the arcaded galleries to the sky.',
          },
          {
            heading: 'Rooftop Observatory of the Grand Canal',
            text: 'A floating timber platform was built on the rooftop by removing obsolete 20th-century sheds, creating Venice\'s premier public lookout framing the Rialto Bridge and the Venetian Lagoon.',
          },
        ],
        quote: {
          text: '“Renovating in Venice requires an exact balance between radical conservation and the courage to introduce contemporary civic vibrancy.”',
          author: 'Rem Koolhaas, OMA',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/789167/il-fondaco-dei-tedeschi-oma',
    readTimeMinutes: 7,
    projectSpecs: {
      architect: 'OMA (Rem Koolhaas & Ippolito Pestellini Laparelli)',
      location: 'Венеция, Италия',
      year: 2016,
      area: '9 000 м²',
      photographer: 'Delfino Sisto Legnani',
      typology: 'Реставрация памятника, Общественное пространство, Ритейл',
    },
  },
  {
    id: 'arch-08',
    source: 'ARCHDAILY',
    sourceUrl: 'https://www.archdaily.com',
    publishedAt: '2026-09-22',
    category: 'culture',
    badge: 'АКУСТИЧЕСКИЙ ШЕДЕВР',
    mainImage: '/images/projects/elbphilharmonie-main.jpg',
    gallery: [
      {
        url: '/images/projects/elbphilharmonie-main.jpg',
        caption: {
          ru: 'Стеклянный кристалл Эльбской филармонии на историческом кирпичном складе Кайшпайхер А в Гамбурге',
          en: 'The iridescent glass crown of Elbphilharmonie atop the Kaispeicher A brick warehouse in Hamburg',
        },
      },
      {
        url: '/images/projects/elbphilharmonie-gallery-1.jpg',
        caption: {
          ru: 'Большой концертный зал на 2 100 мест с акустической «белой кожей» из гипсоволокнистых плит',
          en: 'The Grand Concert Hall with 10,000 algorithmic gypsite acoustic sound-diffusing panels',
        },
      },
      {
        url: '/images/projects/elbphilharmonie-gallery-2.jpg',
        caption: {
          ru: 'Общественная плаза на 37-метровой высоте на стыке кирпичного основания и стеклянной короны',
          en: 'The 37-meter high public Plaza uniting the historic base and iridescent glass volume',
        },
      },
      {
        url: '/images/projects/elbphilharmonie-gallery-3.jpg',
        caption: {
          ru: 'Гнутые стеклянные панели фасада с напылением против нагрева и зеркальными отблесками Эльбы',
          en: 'Curved glass facade panels with customized ceramic frit reflecting the Elbe River waters',
        },
      },
    ],
    title: {
      ru: 'Эльбская филармония в Гамбурге: стеклянный парус над портом от Herzog & de Meuron',
      en: 'Elbphilharmonie Hamburg / Herzog & de Meuron',
    },
    summary: {
      ru: 'Культурная доминанта гамбургского порта Хафенсити. Стеклянная надстройка с волнообразной кровлей покоится на массивном кирпичном пакгаузе 1960-х годов. Внутри — зал «виноградник» с непревзойденной акустикой Ясухисы Тоёты.',
      en: 'A crystalline cultural landmark in Hamburg’s HafenCity, rising from the brick foundation of a 1960s cocoa warehouse. Features a 2,100-seat vineyard concert hall with acoustics by Yasuhisa Toyota.',
    },
    content: {
      ru: {
        lead: 'Эльбская филармония (Elbphilharmonie) в Гамбурге — один из самых амбициозных и акустически совершенных концертных залов современности. Сооружение объединило филармонию, пятизвездочный отель, жилые апартаменты и общедоступную смотровую площадь.',
        sections: [
          {
            heading: 'Симбиоз кирпичного склада и хрустального айсберга',
            text: 'Основанием для филармонии послужил склад Kaispeicher A, построенный в 1966 году для хранения мешков с какао. Архитекторы Herzog & de Meuron сохранили брутальные глухие кирпичные стены, укрепив фундамент дополнительными сваями, и водрузили сверху 110-метровую стеклянную структуру с волнистым гребнем.',
          },
          {
            heading: 'Большой зал: типология виноградника и «белая кожа»',
            text: 'Концертный зал на 2 100 мест построен по принципу «виноградника» — оркестр расположен в центре, а террасы со зрительскими местами поднимаются крутыми ярусами вокруг сцены. Для акустики совместно с мастером Ясухисой Тоётой была разработана «белая кожа» — 10 000 индивидуально отфрезерованных гипсовых панелей, исключающих любое эхо.',
          },
          {
            heading: 'Гнутые стекла и плаза между стихиями',
            text: 'Фасад состоит из 1 100 изогнутых стеклопакетов, каждый из которых имеет уникальный радиус кривизны. На 37-метровой высоте, точно на границе кирпича и стекла, устроена открытая общественная терраса — Плаза, доступная бесплатно всем жителям города через 80-метровый дугообразный эскалатор.',
          },
        ],
        quote: {
          text: '«Филармония в Гамбурге задумана не как элитарный храм музыки, а как продолжение городской набережной, поднимающейся в облака».',
          author: 'Жак Херцог, Herzog & de Meuron',
        },
      },
      en: {
        lead: 'The Elbphilharmonie in Hamburg\'s HafenCity represents a triumphal synthesis of maritime industrial heritage and cutting-edge acoustic engineering. Crowned by a surging glass wave, it stands directly in the harbor currents.',
        sections: [
          {
            heading: 'Warehouse Brick Meets Crystalline Crest',
            text: 'Resting on the brick volume of Kaispeicher A—a 1966 warehouse previously used to store cocoa beans—the new glass superstructure reaches 110 meters. Herzog & de Meuron created a wave-like roof silhouette that echoes harbor swells.',
          },
          {
            heading: 'The Vineyard Hall and The Acoustic "White Skin"',
            text: 'The 2,100-seat Grand Hall places the orchestra at the center, surrounded by terraced seating like vineyards on a steep hill. Collaborating with acoustic master Yasuhisa Toyota, 10,000 uniquely CNC-milled gypsite panels scatter sound waves perfectly across every ear.',
          },
          {
            heading: 'The Curved Glass Envelope and Public Plaza',
            text: 'The facade features 1,100 precision-curved glass panes with printed ceramic dots to control solar heat gain. At the 37-meter mark, a public plaza wraps entirely around the building, accessed by an 80-meter curved escalator known as the "Tube".',
          },
        ],
        quote: {
          text: '“The building is an open civic promontory—a public mountain in the middle of the port that invites everyone up into the sky.”',
          author: 'Jacques Herzog, Herzog & de Meuron',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/802093/elbphilharmonie-hamburg-herzog-and-de-meuron',
    readTimeMinutes: 8,
    projectSpecs: {
      architect: 'Herzog & de Meuron',
      location: 'Гамбург, Германия',
      year: 2017,
      area: '120 000 м²',
      photographer: 'Iwan Baan',
      typology: 'Концертный зал, Филармония, Городская доминанта',
    },
  },
  {
    id: 'arch-09',
    source: 'DESIGNBOOM',
    sourceUrl: 'https://www.designboom.com',
    publishedAt: '2026-09-21',
    category: 'culture',
    badge: 'СВЕТОВАЯ КУЛЬТУРА',
    mainImage: '/images/projects/louvre_abudhabi-main.jpg',
    gallery: [
      {
        url: '/images/projects/louvre_abudhabi-main.jpg',
        caption: {
          ru: '180-метровый купол Лувра Абу-Даби, парящий над белыми павильонами арабской медины в море',
          en: 'The 180-meter dome of Louvre Abu Dhabi floating over the white medina pavilions in the sea',
        },
      },
      {
        url: '/images/projects/louvre_abudhabi-gallery-2.jpg',
        caption: {
          ru: 'Эффект «дождя из света» сквозь 8 слоев геометрических звезд купола',
          en: 'The signature “rain of light” effect passing through eight layers of geometric metal stars',
        },
      },
      {
        url: '/images/projects/louvre_abudhabi-gallery-4.jpg',
        caption: {
          ru: 'Каналы и открытые водные променады между галереями музея на острове Саадият',
          en: 'Sea canals and shaded waterfront promenades between museum galleries on Saadiyat Island',
        },
      },
    ],
    title: {
      ru: 'Лувр Абу-Даби: музей-город в Персидском заливе от Жана Нувеля',
      en: 'Louvre Abu Dhabi Museum City in the Sea / Ateliers Jean Nouvel',
    },
    summary: {
      ru: 'Музейный город из 55 белых корпусов на острове Саадият, укрытый ажурным металлическим куполом диаметром 180 метров. Архитектор Жан Нувель создал эффект «дождя из света», переосмыслив кроны финиковых пальм в оазисе.',
      en: 'A seaside museum city composed of 55 cubic buildings sheltered under a 180-meter openwork dome. Jean Nouvel created a perpetual “rain of light” inspired by the shade of date palms in desert oases.',
    },
    content: {
      ru: {
        lead: 'Лувр Абу-Даби на острове Саадият — первый универсальный музей в арабском мире. Жан Нувель объединил традиционную типологию арабской медины, морскую стихию и сложнейшую параметрическую геометрию.',
        sections: [
          {
            heading: 'Музейная медина посреди моря',
            text: 'Комплекс состоит из 55 отдельных малоэтажных зданий, напоминающих традиционные белые кварталы арабских приморских городов. Каналы морской воды заходят внутрь комплекса, создавая естественное охлаждение и живописные отражения галерей.',
          },
          {
            heading: 'Купол весом с Эйфелеву башню',
            text: 'Колоссальный купол диаметром 180 метров весит 7 500 тонн и опирается всего на четыре скрытые опоры, разнесенные на 110 метров. Купол состоит из восьми наложенных друг на друга слоев (четыре внешних из нержавеющей стали и четыре внутренних из алюминия), образующих 7 850 геометрических звезд.',
          },
          {
            heading: '«Дождь из света» (Rain of Light)',
            text: 'Когда палящее солнце Аравийской пустыни проходит через слои звездного орнамента, свет разбивается на тысячи кинетических световых пятен. Они медленно скользят по белым стенам и воде, создавая прохладный микроклимат и медитативную атмосферу древнего оазиса.',
          },
        ],
        quote: {
          text: '«Архитектура должна принадлежать месту и культуре. Этот купол — метафора пальмовой тени в оазисе, где человек укрывается от зноя под шелестом листьев».',
          author: 'Жан Нувель, лауреат Притцкеровской премии',
        },
      },
      en: {
        lead: 'Louvre Abu Dhabi on Saadiyat Island stands as the first universal museum in the Arab world. Pritzker Laureate Jean Nouvel synthesized the ancient Arabic medina with seawater canals and a celestial dome.',
        sections: [
          {
            heading: 'A Maritime Medina',
            text: 'Comprising 55 white cubic buildings inspired by traditional settlements, the museum is surrounded by the waters of the Persian Gulf. Seawater flows through pedestrian courtyards, creating a microclimate of cooling coastal breezes.',
          },
          {
            heading: 'The 7,500-Ton Floating Dome',
            text: 'The 180-meter diameter dome weighs as much as the Eiffel Tower, supported on only four concealed piers spaced 110 meters apart. Eight superimposed layers of geometric aluminum and stainless steel form 7,850 repeated star patterns.',
          },
          {
            heading: 'The Enchanting Rain of Light',
            text: 'As sunlight penetrates the layered star lattices, it casts a living pattern of dancing light rays across the waterfront plazas and gallery walls, mimicking dappled shade beneath a date palm grove.',
          },
        ],
        quote: {
          text: '“Architecture should belong to its land. This dome is an architectural tribute to the oasis, where light filters through palm fronds to provide serene shelter.”',
          author: 'Jean Nouvel, Ateliers Jean Nouvel',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/883157/louvre-abu-dhabi-ateliers-jean-nouvel',
    readTimeMinutes: 7,
    projectSpecs: {
      architect: 'Ateliers Jean Nouvel',
      location: 'Абу-Даби, ОАЭ',
      year: 2017,
      area: '97 000 м²',
      photographer: 'Roland Halbe',
      typology: 'Музей искусства, Купольная конструкция, Медина',
    },
  },
  {
    id: 'arch-10',
    source: 'DOMUS',
    sourceUrl: 'https://www.domusweb.it',
    publishedAt: '2026-09-20',
    category: 'urbanism',
    badge: 'ЭКО-МАНИФЕСТ',
    mainImage: '/images/projects/bosco_verticale-main.jpg',
    gallery: [
      {
        url: '/images/projects/bosco_verticale-main.jpg',
        caption: {
          ru: 'Башни вертикального леса Bosco Verticale в районе Порта Нуова, Милан',
          en: 'Twin towers of the Bosco Verticale vertical forest in Porta Nuova, Milan',
        },
      },
      {
        url: '/images/projects/bosco_verticale-gallery-1.jpg',
        caption: {
          ru: 'Консольные железобетонные террасы с высадкой 800 деревьев и 15 000 кустарников',
          en: 'Cantilevered reinforced concrete balconies supporting 800 mature trees and 15,000 shrubs',
        },
      },
      {
        url: '/images/projects/bosco_verticale-gallery-2.jpg',
        caption: {
          ru: 'Лиственный щит, снижающий нагрев фасадов летом и пропускающий зимнее солнце',
          en: 'Living foliage shield cooling apartments in summer and admitting winter sunlight',
        },
      },
      {
        url: '/images/projects/bosco_verticale-gallery-3.jpg',
        caption: {
          ru: 'Интегрированная система капельного полива с использованием фильтрованной серой воды',
          en: 'Automated centralized drip irrigation fed by recycled building greywater',
        },
      },
    ],
    title: {
      ru: 'Bosco Verticale в Милане: вертикальный лес Стефано Боэри и зеленая революция городов',
      en: 'Bosco Verticale Vertical Forest in Milan / Boeri Studio',
    },
    summary: {
      ru: 'Две жилые башни высотой 112 и 80 метров в Милане, ставшие всемирным символом биоразнообразия в архитектуре. На консольных балконах высажен эквивалент 2 гектаров настоящего леса.',
      en: 'Two residential towers in Milan standing 112 and 80 meters tall, housing the botanical equivalent of two hectares of forest on cantilevered balconies to regenerate urban biodiversity.',
    },
    content: {
      ru: {
        lead: 'Bosco Verticale («Вертикальный лес»), построенный в миланском деловом квартале Порта Нуова по проекту бюро Boeri Studio (Стефано Боэри, Джанандреа Баррека, Джованни Ла Варра), признан Международным советом по высотным зданиям лучшим небоскребом мира.',
        sections: [
          {
            heading: 'Биологическое разнообразие на высоте',
            text: 'На двух башнях размещено 800 полноразмерных деревьев (высотой от 3 до 9 метров), 5 000 кустарников и 15 000 многолетних почвопокровных растений. Подбор видов проводился ботаниками в течение трех лет с учетом ветровых нагрузок на высоте до 110 метров.',
          },
          {
            heading: 'Экологический щит мегаполиса',
            text: 'Живой растительный покров поглощает около 30 тонн углекислого газа в год, задерживает пыль и взвешенные микрочастицы смога, поглощает уличный шум и защищает квартиры от перегрева, сокращая энергопотребление кондиционеров на 30%.',
          },
          {
            heading: 'Конструктивная мощь террас и умный полив',
            text: 'Балконы выполнены из усиленного бетона толщиной 28 см и имеют консольный вылет 3,3 метра. Корневые системы защищены специальными геосетками и антикоррозийными емкостями. Орошение осуществляется централизованно через систему капельного полива с датчиками влажности и использованием очищенных сточных вод.',
          },
        ],
        quote: {
          text: '«Вертикальный лес — это биологический манифест против экспансии бетона. Мы вернули природу в самый центр индустриального Милана».',
          author: 'Стефано Боэри, Boeri Studio',
        },
      },
      en: {
        lead: 'Bosco Verticale (Vertical Forest) in Milan\'s Porta Nuova district by Boeri Studio has become the international prototype for biological urbanism and sustainable high-rise living.',
        sections: [
          {
            heading: 'Vertical Biodiversity Reservoir',
            text: 'The twin towers house 800 mature trees, 5,000 shrubs, and 15,000 ground-covering floral plants. Botanists cultivated the saplings in specialized nurseries for three years to ensure they could withstand alpine winds at 110 meters.',
          },
          {
            heading: 'Living Environmental Shield',
            text: 'The plant canopy absorbs 30 tons of CO2 annually, traps particulate smog, produces oxygen, and naturally tempers indoor climates, reducing artificial cooling requirements by 30%.',
          },
          {
            heading: 'Structural Cantilevers and Recycled Greywater',
            text: 'The 3.3-meter deep cantilevered balconies are engineered in 28-cm thick prestressed concrete. Plants are monitored by telemetry soil sensors and irrigated via recycled building greywater.',
          },
        ],
        quote: {
          text: '“Bosco Verticale is a living architectural manifesto against mineral sprawl. It restores wild flora and fauna directly into the urban sky.”',
          author: 'Stefano Boeri, Boeri Studio',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/777498/bosco-verticale-stefano-boeri-architetti',
    readTimeMinutes: 6,
    projectSpecs: {
      architect: 'Boeri Studio (Stefano Boeri, Gianandrea Barreca, Giovanni La Varra)',
      location: 'Милан, Италия',
      year: 2014,
      area: '40 000 м²',
      photographer: 'Paolo Rosselli',
      typology: 'Жилые башни, Эко-архитектура, Биоразнообразие',
    },
  },
  {
    id: 'arch-11',
    source: 'ARCHITECTURAL DIGEST',
    sourceUrl: 'https://www.architecturaldigest.com',
    publishedAt: '2026-09-20',
    category: 'architecture',
    badge: 'МАСШТАБНЫЙ МЕГАПРОЕКТ',
    mainImage: '/images/projects/azabudai_hills-main.jpg',
    gallery: [
      {
        url: '/images/projects/azabudai_hills-main.jpg',
        caption: {
          ru: 'Комплекс Azabudai Hills и волнообразный павильон Garden Plaza от Heatherwick Studio в Токио',
          en: 'Azabudai Hills mixed-use district with the undulating Garden Plaza by Heatherwick Studio in Tokyo',
        },
      },
      {
        url: '/images/projects/azabudai_hills-gallery-1.jpg',
        caption: {
          ru: 'Перфорированные перголы и террасные сады, плавно спускающиеся с уровня кровли к метро',
          en: 'Perforated pergolas and cascading rooftop gardens linking urban levels to transit concourses',
        },
      },
      {
        url: '/images/projects/azabudai_hills-gallery-2.jpg',
        caption: {
          ru: 'Вид на 330-метровый небоскреб Mori JP Tower — высочайшее здание Японии',
          en: 'The 330-meter Mori JP Tower designed by Pelli Clarke & Partners, Japan’s tallest tower',
        },
      },
      {
        url: '/images/projects/azabudai_hills-gallery-3.jpg',
        caption: {
          ru: 'Интерьеры галерей и общественные пространства цифрового музея teamLab Borderless',
          en: 'Underground museum galleries and light-filled shopping promenade housing teamLab Borderless',
        },
      },
    ],
    title: {
      ru: 'Azabudai Hills в Токио: зеленый город в городе от Heatherwick Studio и Pelli Clarke',
      en: 'Azabudai Hills Tokyo "Modern Urban Village" / Heatherwick Studio & Pelli Clarke',
    },
    summary: {
      ru: 'Новый район в центре Токио площадью 8,1 га, объединивший высочайший небоскреб Японии Mori JP Tower (330 м) и уникальный холмистый ландшафт от Томаса Хизервика с террасными садами и цифровым музеем teamLab Borderless.',
      en: 'A transformative 8.1-hectare district in central Tokyo centered around Japan’s tallest tower (330m) and Heatherwick Studio’s undulating Garden Plaza, creating a human-scaled biophilic valley.',
    },
    content: {
      ru: {
        lead: 'Azabudai Hills — один из самых масштабных проектов комплексной урбанистической регенерации в истории Токио. Проект разрабатывался девелопером Mori Building на протяжении 30 лет при участии более 300 владельцев земельных участков.',
        sections: [
          {
            heading: '«Современная городская деревня»',
            text: 'Концепция района опирается на принципы «Зелень и здоровье» (Green & Wellness). Вместо плотной застройки асфальтом и бетоном 24 000 м² отданы под открытые сады, где высажено 320 видов растений, включая фруктовые сады с яблонями и персиками.',
          },
          {
            heading: 'Холмистый ландшафт Heatherwick Studio',
            text: 'Томас Хизервик спроектировал подиумную часть Garden Plaza в виде мягко колышущихся холмов с перфорированными решетчатыми перголами. Зеленые террасы плавно спускаются с высоты нескольких этажей к пешеходным улицам, укрывая бутики, кафе и подземные переходы к станциям метро.',
          },
          {
            heading: 'Mori JP Tower и музей teamLab',
            text: 'Доминантой района стал 330-метровый небоскреб Mori JP Tower по проекту Pelli Clarke & Partners. В подземной части комплекса обосновался музей цифрового искусства teamLab Borderless, чьи иммерсивные инсталляции привлекают посетителей со всего мира.',
          },
        ],
        quote: {
          text: '«Мы хотели создать в центре гигантского мегаполиса пространство человеческого масштаба — место, где архитектура вырастает из холмов, а не подавляет людей».',
          author: 'Томас Хизервик, Heatherwick Studio',
        },
      },
      en: {
        lead: 'Azabudai Hills culminates a 30-year urban regeneration by Mori Building in Minato City, Tokyo. Spanning 8.1 hectares, it seamlessly integrates residential, cultural, and commercial life in a verdant valley.',
        sections: [
          {
            heading: 'The Modern Urban Village Concept',
            text: 'Conceived around the theme of "Green & Wellness", the development devotes 24,000 m² to publicly accessible greenery featuring 320 plant species, communal orchards, and terraced lawns.',
          },
          {
            heading: 'Heatherwick Studio\'s Undulating Topography',
            text: 'Heatherwick Studio designed the lower-level Garden Plaza podium as an undulating landscape of sculptural steel pergolas draped in greenery, guiding natural light deep into underground civic concourses.',
          },
          {
            heading: 'Mori JP Tower and teamLab Borderless',
            text: 'The skyline anchor is the 330-meter Mori JP Tower by Pelli Clarke & Partners, currently the tallest skyscraper in Japan, housing the relocated world-famous teamLab Borderless immersive digital museum.',
          },
        ],
        quote: {
          text: '“Rather than standard sterile mega-blocks, we created a tactile topography where human emotions, nature, and architecture intertwine.”',
          author: 'Thomas Heatherwick, Heatherwick Studio',
        },
      },
    },
    originalUrl: 'https://www.archdaily.com/1010353/azabudai-hills-heatherwick-studio',
    readTimeMinutes: 7,
    projectSpecs: {
      architect: 'Heatherwick Studio (Podium & Plaza) & Pelli Clarke & Partners (Towers)',
      location: 'Токио, Япония',
      year: 2023,
      area: '861 700 м²',
      photographer: 'Kenji Masunaga / Raquel Diniz',
      typology: 'Комплексное развитие территории, Небоскреб, Ландшафтный подиум',
    },
  },
];

const steps = {
    // САМЫЙ ПЕРВЫЙ ШАГ ВЫБОРА
    choice: {
        description: "Этот алгоритм проведет вас по всем этапам для закрепления клиента. Следуйте инструкциям на экране, сверяйтесь со скриншотами и отвечайте на вопросы ниже.\nДля начала давайте определим тип 1С клиента.",
        question: "У клиента Фреш?",
        options: [
            { text: "Да", next: "fr_start" },
            { text: "Нет", next: "start" }
        ]
    },

    // --- СТАНДАРТНЫЙ АЛГОРИТМ ---
    start: {
        description: "Зайдите в <a href='https://portal.1c.ru/partner/application/list/1C-Edo/relations' target='_blank'>ЛК партнера</a>, введите ИНН организации и нажмите Найти",
        question: "Организация есть в списке?",
        image: "images/Вводим инн.jpg", 
        options: [
            { text: "Да", next: "org_exists" },
            { text: "Нет", next: "create_org" }
        ]
    },

    create_org: {
        description: "Нажимаем 'Добавить организацию'",
        image: "images/добавить орг.jpg", 
        options: [
            { text: "Далее", next: "create_org_2" },
        ]
    },
    create_org_2: {
        description: "1. Вводим ИНН, нажимаем 'Заполнить'.\n2. Вводим дату начала тарифа\n3. Дату окончания периода сопровождения оставляем пустой.\n4. Нажимаем 'Сохранить'",
        question: "Идентификатор (ID) появился автоматически после создания?",
        image: "images/создание орг.jpg", 
        options: [
            { text: "Да", next: "tariff_type_select" },
            { text: "Нет", next: "click_add_ids" }
        ]
    },
    org_exists: {
        description: "1. Прикрепляем договор/счет.\n2. Нажимаем на название организации.",
        question: "Внутри организации уже отображается ID?",
        image: "images/прикрепляем счет.jpg", 
        options: [
            { text: "Да", next: "tariff_type_select" },
            { text: "Нет", next: "click_add_ids" }
        ]
    },
    click_add_ids: {
        description: "Нажимаем кнопку 'Добавить идентификаторы'.",
        question: "После нажатия кнопки ID подтянулся автоматически?",
        image: "images/добавить идентификаторы.jpg",
        options: [
            { text: "Да", next: "confirm_id_row" }, 
            { text: "Нет", next: "manual_input" }
        ]
    },
    manual_input: {
        description: "Вводим логин и почту абонента. которые он предоставил и нажимаем 'Найти'\n",
        question: "ID появился в списке после ручного ввода?",
        image: "images/найти id.jpg",
        options: [
            { text: "Да", next: "confirm_id_row" },
            { text: "Нет", next: "web_registrar_check" }
        ]
    },
    confirm_id_row: {
        description: "Выбираем id и нажимаем кнопку 'Взять на сопровождение'",
        image: "images/взять на сопр без логина.jpg",
        question: "",
        options: [
            { text: "Далее", next: "tariff_type_select" }
        ]
    },
    web_registrar_check: {
        description: "Необходимо понять, есть ли у клиента id Астрал. Это можно посмотреть на Веб-регистраторе",
        question: "По ИНН/КПП найдены продукты 1С-ЭДО?",
        image: "images/вр.jpg",
        options: [
            { text: "Да", next: "error_other_lk" },
            { text: "Нет", next: "identify_operator" }
        ]
    },
    identify_operator: {
        description: "Вероятно клиент пользуется оператором Такском",
        question: "Какой оператор ЭДО у клиента?",
        options: [
            { text: "Астрал", next: "error_astral" },
            { text: "Такском", next: "error_taxcom" }
        ]
    },
    tariff_type_select: {
        description: "Далее нужно отталкиваться от того, какой тип тарифа приобрел клиент",
        question: "Какой тип тарифа указан в задаче?",
        options: [
            { text: "Предоплата", next: "prepaid_check_tariff_subscriber" },
            { text: "Постоплата", next: "success_end_post" }
        ]
    },

    prepaid_check_tariff_subscriber: {
        description: "Нажмите на номер абонента",
        image: "images/финал-нажимаем на абонента.jpg", 
        question: "",
        options: [
            { text: "Далее", next: "prepaid_check_tariff_subscriber_2" },
        ]
    },

    prepaid_check_tariff_subscriber_2: {
        description: "Во вкладке 'Тарифы, включающие 1С-ЭДО' должен отображаться подключенный тариф.",
        image: "images/финальное подтверждение.jpg", 
        question: "Тариф есть?",
        options: [
            { text: "Да", next: "success_end" },
            { text: "Нет", next: "copy_login" }
        ]
    },
    copy_login: {
        description: "Копируем логин и почту абонента, который закрепился за id",
        image: "images/логин и почта автомат.jpg", 
        options: [
            { text: "Далее", next: "prepaid_start" },
        ]
    },
    prepaid_start: {
        description: "1. Переходим в раздел <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a>.\n2. Вводим логин и почту из абонента, который закрепился за id.\n3. Переходим в лк, нажав на номер абонента.",
        image: "images/Найти пользователя не фреш.png", 
        options: [
            { text: "Далее", next: "prepaid_start_2" },
        ]
    },
    prepaid_start_2: {
        description: "В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        image: "images/ищем рег номер не фреш.jpg", 
        question: "Рег.номер, на который зарегистрирован тариф, найден в этом личном Кабинете?",
        options: [
            { text: "Да", next: "prepaid_check_contract" },
            { text: "Нет", next: "prepaid_check_data_match" }
        ]
    },
    prepaid_check_contract: {
        description: "Открываем вкладку 'Договоры' и ищем нужный тариф.",
        image: "images/договор в лк клиента.jpg", 
        question: "Тариф присутствует в списке договоров?",
        options: [
            { text: "Да", next: "prepaid_success_wait" },
            { text: "Нет", next: "manager_check_node" }
        ]
    },
    prepaid_success_wait: {
        description: "Возможно тариф зарегистрировали недавно, поэтому нужно подождать около часа и проверить еще раз",
        image: "",
        options: [
            { text: "Начать заново", next: "choice" }
        ]
        
    },
    manager_check_node: {
        description: "Успешно ли зарегистрирован тариф на этот рег номер? \n(Если тарифы регистрируете не Вы, то уточните у менеджера)",
        question: "Тариф зарегистрирован?",
        options: [
            { text: "Да", next: "atypical_situation" },
            { text: "Нет", next: "need_to_register" }
        ]
    },
    need_to_register: {
        description: "Необходимо зарегистрировать тариф. После регистрации начать заново",
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    atypical_situation: {
        description: "Нестандартная ситуация, необходимо обращаться в ТП\nЛибо попробуйте начать заново. Возможно вы ошиблись на одном из этапов",
        question: "",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },

    prepaid_check_data_match: {
        description: "Необходимо проверить, совпадают ли логин и почта, которые предоставил клиент с логином и почтой, которые закрепились за id",
        image: "images/логин и почта автомат.jpg",
        question: "Совпадают?",
        options: [
            { text: "Да", next: "error_wrong_data" },
            { text: "Нет", next: "prepaid_manual_lk_search" }
        ]
    },
    prepaid_manual_lk_search: {
        description: "В разделе <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a> вводим данные ЛК, которые предоставил клиент",
        image: "images/найти пользователя пустой.jpg",
        question: "Личный кабинет найден?",
        options: [
            { text: "Да", next: "prepaid_manual_content_check" },
            { text: "Нет", next: "error_no_lk" }
        ]
    },
    prepaid_manual_content_check: {
        description: "Переходим в лк, нажав на номер абонента",
        image: "images/Найти пользователя не фреш.png",
        options: [
            { text: "Далее", next: "prepaid_manual_content_check_2" },
        ]
    },
    prepaid_manual_content_check_2: {
        description: "В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        image: "images/ищем рег номер не фреш.jpg",
        question: "Рег. номер из задачи найден в списке?",
        options: [
            { text: "Да", next: "manual_check_tariff_exists" },
            { text: "Нет", next: "error_wrong_data" }
        ]
    },
    manual_check_tariff_exists: {
        description: "Открываем вкладку 'Договоры' и ищем нужный тариф.",
        image: "images/договор в лк клиента.jpg",
        question: "Тариф присутствует в списке договоров?",
        options: [
            { text: "Да", next: "manual_change_owner_success" },
            { text: "Нет", next: "manager_check_node" }
        ]
    },
    manual_change_owner_success: {
        description: "Копируем код абонента из лк клиента, в котором правильный рег. номер",
        image: "images/код абонента.jpg", 
        options: [
            { text: "Далее", next: "manual_change_owner_success_1" },
        ]

    },
    manual_change_owner_success_1: {
        description: "1. Переходим к списку id, ставим галочку рядом с id.\nНа всякий случай копируем код, логин и почту предыдущего владельца\n2. Нажимаем 'Изменить владельца'.",
        image: "images/изменить владелца 1.jpg", 
        options: [
            { text: "Далее", next: "manual_change_owner_success_2" },
        ]
    },
    manual_change_owner_success_2: {
        description: "Указываем код абонента из личного кабинета, выбираем абонента и нажимаем 'Сменить владельца'.\nПомечаем себе эту информацию (например в задаче) 'был абонент (...), сменил на (...)'.",
        image: "images/изменить владельца 2.jpg", 
                options: [
            { text: "Далее", next: "prepaid_check_tariff_subscriber_3" },
        ]
        
    },

    prepaid_check_tariff_subscriber_3: {
        description: "Нажмите на новый номер абонента",
        image: "images/финал-нажимаем на абонента.jpg", 
        question: "",
        options: [
            { text: "Далее", next: "prepaid_check_tariff_subscriber_4" },
        ]
    },

    prepaid_check_tariff_subscriber_4: {
        description: "Во вкладке 'Тарифы, включающие 1С-ЭДО' будет отображаться подключенный тариф.\nАбонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        image: "images/финальное подтверждение.jpg", 
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]

    },

    success_end: {
        question: "",
        description: "Абонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },

    success_end_post: {
        image: "images/финал постоплата.jpg",
        question: "",
        description: "Для постоплатного тарифа достаточно, чтоб id просто отображался в ЛК. \nАбонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },


    error_other_lk: {
        description: "У клиента id существует, но привязан к другому лк (1С клиента, в которой он пользуется ЭДО, привязана к другому лк) \nНеобходимо запросить у клиента корректные данные \nПосле получения данных начать заново.",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },
    error_astral: {
        description: "Клиент не создал профиль ЭДО в 1С. \nПосле создания начать заново",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },
    error_taxcom: {
        question: "",
        description: "Либо у клиента нет профиля ЭДО, либо предоставлены неправильные данные лк. \nУточнить у клиента корректные данные \nПосле исправления проблемы, начать заново.\n*На ВР нет данных по Такскому, поэтому на 100% причину отсутствия id мы знать не можем",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    error_wrong_data: {
        question: "",
        description: "Клиент предоставил неправильные данные.\n1. Рег номер не существует. Необходимо предоставить другой, либо создать отдельный рег номер (1С:Клиент ЭДО). При этом, нужно перерегистрировать тариф на новый рег номер.\n2. Рег номер находится в другом лк. Уточнить данные этого лк, либо создать отдельный рег номер (1С:Клиент ЭДО)\nПосле получения новых данных, начать заново",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Создать Клиент ЭДО", next: "client_edo_1" },
            { text: "Начать заново ↻", next: "choice" }
        ]
        
    },

    error_no_lk: {
        question: "",
        image: "images/лк не существует.jpg", 
        description: "Лк, который предоставил клиент, не существует. \nНеобходимо запросить данные реального лк, либо создать отдельный рег номер (1С:Клиент ЭДО). \nПри этом, нужно перерегистрировать тариф на новый рег номер\nПосле получения новых данных, начать заново",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Создать Клиент ЭДО", next: "client_edo_1" },
            { text: "Начать заново ↻", next: "choice" }
        ]
    },

    client_edo_1: {
        description: "Для создания отдельного рег номера, необоходимо войти в лк клиента. Копируем его логин и почту",
        image: "images/логин и почта автомат.jpg", 
        options: [
            { text: "Далее", next: "client_edo_2" },
        ]
    },
    client_edo_2: {
        description: "1. Переходим в раздел <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a>.\n2. Вводим логин и почту из абонента ID.\n3. Переходим в лк, нажав на номер абонента.",
        image: "images/Найти пользователя не фреш.png", 
        options: [
            { text: "Далее", next: "client_edo_3" },
        ]
    },
    client_edo_3: {
        description: "Заходим во вкладку 'Регистрация' и напротив '1С:Клиент ЭДО', нажимаем 'Получить и зарегистрировать'",
        image: "images/Клиент ЭДО.jpg", 
        options: [
            { text: "Далее", next: "client_edo_4" },
        ]
    },
    client_edo_4: {
        description: "Вводим все обязательные поля, нажимаем 'Сохранить'. Присвоится регистрационный номер, на который можно зарегистрировать тариф. Если тариф уже зарегистрирован на другой рег.номер, то его необходимо отозвать.\n После регистрации тарифа начать заново",
        image: "images/Клиент ЭДО_2.jpg", 
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },




////////ФРЕШ НАЧАЛО//////////////////////////////////////////////////
    
    fr_start: {
        description: "Зайдите в <a href='https://portal.1c.ru/partner/application/list/1C-Edo/relations' target='_blank'>ЛК партнера</a>, введите ИНН организации и нажмите Найти",
        question: "Организация есть в списке?",
        image: "images/Вводим инн.jpg", 
        options: [
            { text: "Да", next: "fr_org_exists" },
            { text: "Нет", next: "fr_create_org" }
        ]
    },
    fr_create_org: {
        description: "Нажимаем 'Добавить организацию'",
        image: "images/добавить орг.jpg", 
        options: [
            { text: "Далее", next: "fr_create_org_2" },
        ]
    },
    fr_create_org_2: {
        description: "1. Вводим ИНН, нажимаем 'Заполнить'.\n2. Вводим дату начала тарифа\n3. Дату окончания периода сопровождения оставляем пустой.\n4. Нажимаем 'Сохранить'",
        question: "Идентификатор (ID) появился автоматически после создания?",
        image: "images/создание орг.jpg", 
        options: [
            { text: "Да", next: "fr_tariff_type_select" },
            { text: "Нет", next: "fr_click_add_ids" }
        ]
    },
    fr_org_exists: {
        description: "1. Прикрепляем договор/счет.\n2. Нажимаем на название организации.",
        question: "Внутри организации уже отображается ID?",
        image: "images/прикрепляем счет.jpg", 
        options: [
            { text: "Да", next: "fr_tariff_type_select" },
            { text: "Нет", next: "fr_click_add_ids" }
        ]
    },
    fr_click_add_ids: {
        description: "Нажимаем кнопку 'Добавить идентификаторы'.",
        question: "После нажатия кнопки ID подтянулся автоматически?",
        image: "images/добавить идентификаторы.jpg",
        options: [
            { text: "Да", next: "fr_confirm_id_row" }, 
            { text: "Нет", next: "fr_manual_input" }
        ]
    },
    fr_manual_input: {
        description: "Вводим логин и почту абонента. которые он предоставил и нажимаем 'Найти'\nВ случае с фрешем, логином обычно является 1c-fresh_эл.почта",
        question: "ID появился в списке после ручного ввода?",
        image: "images/найти id.jpg",
        options: [
            { text: "Да", next: "fr_confirm_id_row" },
            { text: "Нет", next: "fr_web_registrar_check" }
        ]
    },
    fr_confirm_id_row: {
        description: "Выбираем id и нажимаем кнопку 'Взять на сопровождение'",
        image: "images/взять на сопр без логина.jpg",
        options: [
            { text: "Далее", next: "fr_tariff_type_select" }
        ]
    },
    fr_web_registrar_check: {
        description: "Необходимо понять, есть ли у клиента id Астрал. Это можно посмотреть на Веб-регистраторе",
        question: "По ИНН/КПП найдены продукты 1С-ЭДО?",
        image: "images/вр.jpg",
        options: [
            { text: "Да", next: "fr_error_wrong_data_fresh" },
            { text: "Нет", next: "fr_identify_operator" }
        ]
    },
    fr_identify_operator: {
        description: "Вероятно клиент пользуется оператором Такском",
        question: "Какой оператор ЭДО у клиента?",
        options: [
            { text: "Астрал", next: "fr_error_astral" },
            { text: "Такском", next: "fr_error_taxcom" }
        ]
    },
    fr_tariff_type_select: {
        question: "Какой тип тарифа указан в вашей задаче?",
        options: [
            { text: "Предоплата", next: "fr_check_our_service" },
            { text: "Постоплата", next: "fr_success_post_end" }
        ]
    },
    fr_check_our_service: {
        question: "Клиент обслуживается у нас по Фрешу?",
        options: [
            { text: "Да", next: "fr_success_end_classic" },
            { text: "Нет", next: "fr_service_desk" }
        ]
    },
    fr_success_post_end: {
        description: "Для постоплатного тарифа достаточно, чтоб id просто отображался в ЛК. \nАбонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        image: "images/фреш постоплата.jpg",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },

    fr_success_end_classic: {
        description: "Нажмите на код абонента. он должен начинаться на FR",
        image: "images/фреш классик 1.jpg", 
        options: [
            { text: "Далее", next: "fr_success_end_classic_2" },
        ]
    },

    fr_success_end_classic_2: {
        description: "Во вкладке 'Тарифы, включающие 1С-ЭДО' будет отображаться подключенный тариф.\nОснование - Подписка Фреш ..., 1С через Интернет - 1cfresh.com\nАбонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        image: "images/фреш классик 2.jpg", 
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново", next: "choice" }
        ]

    },


////////ВОПРОС ПРО НОВУЮ СХЕМУ//////////////////////////////////////////////////

    fr_service_desk: {
        description: "1С упростили схему закрепления клиентов, у которых 1С:Фреш.\nСейчас Партнер 1С может регистрировать тарифы ЭДО тем пользователям 1С:Фреш, которые НЕ находятся у него на обслуживании (без рег.номера).\nОднако, если тариф уже зарегистрирован на какой то рег.номер, можно закрепить его по старой схеме",
        question: "По какой схеме закрепляем?",
        options: [
            { text: "По новой", next: "fr_check_fr_prefix" },
            { text: "По старой", next: "old_fr_check_fr_prefix" }
        ]
    },


////////ФРЕШ ПО НОВОЙ СХЕМЕ //////////////////////////////////////////////////

    fr_check_fr_prefix: {
        description: "Закрепление клиента в таком случаем проходит проще. Теперь для регистрации тарифа, необходимо отправить в тп письмо с данными клиента(обычно это делает менеджер) и этот тариф должен появиться в партнерском лк фреш во вкладке 'Подписки'",
        question: "Абонент начинается на FR?",
        image: "images/абонент фр.jpg", 
        options: [
            { text: "Да", next: "fr_success_end_classic_new" }, 
            { text: "Нет", next: "fr_search_fresh_user" } 
        ]
    },
    fr_success_end_classic_new: {
        description: "Нажмите на код абонента",
        image: "images/фреш классик 1.jpg", 
        options: [
            { text: "Далее", next: "fr_check_tariff_subscriber" },
        ]
    },
    fr_check_tariff_subscriber: {
        description: "Во вкладке 'Тарифы, включающие 1С-ЭДО' будет отображаться подключенный тариф.\nОснование - Подписка Фреш ..., 1С через Интернет - 1cfresh.com",
        image: "images/фреш классик 2.jpg", 
        question: "Тариф есть?",
        options: [
            { text: "Да", next: "fr_success_screenshot" },
            { text: "Нет", next: "fr_partner_lk_check" }
        ]
    },
    fr_success_screenshot: {
        description: "Абонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    fr_partner_lk_check: {
        description: "1. Необходимо убедиться, что тариф зарегистрирован.\n2. После успешной регистрации нужно зайти в партнерский лк Фреш и проверить, есть ли там этот тариф.\nТарифы подключенные по этой схеме, отображаются во вкледке 'Подписки на тарифы обслуживаемых абонентов'",
        image: "images/подписки эдо в лк фреш.jpg", 
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    fr_search_fresh_user: {
        description: "Переходим в <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a> и вводим логин и почту абонента id.\nЛогином обычно является: 1c-fresh_эл.почта",
        image: "images/найти пользователя фреш сд.jpg", 
        question: "Абонент найден?",
        options: [
            { text: "Да", next: "fr_manual_change_owner_success_1" },
            { text: "Нет", next: "fr_error_wrong_login" }
        ]
    },
    fr_manual_change_owner_success_1: {
        description: "1. Переходим к списку id, ставим галочку рядом с id.\nНа всякий случай копируем код, логин и почту предыдущего владельца\n2. Нажимаем 'Изменить владельца'.",
        image: "images/изменить владелца 1.jpg", 
        options: [
            { text: "Далее", next: "fr_manual_change_owner_success_2" },
        ]
    },
    fr_manual_change_owner_success_2: {
        description: "Указываем код абонента из личного кабинета, который начинается на FR выбираем абонента и нажимаем 'Сменить владельца'.\nПомечаем себе эту информацию (например в задаче) 'был абонент (...), сменил на (...)'.",
        image: "images/смена фладельца фреш на фр.jpg", 
                options: [
            { text: "Далее", next: "fr_prepaid_check_tariff_subscriber_3" },
        ]
        
    },

    fr_prepaid_check_tariff_subscriber_3: {
        description: "Нажмите на новый номер абонента",
        image: "images/фреш классик 1.jpg", 
        question: "",
        options: [
            { text: "Далее", next: "fr_prepaid_check_tariff_subscriber_4" },
        ]
    },
    fr_prepaid_check_tariff_subscriber_4: {
        description: "Во вкладке 'Тарифы, включающие 1С-ЭДО' будет отображаться подключенный тариф.\nОснование - Подписка Фреш ..., 1С через Интернет - 1cfresh.com\nАбонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        image: "images/фреш классик 2.jpg", 
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново", next: "choice" }
        ]

    },
    fr_error_wrong_login: {
        description: "Необходимо уточнить у клиента реальные Логин и почту и начать заново.",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    fr_success_end: {
        description: "Абонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    fr_atypical_situation: {
        description: "Нестандартная ситуация, необходимо проверять, правильно ли зарегистрирован тариф",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },
    fr_error_wrong_data_fresh: {
        description: "Значит у клиента id существует, но данные неправильные. \nКлиенту необходимо прислать почту, которая у него указана в  1С:Фреш. \nНеобходимо запросить у клиента корректные данные. \nПосле предоставления корректных данных начать заново",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },
    fr_error_astral: {
        description: "Клиент не создал профиль ЭДО в 1С. \nПосле создания начать заново",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },
    fr_error_taxcom: {
        description: "Либо у клиента нет профиля ЭДО, либо предоставлены неправильные данные. \nКлиенту необходимо прислать почту, которая у него указана в  1С:Фреш \nУточнить у клиента корректные данные \nПосле исправления проблемы, начать заново.\n*На ВР нет данных по Такскому, поэтому на 100% причину отсутствия id мы знать не можем",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },

    ////////ФРЕШ ПО СТАРОЙ СХЕМЕ С КЛИЕНТ ЭДО//////////////////////////////////////////////////

    old_fr_check_fr_prefix: {
        question: "Абонент начинается на FR?",
        image: "images/абонент фр.jpg", 
        options: [
            { text: "Да", next: "old_fr_reg_number" },
            { text: "Нет", next: "old_fr_cl_search_user_cl" }
        ]
    },
    old_fr_reg_number: {
        description: "Тариф может уже быть зарегистрирован на какой-то рег.номер. Например, если это продление предыдущего тарифа",
        question: "Тариф уже зарегистрирован на рег.номер?",
        options: [
            { text: "Да", next: "old_fr_prepaid_manual_lk_search" },
            { text: "Нет", next: "old_fr_search_user_cl" }
        ]
    },
    old_fr_prepaid_manual_lk_search: {
        description: "В разделе <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a> вводим данные ЛК, которые предоставил клиент",
        image: "images/найти пользователя пустой.jpg",
        question: "Личный кабинет найден?",
        options: [
            { text: "Да", next: "old_fr_prepaid_manual_content_check" },
            { text: "Нет", next: "error_no_lk" }
        ]
    },
    old_fr_prepaid_manual_content_check: {
        description: "Переходим в лк, нажав на номер абонента",
        image: "images/Найти пользователя не фреш.png",
        options: [
            { text: "Далее", next: "old_fr_prepaid_manual_content_check_2" },
        ]
    },
    old_fr_prepaid_manual_content_check_2: {
        description: "В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        image: "images/ищем рег номер не фреш.jpg",
        question: "Рег. номер из задачи найден в списке?",
        options: [
            { text: "Да", next: "old_fr_manual_check_tariff_exists" },
            { text: "Нет", next: "error_wrong_data" }
        ]
    },
    old_fr_manual_check_tariff_exists: {
        description: "Открываем вкладку 'Договоры' и ищем нужный тариф.",
        image: "images/договор в лк клиента.jpg",
        question: "Тариф присутствует в списке договоров?",
        options: [
            { text: "Да", next: "manual_change_owner_success" },
            { text: "Нет", next: "manager_check_node" }
        ]
    },
    old_fr_cl_search_user_cl: {
        description: "1. Переходим в раздел <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a> и вводим логин и почту абонента\n2. Нажимаем на код абонента",
        image: "images/Найти пользователя не фреш.png",
        options: [
            { text: "Далее", next: "old_fr_cl_search_user_cl_2" },
        ]
    },
    old_fr_cl_search_user_cl_2: {
        description: "В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        question: "В личном кабинете есть рег. номера?",
        image: "images/ищем рег номер не фреш.jpg",
        options: [
            { text: "Да", next: "old_fr_cl_manager_reg_priority_cl" },
            { text: "Нет", next: "old_fr_cl_client_edo" }
        ]
    },
    old_fr_cl_manager_reg_priority_cl: {
        description: "1. На подходящий рег.номер необходимо зарегистрировать тариф. В приоритете 1С:Клиент ЭДО. \n2. После регистрации, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        image: "images/договор в лк клиента.jpg",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "old_fr_cl_prepaid_check_tariff_subscriber_3" },
            { text: "Нет", next: "old_fr_cl_client_edo" }
        ]
    },
    old_fr_cl_prepaid_check_tariff_subscriber_3: {
        description: "Нажмите на номер абонента",
        image: "images/финал-нажимаем на абонента.jpg", 
        question: "",
        options: [
            { text: "Далее", next: "prepaid_check_tariff_subscriber_4" },
        ]
    },
    old_fr_cl_client_edo: {
        description: "Заходим во вкладку 'Регистрация' и напротив '1С:Клиент ЭДО', нажимаем 'Получить и зарегистрировать'",
        image: "images/Клиент ЭДО.jpg", 
        options: [
            { text: "Далее", next: "old_fr_cl_client_edo_2" },
        ]
    },
    old_fr_cl_client_edo_2: {
        description: "Вводим все обязательные поля, нажимаем 'Сохранить'. Присвоится регистрационный номер, на который можно зарегистрировать тариф.\nПосле регистрации тарифа, необходимо проверить, появился ли он",
        image: "images/Клиент ЭДО_2.jpg", 
        options: [
            { text: "Проверить", next: "old_fr_cl_prepaid_check_tariff_subscriber_3" }
        ]
    },

    old_fr_manager_reg_priority: {
        description: "1. Передаем один из подходящих рег номеров менеджеру. В приоритете 1С:Клиент ЭДО. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "old_fr_success_end" },
            { text: "Нет", next: "old_fr_atypical_situation" }
        ]
    },
    old_fr_create_client_edo_manager: {
        description: "1. В пункте 'Регистрация' создать продукт 1С:Клиент ЭДО и передать менеджеру рег номер. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "old_fr_success_end" },
            { text: "Нет", next: "old_fr_atypical_situation" }
        ]
    },
    
    old_fr_search_user_cl: {
        description: "1. Переходим в раздел <a href='https://portal.1c.ru/partner/find-user' target='_blank'>Найти пользователя</a> и вводим логин и почту абонента\n2. Переходим в лк, абонент которого начинается на CL.",
        image: "images/найти пользователя фреш.jpg",
        options: [
            { text: "Далее", next: "old_fr_search_user_cl_2" },
        ]
    },
    old_fr_search_user_cl_2: {
        description: "В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        question: "В личном кабинете есть рег. номера?",
        image: "images/ищем рег номер не фреш.jpg",
        options: [
            { text: "Да", next: "old_fr_manager_reg_priority_cl" },
            { text: "Нет", next: "old_fr_client_edo" }
        ]
    },
    old_fr_manager_reg_priority_cl: {
        description: "1. На подходящий рег.номер необходимо зарегистрировать тариф. В приоритете 1С:Клиент ЭДО. \n2. После регистрации, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        image: "images/договор в лк клиента.jpg",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "old_fr_change_owner_process" },
            { text: "Нет", next: "old_fr_client_edo" }
        ]
    },
    old_fr_client_edo: {
        description: "Заходим во вкладку 'Регистрация' и напротив '1С:Клиент ЭДО', нажимаем 'Получить и зарегистрировать'",
        image: "images/Клиент ЭДО.jpg", 
        options: [
            { text: "Далее", next: "old_fr_client_edo_2" },
        ]
    },
    old_fr_client_edo_2: {
        description: "Вводим все обязательные поля, нажимаем 'Сохранить'. Присвоится регистрационный номер, на который можно зарегистрировать тариф.\nПосле регистрации тарифа, необходимо сменить абонента на CL",
        image: "images/Клиент ЭДО_2.jpg", 
        options: [
            { text: "Сменить владельца", next: "old_fr_change_owner_process" }
        ]
    },

    old_fr_change_owner_process: {
        description: "Копируем код абонента из лк клиента, в котором правильный рег. номер",
        image: "images/код абонента.jpg", 
        options: [
            { text: "Далее", next: "old_manual_change_owner_success_1_1" },
        ]

    },
    old_manual_change_owner_success_1_1: {
        description: "1. Переходим к списку id, ставим галочку рядом с id.\nНа всякий случай копируем код, логин и почту предыдущего владельца\n2. Нажимаем 'Изменить владельца'.",
        image: "images/изменить владелца фреш.jpg", 
        options: [
            { text: "Далее", next: "manual_change_owner_success_2" },
        ]
    },
    old_fr_success_end: {
        description: "Абонент успешно закреплен!\nНе забудьте прикрепить счет/договор",
        isFinal: true,
        type: 'success',
        options: [
            { text: "Начать заново ↻", next: "choice" }
        ]
    },
    old_fr_atypical_situation: {
        description: "Нестандартная ситуация, необходимо проверять, правильно ли зарегистрирован тариф",
        isFinal: true,
        type: 'error',
        options: [
            { text: "Начать заново", next: "choice" }
        ]
    },

};


// ДВИЖОК
// ВРЕМЕННО: Пытаемся загрузить сохраненный шаг из памяти браузера
let history = JSON.parse(localStorage.getItem('dev_history')) || [];
let currentStepId = localStorage.getItem('dev_step') || 'choice'; 

// ВРЕМЕННО: Функция для сохранения текущего состояния
function saveState() {
    localStorage.setItem('dev_step', currentStepId);
    localStorage.setItem('dev_history', JSON.stringify(history));
}

function render() {
    const step = steps[currentStepId];
    if (!step) { console.error("Шаг не найден:", currentStepId); return; }

    const descEl = document.getElementById('step-description');
    const questionEl = document.getElementById('step-question');
    const optionsGrid = document.getElementById('options-grid');
    const imageEl = document.getElementById('step-image');

    descEl.className = 'description-text'; 
    optionsGrid.innerHTML = "";

    // 1. Инструкция / Описание
    if (step.description) {
        descEl.innerHTML = step.description; // innerHTML для поддержки ссылок
        if (step.type === 'success') descEl.classList.add('success-text');
        if (step.type === 'error') descEl.classList.add('error-text');
    } else {
        descEl.innerHTML = "";
    }

    // 2. Вопрос
    questionEl.innerText = step.question || "";

    // 3. Скриншот (Правая панель)
    if (step.image) {
        imageEl.src = step.image;
        imageEl.style.display = 'block';
    } else {
        imageEl.src = '';
        imageEl.style.display = 'none';
    }

    // 4. Кнопки
    if (step.options) {
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => {
                history.push(currentStepId);
                currentStepId = opt.next;
                saveState(); // Сохраняем шаг при клике
                render();
            };
            optionsGrid.appendChild(btn);
        });
    }

    document.getElementById('btn-back').style.visibility = history.length > 0 ? 'visible' : 'hidden';
}

// Кнопки навигации
document.getElementById('btn-back').onclick = () => {
    if (history.length > 0) {
        currentStepId = history.pop();
        saveState(); // Сохраняем шаг при возврате
        render();
    }
};

document.getElementById('btn-restart').onclick = () => {
    history = [];
    currentStepId = 'choice';
    saveState(); // Обнуляем память
    render();
};

// --- ВРЕМЕННО: Логика сохранения черновика ---
const draftInput = document.getElementById('draft-input');

// При загрузке страницы вставляем сохраненный текст
draftInput.value = localStorage.getItem('dev_draft') || '';

// Сохраняем текст каждый раз, когда вы что-то печатаете
draftInput.addEventListener('input', (e) => {
    localStorage.setItem('dev_draft', e.target.value);
});

// Очистка черновика с удалением из памяти
document.getElementById('btn-draft-clear').onclick = () => {
    draftInput.value = '';
    localStorage.removeItem('dev_draft');
};

// Инициализация первого экрана
render();
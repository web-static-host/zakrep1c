const steps = {
    // САМЫЙ ПЕРВЫЙ ШАГ ВЫБОРА
    choice: {
        question: "У клиента Фреш?",
        options: [
            { text: "Да", next: "fr_start" },
            { text: "Нет", next: "start" }
        ]
    },

    // --- СТАНДАРТНЫЙ АЛГОРИТМ ---
    start: {
        question: "Вводим ИНН. Организация есть в списке?",
        options: [
            { text: "Да", next: "org_exists" },
            { text: "Нет", next: "create_org" }
        ]
    },

        create_org: {
        description: "1. Добавляем организацию.\n2. Дату окончания периода сопровождения оставляем пустой.\n3. Прикрепляем договор/счет.",
        question: "Идентификатор (ID) появился автоматически после создания?",
        options: [
            { text: "Да", next: "tariff_type_select" },
            { text: "Нет", next: "click_add_ids" }
        ]
    },
    org_exists: {
        description: "1. Прикрепляем договор/счет.\n2. Нажимаем на название организации.",
        question: "Внутри организации уже отображается ID?",
        options: [
            { text: "Да", next: "tariff_type_select" },
            { text: "Нет", next: "click_add_ids" }
        ]
    },
    click_add_ids: {
        description: "Нажимаем кнопку 'Добавить идентификаторы'.",
        question: "После нажатия кнопки ID подтянулся автоматически?",
        options: [
            { text: "Да", next: "confirm_id_row" }, 
            { text: "Нет", next: "manual_input" }
        ]
    },
    manual_input: {
        description: "Вводим логин и почту абонента вручную (данные из задачи).",
        question: "ID появился в списке после ручного ввода?",
        options: [
            { text: "Да", next: "confirm_id_row" },
            { text: "Нет", next: "web_registrar_check" }
        ]
    },
    confirm_id_row: {
        description: "Выбираем id и нажимаем кнопку 'Взять на сопровождение'",
        question: "",
        options: [
            { text: "Далее", next: "tariff_type_select" }
        ]
    },
    web_registrar_check: {
        question: "Заходим на Веб-регистратор. По ИНН/КПП найдены продукты 1С-ЭДО?",
        options: [
            { text: "Да", next: "error_other_lk" },
            { text: "Нет", next: "identify_operator" }
        ]
    },
    identify_operator: {
        question: "Какой оператор ЭДО указан у клиента?",
        options: [
            { text: "Астрал", next: "error_astral" },
            { text: "Такском", next: "error_taxcom" }
        ]
    },
    tariff_type_select: {
        question: "Какой тип тарифа указан в вашей задаче?",
        options: [
            { text: "Предоплата", next: "prepaid_start" },
            { text: "Постоплата", next: "success_end" }
        ]
    },

    prepaid_start: {
        description: "1. Переходим в раздел 'Найти пользователя'.\n2. Вводим логин и почту из абонента ID.\n3. Переходим в лк, нажав на номер абонента.\n4. В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        question: "Регистрационный номер из задачи найден в этом Личном Кабинете?",
        options: [
            { text: "Да", next: "prepaid_check_contract" },
            { text: "Нет", next: "prepaid_check_data_match" }
        ]
    },
    prepaid_check_contract: {
        description: "Открываем вкладку 'Договоры' и ищем нужный тариф.",
        question: "Тариф присутствует в списке договоров?",
        options: [
            { text: "Да", next: "success_end" },
            { text: "Нет", next: "manager_check_node" }
        ]
    },
    manager_check_node: {
        description: "Уточнить у менеджера, успешно ли зарегистрирован тариф на этот рег номер.",
        question: "Тариф зарегистрирован?",
        options: [
            { text: "Нет", next: "need_to_register" },
            { text: "Да", next: "atypical_situation" }
        ]
    },
    need_to_register: {
        description: "Необходимо зарегистрировать тариф. После регистрации начать заново",
        question: "Начать заново?",
        options: [
            { text: "В начало ↻", next: "choice" }
        ]
    },
    atypical_situation: {
        description: "Нестандартная ситуация, необходимо написать в тп портала 1С webits-info@1c.ru",
        question: "",
        isFinal: true,
        type: 'error'
    },

    prepaid_check_data_match: {
        question: "Логин и почта из задачи СОВПАДАЮТ с логином и почтой, которые появились автоматически?",
        options: [
            { text: "Да", next: "error_wrong_data" },
            { text: "Нет", next: "prepaid_manual_lk_search" }
        ]
    },
    prepaid_manual_lk_search: {
        description: "В разделе 'Найти пользователя' вводим данные ЛК, который указан в задаче",
        question: "Личный кабинет найден?",
        options: [
            { text: "Да", next: "prepaid_manual_content_check" },
            { text: "Нет", next: "error_no_lk" }
        ]
    },
    prepaid_manual_content_check: {
        description: "1. Переходим в лк, нажав на номер абонента.\n2. В разделах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' ищем рег. номер.",
        question: "Рег. номер из задачи найден в списке?",
        options: [
            { text: "Да", next: "manual_check_tariff_exists" },
            { text: "Нет", next: "error_wrong_data" }
        ]
    },
    manual_check_tariff_exists: {
        description: "Открываем вкладку 'Договоры' и ищем нужный тариф.",
        question: "Тариф присутствует в списке договоров?",
        options: [
            { text: "Да", next: "manual_change_owner_success" },
            { text: "Нет", next: "manager_check_node" }
        ]
    },
    manual_change_owner_success: {
        description: "Переходим к списку id, ставим галочку рядом с id и нажимаем 'Изменить владельца'. Указываем код абонента из личного кабинета и нажимаем 'Сменить владельца'.\n\nВ задаче пишем 'был абонент (...), сменил на (...)'",
        question: "Абонент успешно закреплен!",
        isFinal: true,
        type: 'success'
    },

    success_end: {
        question: "",
        description: "Абонент успешно закреплен!",
        isFinal: true,
        type: 'success'
    },
    error_other_lk: {
        question: "",
        description: "У клиента id существует, но привязан к другому лк (1С клиента, в которой он пользуется ЭДО, привязана к другому лк) \nСообщить менеджеру. \nПосле предоставления корректных данных начать заново.",
        isFinal: true,
        type: 'error'
    },
    error_astral: {
        question: "",
        description: "Клиент не создал профиль ЭДО. \nСообщить менеджеру.",
        isFinal: true,
        type: 'error'
    },
    error_taxcom: {
        question: "",
        description: "Либо у клиента нет профиля ЭДО, либо предоставлены неправильные данные лк. \nСообщить менеджеру. \nПосле исправления проблемы, начать заново.\n*На ВР нет данных по Такскому, поэтому на 100% причину отсутствия id мы знать не можем",
        isFinal: true,
        type: 'error'
    },
    error_wrong_data: {
        question: "",
        description: "Клиент предоставил неправильные данные.\n1. Рег номер не существует. Необходимо предоставить другой, либо создать отдельный рег номер (1С:Клиент ЭДО). При этом, нужно перерегистрировать тариф на новый рег номер.\n2. Рег номер находится в другом лк. Уточнить данные этого лк, либо создать отдельный рег номер (1С:Клиент ЭДО)\nПосле получения новых данных, начать заново",
        isFinal: true,
        type: 'error'
    },
    error_no_lk: {
        question: "",
        description: "Лк, который предоставил клиент, не существует. \nНеобходимо запросить данные реального лк, либо создать отдельный рег номер (1С:Клиент ЭДО). \nПри этом, нужно перерегистрировать тариф на новый рег номер\nПосле получения новых данных, начать заново",
        isFinal: true,
        type: 'error'
    },


    // --- АЛГОРИТМ ФРЕШ --- //////////////////////////////////////////////////////////////////////////////
    fr_start: {
        question: "Вводим ИНН. Организация есть в списке?",
        options: [
            { text: "Да", next: "fr_org_exists" },
            { text: "Нет", next: "fr_create_org" }
        ]
    },
        fr_create_org: {
        description: "1. Добавляем организацию.\n2. Дату окончания периода сопровождения оставляем пустой.\n3. Прикрепляем договор/счет.",
        question: "Идентификатор (ID) появился автоматически после создания?",
        options: [
            { text: "Да", next: "fr_tariff_type_select" },
            { text: "Нет", next: "fr_click_add_ids" }
        ]
    },
    fr_org_exists: {
        description: "1. Прикрепляем договор/счет.\n2. Нажимаем на название организации.",
        question: "Внутри организации уже отображается ID?",
        options: [
            { text: "Да", next: "fr_tariff_type_select" },
            { text: "Нет", next: "fr_click_add_ids" }
        ]
    },
    fr_click_add_ids: {
        description: "Нажимаем кнопку 'Добавить идентификаторы'.",
        question: "После нажатия кнопки ID подтянулся автоматически?",
        options: [
            { text: "Да", next: "fr_confirm_id_row" }, 
            { text: "Нет", next: "fr_manual_input" }
        ]
    },
    fr_manual_input: {
        description: "Вводим логин и почту из задачи.\nВ случае с фрешем, логином является 1c-fresh_эл.почта",
        question: "ID появился в списке после ручного ввода?",
        options: [
            { text: "Да", next: "fr_confirm_id_row" },
            { text: "Нет", next: "fr_web_registrar_check" }
        ]
    },
    fr_confirm_id_row: {
        description: "Выбираем id и нажимаем кнопку 'Добавить идентификатор'",
        question: "",
        options: [
            { text: "Далее", next: "fr_tariff_type_select" }
        ]
    },
    fr_web_registrar_check: {
        question: "Заходим на Веб-регистратор. По ИНН/КПП найдены продукты 1С-ЭДО?",
        options: [
            { text: "Да", next: "fr_error_wrong_data_fresh" },
            { text: "Нет", next: "fr_identify_operator" }
        ]
    },
    fr_identify_operator: {
        question: "Какой оператор ЭДО указан у клиента?",
        options: [
            { text: "Астрал", next: "fr_error_astral" },
            { text: "Такском", next: "fr_error_taxcom" }
        ]
    },
    fr_tariff_type_select: {
        question: "Какой тип тарифа указан в вашей задаче?",
        options: [
            { text: "Предоплата", next: "fr_check_our_service" },
            { text: "Постоплата", next: "fr_success_end" }
        ]
    },
    fr_check_our_service: {
        question: "Клиент обслуживается у нас по Фрешу?",
        options: [
            { text: "Да", next: "fr_success_end" },
            { text: "Нет", next: "fr_check_fr_prefix" }
        ]
    },
    fr_check_fr_prefix: {
        question: "Абонент начинается на FR?",
        options: [
            { text: "Да", next: "fr_search_user_cl" },
            { text: "Нет", next: "fr_prepaid_start" }
        ]
    },
    fr_prepaid_start: {
        description: "1. Переходим в раздел 'Найти пользователя'.\n2. Вводим логин и почту абонента ID.\n3. Переходим в лк, нажав на номер абонента. если их несколько, то смотрим, какой указан в id",
        question: "В пунктах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' есть рег. номера?",
        options: [
            { text: "Да", next: "fr_manager_reg_priority" },
            { text: "Нет", next: "fr_create_client_edo_manager" }
        ]
    },
    fr_manager_reg_priority: {
        description: "1. Передаем один из подходящих рег номеров менеджеру. В приоритете 1С:Клиент ЭДО. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "fr_success_end" },
            { text: "Нет", next: "fr_atypical_situation" }
        ]
    },
    fr_create_client_edo_manager: {
        description: "1. В пункте 'Регистрация' создать продукт 1С:Клиент ЭДО и передать менеджеру рег номер. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "fr_success_end" },
            { text: "Нет", next: "fr_atypical_situation" }
        ]
    },
    fr_search_user_cl: {
        description: "1. Переходим в Найти пользователя и вводим логин и почту абонента id\n2. Переходим в лк, абонент которого начинается на CL.",
        question: "В пунктах 'Регистрация' и '1С:Готовое рабочее место и 1С:Аренда' есть какой-либо рег. номер?",
        options: [
            { text: "Да", next: "fr_manager_reg_priority_cl" },
            { text: "Нет", next: "fr_create_client_edo_cl" }
        ]
    },
    fr_manager_reg_priority_cl: {
        description: "1. Передаем один из подходящих рег номеров менеджеру. В приоритете 1С:Клиент ЭДО. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "fr_change_owner_process" },
            { text: "Нет", next: "fr_atypical_situation" }
        ]
    },
    fr_create_client_edo_cl: {
        description: "1. В пункте 'Регистрация' создать продукт 1С:Клиент ЭДО и передать менеджеру рег номер. \n2. После того, как менеджер зарегистрирует тариф, через некоторое время проверяем тариф во вкладке Договоры. Обычно он появляется в течение часа",
        question: "Тариф появился?",
        options: [
            { text: "Да", next: "fr_change_owner_process" },
            { text: "Нет", next: "fr_atypical_situation" }
        ]
    },
    fr_change_owner_process: {
        description: "1. Переходим к списку id, ставим галочку рядом с id и нажимаем 'Изменить владельца'. \n2. Указываем код абонента из личного кабинета и нажимаем 'Сменить владельца'. \n3. В задаче пишем 'был абонент (...), сменил на (...)'",
        question: "Абонент успешно закреплен!",
        isFinal: true,
        type: 'success'
    },
    fr_success_end: {
        description: "Абонент успешно закреплен!",
        isFinal: true,
        type: 'success'
    },
    fr_atypical_situation: {
        description: "Нестандартная ситуация, необходимо проверять, правильно ли зарегистрирован тариф",
        isFinal: true,
        type: 'error'
    },
    fr_error_wrong_data_fresh: {
        description: "Значит у клиента id существует, но данные неправильные. \nКлиенту необходимо прислать почту, которая у него указана в  1С:Фреш. \nСообщить менеджеру. \nПосле предоставления корректных данных начать заново",
        isFinal: true,
        type: 'error'
    },
    fr_error_astral: {
        description: "Клиент не создал профиль ЭДО. \nСообщить менеджеру. \nПосле создания начать заново",
        isFinal: true,
        type: 'error'
    },
    fr_error_taxcom: {
        description: "Либо у клиента нет профиля ЭДО, либо предоставлены неправильные данные. \nКлиенту необходимо прислать почту, которая у него указана в  1С:Фреш \nСообщить менеджеру. \nПосле исправления проблемы, начать заново.\n*На ВР нет данных по Такскому, поэтому на 100% причину отсутствия id мы знать не можем",
        isFinal: true,
        type: 'error'
    }
    
};

// ДВИЖОК
let history = [];
let currentStepId = 'choice'; 

function render() {
    const wizard = document.getElementById('step-content');
    const optionsGrid = document.getElementById('options');
    const step = steps[currentStepId];

    if (!step) {
        console.error("Шаг не найден:", currentStepId);
        return;
    }

    wizard.innerHTML = "";
    optionsGrid.innerHTML = "";

    // 1. Описание
    if (step.description) {
        const descEl = document.createElement('div');
        descEl.className = "description-text";
        descEl.style.whiteSpace = "pre-wrap"; 
        descEl.innerText = step.description;
        if (step.type === 'success') descEl.classList.add('final-step');
        if (step.type === 'error') descEl.classList.add('error-step');
        wizard.appendChild(descEl);
    }

    // 2. Вопрос
    const questionEl = document.createElement('h2');
    questionEl.id = "question";
    questionEl.innerText = step.question || "";
    wizard.appendChild(questionEl);

    // 3. Кнопки
    if (step.options) {
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => {
                history.push(currentStepId);
                currentStepId = opt.next;
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
        render();
    }
};

document.getElementById('btn-restart').onclick = () => {
    history = [];
    currentStepId = 'choice'; // Сброс на выбор алгоритма
    render();
};



render();
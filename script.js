const steps = {
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
            { text: "В начало ↻", next: "start" }
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
    }
};

let history = [];
let currentStepId = 'start';

function render() {
    const wizard = document.getElementById('step-content');
    const optionsGrid = document.getElementById('options');
    const step = steps[currentStepId];

    wizard.innerHTML = "";
    optionsGrid.innerHTML = "";

    if (step.description) {
        const descEl = document.createElement('div');
        descEl.className = "description-text";
        descEl.innerText = step.description;
        if (step.type === 'success') descEl.classList.add('final-step');
        if (step.type === 'error') descEl.classList.add('error-step');
        wizard.appendChild(descEl);
    }

    const questionEl = document.createElement('h2');
    questionEl.innerText = step.question;
    wizard.appendChild(questionEl);

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

document.getElementById('btn-back').onclick = () => {
    if (history.length > 0) {
        currentStepId = history.pop();
        render();
    }
};

document.getElementById('btn-restart').onclick = () => {
    history = [];
    currentStepId = 'start';
    render();
};

render();


        const draftOpenBtn = document.getElementById('btn-draft-open');
        const draftPanel = document.getElementById('draft-panel');
        const draftCloseBtn = document.getElementById('btn-draft-close');
        const draftClearBtn = document.getElementById('btn-draft-clear');
        const draftInput = document.getElementById('draft-input');

        draftOpenBtn.onclick = () => {
            draftPanel.classList.remove('hidden');
            draftOpenBtn.classList.add('hidden');
        };

        draftCloseBtn.onclick = () => {
            draftPanel.classList.add('hidden');
            draftOpenBtn.classList.remove('hidden');
        };

        draftClearBtn.onclick = () => {
            draftInput.value = '';
        };

        draftInput.onfocus = function() {
            this.setAttribute('data-placeholder', this.placeholder);
            this.placeholder = '';
        };
        draftInput.onblur = function() {
            this.placeholder = this.getAttribute('data-placeholder');
        };
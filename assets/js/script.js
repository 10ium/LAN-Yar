// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // ۰. متغیرهای سراسری و عناصر DOM اصلی
    // =======================================================
    let currentLanIp = ''; // متغیری برای نگهداری IP LAN وارد شده توسط کاربر

    const mainContentWrapper = document.getElementById('mainContentWrapper');
    const footer = document.querySelector('footer');
    const lanIpInput = document.getElementById('lanIpInput');
    const validateLanIpBtn = document.getElementById('validateLanIpBtn');

    // =======================================================
    // ۱. توابع اعتبارسنجی IP و پورت
    // =======================================================
    function isValidIP(ip) {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    }

    function isValidPort(port) {
        const portNum = Number(port);
        return !isNaN(portNum) && Number.isInteger(portNum) && portNum >= 1 && portNum <= 65535;
    }

    // =======================================================
    // ۲. مدیریت فعال/غیرفعال کردن محتوای سایت بر اساس IP LAN
    // =======================================================
    function toggleContentEnabled(enable) {
        if (enable) {
            mainContentWrapper.classList.remove('disabled-content');
            mainContentWrapper.classList.add('active'); // اضافه کردن کلاس active برای ترنزیشن
            footer.classList.remove('disabled-content');
            footer.classList.add('active'); // اضافه کردن کلاس active برای ترنزیشن
        } else {
            mainContentWrapper.classList.add('disabled-content');
            mainContentWrapper.classList.remove('active');
            footer.classList.add('disabled-content');
            footer.classList.remove('active');
        }
    }

    // ایونت لیسنر برای دکمه "تأیید و ادامه" IP LAN
    validateLanIpBtn.addEventListener('click', () => {
        const ip = lanIpInput.value.trim();
        if (isValidIP(ip)) {
            currentLanIp = ip;
            localStorage.setItem('lanIp', ip); // ذخیره IP LAN در localStorage
            toggleContentEnabled(true);
            alert(`آدرس IP LAN شما (${ip}) با موفقیت تأیید شد. حالا می‌توانید ادامه دهید.`);
            // پس از تأیید IP، پروکسی‌ها و قوانین را مجددا رندر می‌کنیم تا IP جدید اعمال شود.
            renderPredefinedProxies();
            renderCustomProxies();
            renderRulesAndProviders();
        } else {
            currentLanIp = ''; // پاک کردن IP نامعتبر
            localStorage.removeItem('lanIp');
            toggleContentEnabled(false);
            alert('لطفاً یک آدرس IP معتبر LAN وارد کنید تا ادامه دهید.');
            lanIpInput.focus();
        }
    });

    // ایونت لیسنر برای هر بار تغییر در فیلد IP LAN (تایپ کردن)
    lanIpInput.addEventListener('input', () => {
        // هر بار که کاربر چیزی تایپ می‌کند، محتوای اصلی را غیرفعال می‌کنیم
        // تا کاربر مجبور شود IP را تأیید کند.
        toggleContentEnabled(false);
    });

    // =======================================================
    // ۳. مدیریت تم (حالت شب و روز)
    // =======================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            updateThemeToggleButton(savedTheme === 'dark-mode');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            updateThemeToggleButton(true);
        } else {
            body.classList.add('light-mode');
            updateThemeToggleButton(false);
        }
    }

    function updateThemeToggleButton(isDarkMode) {
        themeToggleBtn.innerHTML = `<i class="fas fa-${isDarkMode ? 'sun' : 'moon'}"></i> <span class="sr-only">تغییر تم</span>`;
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeToggleButton(true);
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeToggleButton(false);
        }
    });

    // =======================================================
    // ۴. مدیریت انتخاب تمپلت کانفیگ (بخش مربوطه حذف شد)
    // =======================================================
    // متغیرها و منطق مربوط به انتخاب تمپلت کاستوم از اینجا حذف شده‌اند.
    // templateRadioها و customTemplateUrlInput دیگر وجود ندارند.

    // =======================================================
    // ۵. مدیریت پروکسی‌های پیش‌فرض
    // =======================================================
    const predefinedProxiesList = document.getElementById('predefinedProxiesList');
    const selectAllPredefinedProxiesBtn = document.getElementById('selectAllPredefinedProxies');
    const deselectAllPredefinedProxiesBtn = document.getElementById('deselectAllPredefinedProxies');

    function renderPredefinedProxies() {
        predefinedProxiesList.innerHTML = '';
        if (!currentLanIp) {
            predefinedProxiesList.innerHTML = `<p class="info-message">لطفاً ابتدا آدرس IP دستگاه VPN (LAN) را در بخش ۱ وارد کنید.</p>`;
            return;
        }

        predefinedProxies.forEach(proxy => {
            const proxyCard = document.createElement('div');
            proxyCard.className = 'proxy-card';
            proxyCard.innerHTML = `
                <input type="checkbox" id="${proxy.id}" 
                       data-ip="${currentLanIp}" 
                       data-port="${proxy.port}" 
                       data-name="${proxy.name}" 
                       data-type="${proxy.type}" 
                       data-udp="${proxy.udp}" 
                       checked>
                <label for="${proxy.id}">
                    <h4>${proxy.name}</h4>
                    <p>IP: <code>${currentLanIp}</code> | پورت: <code>${proxy.port}</code></p>
                    ${proxy.description ? `<p class="description">${proxy.description}</p>` : ''}
                </label>
            `;
            predefinedProxiesList.appendChild(proxyCard);
        });
    }

    selectAllPredefinedProxiesBtn.addEventListener('click', () => {
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    deselectAllPredefinedProxiesBtn.addEventListener('click', () => {
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    });


    // =======================================================
    // ۶. مدیریت پروکسی‌های کاستوم کاربر (ذخیره در localStorage کاربر)
    // =======================================================
    const customPortInput = document.getElementById('customPortInput');
    const customNameInput = document.getElementById('customNameInput');
    const customTypeInput = document.getElementById('customTypeInput');
    const addCustomProxyBtn = document.getElementById('addCustomProxyBtn');
    const customProxiesList = document.getElementById('customProxiesList');
    const noCustomConfigsMessage = document.getElementById('noCustomConfigsMessage');

    let userCustomProxies = []; // آرایه‌ای برای نگهداری پروکسی‌های کاستوم کاربر

    function loadCustomProxies() {
        const storedProxies = localStorage.getItem('userCustomMiHoMoProxies');
        if (storedProxies) {
            try {
                userCustomProxies = JSON.parse(storedProxies);
            } catch (e) {
                console.error("خطا در بارگذاری پروکسی‌های کاستوم از Local Storage:", e);
                userCustomProxies = [];
            }
        }
        renderCustomProxies();
    }

    function saveCustomProxies() {
        localStorage.setItem('userCustomMiHoMoProxies', JSON.stringify(userCustomProxies));
    }

    function renderCustomProxies() {
        customProxiesList.innerHTML = '';
        if (userCustomProxies.length === 0) {
            noCustomConfigsMessage.style.display = 'block';
        } else {
            noCustomConfigsMessage.style.display = 'none';
            userCustomProxies.forEach((proxy, index) => {
                const proxyCard = document.createElement('div');
                proxyCard.className = 'proxy-card';
                proxyCard.innerHTML = `
                    <input type="checkbox" id="custom_${index}" 
                           data-ip="${currentLanIp}" 
                           data-port="${proxy.port}" 
                           data-name="${proxy.name}" 
                           data-type="${proxy.type}" 
                           data-udp="${proxy.udp || true}" 
                           checked>
                    <label for="custom_${index}">
                        <h4>${proxy.name}</h4>
                        <p>IP: <code>${currentLanIp}</code> | پورت: <code>${proxy.port}</code></p>
                        <p class="description">نوع: <code>${proxy.type.toUpperCase()}</code></p>
                    </label>
                    <div class="actions">
                        <button class="edit-custom-proxy-btn" data-index="${index}" title="ویرایش">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-custom-proxy-btn" data-index="${index}" title="حذف">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                customProxiesList.appendChild(proxyCard);
            });
        }

        document.querySelectorAll('.edit-custom-proxy-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.dataset.index;
                editCustomProxy(parseInt(index));
            });
        });

        document.querySelectorAll('.delete-custom-proxy-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.dataset.index;
                deleteCustomProxy(parseInt(index));
            });
        });
    }

    addCustomProxyBtn.addEventListener('click', () => {
        const port = customPortInput.value.trim();
        const name = customNameInput.value.trim();
        const type = customTypeInput.value; // دریافت نوع پروتکل

        if (!isValidPort(port)) {
            alert("لطفاً یک شماره پورت معتبر بین 1 تا 65535 وارد کنید.");
            customPortInput.focus();
            return;
        }

        if (name === "") {
            alert("لطفاً یک نام برای سرور کاستوم وارد کنید.");
            customNameInput.focus();
            return;
        }

        if (!currentLanIp) {
            alert("لطفاً ابتدا آدرس IP دستگاه VPN (LAN) را در بخش ۱ وارد و تأیید کنید.");
            lanIpInput.focus();
            return;
        }

        if (addCustomProxyBtn.dataset.editingIndex !== undefined) {
            const index = parseInt(addCustomProxyBtn.dataset.editingIndex);
            userCustomProxies[index] = { port, name, type, udp: true }; // ذخیره نوع پروتکل
            delete addCustomProxyBtn.dataset.editingIndex;
            addCustomProxyBtn.textContent = 'افزودن سرور';
        } else {
            userCustomProxies.push({ port, name, type, udp: true }); // ذخیره نوع پروتکل
        }

        saveCustomProxies();
        renderCustomProxies();

        customPortInput.value = '';
        customNameInput.value = '';
        customTypeInput.value = 'socks5'; // بازگرداندن به مقدار پیش‌فرض
    });

    function editCustomProxy(index) {
        const proxy = userCustomProxies[index];
        customPortInput.value = proxy.port;
        customNameInput.value = proxy.name;
        customTypeInput.value = proxy.type || 'socks5'; // اگر نوع ذخیره نشده بود، socks5 پیش‌فرض

        addCustomProxyBtn.textContent = 'به‌روزرسانی سرور';
        addCustomProxyBtn.dataset.editingIndex = index;
        customPortInput.focus();
    }

    function deleteCustomProxy(index) {
        if (confirm("آیا از حذف این سرور کاستوم مطمئن هستید؟")) {
            userCustomProxies.splice(index, 1);
            saveCustomProxies();
            renderCustomProxies();
        }
    }

    // =======================================================
    // ۷. مدیریت قوانین، Rule Providers و Proxy Groups (رندر دسته‌بندی شده)
    // =======================================================
    const rulesCheckboxesContainer = document.getElementById('rulesCheckboxes');
    const selectAllRulesBtn = document.getElementById('selectAllRules');
    const deselectAllRulesBtn = document.getElementById('deselectAllRules');

    function renderRulesAndProviders() {
        rulesCheckboxesContainer.innerHTML = '';

        const categorizedItems = {};
        ruleCategories.forEach(cat => {
            categorizedItems[cat.key] = {
                name: cat.name,
                icon: cat.icon,
                providers: [], // برای Rule Providers
                rules: [],     // برای Rules
            };
        });

        // پر کردن دسته‌بندی‌ها با Rule Providers
        predefinedRuleProviders.forEach(rp => {
            if (rp.group && categorizedItems[rp.group]) {
                categorizedItems[rp.group].providers.push(rp);
            }
        });

        // پر کردن دسته‌بندی‌ها با Rules
        rulesToGenerate.forEach(rule => {
            if (rule.hidden) return; // Rules با `hidden: true` را در UI نمایش نمی‌دهیم.
            if (rule.group && categorizedItems[rule.group]) {
                categorizedItems[rule.group].rules.push(rule);
            }
        });

        // رندر کردن دسته‌بندی‌ها در UI
        for (const key in categorizedItems) {
            const category = categorizedItems[key];
            // اگر گروهی محتوای قابل نمایش ندارد، رندر نمی‌شود (مثلاً Core Logic)
            if (category.providers.length === 0 && category.rules.length === 0) {
                continue;
            }

            const categorySection = document.createElement('div');
            categorySection.className = 'rule-category-section';

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            categorySection.appendChild(categoryTitle);

            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'proxy-cards-grid'; // استفاده مجدد از کلاس گرید برای چیدمان داخلی دسته‌بندی

            // رندر Rule Providers
            category.providers.forEach(rp => {
                const ruleItem = document.createElement('div');
                ruleItem.className = 'rule-item';
                ruleItem.innerHTML = `
                    <input type="checkbox" id="${rp.id}" data-yaml-key="${rp.yamlKey}" data-type="rule-provider" ${rp.defaultChecked ? 'checked' : ''}>
                    <label for="${rp.id}">
                        <h4>${rp.name}</h4>
                        <p class="description">${rp.description || ''}</p> </label>
                `;
                categoryGrid.appendChild(ruleItem);
            });

            // رندر Rules
            category.rules.forEach(rule => {
                const ruleItem = document.createElement('div');
                ruleItem.className = 'rule-item';
                ruleItem.innerHTML = `
                    <input type="checkbox" id="${rule.id}" data-rule-string="${rule.ruleString}" data-type="rule" ${rule.defaultChecked ? 'checked' : ''}>
                    <label for="${rule.id}">
                        <h4>${rule.name}</h4>
                        <p class="description">${rule.description || ''}</p> </label>
                `;
                categoryGrid.appendChild(ruleItem);
            });

            categorySection.appendChild(categoryGrid);
            rulesCheckboxesContainer.appendChild(categorySection);
        }
    }

    selectAllRulesBtn.addEventListener('click', () => {
        document.querySelectorAll('#rulesCheckboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    deselectAllRulesBtn.addEventListener('click', () => {
        document.querySelectorAll('#rulesCheckboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    });


    // =======================================================
    // ۸. تولید و دانلود کانفیگ نهایی MiHoMo
    // =======================================================
    const generateConfigBtn = document.getElementById('generateConfigBtn');
    const outputConfigTextarea = document.getElementById('outputConfig');
    const downloadConfigBtn = document.getElementById('downloadConfigBtn');

    generateConfigBtn.addEventListener('click', async () => {
        outputConfigTextarea.value = 'در حال تولید کانفیگ... لطفاً صبر کنید.';
        downloadConfigBtn.style.display = 'none';

        if (!currentLanIp) {
            alert('لطفاً ابتدا آدرس IP دستگاه VPN (LAN) را در بخش ۱ وارد و تأیید کنید.');
            outputConfigTextarea.value = '';
            lanIpInput.focus();
            return;
        }

        let baseConfigContent = '';

        // همیشه از تمپلت پیش‌فرض محلی استفاده می‌کنیم (بخش انتخاب تمپلت حذف شده)
        try {
            const response = await fetch('config-templates/default-mihomo-template.yaml');
            if (!response.ok) {
                throw new Error(`خطا در بارگذاری تمپلت پیش‌فرض: ${response.statusText || 'Failed to fetch'}. مطمئن شوید فایل default-mihomo-template.yaml در مسیر درست قرار دارد و سایت از طریق سرور (http:// یا https://) در حال اجراست.`);
            }
            baseConfigContent = await response.text();
        } catch (error) {
            alert(`خطا در بارگذاری تمپلت پیش‌فرض: ${error.message}`);
            outputConfigTextarea.value = '';
            return;
        }

        // ----------------------------------------------------
        // استخراج بخش‌های اصلی کانفیگ از تمپلت پایه با RegEx
        // ----------------------------------------------------
        const ruleProvidersSectionMatch = baseConfigContent.match(/^rule-providers:([\s\S]*?)(?=^proxies:|^proxy-groups:|^rules:|^ntp:|$)/m);
        const proxiesSectionMatch = baseConfigContent.match(/^proxies:([\s\S]*?)(?=^proxy-groups:|^rule-providers:|^rules:|^ntp:|$)/m);
        const proxyGroupsSectionMatch = baseConfigContent.match(/^proxy-groups:([\s\S]*?)(?=^rules:|^rule-providers:|^proxies:|^ntp:|$)/m);
        const rulesSectionMatch = baseConfigContent.match(/^rules:([\s\S]*?)(?=^ntp:|$)/m);
        const ntpSectionMatch = baseConfigContent.match(/^ntp:([\s\S]*?)$/m);

        let topSectionContent = '';
        const firstMajorSectionIndex = Math.min(
            ruleProvidersSectionMatch ? ruleProvidersSectionMatch.index : Infinity,
            proxiesSectionMatch ? proxiesSectionMatch.index : Infinity,
            proxyGroupsSectionMatch ? proxyGroupsSectionMatch.index : Infinity,
            rulesSectionMatch ? rulesSectionMatch.index : Infinity,
            ntpSectionMatch ? ntpSectionMatch.index : Infinity
        );

        if (firstMajorSectionIndex !== Infinity) {
            topSectionContent = baseConfigContent.substring(0, firstMajorSectionIndex);
        } else {
            topSectionContent = baseConfigContent;
        }

        let bottomSectionContent = ntpSectionMatch ? ntpSectionMatch[0] : '';


        // ----------------------------------------------------
        // تولید بخش 'proxies'
        // ----------------------------------------------------
        let generatedProxiesYaml = [];
        // اضافه کردن پروکسی‌های پیش‌فرض انتخاب شده
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = checkbox.dataset.ip; // این همان currentLanIp است
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp;

            // ساختار YAML پروکسی بر اساس نوع (type)
            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') { // SOCKS5 و HTTP
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            // اینجا می‌توانید برای انواع دیگر پروتکل (vmess, trojan و...) جزئیات اضافه کنید
            // else if (proxyType === 'vmess') {
            //     proxyYaml += `\n    uuid: YOUR_UUID\n    alterId: 0\n    cipher: auto`;
            // }

            generatedProxiesYaml.push(proxyYaml);
        });

        // اضافه کردن پروکسی‌های کاستوم انتخاب شده
        document.querySelectorAll('#customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = checkbox.dataset.ip; // این همان currentLanIp است
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp;

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') { // SOCKS5 و HTTP
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
        });

        if (generatedProxiesYaml.length === 0) {
            generatedProxiesYaml.push(`
  - name: "DIRECT"
    type: direct
  - name: "REJECT"
    type: reject`);
        }

        // ----------------------------------------------------
        // تولید بخش 'rule-providers'
        // ----------------------------------------------------
        let generatedRuleProvidersYaml = [];
        let selectedRpKeys = new Set(); // کلیدهای Rule Provider های فعال
        document.querySelectorAll('#rulesCheckboxes input[data-type="rule-provider"]:checked').forEach(checkbox => {
            selectedRpKeys.add(checkbox.dataset.yamlKey);
        });

        predefinedRuleProviders.forEach(rp => {
            if (selectedRpKeys.has(rp.yamlKey)) {
                generatedRuleProvidersYaml.push(`  ${rp.yamlKey}:
    type: http
    behavior: ${rp.behavior}
    url: ${rp.url}
    interval: 86400
    path: ./ruleset/${rp.yamlKey}.yaml`);
            }
        });

        // ----------------------------------------------------
        // تولید بخش 'rules'
        // ----------------------------------------------------
        let finalRulesList = [];
        let selectedRuleStrings = new Set(); // رشته‌های Rule های فعال
        document.querySelectorAll('#rulesCheckboxes input[data-type="rule"]:checked').forEach(checkbox => {
            selectedRuleStrings.add(checkbox.dataset.ruleString);
        });

        const alwaysIncludeRules = ['MATCH,نوع انتخاب پروکسی 🔀']; // Rule های که همیشه باید باشند
        alwaysIncludeRules.forEach(rule => selectedRuleStrings.add(rule));


        rulesToGenerate.forEach(rule => {
            if (!selectedRuleStrings.has(rule.ruleString)) {
                return; // اگر Rule توسط کاربر انتخاب نشده، آن را به خروجی اضافه نمی‌کنیم.
            }

            let isRelatedRpActive = true; // بررسی فعال بودن Rule Provider مرتبط
            const rpMatch = rule.ruleString.match(/^RULE-SET,([^,]+),/); // استخراج نام RP از RULE-SET
            if (rpMatch) {
                const rpKey = rpMatch[1].trim();
                if (!selectedRpKeys.has(rpKey)) {
                    isRelatedRpActive = false; // Rule Provider مربوطه فعال نیست، پس Rule را هم حذف می‌کنیم.
                }
            }

            if (isRelatedRpActive) {
                finalRulesList.push(`  - ${rule.ruleString}`);
            }
        });

        // ----------------------------------------------------
        // تولید بخش 'proxy-groups'
        // ----------------------------------------------------
        let generatedProxyGroupsYaml = [];

        // ابتدا نام تمام پروکسی های فعال (پیش فرض و کاستوم) را جمع آوری می کنیم
        let activeProxyNames = new Set();
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked, #customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            activeProxyNames.add(checkbox.dataset.name);
        });
        activeProxyNames.add('DIRECT'); // DIRECT همیشه باید باشد
        activeProxyNames.add('REJECT'); // REJECT همیشه باید باشد

        // لیست گروه های پروکسی که باید در خروجی نهایی باشند
        let finalProxyGroupsToInclude = new Set();

        // 1. اضافه کردن گروه های پایه (SELECT, دستی, خودکار, پشتیبان و مخفی ها)
        const baseProxyGroups = predefinedProxyGroups.filter(pg =>
            ['نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯', 'بدون فیلترشکن 🛡️', 'قطع اینترنت ⛔', 'اجازه ندادن 🚫'].includes(pg.yamlKey)
        );
        baseProxyGroups.forEach(pg => finalProxyGroupsToInclude.add(pg.yamlKey));

        // 2. اضافه کردن گروه هایی که Rule فعال به آنها اشاره دارد
        // این شامل Proxy Groups ی می شود که مستقیماً در UI نمایش داده نمی شدند.
        finalRulesList.forEach(ruleString => { // از finalRulesList استفاده می‌کنیم چون فقط شامل Ruleهای فعال است.
            const ruleTargetGroupMatch = ruleString.match(/,([^,]+)$/); // استخراج نام گروه از انتهای رول
            if (ruleTargetGroupMatch) {
                const targetGroupName = ruleTargetGroupMatch[1].trim();
                finalProxyGroupsToInclude.add(targetGroupName);
            }
        });


        // حالا بر اساس `finalProxyGroupsToInclude`، بخش `proxy-groups` را بازسازی می‌کنیم
        // ابتدا Proxy Groups را به ترتیب مشخص در predefinedProxyGroups مرتب می‌کنیم
        // فقط گروه‌هایی را که در finalProxyGroupsToInclude هستند، انتخاب می‌کنیم.
        let sortedActiveGroups = predefinedProxyGroups.filter(pg => finalProxyGroupsToInclude.has(pg.yamlKey));

        // اگر "نوع انتخاب پروکسی 🔀" انتخاب شده بود، مطمئن شویم که در ابتدا قرار گیرد (اگر وجود دارد)
        sortedActiveGroups.sort((a, b) => {
            if (a.yamlKey === 'نوع انتخاب پروکسی 🔀') return -1;
            if (b.yamlKey === 'نوع انتخاب پروکسی 🔀') return 1;
            return 0;
        });


        sortedActiveGroups.forEach(pg => {
            let groupContent = `  - name: "${pg.yamlKey}"\n    type: ${pg.type}`;
            if (pg.icon) groupContent += `\n    icon: ${pg.icon}`;
            if (pg.url) groupContent += `\n    url: ${pg.url}`;
            if (pg.interval) groupContent += `\n    interval: ${pg.interval}`;
            if (pg.timeout) groupContent += `\n    timeout: ${pg.timeout}`;
            if (pg.tolerance) groupContent += `\n    tolerance: ${pg.tolerance}`;
            if (pg.max_failed_times) groupContent += `\n    max-failed-times: ${pg.max_failed_times}`;
            if (pg.lazy !== undefined) groupContent += `\n    lazy: ${pg.lazy}`;
            if (pg.hidden !== undefined) groupContent += `\n    hidden: ${pg.hidden}`;

            groupContent += `\n    proxies:`;

            if (['نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯'].includes(pg.yamlKey)) {
                groupContent += `\n      - DIRECT\n      - REJECT`;
                activeProxyNames.forEach(name => {
                    if (name !== 'DIRECT' && name !== 'REJECT') {
                        groupContent += `\n      - "${name}"`;
                    }
                });
            } else if (pg.proxies && pg.proxies.length > 0) {
                const filteredProxiesForGroup = pg.proxies.filter(pName => activeProxyNames.has(pName) || pName === 'DIRECT' || pName === 'REJECT');
                filteredProxiesForGroup.forEach(p => {
                    groupContent += `\n      - ${p}`;
                });
                if (filteredProxiesForGroup.length === 0 && pg.type !== 'reject' && pg.type !== 'direct') {
                     groupContent += `\n      - DIRECT\n      - REJECT`;
                }

            } else {
                if (pg.type !== 'reject' && pg.type !== 'direct') {
                    groupContent += `\n      - DIRECT\n      - REJECT`;
                }
            }
            generatedProxyGroupsYaml.push(groupContent);
        });


        // ====================================================================
        // ترکیب نهایی تمامی بخش‌های کانفیگ YAML
        // ====================================================================
        let finalConfigOutput = [];

        if (topSectionContent.trim()) {
            finalConfigOutput.push(topSectionContent.trim());
        }

        if (generatedRuleProvidersYaml.length > 0) {
            finalConfigOutput.push('rule-providers:');
            finalConfigOutput.push(generatedRuleProvidersYaml.join('\n'));
        }

        finalConfigOutput.push('proxies:');
        finalConfigOutput.push(generatedProxiesYaml.join(''));

        finalConfigOutput.push('proxy-groups:');
        finalConfigOutput.push(generatedProxyGroupsYaml.join('\n'));

        finalConfigOutput.push('rules:');
        if (finalRulesList.length > 0) {
            finalConfigOutput.push(finalRulesList.join('\n'));
        } else {
            finalConfigOutput.push(`  - MATCH,نوع انتخاب پروکسی 🔀`);
        }

        if (bottomSectionContent.trim()) {
            finalConfigOutput.push(bottomSectionContent.trim());
        }


        outputConfigTextarea.value = finalConfigOutput.join('\n\n').trim();
        downloadConfigBtn.style.display = 'block';
    });


    // =======================================================
    // ۹. قابلیت دانلود کانفیگ به عنوان فایل .yaml
    // =======================================================
    downloadConfigBtn.addEventListener('click', () => {
        const configContent = outputConfigTextarea.value;
        const blob = new Blob([configContent], { type: 'text/yaml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.yaml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // =======================================================
    // ۱۰. قابلیت اسکرول به بالا و پایین صفحه
    // =======================================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.opacity = '1';
            scrollToBottomBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToBottomBtn.style.opacity = '0';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToBottomBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });


    // =======================================================
    // ۱۱. فراخوانی اولیه توابع هنگام بارگذاری صفحه
    // =======================================================
    loadTheme();

    const savedLanIp = localStorage.getItem('lanIp');
    if (savedLanIp && isValidIP(savedLanIp)) {
        lanIpInput.value = savedLanIp;
        currentLanIp = savedLanIp;
        toggleContentEnabled(true);
    } else {
        toggleContentEnabled(false);
    }

    renderPredefinedProxies();
    loadCustomProxies();
    renderRulesAndProviders();
});
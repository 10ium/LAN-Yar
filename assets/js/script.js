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

    // اضافه کردن عناصر جدید برای انیمیشن بارگذاری
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');

    // توابع کمکی برای نمایش/پنهان کردن انیمیشن بارگذاری
    function showLoading(message = 'در حال پردازش...') {
        loadingMessage.textContent = message;
        loadingOverlay.classList.remove('hidden');
    }

    function hideLoading() {
        loadingOverlay.classList.add('hidden');
    }

    // بلافاصله پس از DOMContentLoaded، پیام اولیه را نمایش دهید
    showLoading('در حال بارگذاری سایت...');


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
            mainContentWrapper.classList.add('active');
            footer.classList.remove('disabled-content');
            footer.classList.add('active');
        } else {
            mainContentWrapper.classList.add('disabled-content');
            mainContentWrapper.classList.remove('active');
            footer.classList.add('disabled-content');
            footer.classList.remove('active');
        }
    }

    validateLanIpBtn.addEventListener('click', () => {
        const ip = lanIpInput.value.trim();
        if (isValidIP(ip)) {
            currentLanIp = ip;
            localStorage.setItem('lanIp', ip);
            toggleContentEnabled(true);
            alert(`آدرس IP LAN شما (${ip}) با موفقیت تأیید شد. حالا می‌توانید ادامه دهید.`);
            renderPredefinedProxies();
            loadCustomProxies();  
            renderRulesAndProviders();  
        } else {
            currentLanIp = '';
            localStorage.removeItem('lanIp');
            toggleContentEnabled(false);
            alert('لطفاً یک آدرس IP معتبر LAN وارد کنید تا ادامه دهید.');
            lanIpInput.focus();
        }
    });

    lanIpInput.addEventListener('input', () => {
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
    // کدهای مربوط به این بخش حذف شده‌اند.

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

    let userCustomProxies = [];

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
        const type = customTypeInput.value;

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
            userCustomProxies[index] = { port, name, type, udp: true };
            delete addCustomProxyBtn.dataset.editingIndex;
            addCustomProxyBtn.textContent = 'به‌روزرسانی سرور';
        } else {
            userCustomProxies.push({ port, name, type, udp: true });
        }

        saveCustomProxies();
        renderCustomProxies();

        customPortInput.value = '';
        customNameInput.value = '';
        customTypeInput.value = 'socks5';
    });

    function editCustomProxy(index) {
        const proxy = userCustomProxies[index];
        customPortInput.value = proxy.port;
        customNameInput.value = proxy.name;
        customTypeInput.value = proxy.type || 'socks5';

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
    // ۷. مدیریت قوانین و گروه‌های پروکسی (رندر دسته‌بندی شده)
    // =======================================================
    const rulesCheckboxesContainer = document.getElementById('rulesCheckboxes');
    const selectAllRulesBtn = document.getElementById('selectAllRules');
    const deselectAllRulesBtn = document.getElementById('deselectAllRules');

    function renderRulesAndProviders() {
        rulesCheckboxesContainer.innerHTML = '';

        const categorizedRules = {};
        ruleCategories.forEach(cat => {
            categorizedRules[cat.key] = {
                name: cat.name,
                icon: cat.icon,
                rules: [],
            };
        });

        // فقط Rule ها رو در UI نمایش می‌دهیم، نه Rule Provider ها
        rulesToGenerate.forEach(rule => {
            if (rule.hidden) return; // Rule های پنهان نباید نمایش داده شوند
            if (rule.group && categorizedRules[rule.group]) {
                categorizedRules[rule.group].rules.push(rule);
            }
        });

        for (const key in categorizedRules) {
            const category = categorizedRules[key];
            if (category.rules.length === 0) {
                continue; // اگر دسته‌بندی Rule ای ندارد، آن را نمایش نده
            }

            const categorySection = document.createElement('div');
            categorySection.className = 'rule-category-section';

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            categorySection.appendChild(categoryTitle);

            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'proxy-cards-grid'; // از همین کلاس grid استفاده می‌کنیم

            category.rules.forEach(rule => {
                const ruleItem = document.createElement('div');
                ruleItem.className = 'rule-item';
                ruleItem.innerHTML = `
                    <input type="checkbox" 
                           id="${rule.id}" 
                           data-rule-string="${rule.ruleString}" 
                           data-type="rule" 
                           ${rule.defaultChecked ? 'checked' : ''}
                           ${rule.relatedRuleProvider ? `data-related-rp="${rule.relatedRuleProvider}"` : ''}
                           ${rule.relatedProxyGroup ? `data-related-pg="${rule.relatedProxyGroup}"` : ''}>
                    <label for="${rule.id}">
                        <h4>${rule.name}</h4>
                        <p class="description">${rule.description || ''}</p>
                    </label>
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
        showLoading('در حال تولید کانفیگ... لطفاً صبر کنید.');
        outputConfigTextarea.value = '';
        downloadConfigBtn.style.display = 'none';

        if (!currentLanIp) {
            alert('لطفاً ابتدا آدرس IP دستگاه VPN (LAN) را در بخش ۱ وارد و تأیید کنید.');
            outputConfigTextarea.value = '';
            lanIpInput.focus();
            hideLoading();
            return;
        }

        let baseConfigContent = '';

        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        const defaultTemplateUrl = baseUrl + 'config-templates/default-mihomo-template.yaml';

        try {
            const response = await fetch(defaultTemplateUrl);
            if (!response.ok) {
                throw new Error(`خطا در بارگذاری تمپلت پیش‌فرض: ${response.statusText || 'Failed to fetch'}. مطمئن شوید فایل default-mihomo-template.yaml در مسیر درست قرار دارد و دسترسی به آن امکان‌پذیر است.`);
            }
            baseConfigContent = await response.text();
        } catch (error) {
            alert(`خطا در بارگذاری تمپلت پیش‌فرض: ${error.message}`);
            outputConfigTextarea.value = '';
            hideLoading();
            return;
        }

        // --- بازنگری کامل استخراج بخش‌های ثابت (نهایی) ---
        // این تابع حالا هر بلوک YAML رو از عنوانش تا شروع بلوک بعدی یا انتهای فایل می‌گیره
        const getFullSectionContent = (startKey, content) => {
            const regex = new RegExp(`(^${startKey}:[\\s\\S]*?)(?=(?:^\\w[\\w-]*:)|(?:^#\\s*={10,}.*$)|$)`, 'm');
            const match = content.match(regex);
            // Trim and ensure the key itself is included
            return match ? match[1].trim() : '';
        };

        const globalSettingsSection = getFullSectionContent('global-client-fingerprint', baseConfigContent);
        const dnsSection = getFullSectionContent('dns', baseConfigContent);
        const snifferSection = getFullSectionContent('sniffer', baseConfigContent);
        const tunSection = getFullSectionContent('tun', baseConfigContent);
        const ntpSection = getFullSectionContent('ntp', baseConfigContent);
        // -----------------------------------------------------


        // ----------------------------------------------------
        // تولید بخش 'proxies' (بر اساس انتخاب کاربر در UI)
        // ----------------------------------------------------
        let generatedProxiesYaml = [];
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = currentLanIp; // استفاده از currentLanIp
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp;

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
        });

        document.querySelectorAll('#customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = currentLanIp; // استفاده از currentLanIp
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp;

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
        });
        
        // ----------------------------------------------------
        // تولید بخش 'rule-providers' (بر اساس Rule های انتخاب شده)
        // ----------------------------------------------------
        let generatedRuleProvidersYaml = [];
        let requiredRpKeys = new Set(); // Rule Provider های مورد نیاز

        // جمع آوری Rule Provider های مورد نیاز بر اساس Rule های انتخاب شده در UI
        document.querySelectorAll('#rulesCheckboxes input[type="checkbox"]:checked').forEach(checkbox => {
            const relatedRpKey = checkbox.dataset.relatedRp;
            if (relatedRpKey) {  
                requiredRpKeys.add(relatedRpKey);
            }
        });

        predefinedRuleProviders.forEach(rp => {
            if (requiredRpKeys.has(rp.yamlKey)) {
                generatedRuleProvidersYaml.push(`  ${rp.yamlKey}:
    type: http
    behavior: ${rp.behavior}
    url: ${rp.url}
    interval: 86400
    path: ./ruleset/${rp.yamlKey}.yaml`);
            }
        });

        // ----------------------------------------------------
        // تولید بخش 'rules' (فقط Rule های انتخاب شده توسط کاربر)
        // ----------------------------------------------------
        let finalRulesList = [];
        let requiredPgKeys = new Set(); // Proxy Group های مورد نیاز بر اساس Rule ها

        // جمع آوری Rule های فعال و Proxy Group های مرتبط
        document.querySelectorAll('#rulesCheckboxes input[type="checkbox']:checked').forEach(checkbox => {
            const ruleString = checkbox.dataset.ruleString;
            const relatedPgKey = checkbox.dataset.relatedPg;

            finalRulesList.push(`  - ${ruleString}`);
            if (relatedPgKey) {  
                requiredPgKeys.add(relatedPgKey);
            }
        });

        // Rule MATCH همیشه باید آخرین Rule باشد
        finalRulesList.push(`  - MATCH,نوع انتخاب پروکسی 🔀`);
        requiredPgKeys.add('نوع انتخاب پروکسی 🔀'); // گروه Match همیشه مورد نیاز است

        // ----------------------------------------------------
        // تولید بخش 'proxy-groups' (بر اساس Rule ها و گروه‌های پایه)
        // ----------------------------------------------------
        let generatedProxyGroupsYaml = [];

        let allActiveProxyNames = new Set(); // نام پروکسی‌های فعال (Mahsang, Clash, ...)
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked, #customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            allActiveProxyNames.add(checkbox.dataset.name);
        });
        
        // افزودن گروه‌های پایه مورد نیاز به لیست
        const baseProxyGroupsKeys = ['نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯'];
        baseProxyGroupsKeys.forEach(key => requiredPgKeys.add(key));

        // گروه‌های خاص که باید همیشه در آخر باشند
        // **اینجا تعریف شده است تا قبل از استفاده در تابع sort قابل دسترسی باشد**
        const specialLastGroupsKeys = ['بدون فیلترشکن 🛡️', 'قطع اینترنت ⛔', 'اجازه ندادن 🚫'];
        specialLastGroupsKeys.forEach(key => requiredPgKeys.add(key)); // این خط هم به اینجا منتقل شده تا در requiredPgKeys لحاظ شود


        let sortedRequiredGroups = predefinedProxyGroups.filter(pg => requiredPgKeys.has(pg.yamlKey));

        // مرتب سازی گروه‌ها:
        // 1. "نوع انتخاب پروکسی" همیشه اول
        // 2. سپس سایر گروه‌های پایه (دستی، خودکار، پشتیبان)
        // 3. سپس گروه‌های موضوعی
        // 4. در نهایت گروه‌های "بدون فیلترشکن", "قطع اینترنت", "اجازه ندادن" در آخر
        sortedRequiredGroups.sort((a, b) => {
            const indexA = baseProxyGroupsKeys.indexOf(a.yamlKey);
            const indexB = baseProxyGroupsKeys.indexOf(b.yamlKey);
            const specialIndexA = specialLastGroupsKeys.indexOf(a.yamlKey);
            const specialIndexB = specialLastGroupsKeys.indexOf(b.yamlKey);

            if (a.yamlKey === 'نوع انتخاب پروکسی 🔀') return -1;
            if (b.yamlKey === 'نوع انتخاب پروکسی 🔀') return 1;

            if (specialIndexA !== -1 && specialIndexB === -1) return 1; // A is special, B is not, A goes last
            if (specialIndexA === -1 && specialIndexB !== -1) return -1; // B is special, A is not, B goes last
            if (specialIndexA !== -1 && specialIndexB !== -1) return specialIndexA - specialIndexB; // Both special, sort by their order

            if (indexA !== -1 && indexB === -1) return -1; // A is base, B is not, A goes earlier
            if (indexA === -1 && indexB !== -1) return 1;  // B is base, A is not, B goes earlier
            return 0; // Maintain original order for other groups
        });


        // تابع کمکی برای فرمت کردن نام پروکسی/گروه با کوتیشن (همه اجباری)
        const formatProxyRefAllQuotes = (name) => {
             return `"${name}"`;
        };
        
        // تابع کمکی برای تولید لیست پروکسی‌ها برای یک گروه خاص با حفظ ترتیب
        const getGroupProxiesList = (groupData, allActiveProxies) => {
            const list = [];
            const templateProxies = groupData.proxies || [];

            // این گروه‌ها باید فقط DIRECT یا REJECT داشته باشند
            if (groupData.yamlKey === 'بدون فیلترشکن 🛡️') return ['DIRECT'];  
            if (groupData.yamlKey === 'قطع اینترنت ⛔' || groupData.yamlKey === 'اجازه ندادن 🚫') return ['REJECT'];  

            // برای گروه‌های اصلی و موضوعی
            templateProxies.forEach(proxyRef => {
                // اگر ارجاع به DIRECT یا REJECT است (بدون کوتیشن، زیرا MiHoMo اینها را کلمات کلیدی می‌شناسد)
                if (proxyRef === 'DIRECT' || proxyRef === 'REJECT') {
                    if (!list.includes(proxyRef)) { // بدون کوتیشن برای مقایسه
                        list.push(proxyRef);
                    }
                }  
                // اگر ارجاع به یک گروه پایه (با نام فارسی) یا یک پروکسی فعال است
                else if (allActiveProxies.has(proxyRef) || predefinedProxyGroups.some(pg => pg.yamlKey === proxyRef)) { // بررسی هم پروکسی‌های فعال هم گروه‌های پایه
                    // اطمینان از اینکه قبلاً اضافه نشده و با کوتیشن اضافه شود
                    if (!list.includes(formatProxyRefAllQuotes(proxyRef))) {
                        list.push(formatProxyRefAllQuotes(proxyRef));
                    }
                }
            });

            // مدیریت حالت‌هایی که لیست پروکسی‌ها برای یک گروه موضوعی (نه پایه) خالی می‌ماند
            const isTopicGroup = !baseProxyGroupsKeys.includes(groupData.yamlKey) && !specialLastGroupsKeys.includes(groupData.yamlKey);
            if (isTopicGroup && list.length === 0) {
                 list.push(formatProxyRefAllQuotes("نوع انتخاب پروکسی 🔀"));
                 list.push(formatProxyRefAllQuotes("بدون فیلترشکن 🛡️"));
                 list.push(formatProxyRefAllQuotes("اجازه ندادن 🚫"));
            }

            return list;
        };


        sortedRequiredGroups.forEach(pg => {
            let groupContent = `  - name: ${formatProxyRefAllQuotes(pg.yamlKey)}\n    type: ${pg.type}`; // نام گروه هم کوتیشن بگیره
            if (pg.icon) groupContent += `\n    icon: ${pg.icon}`;
            if (pg.url) groupContent += `\n    url: ${pg.url}`;
            if (pg.interval) groupContent += `\n    interval: ${pg.interval}`;
            if (pg.timeout) groupContent += `\n    timeout: ${pg.timeout}`;
            if (pg.tolerance) groupContent += `\n    tolerance: ${pg.tolerance}`;
            if (pg.max_failed_times) groupContent += `\n    max-failed-times: ${pg.max_failed_times}`;
            if (pg.lazy !== undefined) groupContent += `\n    lazy: ${pg.lazy}`;
            if (pg.hidden !== undefined) groupContent += `\n    hidden: ${pg.hidden}`;

            groupContent += `\n    proxies:`;

            const proxiesForThisGroup = getGroupProxiesList(pg, allActiveProxyNames);
            
            proxiesForThisGroup.forEach(p => {
                groupContent += `\n      - ${p}`;
            });

            generatedProxyGroupsYaml.push(groupContent);
        });


        // ====================================================================
        // ترکیب نهایی تمامی بخش‌های کانفیگ YAML
        // ====================================================================
        let finalConfigOutput = [];

        // اضافه کردن بخش‌های ثابت به ترتیب (حالا با محتوای کامل)
        if (globalSettingsSection) {
            finalConfigOutput.push(globalSettingsSection);
        }
        if (dnsSection) {
            finalConfigOutput.push(dnsSection);
        }
        if (snifferSection) {
            finalConfigOutput.push(snifferSection);
        }
        if (tunSection) {
            finalConfigOutput.push(tunSection);
        }

        // بخش Rule Providers
        if (generatedRuleProvidersYaml.length > 0) {
            finalConfigOutput.push('rule-providers:');
            finalConfigOutput.push(generatedRuleProvidersYaml.join('\n\n'));
        }

        // بخش Proxies
        finalConfigOutput.push('proxies:');
        finalConfigOutput.push(generatedProxiesYaml.join('\n\n'));

        // بخش Proxy Groups
        finalConfigOutput.push('proxy-groups:');
        finalConfigOutput.push(generatedProxyGroupsYaml.join('\n\n'));

        // بخش Rules
        finalConfigOutput.push('rules:');
        finalConfigOutput.push(finalRulesList.join('\n'));

        // بخش NTP
        if (ntpSection) {
            finalConfigOutput.push(ntpSection);
        }


        outputConfigTextarea.value = finalConfigOutput.join('\n\n').trim();
        downloadConfigBtn.style.display = 'block';
        hideLoading();
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

    hideLoading();
});

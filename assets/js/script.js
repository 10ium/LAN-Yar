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

        // فقط Rule ها رو در UI نمایش می‌دهیم
        rulesToGenerate.forEach(rule => {
            if (rule.hidden) return; 
            if (rule.group && categorizedRules[rule.group]) {
                categorizedRules[rule.group].rules.push(rule);
            }
        });

        for (const key in categorizedRules) {
            const category = categorizedRules[key];
            if (category.rules.length === 0) {
                continue; 
            }

            const categorySection = document.createElement('div');
            categorySection.className = 'rule-category-section';

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            categorySection.appendChild(categoryTitle);

            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'proxy-cards-grid'; 

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

        // --- بازنگری نهایی استخراج بخش‌های ثابت با نشانگرهای جدید ---
        const getFullSectionByMarkers = (startMarker, endMarker, content) => {
            const regex = new RegExp(`^#\\s*${startMarker}\\s*$(?:\\r\\n|\\n)([\\s\\S]*?)(?=(?:^#\\s*${endMarker}\\s*$|^#\\s*={10,}.*$))`, 'm');
            const match = content.match(regex);
            return match && match[1] ? match[1].trim() : '';
        };

        const globalSettingsSection = getFullSectionByMarkers('=== GLOBAL SETTINGS ===', '=== DNS SETTINGS ===', baseConfigContent);
        const dnsSection = getFullSectionByMarkers('=== DNS SETTINGS ===', '=== SNIFFER SETTINGS ===', baseConfigContent);
        const snifferSection = getFullSectionByMarkers('=== SNIFFER SETTINGS ===', '=== TUN SETTINGS ===', baseConfigContent);
        const tunSection = getFullSectionByMarkers('=== TUN SETTINGS ===', '=== RULE PROVIDERS SECTION START ===', baseConfigContent);
        const ntpSection = getFullSectionByMarkers('=== NTP SETTINGS START ===', '=== NTP SETTINGS END ===', baseConfigContent);
        
        // اگر NTP در انتهای فایل باشه و بعدش چیزی نباشه، حالت خاص رو هم در نظر بگیریم
        if (!ntpSection) { // اگر با نشانگر بالا پیدا نشد، شاید در انتها باشه بدون نشانگر پایان
            const lastNtpRegex = /^ntp:([\s\S]*?)(?=(^#.*$)|$)/m; // میگیره تا کامنت بعدی یا انتهای فایل
            const lastNtpMatch = baseConfigContent.match(lastNtpRegex);
            if(lastNtpMatch) {
                const preambleRegex = /^\s*(#.*)?\s*(ntp:)/m; // برای گرفتن خط NTP: و کامنت احتمالی
                const preambleMatch = baseConfigContent.substring(lastNtpMatch.index).match(preambleRegex);
                if (preambleMatch) {
                    ntpSection = preambleMatch[0] + "\n" + lastNtpMatch[1].trim(); // اضافه کردن خط NTP: و محتوا
                }
            }
        }
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

        document.querySelectorAll('#customProxiesList input[type="checkbox']:checked').forEach(checkbox => {
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
        // تولید بخش 'rule-providers' (همه‌ی آن‌ها را شامل می‌شود - طبق درخواست "دو رو نمی‌خوام")
        // ----------------------------------------------------
        let generatedRuleProvidersYaml = [];
        predefinedRuleProviders.forEach(rp => {
            generatedRuleProvidersYaml.push(`  ${rp.yamlKey}:
    type: http
    behavior: ${rp.behavior}
    url: ${rp.url}
    interval: 86400
    path: ./ruleset/${rp.yamlKey}.yaml`);
        });


        // ----------------------------------------------------
        // تولید بخش 'rules' (همه‌ی آن‌ها را شامل می‌شود - طبق درخواست "دو رو نمی‌خوام")
        // ----------------------------------------------------
        let finalRulesList = [];
        // اضافه کردن همه Rule های تعریف شده
        rulesToGenerate.forEach(rule => {
            finalRulesList.push(`  - ${rule.ruleString}`);
        });
        // Rule MATCH همیشه باید آخرین Rule باشد
        finalRulesList.push(`  - MATCH,نوع انتخاب پروکسی 🔀`);


        // ----------------------------------------------------
        // تولید بخش 'proxy-groups' (همه‌ی آن‌ها را شامل می‌شود - طبق درخواست "دو رو نمی‌خوام")
        // ----------------------------------------------------
        let generatedProxyGroupsYaml = [];

        let allActiveProxyNames = new Set(); // نام پروکسی‌های فعال (Mahsang, Clash, ...)
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked, #customProxiesList input[type="checkbox']:checked').forEach(checkbox => {
            allActiveProxyNames.add(checkbox.dataset.name);
        });
        
        // تابع کمکی برای فرمت کردن نام پروکسی/گروه با کوتیشن (همه اجباری)
        const formatProxyRefAllQuotes = (name) => {
             // اگر نام DIRECT یا REJECT است، بدون کوتیشن باشد
            if (name === 'DIRECT' || name === 'REJECT') {
                return name;
            }
            // بقیه نام‌ها با کوتیشن
            return `"${name}"`;
        };
        
        // تابع کمکی برای تولید لیست پروکسی‌ها برای یک گروه خاص با حفظ ترتیب (حالا برای همه گروه‌ها)
        const getGroupProxiesListForAllGroups = (groupData, allAvailableProxies) => {
            const list = [];
            const templateProxies = groupData.proxies || [];

            // این گروه‌ها باید فقط DIRECT یا REJECT داشته باشند
            if (groupData.yamlKey === 'بدون فیلترشکن 🛡️') return ['DIRECT']; 
            if (groupData.yamlKey === 'قطع اینترنت ⛔' || groupData.yamlKey === 'اجازه ندادن 🚫') return ['REJECT']; 

            // برای بقیه گروه‌ها (اصلی و موضوعی)
            templateProxies.forEach(proxyRef => {
                // اگر DIRECT یا REJECT است (بدون کوتیشن)
                if (proxyRef === 'DIRECT' || proxyRef === 'REJECT') {
                    if (!list.includes(proxyRef)) { 
                        list.push(proxyRef);
                    }
                } 
                // اگر ارجاع به یک گروه پایه یا یک پروکسی فعال است
                else {
                    const formattedRef = formatProxyRefAllQuotes(proxyRef);
                    if (!list.includes(formattedRef)) {
                        list.push(formattedRef);
                    }
                }
            });

            return list;
        };


        predefinedProxyGroups.forEach(pg => { // حالا همه گروه‌های پیش‌فرض رو اضافه می‌کنیم
            let groupContent = `  - name: ${formatProxyRefAllQuotes(pg.yamlKey)}\n    type: ${pg.type}`; 
            if (pg.icon) groupContent += `\n    icon: ${pg.icon}`;
            if (pg.url) groupContent += `\n    url: ${pg.url}`;
            if (pg.interval) groupContent += `\n    interval: ${pg.interval}`;
            if (pg.timeout) groupContent += `\n    timeout: ${pg.timeout}`;
            if (pg.tolerance) groupContent += `\n    tolerance: ${pg.tolerance}`;
            if (pg.max_failed_times) groupContent += `\n    max-failed-times: ${pg.max_failed_times}`;
            if (pg.lazy !== undefined) groupContent += `\n    lazy: ${pg.lazy}`;
            if (pg.hidden !== undefined) groupContent += `\n    hidden: ${pg.hidden}`;

            groupContent += `\n    proxies:`;

            // حالا لیست پروکسی‌ها برای این گروه بر اساس تابع جدید
            const proxiesForThisGroup = getGroupProxiesListForAllGroups(pg, allActiveProxyNames);
            
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
            finalConfigOutput.push(generatedRuleProvidersYaml.join('\n'));
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

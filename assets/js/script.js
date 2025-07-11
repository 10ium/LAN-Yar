// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // ۰. متغیرهای سراسری و عناصر DOM اصلی
    // =======================================================
    let currentLanIp = '';

    const mainContentWrapper = document.getElementById('mainContentWrapper');
    const footer = document.querySelector('footer');
    const lanIpInput = document.getElementById('lanIpInput');
    const validateLanIpBtn = document.getElementById('validateLanIpBtn');

    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');

    function showLoading(message = 'در حال پردازش...') {
        loadingMessage.textContent = message;
        loadingOverlay.classList.remove('hidden');
    }

    function hideLoading() {
        loadingOverlay.classList.add('hidden');
    }

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
                        data-udp="${proxy.udp ? 'true' : 'false'}"
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
                            data-udp="${proxy.udp ? 'true' : 'false'}"
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
            addCustomProxyBtn.textContent = 'افزودن سرور کاستوم';
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

        rulesToGenerate.forEach(rule => {
            if (rule.hidden) return;
            if (rule.group && categorizedRules[rule.group]) {
                categorizedRules[rule.group].rules.push(rule);
            }
        });

        Object.keys(categorizedRules).sort((a, b) => {
            return a.localeCompare(b);
        }).forEach(key => {
            const category = categorizedRules[key];
            if (category.rules.length === 0) return;

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
        });
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
            console.log("Template content loaded successfully.");
        } catch (error) {
            alert(`خطا در بارگذاری تمپلت پیش‌فرض: ${error.message}`);
            outputConfigTextarea.value = '';
            hideLoading();
            return;
        }

        // ----------------------------------------------------
        // تولید بخش 'proxies' (بر اساس انتخاب کاربر در UI)
        // ----------------------------------------------------
        let generatedProxiesYaml = [];
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox']:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = checkbox.dataset.ip;
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp === 'true'; // تبدیل به boolean

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
        });

        document.querySelectorAll('#customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            const proxyType = checkbox.dataset.type;
            const proxyServer = checkbox.dataset.ip;
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp === 'true'; // تبدیل به boolean

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${proxyServer}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
        });
        console.log("Generated Proxies YAML:", generatedProxiesYaml.join('\n\n'));


        // ----------------------------------------------------
        // تولید بخش 'rule-providers' (بر اساس Rule های انتخاب شده)
        // ----------------------------------------------------
        let generatedRuleProvidersYaml = [];
        let requiredRpKeys = new Set();

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
        console.log("Generated Rule Providers YAML:", generatedRuleProvidersYaml.join('\n'));


        // ----------------------------------------------------
        // تولید بخش 'rules' (فقط Rule های انتخاب شده توسط کاربر)
        // ----------------------------------------------------
        const customRuleOrder = [
            'rule_download_managers_rp', 'rule_download_rp', 'rule_stremio_rp_full',
            'rule_ban_program_ad_rp', 'rule_ban_ad_rp', 'rule_private_tracker_rp',
            'rule_category_public_tracker_rp', 'rule_malware_rp', 'rule_phishing_rp',
            'rule_cryptominers_rp', 'rule_warninglist_rp', 'rule_ponzi_rp',
            'rule_liteads_rp', 'rule_iran_ads_rp', 'rule_persian_blocker_rp',
            'rule_ads_rp', 'rule_ban_easy_list_rp', 'rule_twitch_rp',
            'rule_telegram_process_exe', 'rule_telegram_process_android', 'rule_telegram_process_web',
            'rule_telegram_rp', 'rule_youtube_rp_full', 'rule_youtube_rp',
            'rule_youtube_music_rp', 'rule_instagram_process_android', 'rule_instagram_rp',
            'rule_ai_deepseek', 'rule_ai_qwen', 'rule_category_ai_rp',
            'rule_censor_rp_full', 'rule_apps_rp', 'rule_iran_rp',
            'rule_arvancloud_rp', 'rule_derakcloud_rp', 'rule_iranserver_rp',
            'rule_parspack_rp', 'rule_irasn_rp', 'rule_ircidr',
            'rule_ir_rp_full', 'rule_category_ir_rp', 'rule_whatsapp_rp',
            'rule_steam_game_rp', 'rule_steam_region_check_rp_full', 'rule_game_rp_full',
            'rule_game_download_rp_full', 'rule_category_games_rp_full', 'rule_xbox_rp_full',
            'rule_discord_rp_full', 'rule_xiaomi_white_list_rp_full', 'rule_xiaomi_ads_rp_full',
            'rule_xiaomi_block_list_rp_full', 'rule_windows_rp_full',
            'rule_cloudflare_rp_full', 'rule_github_rp_full',
            'rule_google_play_process_android_vending', 'rule_google_play_process_android_gms',
            'rule_google_play_rp_full', 'rule_google_rp_full',
            'rule_local_ips_rp', 'rule_private_rp'
        ];

        let selectedRules = [];
        let requiredPgKeys = new Set();

        document.querySelectorAll('#rulesCheckboxes input[type="checkbox"]:checked').forEach(checkbox => {
            const ruleId = checkbox.id;
            const ruleString = checkbox.dataset.ruleString;
            const relatedPgKey = checkbox.dataset.relatedPg;

            selectedRules.push({
                id: ruleId,
                ruleString: ruleString,
                relatedPgKey: relatedPgKey
            });

            if (relatedPgKey) {
                requiredPgKeys.add(relatedPgKey.normalize('NFC').trim()); // Normalize here too
            }
        });

        selectedRules.sort((a, b) => {
            const indexA = customRuleOrder.indexOf(a.id);
            const indexB = customRuleOrder.indexOf(b.id);

            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });

        let finalRulesList = selectedRules.map(rule => `  - ${rule.ruleString}`);

        finalRulesList.push(`  - IP-CIDR,10.10.34.0/24,نوع انتخاب پروکسی 🔀`);
        finalRulesList.push(`  - MATCH,نوع انتخاب پروکسی 🔀`);
        requiredPgKeys.add('نوع انتخاب پروکسی 🔀'.normalize('NFC').trim()); // Normalize here too
        console.log("Final Rules List:", finalRulesList.join('\n'));


        // ----------------------------------------------------
        // تولید بخش 'proxy-groups' (بر اساس Rule ها و گروه‌های پایه)
        // ----------------------------------------------------
        let generatedProxyGroupsYaml = [];

        let allActiveProxyNames = new Set();
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked, #customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const proxyName = checkbox.dataset.name;
            allActiveProxyNames.add(proxyName.normalize('NFC').trim()); // Normalize proxy names too
        });
        console.log("All active proxy names:", Array.from(allActiveProxyNames));


        const baseProxyGroupsKeys = [
            'نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯',
            'بدون فیلترشکن 🛡️', 'قطع اینترنت ⛔', 'اجازه ندادن 🚫'
        ].map(key => key.normalize('NFC').trim()); // Normalize base keys once

        baseProxyGroupsKeys.forEach(key => requiredPgKeys.add(key));

        predefinedProxyGroups.forEach(pg => {
            const normalizedPgYamlKey = typeof pg.yamlKey === 'string' ? pg.yamlKey.normalize('NFC').trim() : null;
            
            if (!normalizedPgYamlKey) {
                return; 
            }

            const isReferencedByActiveRule = selectedRules.some(rule => {
                const normalizedRelatedPgKey = typeof rule.relatedPgKey === 'string' ? rule.relatedPgKey.normalize('NFC').trim() : null;
                return normalizedRelatedPgKey === normalizedPgYamlKey;
            });

            const isBaseGroup = baseProxyGroupsKeys.includes(normalizedPgYamlKey);

            if (isReferencedByActiveRule || isBaseGroup) {
                requiredPgKeys.add(normalizedPgYamlKey);
            }
        });

        console.log("Required Proxy Groups Keys (after processing all rules and base groups):", Array.from(requiredPgKeys));


        const customProxyGroupOrder = [
            'نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯',
            'دانلود منیجر 📥', 'تلگرام 💬', 'یوتیوب ▶️', 'گوگل 🌍', 'واتس آپ 🟢',
            'هوش مصنوعی 🤖', 'اینستاگرام 📸', 'تبلیغات 🆎', 'تبلیغات اپ ها 🍃',
            'رهگیری جهانی 🛑', 'سایتای مخرب ⚠️', 'استیم 🖥️', 'گیم 🎮', 'توییچ 📡',
            'سایتای ایرانی 🇮🇷', 'ویندوز 🧊', 'کلودفلر ☁️', 'گیتهاب 🐙', 'دیسکورد 🗣️',
            'استریمیو 🎬', 'سایتای سانسوری 🤬',
            'بدون فیلترشکن 🛡️', 'قطع اینترنت ⛔', 'اجازه ندادن 🚫'
        ].map(key => key.normalize('NFC').trim()); // Normalize order keys too

        // ساخت finalRequiredGroups از predefinedProxyGroups بر اساس requiredPgKeys
        let finalRequiredGroups = [];
        customProxyGroupOrder.forEach(normalizedKey => { // Now 'key' is already normalized
            if (normalizedKey && requiredPgKeys.has(normalizedKey)) {
                // Find the original object from predefinedProxyGroups
                const foundPg = predefinedProxyGroups.find(pg => typeof pg.yamlKey === 'string' && pg.yamlKey.normalize('NFC').trim() === normalizedKey);
                if (foundPg) {
                    finalRequiredGroups.push(foundPg);
                }
            }
        });

        let sortedRequiredGroups = finalRequiredGroups.sort((a, b) => {
            const indexA = customProxyGroupOrder.indexOf(a.yamlKey.normalize('NFC').trim()); // Normalize for comparison
            const indexB = customProxyGroupOrder.indexOf(b.yamlKey.normalize('NFC').trim()); // Normalize for comparison

            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });
        console.log("Sorted required proxy groups:", sortedRequiredGroups.map(g => g.yamlKey));


        const formatProxyRef = (name) => {
            return `"${name}"`;
        };


        sortedRequiredGroups.forEach(pg => {
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

            const groupProxiesList = [];

            if (pg.yamlKey.normalize('NFC').trim() === 'بدون فیلترشکن 🛡️'.normalize('NFC').trim()) {
                groupProxiesList.push('DIRECT');
            } else if (pg.yamlKey.normalize('NFC').trim() === 'قطع اینترنت ⛔'.normalize('NFC').trim() || pg.yamlKey.normalize('NFC').trim() === 'اجازه ندادن 🚫'.normalize('NFC').trim()) {
                groupProxiesList.push('REJECT');
            } else if (['دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯'].map(k => k.normalize('NFC').trim()).includes(pg.yamlKey.normalize('NFC').trim())) {
                Array.from(allActiveProxyNames).sort().forEach(proxyName => {
                    groupProxiesList.push(formatProxyRef(proxyName));
                });
            } else if (pg.yamlKey.normalize('NFC').trim() === 'نوع انتخاب پروکسی 🔀'.normalize('NFC').trim()) {
                const desiredOrderForSelectProxyType = [
                    'خودکار (بهترین پینگ) 🤖',
                    'پشتیبان (در صورت قطعی) 🧯',
                    'دستی 🤏🏻',
                    'قطع اینترنت ⛔',
                    'بدون فیلترشکن 🛡️'
                ].map(key => key.normalize('NFC').trim()); // Normalize these names too

                desiredOrderForSelectProxyType.forEach(groupName => {
                    if (requiredPgKeys.has(groupName)) {
                        groupProxiesList.push(formatProxyRef(groupName));
                    }
                });
            } else {
                const templateProxies = pg.proxies || [];
                templateProxies.forEach(proxyRef => {
                    const normalizedProxyRef = typeof proxyRef === 'string' ? proxyRef.normalize('NFC').trim() : null;
                    if (normalizedProxyRef && (allActiveProxyNames.has(normalizedProxyRef) || ['DIRECT', 'REJECT'].includes(normalizedProxyRef) || requiredPgKeys.has(normalizedProxyRef))) {
                        groupProxiesList.push(formatProxyRef(proxyRef));
                    }
                });
            }

            groupProxiesList.forEach(p => {
                groupContent += `\n      - ${p}`;
            });

            generatedProxyGroupsYaml.push(groupContent);
        });
        console.log("Generated Proxy Groups YAML:", generatedProxyGroupsYaml.join('\n\n'));


        // ====================================================================
        // ترکیب نهایی تمامی بخش‌های کانفیگ YAML
        // ====================================================================
        let finalConfigOutput = [];

        finalConfigOutput.push(baseConfigContent.trim());

        if (generatedRuleProvidersYaml.length > 0) {
            finalConfigOutput.push('rule-providers:');
            finalConfigOutput.push(generatedRuleProvidersYaml.join('\n'));
        }

        if (generatedProxiesYaml.length > 0) {
            finalConfigOutput.push('proxies:');
            finalConfigOutput.push(generatedProxiesYaml.join('\n\n'));
        }

        if (generatedProxyGroupsYaml.length > 0) {
            finalConfigOutput.push('proxy-groups:');
            finalConfigOutput.push(generatedProxyGroupsYaml.join('\n\n'));
        }

        if (finalRulesList.length > 0) {
            finalConfigOutput.push('rules:');
            finalConfigOutput.push(finalRulesList.join('\n'));
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

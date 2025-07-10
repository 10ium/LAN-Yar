// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // ۰. مت変数とDOM要素
    // =======================================================
    let currentLanIp = '';

    const mainContentWrapper = document.getElementById('mainContentWrapper');
    const footer = document.querySelector('footer');
    const lanIpInput = document.getElementById('lanIpInput');
    const validateLanIpBtn = document.getElementById('validateLanIpBtn');

    // =======================================================
    // 1. IPとポートの検証関数
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
    // 2. IP LANに基づいてコンテンツの有効/無効を切り替える
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
            renderCustomProxies();
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
    // 3. テーマの管理（ダーク/ライトモード）
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
    // 4. コンフィグテンプレートの管理（カスタムセクションは削除）
    // =======================================================

    // =======================================================
    // 5. 定義済みプロキシの管理
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
    // 6. ユーザーカスタムプロキシの管理（ローカルストレージに保存）
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
            addCustomProxyBtn.textContent = 'افزودن سرور';
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
    // 7. ルール、ルールプロバイダー、プロキシグループの管理
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
                providers: [],
                rules: [],
            };
        });

        predefinedRuleProviders.forEach(rp => {
            if (rp.group && categorizedItems[rp.group]) {
                categorizedItems[rp.group].providers.push(rp);
            }
        });

        rulesToGenerate.forEach(rule => {
            if (rule.hidden) return;
            if (rule.group && categorizedItems[rule.group]) {
                categorizedItems[rule.group].rules.push(rule);
            }
        });

        for (const key in categorizedItems) {
            const category = categorizedItems[key];
            if (category.providers.length === 0 && category.rules.length === 0) {
                continue;
            }

            const categorySection = document.createElement('div');
            categorySection.className = 'rule-category-section';

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            categorySection.appendChild(categoryTitle);

            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'proxy-cards-grid';

            category.providers.forEach(rp => {
                const ruleItem = document.createElement('div');
                ruleItem.className = 'rule-item';
                ruleItem.innerHTML = `
                    <input type="checkbox" id="${rp.id}" data-yaml-key="${rp.yamlKey}" data-type="rule-provider" ${rp.defaultChecked ? 'checked' : ''}>
                    <label for="${rp.id}">
                        <h4>${rp.name}</h4>
                        <p class="description">${rp.description || ''}</p>
                    </label>
                `;
                categoryGrid.appendChild(ruleItem);
            });

            category.rules.forEach(rule => {
                const ruleItem = document.createElement('div');
                ruleItem.className = 'rule-item';
                ruleItem.innerHTML = `
                    <input type="checkbox" id="${rule.id}" data-rule-string="${rule.ruleString}" data-type="rule" ${rule.defaultChecked ? 'checked' : ''}>
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
    // 8. 最終的なMiHoMoコンフィグの生成とダウンロード
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

        let baseConfigObject;

        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        const defaultTemplateUrl = baseUrl + 'config-templates/default-mihomo-template.yaml';

        try {
            const response = await fetch(defaultTemplateUrl);
            if (!response.ok) {
                throw new Error(`خطا در بارگذاری تمپلت پیش‌فرض: ${response.statusText || 'Failed to fetch'}. مطمئن شوید فایل default-mihomo-template.yaml در مسیر درست قرار دارد و دسترسی به آن امکان‌پذیر است.`);
            }
            const baseConfigContent = await response.text();
            baseConfigObject = jsyaml.load(baseConfigContent);
        } catch (error) {
            alert(`خطا در بارگذاری یا پارس کردن تمپلت پیش‌فرض: ${error.message}`);
            outputConfigTextarea.value = '';
            return;
        }


        // ----------------------------------------------------
        // 'proxies'セクションの生成
        // ----------------------------------------------------
        let finalProxies = [];
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            finalProxies.push({
                name: checkbox.dataset.name,
                type: checkbox.dataset.type,
                server: currentLanIp,
                port: parseInt(checkbox.dataset.port),
                udp: checkbox.dataset.udp === 'true'
            });
        });

        document.querySelectorAll('#customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            finalProxies.push({
                name: checkbox.dataset.name,
                type: checkbox.dataset.type,
                server: currentLanIp,
                port: parseInt(checkbox.dataset.port),
                udp: checkbox.dataset.udp === 'true'
            });
        });

        if (finalProxies.length === 0) {
            finalProxies.push({ name: "DIRECT", type: "direct" });
            finalProxies.push({ name: "REJECT", type: "reject" });
        } else {
            const hasDirect = finalProxies.some(p => p.name === "DIRECT");
            const hasReject = finalProxies.some(p => p.name === "REJECT");
            if (!hasDirect) finalProxies.push({ name: "DIRECT", type: "direct" });
            if (!hasReject) finalProxies.push({ name: "REJECT", type: "reject" });
        }
        baseConfigObject.proxies = finalProxies;


        // ----------------------------------------------------
        // 'rule-providers'セクションの生成
        // ----------------------------------------------------
        let finalRuleProviders = {};
        let selectedRpKeys = new Set();
        document.querySelectorAll('#rulesCheckboxes input[data-type="rule-provider"]:checked').forEach(checkbox => {
            selectedRpKeys.add(checkbox.dataset.yamlKey);
        });

        predefinedRuleProviders.forEach(rp => {
            if (selectedRpKeys.has(rp.yamlKey)) {
                finalRuleProviders[rp.yamlKey] = {
                    type: rp.type || 'http',
                    behavior: rp.behavior,
                    url: rp.url,
                    interval: 86400,
                    path: `./ruleset/${rp.yamlKey}.yaml`
                };
            }
        });
        baseConfigObject['rule-providers'] = finalRuleProviders;


        // ----------------------------------------------------
        // 'rules'セクションの生成
        // ----------------------------------------------------
        let finalRulesList = [];
        let selectedRuleStrings = new Set();
        document.querySelectorAll('#rulesCheckboxes input[data-type="rule"]:checked').forEach(checkbox => {
            selectedRuleStrings.add(checkbox.dataset.ruleString);
        });

        const alwaysIncludeRules = ['MATCH,نوع انتخاب پروکسی 🔀'];
        alwaysIncludeRules.forEach(rule => selectedRuleStrings.add(rule));


        rulesToGenerate.forEach(rule => {
            if (!selectedRuleStrings.has(rule.ruleString)) {
                return;
            }

            let isRelatedRpActive = true;
            const rpMatch = rule.ruleString.match(/^RULE-SET,([^,]+),/);
            if (rpMatch) {
                const rpKey = rpMatch[1].trim();
                if (!selectedRpKeys.has(rpKey)) {
                    isRelatedRpActive = false;
                }
            }

            if (isRelatedRpActive) {
                finalRulesList.push(rule.ruleString);
            }
        });
        baseConfigObject.rules = finalRulesList;


        // ----------------------------------------------------
        // 'proxy-groups'セクションの生成
        // ----------------------------------------------------
        let finalProxyGroups = [];
        let finalProxyGroupNamesToInclude = new Set();

        const baseProxyGroups = predefinedProxyGroups.filter(pg =>
            ['نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯', 'بدون فیلترشکن 🛡️', 'قطع اینترنت ⛔', 'اجازه ندادن 🚫'].includes(pg.yamlKey)
        );
        baseProxyGroups.forEach(pg => finalProxyGroupNamesToInclude.add(pg.yamlKey));

        baseConfigObject.rules.forEach(ruleString => {
            const ruleTargetGroupMatch = ruleString.match(/,([^,]+)$/);
            if (ruleTargetGroupMatch) {
                const targetGroupName = ruleTargetGroupMatch[1].trim();
                finalProxyGroupNamesToInclude.add(targetGroupName);
            }
        });

        let sortedActiveGroups = predefinedProxyGroups.filter(pg => finalProxyGroupNamesToInclude.has(pg.yamlKey));

        sortedActiveGroups.sort((a, b) => {
            if (a.yamlKey === 'نوع انتخاب پروکسی 🔀') return -1;
            if (b.yamlKey === 'نوع انتخاب پروکسی 🔀') return 1;
            return 0;
        });


        sortedActiveGroups.forEach(pg => {
            let groupObj = {
                name: pg.yamlKey,
                type: pg.type
            };
            if (pg.icon) groupObj.icon = pg.icon;
            if (pg.url) groupObj.url = pg.url;
            if (pg.interval) groupObj.interval = pg.interval;
            if (pg.timeout) groupObj.timeout = pg.timeout;
            if (pg.tolerance) groupObj.tolerance = pg.tolerance;
            if (pg.max_failed_times) groupObj.max_failed_times = pg.max_failed_times;
            if (pg.lazy !== undefined) groupObj.lazy = pg.lazy;
            if (pg.hidden !== undefined) groupObj.hidden = pg.hidden;

            let groupProxies = [];
            if (['نوع انتخاب پروکسی 🔀', 'دستی 🤏🏻', 'خودکار (بهترین پینگ) 🤖', 'پشتیبان (در صورت قطعی) 🧯'].includes(pg.yamlKey)) {
                groupProxies.push("DIRECT", "REJECT");
                finalProxies.forEach(p => {
                    if (p.name !== "DIRECT" && p.name !== "REJECT") {
                        groupProxies.push(p.name);
                    }
                });
            } else if (pg.proxies && pg.proxies.length > 0) {
                pg.proxies.forEach(pName => {
                    if (activeProxyNames.has(pName) || pName === 'DIRECT' || pName === 'REJECT') {
                        groupProxies.push(pName);
                    }
                });
                if (groupProxies.length === 0 && pg.type !== 'reject' && pg.type !== 'direct') {
                     groupProxies.push("DIRECT", "REJECT");
                }

            } else {
                if (pg.type !== 'reject' && pg.type !== 'direct') {
                    groupProxies.push("DIRECT", "REJECT");
                }
            }
            groupObj.proxies = groupProxies;
            finalProxyGroups.push(groupObj);
        });
        baseConfigObject['proxy-groups'] = finalProxyGroups;


        // ====================================================================
        // 最終的な結合とYAMLへの変換
        // ====================================================================
        const finalYamlOutput = jsyaml.dump(baseConfigObject, { indent: 2, lineWidth: -1 });

        outputConfigTextarea.value = finalYamlOutput.trim();
        downloadConfigBtn.style.display = 'block';
    });


    // =======================================================
    // 9. コンフィグを.yamlファイルとしてダウンロードする機能
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
    // 10. ページ上下へのスクロール機能
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
    // 11. ページロード時の初期関数呼び出し
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
} // ここでmainAppLogic関数の定義が終わる

// DOMが完全に読み込まれてからmainAppLogicを実行する（index.htmlで呼び出される）
// このファイル自体はグローバル関数mainAppLogicを定義するだけ

// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // ۰. متغیرهای سراسری و عناصر DOM اصلی
    // =======================================================
    let currentLanIps = []; // تغییر به آرایه برای نگهداری چندین IP

    const mainContentWrapper = document.getElementById('mainContentWrapper');
    const footer = document.querySelector('footer');
    const lanIpInput = document.getElementById('lanIpInput'); // اکنون textarea است
    const validateLanIpBtn = document.getElementById('validateLanIpBtn');

    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');

    // متغیر برای انتخاب قالب قوانین
    const templateFullIranRulesRadio = document.getElementById('templateFullIranRules');
    const templateIranOnlyRulesRadio = document.getElementById('templateIranOnlyRules');
    const templateNoRulesRadio = document.getElementById('templateNoRules');

    /**
     * نمایش پوشش بارگذاری با یک پیام مشخص.
     * @param {string} message - پیامی که باید نمایش داده شود.
     */
    function showLoading(message = 'در حال پردازش...') {
        loadingMessage.textContent = message;
        loadingOverlay.classList.remove('hidden');
    }

    /**
     * پنهان کردن پوشش بارگذاری.
     */
    function hideLoading() {
        loadingOverlay.classList.add('hidden');
    }

    // نمایش پوشش بارگذاری در ابتدای لود شدن صفحه
    showLoading('در حال بارگذاری سایت...');

    /**
     * نمایش یک پیام سفارشی به کاربر (جایگزین alert).
     * @param {string} message - متن پیام.
     * @param {'info'|'success'|'error'} type - نوع پیام برای استایل‌دهی (info, success, error).
     * @param {number} duration - مدت زمان نمایش پیام به میلی‌ثانیه.
     */
    function showCustomMessage(message, type = 'info', duration = 3000) {
        const messageBox = document.createElement('div');
        messageBox.className = `info-message ${type}-message`; // info-message از قبل استایل دارد
        messageBox.textContent = message;

        // اضافه کردن پیام به یک مکان ثابت، مثلاً بعد از هدر یا قبل از محتوای اصلی
        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.after(messageBox);
        } else {
            document.body.prepend(messageBox); // اگر هدر نیست، به ابتدای بادی اضافه کن
        }

        setTimeout(() => {
            messageBox.remove();
        }, duration);
    }

    /**
     * نمایش یک پنجره تأیید سفارشی (جایگزین confirm).
     * @param {string} message - متن سوال تأیید.
     * @param {function(boolean): void} callback - تابعی که پس از تأیید یا لغو فراخوانی می‌شود (true برای تأیید، false برای لغو).
     */
    function showCustomConfirm(message, callback) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
            z-index: 10000;
        `;
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: var(--panel-bg-color); padding: 25px; border-radius: 10px;
            box-shadow: var(--box-shadow); text-align: center; max-width: 400px;
            color: var(--text-color);
        `;
        modalContent.innerHTML = `
            <p>${message}</p>
            <button id="confirmYes" style="margin-left: 10px;">بله</button>
            <button id="confirmNo">خیر</button>
        `;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.getElementById('confirmYes').onclick = () => {
            modal.remove();
            callback(true);
        };
        document.getElementById('confirmNo').onclick = () => {
            modal.remove();
            callback(false);
        };
    }

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
        const ipsInput = lanIpInput.value.trim();
        const ipsArray = ipsInput.split(/[\n,]/).map(ip => ip.trim()).filter(ip => ip !== ''); // تقسیم بر اساس newline یا کاما

        let allIpsValid = true;
        if (ipsArray.length === 0) {
            allIpsValid = false;
        } else {
            for (const ip of ipsArray) {
                if (!isValidIP(ip)) {
                    allIpsValid = false;
                    break;
                }
            }
        }

        if (allIpsValid) {
            currentLanIps = ipsArray;
            localStorage.setItem('lanIps', JSON.stringify(ipsArray)); // ذخیره آرایه IP ها
            toggleContentEnabled(true);
            showCustomMessage(`آدرس‌های IP LAN شما (${ipsArray.join(', ')}) با موفقیت تأیید شدند. حالا می‌توانید ادامه دهید.`, 'success');
            renderPredefinedProxies();
            loadCustomProxies(); // نیاز به بازسازی پروکسی‌های سفارشی با IPهای جدید
        } else {
            currentLanIps = [];
            localStorage.removeItem('lanIps');
            toggleContentEnabled(false);
            showCustomMessage('لطفاً حداقل یک آدرس IP معتبر LAN وارد کنید تا ادامه دهید.', 'error');
            lanIpInput.focus();
        }
    });

    lanIpInput.addEventListener('input', () => {
        // هر تغییری در ورودی IP، محتوا را غیرفعال می‌کند تا کاربر مجدداً تأیید کند
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
    // ۴. مدیریت پروکسی‌های پیش‌فرض
    // =======================================================
    const predefinedProxiesList = document.getElementById('predefinedProxiesList');
    const selectAllPredefinedProxiesBtn = document.getElementById('selectAllPredefinedProxies');
    const deselectAllPredefinedProxiesBtn = document.getElementById('deselectAllPredefinedProxies');

    function renderPredefinedProxies() {
        predefinedProxiesList.innerHTML = '';
        if (currentLanIps.length === 0) {
            predefinedProxiesList.innerHTML = `<p class="info-message">لطفاً ابتدا آدرس‌های IP دستگاه VPN (LAN) را در بخش ۱ وارد کنید.</p>`;
            return;
        }

        currentLanIps.forEach(ip => {
            predefinedProxies.forEach(proxyTemplate => {
                // استفاده از نام پروکسی اصلی + IP برای uniqueId و uniqueName
                const uniqueId = `${proxyTemplate.id}_${ip.replace(/\./g, '_')}`;
                const uniqueName = `${proxyTemplate.name} (${ip})`;
                
                const proxyCard = document.createElement('div');
                proxyCard.className = 'proxy-card';
                proxyCard.innerHTML = `
                    <input type="checkbox" id="${uniqueId}"
                            data-ip="${ip}"
                            data-port="${proxyTemplate.port}"
                            data-name="${uniqueName}"
                            data-type="${proxyTemplate.type}"
                            data-udp="${proxyTemplate.udp === true ? 'true' : 'false'}"
                            checked>
                    <label for="${uniqueId}">
                        <h4>${uniqueName}</h4>
                        <p>IP: <code>${ip}</code> | پورت: <code>${proxyTemplate.port}</code></p>
                        ${proxyTemplate.description ? `<p class="description">${proxyTemplate.description}</p>` : ''}
                    </label>
                `;
                predefinedProxiesList.appendChild(proxyCard);
            });
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
    // ۵. مدیریت پروکسی‌های کاستوم کاربر (ذخیره در localStorage کاربر)
    // =======================================================
    const customPortInput = document.getElementById('customPortInput');
    const customNameInput = document.getElementById('customNameInput');
    const customTypeInput = document.getElementById('customTypeInput');
    const addCustomProxyBtn = document.getElementById('addCustomProxyBtn');
    const customProxiesList = document.getElementById('customProxiesList');
    const noCustomConfigsMessage = document.getElementById('noCustomConfigsMessage');

    let userCustomProxies = []; // این آرایه فقط نام، پورت و نوع را ذخیره می‌کند، IP در زمان رندر/تولید اضافه می‌شود

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
            if (currentLanIps.length === 0) {
                customProxiesList.innerHTML = `<p class="info-message">برای نمایش پروکسی‌های کاستوم، لطفاً ابتدا آدرس‌های IP دستگاه VPN (LAN) را در بخش ۱ وارد کنید.</p>`;
                return;
            }

            userCustomProxies.forEach((proxyTemplate, originalIndex) => {
                currentLanIps.forEach(ip => {
                    const uniqueId = `custom_${originalIndex}_${ip.replace(/\./g, '_')}`; // شناسه منحصر به فرد
                    const uniqueName = `${proxyTemplate.name} (${ip})`; // نام منحصر به فرد
                    
                    const proxyCard = document.createElement('div');
                    proxyCard.className = 'proxy-card';
                    proxyCard.innerHTML = `
                        <input type="checkbox" id="${uniqueId}"
                                data-ip="${ip}"
                                data-port="${proxyTemplate.port}"
                                data-name="${uniqueName}"
                                data-type="${proxyTemplate.type}"
                                data-udp="${proxyTemplate.udp === true ? 'true' : 'false'}"
                                checked>
                        <label for="${uniqueId}">
                            <h4>${uniqueName}</h4>
                            <p>IP: <code>${ip}</code> | پورت: <code>${proxyTemplate.port}</code></p>
                            <p class="description">نوع: <code>${proxyTemplate.type.toUpperCase()}</code></p>
                        </label>
                        <div class="actions">
                            <button class="edit-custom-proxy-btn" data-original-index="${originalIndex}" title="ویرایش">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-custom-proxy-btn" data-original-index="${originalIndex}" title="حذف">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `;
                    customProxiesList.appendChild(proxyCard);
                });
            });
        }

        // رویدادها را به دکمه‌های ویرایش و حذف اضافه کنید
        document.querySelectorAll('.edit-custom-proxy-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const originalIndex = event.currentTarget.dataset.originalIndex;
                editCustomProxy(parseInt(originalIndex));
            });
        });

        document.querySelectorAll('.delete-custom-proxy-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const originalIndex = event.currentTarget.dataset.originalIndex;
                deleteCustomProxy(parseInt(originalIndex));
            });
        });
    }

    addCustomProxyBtn.addEventListener('click', () => {
        const port = customPortInput.value.trim();
        const name = customNameInput.value.trim();
        const type = customTypeInput.value;

        if (!isValidPort(port)) {
            showCustomMessage("لطفاً یک شماره پورت معتبر بین 1 تا 65535 وارد کنید.", 'error');
            customPortInput.focus();
            return;
        }

        if (name === "") {
            showCustomMessage("لطفاً یک نام برای سرور کاستوم وارد کنید.", 'error');
            customNameInput.focus();
            return;
        }

        if (currentLanIps.length === 0) {
            showCustomMessage("لطفاً ابتدا آدرس‌های IP دستگاه VPN (LAN) را در بخش ۱ وارد و تأیید کنید.", 'error');
            lanIpInput.focus();
            return;
        }

        // اگر در حال ویرایش هستیم
        if (addCustomProxyBtn.dataset.editingIndex !== undefined) {
            const index = parseInt(addCustomProxyBtn.dataset.editingIndex);
            userCustomProxies[index] = { port, name, type, udp: true };
            delete addCustomProxyBtn.dataset.editingIndex; // حذف حالت ویرایش
            addCustomProxyBtn.textContent = 'افزودن سرور'; // بازگرداندن متن دکمه
        } else {
            // در غیر این صورت، پروکسی جدید اضافه کن
            userCustomProxies.push({ port, name, type, udp: true });
        }

        saveCustomProxies();
        renderCustomProxies(); // بازسازی لیست برای نمایش پروکسی‌های جدید/ویرایش شده با تمام IPها

        // پاک کردن فیلدها
        customPortInput.value = '';
        customNameInput.value = '';
        customTypeInput.value = 'socks5';
    });

    function editCustomProxy(originalIndex) {
        const proxy = userCustomProxies[originalIndex];
        customPortInput.value = proxy.port;
        customNameInput.value = proxy.name;
        customTypeInput.value = proxy.type || 'socks5';

        addCustomProxyBtn.textContent = 'به‌روزرسانی سرور';
        addCustomProxyBtn.dataset.editingIndex = originalIndex; // ذخیره ایندکس اصلی برای ویرایش
        customPortInput.focus();
    }

    function deleteCustomProxy(originalIndex) {
        showCustomConfirm("آیا از حذف این سرور کاستوم مطمئن هستید؟", (result) => {
            if (result) {
                userCustomProxies.splice(originalIndex, 1);
                saveCustomProxies();
                renderCustomProxies();
            }
        });
    }

    // =======================================================
    // ۶. تولید و دانلود کانفیگ نهایی MiHoMo
    // =======================================================
    const generateConfigBtn = document.getElementById('generateConfigBtn');
    const outputConfigTextarea = document.getElementById('outputConfig');
    const downloadConfigBtn = document.getElementById('downloadConfigBtn');

    generateConfigBtn.addEventListener('click', async () => {
        showLoading('در حال تولید کانفیگ... لطفاً صبر کنید.');
        outputConfigTextarea.value = '';
        downloadConfigBtn.style.display = 'none';

        if (currentLanIps.length === 0) {
            showCustomMessage('لطفاً ابتدا آدرس‌های IP دستگاه VPN (LAN) را در بخش ۱ وارد و تأیید کنید.', 'error');
            outputConfigTextarea.value = '';
            lanIpInput.focus();
            hideLoading();
            return;
        }

        let templateContent = '';
        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        let selectedTemplateFile = '';
        const selectedTemplate = document.querySelector('input[name="configTemplate"]:checked').value;

        if (selectedTemplate === 'full-iran-rules') {
            selectedTemplateFile = 'full-rule-template.yaml';
        } else if (selectedTemplate === 'iran-only-rules') {
            selectedTemplateFile = 'iran-template.yaml';
        } else if (selectedTemplate === 'no-rules') {
            selectedTemplateFile = 'no-rule-template.yaml';
        }

        const templatePath = baseUrl + 'config-templates/' + selectedTemplateFile;

        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`خطا در بارگذاری تمپلت: ${response.statusText || 'Failed to fetch'}. مطمئن شوید فایل ${selectedTemplateFile} در مسیر درست قرار دارد و دسترسی به آن امکان‌پذیر است.`);
            }
            templateContent = await response.text();
            console.log(`Template ${selectedTemplateFile} loaded successfully.`);
        } catch (error) {
            showCustomMessage(`خطا در بارگذاری تمپلت: ${error.message}`, 'error', 5000);
            outputConfigTextarea.value = '';
            hideLoading();
            return;
        }

        // ----------------------------------------------------
        // تولید بخش 'proxies' (بر اساس انتخاب کاربر در UI و تمامی IPها)
        // ----------------------------------------------------
        let generatedProxiesYaml = [];
        const formatProxyRef = (name) => {
            return `"${name}"`;
        };

        let allSelectedProxyNames = new Set(); // برای نگهداری نام‌های منحصر به فرد پروکسی‌های فعال

        // جمع‌آوری پروکسی‌های پیش‌فرض برای هر IP
        document.querySelectorAll('#predefinedProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const ip = checkbox.dataset.ip;
            const proxyName = checkbox.dataset.name; // نام کامل شامل IP
            const proxyType = checkbox.dataset.type;
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp === 'true';

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${ip}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
            allSelectedProxyNames.add(proxyName);
        });

        // جمع‌آوری پروکسی‌های کاستوم برای هر IP
        document.querySelectorAll('#customProxiesList input[type="checkbox"]:checked').forEach(checkbox => {
            const ip = checkbox.dataset.ip;
            const proxyName = checkbox.dataset.name; // نام کامل شامل IP
            const proxyType = checkbox.dataset.type;
            const proxyPort = checkbox.dataset.port;
            const proxyUdp = checkbox.dataset.udp === 'true';

            let proxyYaml = `  - name: "${proxyName}"\n    type: ${proxyType}\n    server: ${ip}\n    port: ${proxyPort}`;
            if (proxyType === 'socks5' || proxyType === 'http') {
                proxyYaml += `\n    udp: ${proxyUdp}`;
            }
            generatedProxiesYaml.push(proxyYaml);
            allSelectedProxyNames.add(proxyName);
        });

        console.log("Generated Proxies YAML:", generatedProxiesYaml.join('\n\n'));

        // ----------------------------------------------------
        // جایگزینی PLACEHOLDER_PROXIES_LIST در proxy-groups
        // ----------------------------------------------------
        const sortedActiveProxyNames = Array.from(allSelectedProxyNames).sort().map(formatProxyRef);
        // اطمینان از اینکه لیست پروکسی‌ها به درستی با ایندنت (فاصله) برای YAML فرمت شود
        // اگر لیست خالی باشد، یک خط خالی با دو فاصله اضافه کنید تا ساختار YAML بهم نریزد
        const proxyListYaml = sortedActiveProxyNames.length > 0 
            ? sortedActiveProxyNames.map(name => `      - ${name}`).join('\n')
            : '      # No proxies selected for these groups'; // یک کامنت یا خط خالی برای زمانی که پروکسی انتخاب نشده

        // استفاده از یک RegExp برای جایگزینی تمام رخدادهای PLACEHOLDER_PROXIES_LIST
        // مهم: عبارت منظم باید دقیقاً الگوی placeholder را دنبال کند.
        // /g برای جایگزینی تمامی رخدادها و /m برای فعال کردن حالت چند خطی (که ^ و $ روی خطوط کار کنند)
        templateContent = templateContent.replace(/^- PLACEHOLDER_PROXIES_LIST/gm, proxyListYaml);


        // ----------------------------------------------------
        // ترکیب نهایی تمامی بخش‌های کانفیگ YAML
        // ----------------------------------------------------
        let finalConfigOutput = [];

        // پیدا کردن محل درج proxies
        // از یک Placeholder جدید برای بخش proxies: در تمپلت استفاده می‌کنیم تا جایگذاری دقیق‌تر باشد
        // در فایل‌های template باید proxies: را به شکل زیر تغییر دهید:
        // proxies:
        //   DYNAMIC_PROXIES_SECTION_PLACEHOLDER

        // ابتدا بخش proxies خود را به تمپلت اضافه کنید.
        const proxiesPlaceholder = 'DYNAMIC_PROXIES_SECTION_PLACEHOLDER';
        const proxiesSectionContent = generatedProxiesYaml.length > 0
            ? generatedProxiesYaml.join('\n\n')
            : '  # No proxies selected.'; // اگر هیچ پروکسی انتخاب نشد

        if (templateContent.includes(proxiesPlaceholder)) {
            templateContent = templateContent.replace(proxiesPlaceholder, proxiesSectionContent);
        } else {
            // اگر placeholder پیدا نشد، سعی کنید به صورت دستی جایگذاری کنید (رویکرد قبلی)
            // این بخش به دلیل تغییرات جدید در templateContent که از قبل proxies: را دارد، ممکن است پیچیده شود.
            // بهترین راه این است که placeholder را در تمپلت خود قرار دهید.
            // برای جلوگیری از خطا، اطمینان حاصل شود که 'proxies:' در ابتدای یک خط باشد.
            const lines = templateContent.split('\n');
            let foundProxiesHeader = false;
            let inserted = false;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === 'proxies:') {
                    lines.splice(i + 1, 0, proxiesSectionContent);
                    inserted = true;
                    break;
                }
            }
            if(inserted){
                templateContent = lines.join('\n');
            } else {
                 // اگر همچنان جای proxies: یافت نشد، آن را به انتها اضافه کنید
                 if (generatedProxiesYaml.length > 0) {
                     templateContent += '\n\nproxies:\n' + proxiesSectionContent;
                 }
            }
        }
        
        outputConfigTextarea.value = templateContent.trim(); // دیگر نیازی به join('\n\n') نیست
        downloadConfigBtn.style.display = 'block';
        hideLoading();
    });

    // =======================================================
    // ۷. قابلیت دانلود کانفیگ به عنوان فایل .yaml
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
    // ۸. قابلیت اسکرول به بالا و پایین صفحه
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
    // ۹. فراخوانی اولیه توابع هنگام بارگذاری صفحه
    // =======================================================
    loadTheme();

    const savedLanIps = localStorage.getItem('lanIps'); // خواندن آرایه IP ها
    if (savedLanIps) {
        try {
            const parsedIps = JSON.parse(savedLanIps);
            if (Array.isArray(parsedIps) && parsedIps.every(isValidIP)) {
                lanIpInput.value = parsedIps.join('\n'); // نمایش IP ها در textarea
                currentLanIps = parsedIps;
                toggleContentEnabled(true);
            } else {
                localStorage.removeItem('lanIps'); // اگر فرمت ذخیره شده خراب است، پاک کن
                toggleContentEnabled(false);
            }
        } catch (e) {
            console.error("خطا در بارگذاری IP های LAN از Local Storage:", e);
            localStorage.removeItem('lanIps');
            toggleContentEnabled(false);
        }
    } else {
        toggleContentEnabled(false);
    }

    renderPredefinedProxies();
    loadCustomProxies();
    hideLoading();
});

// assets/js/rulesAndGroups.js

// **Rule Providers (قوانین ارائه‌دهنده)**
// این آرایه شامل تعریف Rule Provider هایی است که در بخش `rule-providers:` کانفیگ MiHoMo ظاهر می‌شوند.
const predefinedRuleProviders = [
    { id: 'rp_category_public_tracker', name: 'رهگیر عمومی تورنت', yamlKey: 'category_public_tracker', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/category-public-tracker.yaml', behavior: 'domain', group: 'Ads & Tracking' },
    { id: 'rp_iran_ads', name: 'حذف تبلیغات ایرانی', yamlKey: 'iran_ads', defaultChecked: true, url: 'https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/clash_rules_ads.yaml', behavior: 'domain', group: 'Ads & Tracking' },
    { id: 'rp_persian_blocker', name: 'بلاک‌کننده فارسی (جامع)', yamlKey: 'PersianBlocker', defaultChecked: true, url: 'https://github.com/MasterKia/iran-hosted-domains/releases/latest/download/clash_rules_ads.yaml', behavior: 'domain', group: 'Ads & Tracking' },
    { id: 'rp_youtube', name: 'قوانین یوتیوب', yamlKey: 'youtube', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/youtube.yaml', behavior: 'domain', group: 'Streaming & Social' },
    { id: 'rp_telegram', name: 'قوانین تلگرام', yamlKey: 'telegram', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/telegram.yaml', behavior: 'domain', group: 'Streaming & Social' },
    { id: 'rp_twitch', name: 'قوانین توییچ', yamlKey: 'twitch', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/twitch.yaml', behavior: 'domain', group: 'Streaming & Social' },
    { id: 'rp_censor', name: 'قوانین سانسور (دور زدن فیلترینگ)', yamlKey: 'censor', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/main/censor.yaml', behavior: 'classical', group: 'Security & Control' },
    { id: 'rp_local_ips', name: 'IPهای داخلی', yamlKey: 'local_ips', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/local-ips.yaml', behavior: 'ipcidr', group: 'Local Access' },
    { id: 'rp_private', name: 'قوانین خصوصی', yamlKey: 'private', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/private.yaml', behavior: 'domain', group: 'Security & Control' },
    { id: 'rp_category_ir', name: 'دامنه‌های ایرانی (جامع)', yamlKey: 'category_ir', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/category-ir.yaml', behavior: 'domain', group: 'Iranian Services' },
    { id: 'rp_iran', name: 'قوانین ایران', yamlKey: 'iran', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/main/iran.yaml', behavior: 'classical', group: 'Iranian Services' },
    { id: 'rp_steam', name: 'قوانین استیم', yamlKey: 'steam', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/main/steam.yaml', behavior: 'classical', group: 'Gaming' },
    { id: 'rp_game', name: 'قوانین عمومی بازی', yamlKey: 'game', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/game.yaml', behavior: 'classical', group: 'Gaming' },
    { id: 'rp_category_games', name: 'دسته‌بندی بازی‌ها', yamlKey: 'category-games', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/category-games.yaml', behavior: 'domain', group: 'Gaming' },
    { id: 'rp_ir', name: 'قوانین IR (Chocolate4U)', yamlKey: 'ir', defaultChecked: true, url: 'https://github.com/chocolate4u/Iran-clash-rules/releases/latest/download/ir.yaml', behavior: 'domain', group: 'Iranian Services' },
    { id: 'rp_apps', name: 'قوانین اپلیکیشن‌ها (Chocolate4U)', yamlKey: 'apps', defaultChecked: true, url: 'https://github.com/chocolate4u/Iran-clash-rules/releases/latest/download/apps.yaml', behavior: 'classical', group: 'Iranian Services' },
    { id: 'rp_ircidr', name: 'IPهای داخلی ایران (Chocolate4U)', yamlKey: 'ircidr', defaultChecked: true, url: 'https://github.com/chocolate4u/Iran-clash-rules/releases/latest/download/ircidr.yaml', behavior: 'ipcidr', group: 'Iranian Services' },
    { id: 'rp_irasn', name: 'ASNهای ایرانی (Chocolate4U)', yamlKey: 'irasn', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/irasn.yaml', behavior: 'classical', group: 'Iranian Services' },
    { id: 'rp_arvancloud', name: 'آروان کلود (Chocolate4U)', yamlKey: 'arvancloud', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/arvancloud.yaml', behavior: 'ipcidr', group: 'Iranian Services' },
    { id: 'rp_derakcloud', name: 'درک کلود (Chocolate4U)', yamlKey: 'derakcloud', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/derakcloud.yaml', behavior: 'ipcidr', group: 'Iranian Services' },
    { id: 'rp_iranserver', name: 'ایران سرور (Chocolate4U)', yamlKey: 'iranserver', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/iranserver.yaml', behavior: 'ipcidr', group: 'Iranian Services' },
    { id: 'rp_parspack', name: 'پارسپک (Chocolate4U)', yamlKey: 'parspack', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/parspack.yaml', behavior: 'ipcidr', group: 'Iranian Services' },
    { id: 'rp_malware', name: 'مخرب و بدافزار', yamlKey: 'malware', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/malware.yaml', behavior: 'domain', group: 'Security & Control' },
    { id: 'rp_phishing', name: 'فیشینگ', yamlKey: 'phishing', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/phishing.yaml', behavior: 'domain', group: 'Security & Control' },
    { id: 'rp_cryptominers', name: 'کریپتوماینرها', yamlKey: 'cryptominers', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/cryptominers.yaml', behavior: 'domain', group: 'Security & Control' },
    { id: 'rp_ads', name: 'تبلیغات عمومی', yamlKey: 'ads', defaultChecked: true, url: 'https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/category-ads-all.yaml', behavior: 'domain', group: 'Ads & Tracking' },
    { id: 'rp_download_managers', name: 'دانلود منیجرها', yamlKey: 'DownloadManagers', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/DownloadManagers.yaml', behavior: 'classical', group: 'Downloads' },
    { id: 'rp_ban_program_ad', name: 'تبلیغات نرم‌افزارها', yamlKey: 'BanProgramAD', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/BanProgramAD.yaml', behavior: 'classical', group: 'Ads & Tracking' },
    { id: 'rp_ban_ad', name: 'بلاک تبلیغات عمومی (جامع)', yamlKey: 'BanAD', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/BanAD.yaml', behavior: 'classical', group: 'Ads & Tracking' },
    { id: 'rp_private_tracker', name: 'رهگیر خصوصی', yamlKey: 'PrivateTracker', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/PrivateTracker.yaml', behavior: 'classical', group: 'Ads & Tracking' },
    { id: 'rp_ban_easy_list', name: 'بلاک لیست EasyList', yamlKey: 'BanEasyList', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/BanEasyList.yaml', behavior: 'classical', group: 'Ads & Tracking' },
    { id: 'rp_download', name: 'قوانین دانلود (جامع)', yamlKey: 'Download', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/Download.yaml', behavior: 'classical', group: 'Downloads' },
    { id: 'rp_game_download', name: 'دانلود بازی', yamlKey: 'GameDownload', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/GameDownload.yaml', behavior: 'classical', group: 'Gaming' },
    { id: 'rp_steam_region_check', name: 'چک منطقه استیم', yamlKey: 'SteamRegionCheck', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/SteamRegionCheck.yaml', behavior: 'classical', group: 'Gaming' },
    { id: 'rp_xbox', name: 'قوانین ایکس‌باکس', yamlKey: 'Xbox', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/Xbox.yaml', behavior: 'classical', group: 'Gaming' },
    { id: 'rp_youtube_music', name: 'یوتیوب موزیک', yamlKey: 'YouTubeMusic', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/YouTubeMusic.yaml', behavior: 'classical', group: 'Streaming & Social' },
    { id: 'rp_youtube_full', name: 'یوتیوب (جامع)', yamlKey: 'YouTube', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/list/YouTube.yaml', behavior: 'classical', group: 'Streaming & Social' },
    { id: 'rp_ponzi', name: 'سایت‌های پانزی', yamlKey: 'Ponzi', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/Ponzi.yaml', behavior: 'classical', group: 'Security & Control' },
    { id: 'rp_warninglist', name: 'لیست هشدار', yamlKey: 'warninglist', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/mihomo_rule/refs/heads/main/warning-list.yaml', behavior: 'classical', group: 'Security & Control' },
    { id: 'rp_google', name: 'قوانین گوگل', yamlKey: 'google', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/google.yaml', behavior: 'domain', group: 'General Web Services' },
    { id: 'rp_google_play', name: 'گوگل پلی', yamlKey: 'google-play', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/google-play.yaml', behavior: 'domain', group: 'General Web Services' },
    { id: 'rp_xiaomi_ads', name: 'تبلیغات شیائومی', yamlKey: 'xiaomi-ads', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/xiaomi-ads.yaml', behavior: 'domain', group: 'Device Specific' },
    { id: 'rp_xiaomi_block_list', name: 'بلاک لیست شیائومی', yamlKey: 'xiaomi_block_list', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/xiaomi_block_list.yaml', behavior: 'domain', group: 'Device Specific' },
    { id: 'rp_xiaomi_white_list', name: 'وایت لیست شیائومی', yamlKey: 'xiaomi_white_list', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/xiaomi_white_list.yaml', behavior: 'classical', group: 'Device Specific' },
    { id: 'rp_cloudflare', name: 'قوانین کلودفلر', yamlKey: 'cloudflare', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/cloudflare.yaml', behavior: 'domain', group: 'General Web Services' },
    { id: 'rp_github', name: 'قوانین گیت‌هاب', yamlKey: 'github', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/github.yaml', behavior: 'domain', group: 'General Web Services' },
    { id: 'rp_whatsapp', name: 'قوانین واتس‌اپ', yamlKey: 'whatsapp', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/generated/whatsapp.yaml', behavior: 'domain', group: 'Streaming & Social' },
    { id: 'rp_liteads', name: 'تبلیغات LiteAds', yamlKey: 'LiteAds', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/LiteAds.yaml', behavior: 'classical', group: 'Ads & Tracking' },
    { id: 'rp_discord', name: 'قوانین دیسکورد', yamlKey: 'discord', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/discord.yaml', behavior: 'classical', group: 'Streaming & Social' },
    { id: 'rp_instagram', name: 'قوانین اینستاگرام', yamlKey: 'instagram', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/instagram.yaml', behavior: 'domain', group: 'Streaming & Social' },
    { id: 'rp_category_ai', name: 'هوش مصنوعی (غیر چینی)', yamlKey: 'category-ai', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/V2rayDomains2Clash/refs/heads/generated/category-ai-!cn.yaml', behavior: 'domain', group: 'General Web Services' },
    { id: 'rp_stremio', name: 'قوانین استریمیو', yamlKey: 'stremio', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/stremio.yaml', behavior: 'classical', group: 'Streaming & Social' },
    { id: 'rp_windows', name: 'قوانین ویندوز', yamlKey: 'windows', defaultChecked: true, url: 'https://raw.githubusercontent.com/10ium/clash_rules/refs/heads/main/windows.yaml', behavior: 'classical', group: 'Device Specific' },
];

// **Proxy Groups (گروه‌های پروکسی)**
// این آرایه شامل گروه‌های پروکسی است که در کانفیگ نهایی استفاده می‌شوند.
// این گروه‌ها در UI برای انتخاب مستقیم نمایش داده نمی‌شوند،
// بلکه بر اساس فعال بودن Rule Providers و Ruleهای مرتبط، به صورت خودکار در خروجی نهایی قرار می‌گیرند.
// فیلد `proxies` در اینجا شامل لیست نام پروکسی‌ها یا گروه‌های دیگری است که به صورت پیش‌فرض در این گروه قرار می‌گیرند.
const predefinedProxyGroups = [
    // گروه‌های پایه‌ای که همیشه در کانفیگ نهایی هستند.
    { id: 'pg_select_proxy_type', name: 'نوع انتخاب پروکسی 🔀', yamlKey: 'نوع انتخاب پروکسی 🔀', type: 'select', icon: 'https://www.svgrepo.com/show/412721/choose.svg', defaultChecked: true, proxies: ["خودکار (بهترین پینگ) 🤖", "پشتیبان (در صورت قطعی) 🧯", "دستی 🤏🏻", "قطع اینترنت ⛔", "بدون فیلترشکن 🛡️"], group: 'Core Logic' },
    { id: 'pg_manual', name: 'دستی 🤏🏻', yamlKey: 'دستی 🤏🏻', type: 'select', icon: 'https://www.svgrepo.com/show/372331/cursor-hand-click.svg', defaultChecked: true, proxies: ["Mahsang", "Clash", "Default", "Karing", "Surfboard", "Windscribe", "Hiddify"], group: 'Core Logic' },
    { id: 'pg_auto_ping', name: 'خودکار (بهترین پینگ) 🤖', yamlKey: 'خودکار (بهترین پینگ) 🤖', type: 'url-test', icon: 'https://www.svgrepo.com/show/7876/speedometer.svg', url: 'https://api.v2fly.org/checkConnection.svgz', interval: 600, timeout: 120000, tolerance: 500, max_failed_times: 6, lazy: true, defaultChecked: true, proxies: ["Mahsang", "Clash", "Default", "Karing", "Surfboard", "Windscribe", "Hiddify"], group: 'Core Logic' },
    { id: 'pg_fallback', name: 'پشتیبان (در صورت قطعی) 🧯', yamlKey: 'پشتیبان (در صورت قطعی) 🧯', type: 'fallback', icon: 'https://www.svgrepo.com/show/415208/backup-cloud-document.svg', url: 'https://www.gstatic.com/generate_204', interval: 600, timeout: 120000, max_failed_times: 3, lazy: true, defaultChecked: true, proxies: ["Mahsang", "Clash", "Default", "Karing", "Surfboard", "Windscribe", "Hiddify"], group: 'Core Logic' },
    { id: 'pg_no_filter', name: 'بدون فیلترشکن 🛡️', yamlKey: 'بدون فیلترشکن 🛡️', type: 'select', icon: 'https://www.svgrepo.com/show/6318/connection.svg', defaultChecked: true, proxies: ["DIRECT"], hidden: true, group: 'Core Logic' },
    { id: 'pg_disconnect', name: 'قطع اینترنت ⛔', yamlKey: 'قطع اینترنت ⛔', type: 'select', icon: 'https://www.svgrepo.com/show/305372/wifi-off.svg', defaultChecked: true, proxies: ["REJECT"], hidden: true, group: 'Core Logic' },
    { id: 'pg_deny', name: 'اجازه ندادن 🚫', yamlKey: 'اجازه ندادن 🚫', type: 'select', icon: 'https://www.svgrepo.com/show/444307/gui-ban.svg', defaultChecked: true, proxies: ["REJECT"], hidden: true, group: 'Core Logic' },

    // گروه‌هایی که به Rule Providers یا Rules دیگر مرتبط هستند.
    // اینها در UI برای انتخاب مستقیم نمایش داده نمی‌شوند.
    { id: 'pg_downloader', name: 'دانلود منیجر', yamlKey: 'دانلود منیجر 📥', type: 'select', icon: 'fas fa-download', defaultChecked: true,
      proxies: ["بدون فیلترشکن 🛡️", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,DownloadManagers,دانلود منیجر 📥', 'RULE-SET,Download,دانلود منیجر 📥'], group: 'Downloads' },
    { id: 'pg_telegram', name: 'تلگرام', yamlKey: 'تلگرام 💬', type: 'select', icon: 'fab fa-telegram-plane', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['PROCESS-NAME,Telegram.exe,تلگرام 💬', 'PROCESS-NAME,org.telegram.messenger,تلگرام 💬', 'PROCESS-NAME,org.telegram.messenger.web,تلگرام 💬', 'RULE-SET,telegram,تلگرام 💬'], group: 'Streaming & Social' },
    { id: 'pg_youtube', name: 'یوتیوب', yamlKey: 'یوتیوب ▶️', type: 'select', icon: 'fab fa-youtube', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,YouTube,یوتیوب ▶️', 'RULE-SET,youtube,یوتیوب ▶️', 'RULE-SET,YouTubeMusic,یوتیوب ▶️'], group: 'Streaming & Social' },
    { id: 'pg_google', name: 'گوگل', yamlKey: 'گوگل 🌍', type: 'select', icon: 'fab fa-google', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,google,گوگل 🌍'], group: 'General Web Services' },
    { id: 'pg_whatsapp', name: 'واتس آپ', yamlKey: 'واتس آپ 🟢', type: 'select', icon: 'fab fa-whatsapp', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,whatsapp,واتس آپ 🟢'], group: 'Streaming & Social' },
    { id: 'pg_ai', name: 'هوش مصنوعی', yamlKey: 'هوش مصنوعی 🤖', type: 'select', icon: 'fas fa-robot', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['DOMAIN-SUFFIX,deepseek.com,هوش مصنوعی 🤖', 'DOMAIN-SUFFIX,qwen.ai,هوش مصنوعی 🤖', 'RULE-SET,category-ai,هوش مصنوعی 🤖'], group: 'General Web Services' },
    { id: 'pg_instagram', name: 'اینستاگرام', yamlKey: 'اینستاگرام 📸', type: 'select', icon: 'fab fa-instagram', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫", "بدون فیلترشکن 🛡️"], relatedRules: ['PROCESS-NAME,com.instagram.android,اینستاگرام 📸', 'RULE-SET,instagram,اینستاگرام 📸'], group: 'Streaming & Social' },
    { id: 'pg_ads', name: 'تبلیغات', yamlKey: 'تبلیغات 🆎', type: 'select', icon: 'fas fa-ad', defaultChecked: true,
      proxies: ["اجازه ندادن 🚫", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,LiteAds,تبلیغات 🆎', 'RULE-SET,iran_ads,تبلیغات 🆎', 'RULE-SET,PersianBlocker,تبلیغات 🆎', 'RULE-SET,ads,تبلیغات 🆎', 'RULE-SET,BanEasyList,تبلیغات 🆎'], group: 'Ads & Tracking' },
    { id: 'pg_app_ads', name: 'تبلیغات اپ ها', yamlKey: 'تبلیغات اپ ها 🍃', type: 'select', icon: 'fas fa-mobile-alt', defaultChecked: true,
      proxies: ["اجازه ندادن 🚫", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,BanProgramAD,تبلیغات اپ ها 🍃', 'RULE-SET,xiaomi-ads,تبلیغات اپ ها 🍃', 'RULE-SET,xiaomi_block_list,تبلیغات اپ ها 🍃'], group: 'Ads & Tracking' },
    { id: 'pg_tracking', name: 'رهگیری جهانی', yamlKey: 'رهگیری جهانی 🛑', type: 'select', icon: 'fas fa-crosshairs', defaultChecked: true,
      proxies: ["اجازه ندادن 🚫", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,BanAD,رهگیری جهانی 🛑', 'RULE-SET,PrivateTracker,رهگیری جهانی 🛑', 'RULE-SET,category_public_tracker,رهگیری جهانی 🛑'], group: 'Ads & Tracking' },
    { id: 'pg_malicious', name: 'سایتای مخرب', yamlKey: 'سایتای مخرب ⚠️', type: 'select', icon: 'fas fa-skull-crossbones', defaultChecked: true,
      proxies: ["اجازه ندادن 🚫", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,malware,سایتای مخرب ⚠️', 'RULE-SET,phishing,سایتای مخرب ⚠️', 'RULE-SET,cryptominers,سایتای مخرب ⚠️', 'RULE-SET,warninglist,سایتای مخرب ⚠️', 'RULE-SET,Ponzi,سایتای مخرب ⚠️'], group: 'Security & Control' },
    { id: 'pg_steam', name: 'استیم', yamlKey: 'استیم 🖥️', type: 'select', icon: 'fab fa-steam', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,steam,استیم 🖥️', 'RULE-SET,SteamRegionCheck,استیم 🖥️'], group: 'Gaming' },
    { id: 'pg_game', name: 'گیم', yamlKey: 'گیم 🎮', type: 'select', icon: 'fas fa-gamepad', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,game,گیم 🎮', 'RULE-SET,GameDownload,گیم 🎮', 'RULE-SET,category-games,گیم 🎮', 'RULE-SET,Xbox,گیم 🎮'], group: 'Gaming' },
    { id: 'pg_twitch', name: 'توییچ', yamlKey: 'توییچ 📡', type: 'select', icon: 'fab fa-twitch', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,twitch,توییچ 📡'], group: 'Streaming & Social' },
    { id: 'pg_iranian_sites', name: 'سایتای ایرانی', yamlKey: 'سایتای ایرانی 🇮🇷', type: 'select', icon: 'fas fa-flag', defaultChecked: true,
      proxies: ["بدون فیلترشکن 🛡️", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,apps,سایتای ایرانی 🇮🇷', 'RULE-SET,iran,سایتای ایرانی 🇮🇷', 'RULE-SET,arvancloud,سایتای ایرانی 🇮🇷', 'RULE-SET,derakcloud,سایتای ایرانی 🇮🇷', 'RULE-SET,iranserver,سایتای ایرانی 🇮🇷', 'RULE-SET,parspack,سایتای ایرانی 🇮🇷', 'RULE-SET,irasn,سایتای ایرانی 🇮🇷', 'RULE-SET,ircidr,سایتای ایرانی 🇮🇷', 'RULE-SET,ir,سایتای ایرانی 🇮🇷', 'RULE-SET,category_ir,سایتای ایرانی 🇮🇷'], group: 'Iranian Services' },
    { id: 'pg_windows', name: 'ویندوز', yamlKey: 'ویندوز 🧊', type: 'select', icon: 'fab fa-windows', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "اجازه ندادن 🚫", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯"], relatedRules: ['RULE-SET,windows,ویندوز 🧊'], group: 'Device Specific' },
    { id: 'pg_cloudflare', name: 'کلودفلر', yamlKey: 'کلودفلر ☁️', type: 'select', icon: 'fas fa-cloud', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,cloudflare,کلودفلر ☁️'], group: 'General Web Services' },
    { id: 'pg_github', name: 'گیتهاب', yamlKey: 'گیتهاب 🐙', type: 'select', icon: 'fab fa-github', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,github,گیتهاب 🐙'], group: 'General Web Services' },
    { id: 'pg_discord', name: 'دیسکورد', yamlKey: 'دیسکورد 🗣️', type: 'select', icon: 'fab fa-discord', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی 🔀", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,discord,دیسکورد 🗣️'], group: 'Streaming & Social' },
    { id: 'pg_stremio', name: 'استریمیو', yamlKey: 'استریمیو 🎬', type: 'select', icon: 'fas fa-film', defaultChecked: true,
      proxies: ["نوع انتخاب پروکسی ط", "بدون فیلترشکن 🛡️", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "اجازه ندادن 🚫"], relatedRules: ['RULE-SET,stremio,استریمیو 🎬'], group: 'Streaming & Social' },
    { id: 'pg_censored_sites', name: 'سایتای سانسوری', yamlKey: 'سایتای سانسوری 🤬', type: 'select', icon: 'fas fa-ban', defaultChecked: true,
      proxies: ["اجازه ندادن 🚫", "نوع انتخاب پروکسی 🔀", "خودکار (بهترین پینگ) 🤖", "دستی 🤏🏻", "پشتیبان (در صورت قطعی) 🧯", "بدون فیلترشکن 🛡️"], relatedRules: ['RULE-SET,censor,سایتای سانسوری 🤬'], group: 'Security & Control' },
];

// **Rules (قوانین MiHoMo)**
// این آرایه شامل Rule هایی است که مستقیماً در بخش `rules:` کانفیگ ظاهر می‌شوند.
const rulesToGenerate = [
    // گروه: دانلودها
    { id: 'rule_download_managers_rp', name: 'قوانین دانلود منیجر (RP)', ruleString: 'RULE-SET,DownloadManagers,دانلود منیجر 📥', defaultChecked: true, type: 'rule_set', group: 'Downloads' },
    { id: 'rule_download_rp', name: 'قوانین دانلود (جامع RP)', ruleString: 'RULE-SET,Download,دانلود منیجر 📥', defaultChecked: true, type: 'rule_set', group: 'Downloads' },

    // گروه: امنیت و کنترل
    { id: 'rule_censor_rp_full', name: 'سانسور (RP)', ruleString: 'RULE-SET,censor,سایتای سانسوری 🤬', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_malware_rp', name: 'بدافزار (RP)', ruleString: 'RULE-SET,malware,سایتای مخرب ⚠️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_phishing_rp', name: 'فیشینگ (RP)', ruleString: 'RULE-SET,phishing,سایتای مخرب ⚠️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_cryptominers_rp', name: 'ماینرها (RP)', ruleString: 'RULE-SET,cryptominers,سایتای مخرب ⚠️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_warninglist_rp', name: 'لیست هشدار (RP)', ruleString: 'RULE-SET,warninglist,سایتای مخرب ⚠️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_ponzi_rp', name: 'پانزی (RP)', ruleString: 'RULE-SET,Ponzi,سایتای مخرب ⚠️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },
    { id: 'rule_private_rp', name: 'قوانین خصوصی (RP)', ruleString: 'RULE-SET,private,بدون فیلترشکن 🛡️', defaultChecked: true, type: 'rule_set', group: 'Security & Control' },


    // گروه: تبلیغات و رهگیری
    { id: 'rule_ban_program_ad_rp', name: 'تبلیغات اپ (RP)', ruleString: 'RULE-SET,BanProgramAD,تبلیغات اپ ها 🍃', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_ban_ad_rp', name: 'بلاک تبلیغات (جامع RP)', ruleString: 'RULE-SET,BanAD,رهگیری جهانی 🛑', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_private_tracker_rp', name: 'رهگیر خصوصی (RP)', ruleString: 'RULE-SET,PrivateTracker,رهگیری جهانی 🛑', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_category_public_tracker_rp', name: 'رهگیر عمومی (RP)', ruleString: 'RULE-SET,category_public_tracker,رهگیری جهانی 🛑', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_liteads_rp', name: 'تبلیغات LiteAds (RP)', ruleString: 'RULE-SET,LiteAds,تبلیغات 🆎', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_iran_ads_rp', name: 'تبلیغات ایرانی (RP)', ruleString: 'RULE-SET,iran_ads,تبلیغات 🆎', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_persian_blocker_rp', name: 'بلاک فارسی (RP)', ruleString: 'RULE-SET,PersianBlocker,تبلیغات 🆎', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_ads_rp', name: 'تبلیغات (جامع RP)', ruleString: 'RULE-SET,ads,تبلیغات 🆎', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_ban_easy_list_rp', name: 'بلاک EasyList (RP)', ruleString: 'RULE-SET,BanEasyList,تبلیغات 🆎', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },
    { id: 'rule_xiaomi_ads_rp_full', name: 'تبلیغات شیائومی (RP)', ruleString: 'RULE-SET,xiaomi-ads,تبلیغات اپ ها 🍃', defaultChecked: true, type: 'rule_set', group: 'Ads & Tracking' },


    // گروه: شبکه‌های اجتماعی و استریمینگ
    { id: 'rule_youtube_rp_full', name: 'یوتیوب (جامع RP)', ruleString: 'RULE-SET,YouTube,یوتیوب ▶️', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_youtube_rp', name: 'یوتیوب (RP)', ruleString: 'RULE-SET,youtube,یوتیوب ▶️', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_youtube_music_rp', name: 'یوتیوب موزیک (RP)', ruleString: 'RULE-SET,YouTubeMusic,یوتیوب ▶️', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_telegram_process_exe', name: 'تلگرام (EXE)', ruleString: 'PROCESS-NAME,Telegram.exe,تلگرام 💬', defaultChecked: true, type: 'process_name', group: 'Streaming & Social' },
    { id: 'rule_telegram_process_android', name: 'تلگرام (Android)', ruleString: 'PROCESS-NAME,org.telegram.messenger,تلگرام 💬', defaultChecked: true, type: 'process_name', group: 'Streaming & Social' },
    { id: 'rule_telegram_process_web', name: 'تلگرام (Web)', ruleString: 'PROCESS-NAME,org.telegram.messenger.web,تلگرام 💬', defaultChecked: true, type: 'process_name', group: 'Streaming & Social' },
    { id: 'rule_telegram_rp', name: 'تلگرام (RP)', ruleString: 'RULE-SET,telegram,تلگرام 💬', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_twitch_rp', name: 'توییچ (RP)', ruleString: 'RULE-SET,twitch,توییچ 📡', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_whatsapp_rp', name: 'واتس‌اپ (RP)', ruleString: 'RULE-SET,whatsapp,واتس آپ 🟢', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_instagram_process_android', name: 'اینستاگرام (Android)', ruleString: 'PROCESS-NAME,com.instagram.android,اینستاگرام 📸', defaultChecked: true, type: 'process_name', group: 'Streaming & Social' },
    { id: 'rule_instagram_rp', name: 'اینستاگرام (RP)', ruleString: 'RULE-SET,instagram,اینستاگرام 📸', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_discord_rp_full', name: 'دیسکورد (RP)', ruleString: 'RULE-SET,discord,دیسکورد 🗣️', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },
    { id: 'rule_stremio_rp_full', name: 'استریمیو (RP)', ruleString: 'RULE-SET,stremio,استریمیو 🎬', defaultChecked: true, type: 'rule_set', group: 'Streaming & Social' },


    // گروه: سرویس‌های وب عمومی
    { id: 'rule_google_rp_full', name: 'گوگل (RP)', ruleString: 'RULE-SET,google,گوگل 🌍', defaultChecked: true, type: 'rule_set', group: 'General Web Services' },
    { id: 'rule_google_play_process_android_vending', name: 'گوگل پلی (Vending)', ruleString: 'PROCESS-NAME,com.android.vending,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'process_name', group: 'General Web Services' },
    { id: 'rule_google_play_process_android_gms', name: 'گوگل پلی (GMS)', ruleString: 'PROCESS-NAME,com.google.android.gms,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'process_name', group: 'General Web Services' },
    { id: 'rule_google_play_rp_full', name: 'گوگل پلی (RP)', ruleString: 'RULE-SET,google-play,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'rule_set', group: 'General Web Services' },
    { id: 'rule_category_ai_rp', name: 'AI (RP)', ruleString: 'RULE-SET,category-ai,هوش مصنوعی 🤖', defaultChecked: true, type: 'rule_set', group: 'General Web Services' },
    { id: 'rule_ai_deepseek', name: 'DeepSeek AI', ruleString: 'DOMAIN-SUFFIX,deepseek.com,هوش مصنوعی 🤖', defaultChecked: true, type: 'domain_suffix', group: 'General Web Services' },
    { id: 'rule_ai_qwen', name: 'Qwen AI', ruleString: 'DOMAIN-SUFFIX,qwen.ai,هوش مصنوعی 🤖', defaultChecked: true, type: 'domain_suffix', group: 'General Web Services' },
    { id: 'rule_cloudflare_rp_full', name: 'کلودفلر (RP)', ruleString: 'RULE-SET,cloudflare,کلودفلر ☁️', defaultChecked: true, type: 'rule_set', group: 'General Web Services' },
    { id: 'rule_github_rp_full', name: 'گیت‌هاب (RP)', ruleString: 'RULE-SET,github,گیتهاب 🐙', defaultChecked: true, type: 'rule_set', group: 'General Web Services' },


    // گروه: خدمات ایرانی
    { id: 'rule_apps_rp', name: 'اپ‌ها (RP)', ruleString: 'RULE-SET,apps,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_iran_rp', name: 'ایران (RP)', ruleString: 'RULE-SET,iran,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_arvancloud_rp', name: 'آروان کلود (RP)', ruleString: 'RULE-SET,arvancloud,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_derakcloud_rp', name: 'درک کلود (RP)', ruleString: 'RULE-SET,derakcloud,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_iranserver_rp', name: 'ایران سرور (RP)', ruleString: 'RULE-SET,iranserver,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_parspack_rp', name: 'پارسپک (RP)', ruleString: 'RULE-SET,parspack,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_irasn_rp', name: 'IR ASN (RP)', ruleString: 'RULE-SET,irasn,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_ircidr_rp', name: 'IR CIDR (RP)', ruleString: 'RULE-SET,ircidr,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_ir_rp_full', name: 'IR (RP)', ruleString: 'RULE-SET,ir,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_category_ir_rp', name: 'دسته IR (RP)', ruleString: 'RULE-SET,category_ir,سایتای ایرانی 🇮🇷', defaultChecked: true, type: 'rule_set', group: 'Iranian Services' },
    { id: 'rule_local_ips_rp', name: 'IPهای محلی (RP)', ruleString: 'RULE-SET,local_ips,بدون فیلترشکن 🛡️', defaultChecked: true, type: 'rule_set', group: 'Local Access' },


    // گروه: بازی
    { id: 'rule_steam_game_rp', name: 'بازی استیم (RP)', ruleString: 'RULE-SET,steam,استیم 🖥️', defaultChecked: true, type: 'rule_set', group: 'Gaming' },
    { id: 'rule_steam_region_check_rp_full', name: 'بررسی منطقه استیم (RP)', ruleString: 'RULE-SET,SteamRegionCheck,استیم 🖥️', defaultChecked: true, type: 'rule_set', group: 'Gaming' },
    { id: 'rule_game_rp_full', name: 'بازی (جامع RP)', ruleString: 'RULE-SET,game,گیم 🎮', defaultChecked: true, type: 'rule_set', group: 'Gaming' },
    { id: 'rule_game_download_rp_full', name: 'دانلود بازی (RP)', ruleString: 'RULE-SET,GameDownload,گیم 🎮', defaultChecked: true, type: 'rule_set', group: 'Gaming' },
    { id: 'rule_category_games_rp_full', name: 'دسته‌بندی بازی‌ها (RP)', ruleString: 'RULE-SET,category-games,گیم 🎮', defaultChecked: true, type: 'rule_set', group: 'Gaming' },
    { id: 'rule_xbox_rp_full', name: 'ایکس‌باکس (RP)', ruleString: 'RULE-SET,Xbox,گیم 🎮', defaultChecked: true, type: 'rule_set', group: 'Gaming' },


    // گروه: مخصوص دستگاه‌ها
    { id: 'rule_xiaomi_white_list_rp_full', name: 'شیائومی وایت‌لیست (RP)', ruleString: 'RULE-SET,xiaomi_white_list,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'rule_set', group: 'Device Specific' },
    { id: 'rule_xiaomi_block_list_rp_full', name: 'شیائومی بلاک‌لیست (RP)', ruleString: 'RULE-SET,xiaomi_block_list,تبلیغات اپ ها 🍃', defaultChecked: true, type: 'rule_set', group: 'Device Specific' },
    { id: 'rule_windows_rp_full', name: 'ویندوز (RP)', ruleString: 'RULE-SET,windows,ویندوز 🧊', defaultChecked: true, type: 'rule_set', group: 'Device Specific' },


    // گروه: منطق اصلی (این‌ها در UI نمایش داده نمی‌شوند، اما برای تولید کانفیگ لازمند)
    { id: 'rule_ip_cidr_10_10_34_0', name: 'IP CIDR 10.10.34.0/24', ruleString: 'IP-CIDR,10.10.34.0/24,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'ip_cidr', group: 'Core Logic', hidden: true },
    { id: 'rule_match_select_proxy_type', name: 'MATCH (نوع انتخاب پروکسی)', ruleString: 'MATCH,نوع انتخاب پروکسی 🔀', defaultChecked: true, type: 'match', group: 'Core Logic', hidden: true },
];

// دسته‌بندی‌ها برای نمایش در UI
// 'key': کلید گروه که در آبجکت‌های predefinedRuleProviders و rulesToGenerate استفاده شده.
// 'name': نام گروه برای نمایش به کاربر.
// 'icon': کلاس آیکون Font Awesome برای نمایش در کنار نام گروه.
const ruleCategories = [
    { key: 'General Web Services', name: 'سرویس‌های وب عمومی', icon: 'fas fa-globe' },
    { key: 'Streaming & Social', name: 'استریمینگ و شبکه‌های اجتماعی', icon: 'fas fa-share-alt' },
    { key: 'Iranian Services', name: 'خدمات ایرانی', icon: 'fas fa-flag' }, /* آیکون پرچم عمومی */
    { key: 'Gaming', name: 'بازی‌ها', icon: 'fas fa-gamepad' },
    { key: 'Ads & Tracking', name: 'تبلیغات و رهگیری', icon: 'fas fa-ad' },
    { key: 'Security & Control', name: 'امنیت و کنترل', icon: 'fas fa-shield-alt' },
    { key: 'Downloads', name: 'دانلودها', icon: 'fas fa-download' },
    { key: 'Device Specific', name: 'مخصوص دستگاه‌ها', icon: 'fas fa-mobile-alt' },
    { key: 'Local Access', name: 'دسترسی محلی', icon: 'fas fa-network-wired' },
    // { key: 'Core Logic', name: 'منطق اصلی (پنهان)', icon: 'fas fa-code' }, // این گروه برای UI نیست
];
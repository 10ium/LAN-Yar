// assets/js/predefinedProxies.js

// این آرایه شامل پروکسی‌های پیش‌فرض شماست.
// هر شیء (object) در این آرایه یک پروکسی را تعریف می‌کند.
// 'id': یک شناسه منحصر به فرد برای هر پروکسی (برای استفاده در HTML و JavaScript).
// 'name': نامی که به کاربر نمایش داده می‌شود.
// 'ip': آدرس IP سرور پروکسی.
// 'port': شماره پورت سرور پروکسی.
// 'type': نوع پروتکل پروکسی (مثلاً socks5، vmess، trojan و غیره). این برای تولید YAML نهایی خیلی مهمه.
// 'udp': true اگر پروکسی از UDP پشتیبانی می‌کند.
// 'description': توضیحات کوتاه درباره پروکسی (اختیاری).

const predefinedProxies = [
    {
        id: 'proxy_mahsang',
        name: 'Mahsang',
        ip: '192.168.1.3',
        port: '10808',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Mahsang بر روی LAN - پورت 10808'
    },
    {
        id: 'proxy_clash_mihomo',
        name: 'Clash (MiHoMo)',
        ip: '192.168.1.3',
        port: '7891',
        type: 'socks5', // یا HTTP/SOCKS5
        udp: true,
        description: 'پروکسی MiHoMo/Clash از دستگاه دیگر - پورت 7891'
    },
    {
        id: 'proxy_default_lan',
        name: 'Default LAN Proxy',
        ip: '192.168.1.3',
        port: '1080',
        type: 'socks5',
        udp: true,
        description: 'پورت عمومی LAN برای VPNهای دیگر (مثل OpenVPN)'
    },
    {
        id: 'proxy_geph',
        name: 'Geph (LAN)',
        ip: '192.168.1.3',
        port: '9909',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Geph از طریق LAN - پورت 9909'
    },
    {
        id: 'proxy_karing',
        name: 'Karing (LAN)',
        ip: '192.168.1.3',
        port: '3067',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Karing از طریق LAN - پورت 3067'
    },
    {
        id: 'proxy_surfboard',
        name: 'Surfboard (LAN)',
        ip: '192.168.1.3',
        port: '1235',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Surfboard از طریق LAN - پورت 1235'
    },
    {
        id: 'proxy_windscribe',
        name: 'Windscribe (LAN)',
        ip: '192.168.1.3',
        port: '10473',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Windscribe از طریق LAN - پورت 10473'
    },
    {
        id: 'proxy_hiddify',
        name: 'Hiddify (LAN)',
        ip: '192.168.1.3',
        port: '8888',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Hiddify از طریق LAN - پورت 8888'
    }
    // شما می‌توانید هر تعداد پروکسی دیگر را با جزئیات واقعی و پروتکل‌های خودتان در اینجا اضافه کنید.
    // مثال برای Vmess (باید فیلدهای uuid, alterId, cipher را هم اضافه کنید):
    /*
    {
        id: 'proxy_vmess_example',
        name: 'Vmess Example',
        type: 'vmess',
        server: 'your.vmess.server.com',
        port: '443',
        uuid: 'your-uuid-here',
        alterId: 0,
        cipher: 'auto',
        udp: true,
        description: 'یک سرور Vmess تستی'
    },
    */
];
// assets/js/predefinedProxies.js

// این آرایه شامل پروکسی‌های پیش‌فرض شماست.
// هر کلاینت کنار هم گروه‌بندی شده‌اند و داخل هر گروه بر اساس محبوبیت پروتکل مرتب شده است.

export const predefinedProxies = [
    // ===== Clash Client =====
    {
        id: 'proxy_clash_socks',
        name: 'Clash (SOCKS)',
        ip: '192.168.1.3',
        port: '7891',
        type: 'socks5',
        udp: true,
        description: 'پروکسی MiHoMo/Clash SOCKS - پورت 7891'
    },
    {
        id: 'proxy_clash_http',
        name: 'Clash HTTP(S)',
        ip: '192.168.1.3',
        port: '7890',
        type: 'http',
        udp: true,
        description: 'پورت HTTP(S) Clash - 7890'
    },
    {
        id: 'proxy_clash_mixed',
        name: 'Clash Mixed',
        ip: '192.168.1.3',
        port: '7892',
        type: 'socks5',
        udp: true,
        description: 'پورت Mixed Clash (HTTP/SOCKS) - 7892'
    },
    {
        id: 'proxy_clash_tproxy',
        name: 'Clash TProxy',
        ip: '192.168.1.3',
        port: '7894',
        type: 'socks5',
        udp: true,
        description: 'پورت tproxy Clash - 7894'
    },
    {
        id: 'proxy_clash_redir',
        name: 'Clash Redir',
        ip: '192.168.1.3',
        port: '7893',
        type: 'socks5',
        udp: true,
        description: 'پورت redir Clash - 7893'
    },

    // ===== Mahsang Client =====
    {
        id: 'proxy_mahsang',
        name: 'Mahsang - Npv Tunnel',
        ip: '192.168.1.3',
        port: '10808',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Mahsang بر روی LAN - پورت 10808'
    },

    // ===== Default LAN =====
    {
        id: 'proxy_default_lan',
        name: 'Default LAN',
        ip: '192.168.1.3',
        port: '1080',
        type: 'socks5',
        udp: true,
        description: 'پورت عمومی LAN برای VPNهای دیگر (مثل OpenVPN یا اپ Gnet Proxy)'
    },

    // ===== Geph Client =====
    {
        id: 'proxy_geph',
        name: 'Geph',
        ip: '192.168.1.3',
        port: '9909',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Geph از طریق LAN - پورت 9909'
    },

    // ===== Karing Client =====
    {
        id: 'proxy_karing_rule',
        name: 'Karing (Rule)',
        ip: '192.168.1.3',
        port: '4067',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Karing با Rule - پورت 4067'
    },
    {
        id: 'proxy_karing_no_rule',
        name: 'Karing (No Rule)',
        ip: '192.168.1.3',
        port: '4066',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Karing بدون Rule - پورت 4066'
    },

    // ===== Surfboard Client =====
    {
        id: 'proxy_surfboard',
        name: 'Surfboard',
        ip: '192.168.1.3',
        port: '1235',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Surfboard از طریق LAN - پورت 1235'
    },

    // ===== Windscribe Client =====
    {
        id: 'proxy_windscribe',
        name: 'Windscribe',
        ip: '192.168.1.3',
        port: '10473',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Windscribe از طریق LAN - پورت 10473'
    },

    // ===== Hiddify Client =====
    {
        id: 'proxy_hiddify',
        name: 'Hiddify',
        ip: '192.168.1.3',
        port: '8888',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Hiddify از طریق LAN - پورت 8888'
    },

    // ===== Psiphon Client =====
    {
        id: 'proxy_psiphon',
        name: 'Psiphon',
        ip: '192.168.1.3',
        port: '50772',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Psiphon - پورت 50772'
    },

    // ===== Every Proxy =====
    {
        id: 'proxy_every_socks',
        name: 'Every Proxy SOCKS',
        ip: '192.168.1.3',
        port: '1080',
        type: 'socks5',
        udp: true,
        description: 'Every proxy SOCKS - پورت 1080'
    },
    {
        id: 'proxy_every_http',
        name: 'Every Proxy HTTP',
        ip: '192.168.1.3',
        port: '8080',
        type: 'http',
        udp: true,
        description: 'Every proxy HTTP - پورت 8080'
    },
    {
        id: 'proxy_every_pac',
        name: 'Every Proxy PAC Server',
        ip: '192.168.1.3',
        port: '8081',
        type: 'socks5',
        udp: true,
        description: 'Every proxy PAC server - پورت 8081'
    },

    // ===== Exclave Client =====
    {
        id: 'proxy_exclave',
        name: 'Exclave',
        ip: '192.168.1.3',
        port: '2080',
        type: 'http',
        udp: true,
        description: 'پروکسی Exclave - پورت 2080'
    },
    {
        id: 'proxy_orbot_http',
        name: 'Orbot http',
        ip: '192.168.1.3',
        port: '8118',
        type: 'http',
        udp: true,
        description: 'پروکسی Orbot - پورت 8118'
    },
    {
        id: 'proxy_orbot_socks',
        name: 'Orbot socks',
        ip: '192.168.1.3',
        port: '9050',
        type: 'socks5',
        udp: true,
        description: 'پروکسی Orbot - پورت 9050'
    },
    // ===== Shadowrocket Client =====
    {
        id: 'proxy_shadowrocket',
        name: 'Shadowrocket',
        ip: '192.168.1.3',
        port: '1082',
        type: 'http',
        udp: true,
        description: 'پروکسی Shadowrocket - پورت 1082'
    }
];

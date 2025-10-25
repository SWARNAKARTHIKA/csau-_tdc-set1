export const scenarios = [
  {
    id: 1,
    title: "Question 1 (Easy)",
    systemLog: [
      "[22/10/2025 09:30:12] USER LOGIN – admin (IP: 192.168.10.45)",
      "[22/10/2025 09:32:50] LOGIN FAILED – guest (IP: 203.0.113.56)",
      "[22/10/2025 09:33:05] LOGIN FAILED – guest (IP: 203.0.113.56)",
      "[22/10/2025 09:33:19] LOGIN FAILED – guest (IP: 203.0.113.56)",
      "[22/10/2025 09:34:02] LOGIN SUCCESS – admin (IP: 203.0.113.56)",
      "[22/10/2025 09:36:10] FILE ACCESSED – /secure/financial_records.db",
      "[22/10/2025 09:40:27] FILE TRANSFER – external destination detected"
    ],
    configFile: `PermitRootLogin yes
PasswordAuthentication yes
MaxAuthTries 10
AllowUsers admin guest`,
    questions: [
      {
        id: 1,
        text: "What indicates that the system may have been accessed by an unauthorized user?",
        marks: 5,
        answer:
          "Multiple failed login attempts from the same external IP (203.0.113.56) followed by a successful admin login indicate possible brute-force or credential theft.",
        criteria: [
          "Identified repeated failed logins from the same IP",
          "Recognized subsequent successful admin login from that IP",
          "Linked the pattern to brute-force or stolen credentials"
        ]
      },
      {
        id: 2,
        text: "What configuration setting increased the risk of compromise?",
        marks: 10,
        answer:
          "PermitRootLogin and PasswordAuthentication were enabled, MaxAuthTries was too high, and the guest account was allowed—all increasing vulnerability.",
        criteria: [
          "Identified PermitRootLogin = yes",
          "Noted PasswordAuthentication = yes",
          "Mentioned MaxAuthTries = 10 (too high)",
          "Recognized guest account as unnecessary risk",
          "Explained how these settings reduced security"
        ]
      },
      {
        id: 3,
        text: "What changes should be made to the configuration to improve security?",
        marks: 10,
        answer:
          "Disable root login, use SSH key-based authentication, lower MaxAuthTries, and remove guest access.",
        criteria: [
          "Suggested PermitRootLogin = no",
          "Recommended PasswordAuthentication = no (use SSH keys)",
          "Proposed reducing MaxAuthTries to 3 or fewer",
          "Advised removing guest from AllowUsers",
          "Provided comprehensive secure configuration"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Question 2 (Medium)",
    systemLog: [
      "[28/10/2025 09:10:55] USER LOGIN – User1",
      "[28/10/2025 09:12:33] APPLICATION INSTALLED – app_name: QuickNotes",
      "[28/10/2025 09:12:59] TEMP FILE CREATED – /logs/install_temp.tmp",
      "[28/10/2025 09:13:00] PROCESS STARTED – QuickNotes.exe",
      "[28/10/2025 09:13:10] SYSTEM CHECK – Memory usage: 85%",
      "[28/10/2025 09:15:42] OUTBOUND CONNECTION – 185.76.22.90:443",
      "[28/10/2025 09:16:01] FIREWALL WARNING – ignored",
      "[28/10/2025 09:17:00] LOCAL BACKUP – completed",
      "[28/10/2025 09:18:55] SYSTEM SLOWDOWN DETECTED",
      "[28/10/2025 09:20:12] UPDATE CHECK – Skipped due to policy restrictions"
    ],
    configFile: `software_whitelist = off
firewall_outbound_control = disabled
application_monitor = off
update_policy = manual
user_privilege = admin
auto_audit_logs = off
network_latency_monitor = on
backup_schedule = daily`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer:
          "A user installed an unauthorized application, initiated an outbound connection, ignored firewall warnings, and skipped updates, leading to system slowdown.",
        criteria: [
          "Identified unauthorized application installation",
          "Recognized outbound connection and ignored firewall warning",
          "Noted skipped updates and system slowdown"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer:
          "Software whitelisting was off, firewall outbound control was disabled, application monitoring was off, and auto audit logs were disabled.",
        criteria: [
          "Identified software_whitelist = off",
          "Noted firewall_outbound_control = disabled",
          "Mentioned application_monitor = off",
          "Recognized auto_audit_logs = off",
          "Explained combined security risks"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer:
          "Enable software whitelisting, activate firewall controls, turn on application monitoring, and enforce automatic updates and audit logging.",
        criteria: [
          "Suggested enabling software whitelisting",
          "Recommended activating firewall outbound control",
          "Mentioned enabling application monitoring",
          "Proposed enforcing automatic updates and audit logs",
          "Provided comprehensive security framework"
        ]
      }
    ]
  }
];

export const scenarios = [
  {
    id: 1,
    title: "Question 1 ",
    systemLog: [
      "[22/10/2025 09:30:12] USER LOGIN – admin (IP: 192.168.10.45)",
      "[22/10/2025 09:32:50] LOGIN FAILED –admin (IP: 203.0.113.56)",
      "[22/10/2025 09:33:05] LOGIN FAILED – admin (IP: 203.0.113.56)",
      "[22/10/2025 09:33:19] LOGIN FAILED – admin (IP: 203.0.113.56)",
      "[22/10/2025 09:34:02] LOGIN SUCCESS – admin (IP: 203.0.113.56)",
      "[22/10/2025 09:36:10] FILE ACCESSED – /secure/financial_records.db",
      "[22/10/2025 09:40:27] FILE TRANSFER – external destination detected"
    ],
    configFile: `PermitRootLogin yes
PasswordAuthentication yes
MaxAuthTries 10
`,
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
    title: "Question 2",
    systemLog: [
      "root@finance-server:~$",
      "[26/10/2025 11:05:22] LOGIN SUCCESS – user: auditor",
      "[26/10/2025 11:06:18] DATABASE QUERY – SELECT * FROM payroll_data",
      "[26/10/2025 11:08:02] EXPORT INITIATED – payroll_data.csv (size: 32MB)",
      "[26/10/2025 11:09:45] NETWORK TRANSFER – Destination: 198.162.4.50",
      "[26/10/2025 11:10:11] ACCESS REVOKED – user: auditor",
      "[26/10/2025 11:10:12] NEW USER CREATED – user: audit_backup",
      "[26/10/2025 11:11:20] PERMISSIONS MODIFIED – audit_backup → admin_access",
      "[26/10/2025 11:11:45] LOG ENTRY DELETED – user_activity.log (last 10 lines removed)",
      "[26/10/2025 11:12:00] LOGIN FAILED – user: audit"
    ],
    configFile: `// /etc/db/security_policies.conf
data_export = unrestricted
network_monitoring = off
temporary_users = allowed
multi_factor_auth = disabled`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer:
          "After accessing payroll data, the auditor account exported it and transferred it externally. Immediately after access was revoked, a new admin-level user 'audit_backup' was created, indicating possible privilege abuse or credential compromise.",
        criteria: [
          "Identified data export and external transfer",
          "Recognized creation of unauthorized admin user",
          "Linked sequence to insider or credential misuse"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer:
          "Data export was unrestricted, network monitoring was off, temporary user creation was allowed, and multi-factor authentication was disabled — all of which made it easier for the attacker to exfiltrate data and escalate privileges.",
        criteria: [
          "Identified data_export = unrestricted",
          "Noted network_monitoring = off",
          "Mentioned temporary_users = allowed",
          "Recognized multi_factor_auth = disabled",
          "Explained how these enabled data theft and persistence"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer:
          "Restrict data export permissions, enable continuous network monitoring, disallow temporary user creation without admin approval, and enforce multi-factor authentication for all privileged accounts.",
        criteria: [
          "Suggested restricting data_export",
          "Recommended enabling network monitoring",
          "Advised disallowing temporary user creation",
          "Proposed enabling multi-factor authentication",
          "Provided full prevention strategy for insider attacks"
        ]
      }
    ]
  }
];

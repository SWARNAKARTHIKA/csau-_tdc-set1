const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const scenarios = [
  {
    id: 1,
    title: "The Suspicious Pen Drive",
    systemLog: [
      "[19/10/2025 09:00:12] DEVICE CONNECTED – USB_Storage",
      "[19/10/2025 09:00:35] FILE COPIED – /college_data/students.csv → USB_Storage",
      "[19/10/2025 09:01:00] DEVICE REMOVED – USB_Storage"
    ],
    configFile: `usb_access = enabled
file_copy_alert = off
antivirus_scan = disabled`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer: "A user connected a USB drive and copied the student database to it.",
        criteria: [
          "Identified USB device connection",
          "Recognized unauthorized file copy",
          "Mentioned sensitive data (students.csv)"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer: "USB access was enabled, and there were no alerts or antivirus checks.",
        criteria: [
          "Identified usb_access = enabled",
          "Noted file_copy_alert = off",
          "Mentioned antivirus_scan = disabled",
          "Explained the security implications"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer: "Disable USB file copying, enable copy alerts, and turn on antivirus scans.",
        criteria: [
          "Suggested disabling USB access or restricting it",
          "Recommended enabling file copy alerts",
          "Mentioned enabling antivirus scans",
          "Provided comprehensive security solution"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "The Easy Password",
    systemLog: [
      "[20/10/2025 10:05:05] LOGIN FAILED – user: admin (wrong password)",
      "[20/10/2025 10:05:07] LOGIN FAILED – user: admin (wrong password)",
      "[20/10/2025 10:05:10] LOGIN SUCCESS – user: admin"
    ],
    configFile: `password = admin123
failed_login_limit = 10
two_factor_auth = off`,
    questions: [
      {
        id: 1,
        text: "What is strange about this login pattern?",
        marks: 5,
        answer: "The attacker tried a few passwords and got in easily after 2–3 attempts.",
        criteria: [
          "Identified rapid login attempts",
          "Recognized successful brute force attack",
          "Noted the quick success after failures"
        ]
      },
      {
        id: 2,
        text: "What made the system easy to break into?",
        marks: 10,
        answer: "The admin password was too simple ('admin123') and there was no 2-factor authentication.",
        criteria: [
          "Identified weak password (admin123)",
          "Noted lack of 2FA",
          "Mentioned high failed_login_limit",
          "Explained security vulnerabilities"
        ]
      },
      {
        id: 3,
        text: "What should be changed to make it safe?",
        marks: 10,
        answer: "Use a strong password and enable two-factor authentication with fewer allowed login attempts.",
        criteria: [
          "Recommended strong password policy",
          "Suggested enabling 2FA",
          "Mentioned lowering failed login limit",
          "Provided complete security strategy"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "The Fake Update",
    systemLog: [
      "[24/10/2025 10:12:44] LOGIN SUCCESS – user: techsupport",
      "[24/10/2025 10:13:25] FILE CREATED – /system/patch_update.exe",
      "[24/10/2025 10:14:05] FILE EXECUTED – /system/patch_update.exe",
      "[24/10/2025 10:14:45] SYSTEM ERROR – unauthorized access detected"
    ],
    configFile: `software_install = enabled
file_verification = off
admin_approval_required = false`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer: "A user created and ran a fake 'update' file that caused a system error.",
        criteria: [
          "Identified malicious file creation",
          "Recognized unauthorized execution",
          "Noted the system error result"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer: "Software installation was allowed, file verification was off, and no admin approval was needed.",
        criteria: [
          "Identified software_install = enabled",
          "Noted file_verification = off",
          "Mentioned admin_approval_required = false",
          "Explained security gaps"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer: "Require admin approval for installations, enable file verification, and restrict executable file creation.",
        criteria: [
          "Recommended admin approval requirement",
          "Suggested enabling file verification",
          "Mentioned restricting executable creation",
          "Provided comprehensive prevention plan"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "The Hidden Administrator",
    systemLog: [
      "[26/10/2025 08:55:10] LOGIN SUCCESS – user: admin",
      "[26/10/2025 08:56:45] USER CREATED – username: temp_admin",
      "[26/10/2025 08:58:30] PERMISSIONS CHANGED – temp_admin → full_access",
      "[26/10/2025 09:00:22] LOGIN SUCCESS – user: temp_admin",
      "[26/10/2025 09:02:15] FILE MODIFIED – /secure/records.db",
      "[26/10/2025 09:04:50] USER DELETED – username: temp_admin"
    ],
    configFile: `user_creation = enabled
permission_logging = off
multi_admin_accounts = allowed
password_rules = min_length: 4, no_special_chars`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer: "The admin created a temporary user, gave it full access, used it to alter a secure database, and then deleted it — possibly to hide activity.",
        criteria: [
          "Identified temp account creation",
          "Recognized privilege escalation",
          "Noted data modification and cleanup",
          "Understood the intent to hide tracks"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer: "Admins were allowed to create users and assign full permissions without logging; multiple admin accounts were permitted, and password rules were too weak.",
        criteria: [
          "Identified user_creation = enabled",
          "Noted permission_logging = off",
          "Mentioned multi_admin_accounts = allowed",
          "Recognized weak password_rules",
          "Explained combined security risks"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer: "Require two-person approval for admin changes, enable permission logging, disallow multiple full-access accounts, and strengthen password rules.",
        criteria: [
          "Suggested two-person approval",
          "Recommended enabling permission logging",
          "Mentioned limiting admin accounts",
          "Proposed strong password policy (12+ chars, symbols)",
          "Provided comprehensive security framework"
        ]
      }
    ]
  }
];

app.get('/api/scenarios', (req, res) => {
  res.json(scenarios);
});

app.get('/api/scenarios/:id', (req, res) => {
  const scenario = scenarios.find(s => s.id === parseInt(req.params.id));
  if (scenario) {
    res.json(scenario);
  } else {
    res.status(404).json({ error: 'Scenario not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
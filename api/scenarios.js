const scenarios = [
  {
    id: 1,
    title: "Scenario 1",
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
    title: "Scenario 2",
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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const pathParts = req.url.split('/');
  const scenarioId = pathParts[pathParts.length - 1];

  if (scenarioId && !isNaN(scenarioId)) {
    const scenario = scenarios.find(s => s.id === parseInt(scenarioId));
    if (scenario) {
      res.status(200).json(scenario);
    } else {
      res.status(404).json({ error: 'Scenario not found' });
    }
  } else {
    res.status(200).json(scenarios);
  }
};
export const scenarios = [
  {
    id: 1,
    title: "Question 1 (Easy)",
    systemLog: [
      "[25/10/2025 13:15:10] EMAIL SENT – to: external@companyX.com, subject: \"Client Data\"",
      "[25/10/2025 13:15:12] ATTACHMENT – /projects/client_list.pdf",
      "[25/10/2025 13:15:14] EMAIL SENT SUCCESSFULLY"
    ],
    configFile: `email_attachment_limit = none
data_loss_prevention = off
external_email_restriction = disabled`,
    questions: [
      {
        id: 1,
        text: "What suspicious thing happened?",
        marks: 5,
        answer: "An email with sensitive client data was sent to an external address without any restrictions or checks.",
        criteria: [
          "Identified email sent to external recipient",
          "Recognized attachment of sensitive data (client_list.pdf)",
          "Noted lack of restrictions or alerts"
        ]
      },
      {
        id: 2,
        text: "Which settings made it possible?",
        marks: 10,
        answer: "Email attachment limits were set to none, data loss prevention was off, and external email restrictions were disabled.",
        criteria: [
          "Identified email_attachment_limit = none",
          "Noted data_loss_prevention = off",
          "Mentioned external_email_restriction = disabled",
          "Explained the security implications"
        ]
      },
      {
        id: 3,
        text: "How can the IT team prevent this?",
        marks: 10,
        answer: "Enable data loss prevention, set attachment limits, and restrict external emails.",
        criteria: [
          "Suggested enabling data loss prevention",
          "Recommended setting email attachment limits",
          "Mentioned restricting external emails",
          "Provided comprehensive security solution"
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
        answer: "A user installed an unauthorized application, initiated an outbound connection, ignored firewall warnings, and skipped updates, leading to system slowdown.",
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
        answer: "Software whitelisting was off, firewall outbound control was disabled, application monitoring was off, and auto audit logs were disabled.",
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
        answer: "Enable software whitelisting, activate firewall controls, turn on application monitoring, and enforce automatic updates and audit logging.",
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

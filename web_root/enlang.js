export const enLangswitch = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - 'On' or 'Off' this pin/switch.",
  'Action - Some actions with this pin.'
];

export const enlangbutton = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'sclick - Do I need to track the single pressing of the button or not',
  'dclick - Do I need to track the double pressing of the button or not',
  'lpress - Do I need to track the long pressing of the button or not',
  'Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - 'On' or 'Off' this pin/switch.",
  'Action - Some actions with this pin.'
];
export const enlangmonitoring = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'monitoring - Do I need to track the single pressing of the button or not',
  'Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - 'On' or 'Off' this pin/switch.",
  'Action - Some actions with this pin.'
];
export const enencoder = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'sclick - Do I need to track the single pressing of the button or not',
  'dclick - Do I need to track the double pressing of the button or not',
  'lpress - Do I need to track the long pressing of the button or not',
  'Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - 'On' or 'Off' this pin/switch.",
  'Action - Some actions with this pin.'
];

export const enlangeditbutton = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'Bounce interval (ms) - Suppression interval of bounce of button contacts, usually 40ms are enough.',
  'Hold interval (ms) - The time in ms that the button has to be held down for it to go into the Hold state.',
  "Repeat - 1 or 0 - 'On' or 'Off' - enable or disable auto-repeat when in the hold mode.",
  'Repeat interval (ms) - The interval in ms at which to repeat the presses in the hold mode (the Repeat field must be set to 1). It is usually 150ms.',
  'Double-click interval (ms) - The interval in ms during which two consecutive button presses will generate a DoubleClick event. 0 - does not track a double-click. It is usually 800ms.',
  'Prevent Click - 1 or 0 - Prevent (1) - a Click event from being generated the first time you click if it is followed by a DoubleClick. Makes sense only if Double-click interval is greater than zero.',
  'Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - 'On' or 'Off' this pin/switch."
];

export const enlangpwm = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.',
  "ON - State of pin -1 is 'On', 0 is 'Off'.",
  'Invert State - port inversion (Off - logical 1 at the output, on - 0).',
  'Dimmer value (0-255) - If you use PWM, it will between (0-255).',
  'Power On Restore - What parameters should be saved when changing and restored when the controller is on None - do not save anything, when you turn on the state and value are equal to those set when configuring. State - restore the last set state of parameter On. Value - restore the last set value of dimmer (PWM). State&Value - restore state and value.',
  'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',
  "On/Off - 'On' or 'Off' this relay.",
  'Action - Some actions with this pin.'
];

export const enlangz = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',
  "On/Off - 'On' or 'Off' this relay.",
  'Action - For yourself, write a reminder for what this PIN is for!.'
];

export const enrelay = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  "ON - State of pin -1 is 'On', 0 is 'Off'.",
  'Power On Restore - What parameters should be saved when changing and restored when the controller is on None - do not save anything, when you turn on the state and value are equal to those set when configuring. State - restore the last set state of parameter On. Value - restore the last set value of dimmer (PWM). State&Value - restore state and value.',
  'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',
  "On/Off - 'On' or 'Off' this relay.",
  'Action - For yourself, write a reminder for what this PIN is for!.'
];

export const enlangeditrelay = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.',
  "ON - State of pin -1 is 'On', 0 is 'Off'.",
  'Invert State - port inversion (Off - logical 1 at the output, on - 0).',
  'Dimmer value (0-255) - If you use PWM, it will between (0-255).',
  'Power On Restore - What parameters should be saved when changing and restored when the controller is on None - do not save anything, when you turn on the state and value are equal to those set when configuring. State - restore the last set state of parameter On. Value - restore the last set value of dimmer (PWM). State&Value - restore state and value.',
  'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',
  "On/Off - 'On' or 'Off' this relay."
];

export const enlangtimers = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the cron. Assigned automatically',
  'Configure a cron.',
  'What action must be performed at the time specified in the timer.',
  'INFO - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',
  'Action - Some actions with this cron.'
];

export const enlangsettings = [
  '', // Empty string for index 0
  'Login - Enter the username for authorization.',
  'Password - Enter your password for authorization.',
  'Language - Select the interface/help language.',
  'Time zone - Select your time zone.',
  'IP address - Enter a static IP address. After the reboot, the STM32 will be available at the entered address!',
  'Subnet mask - Enter the subnet mask.',
  'Default gateway - Enter the default gateway.',
  'MAC address - If you have more than one device, you need to give each device a unique MAC address.',
  'Host - Enter the static IP address of the MQTT broker.',
  'Port - Specify the MQTT port of the broker.',
  'Client - Specify the client ID.',
  'User - Specify a user name.',
  'Password - Enter password for authorization.',
  'Topic - Specify the name of the topic',
  'Full Topic - Specify the full topic.',
  'QOS - Specify the quality of service.',
  'Longitude - Round up the longitude value to three decimal places.',
  'Latitude - Round up the latitude value to three decimal places.',
  'Sunrise - The sunrise time is automatically set according to your coordinates.',
  'Sunset - The sunset time is set automatically according to your coordinates.'
];

export const encronhelp = [
  '', // Empty string for index 0
  'CRON is valid all the time, will fire every second.',
  'CRON is valid at the beginning of each minute.',
  'CRON is valid every Tuesday all day long.',
  'CRON is valid every beginning of the minute between hours 13-15 afternoon, between Tuesday and Thursday.',
  'CRON is valid every 5 seconds starting at 0.',
  'CRON is valid every 5 seconds each 5 minutes, from 00:00 to 55:55.',
  'Every Friday at midnight.',
  'Every 2 hours at beginning of the hour.',
  'Every second of every minute every 2 hours (0, 2, 4, .., 22).',
  'At midnight, 00:00 every week between Monday and Friday.',
  'Every 6 hours at (min:sec) 23:15 (00:23:15, 06:23:15, 12:23:15, …).',
  'At 00:00:00 beginning of the month.',
  'Every beginning of the quarter at 00:00:00.',
  'At 20:15:20 every Saturday in August.',
  'At 20:15:20 every Saturday that is also 8th day in month (both must match, day Saturday and date 8th).',
  'Every second between 30 and 45.',
  'Every 3rd second in every minute, when seconds are between 30 and 45.',
  'Every beginning of a minute when minute is between 23 and 59.',
  'Every second when seconds are from 50-59 and 00-10 (overflow mode).'
];

export const enactionhelp = [
  '', // Empty string for index 0
  'Pin 18 will turn on (ON) at the specified time (CRON), stay on for 5 seconds and turn off (OFF) at the end of the pause (p - PAUSE).',
  'Pin 12 will change its state (TOGGLE) every 5 seconds (p - PAUSE).',
  "Pin 12 will change its state (TOGGLE) every CRON's valid time"
];

export const enlange1Wire = [
  '', // Empty string for index 0
  'ID - is a unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.',
  "ON - State of pin -1 is 'On', 0 is 'Off'.",
  'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',
  "On/Off - 'On' or 'Off' this relay."
];

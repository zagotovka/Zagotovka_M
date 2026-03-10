export const enLangswitch = [
  '', // Empty string for index 0
  'ID - A unique numerical identifier of the switch. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.',
  'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - Enable or disable the switch state handler on this pin.",
  'Action - The Edit button allows you to access the switch settings menu.'
];

export const enLangselect = [
  '', // 0
  'ID - A unique numerical identifier. Assigned automatically.', // 1
  'Pin - The unique number of the digital or analog pin.', // 2
  'Type(s) of pin(s) - Select the operating mode of this pin from the provided options.' // 3
];

export const enlangbutton = [
  '', // Empty string for index 0
  'ID - A unique numerical identifier of the button. Assigned automatically.',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'sclick - Command to execute when the button is pressed once.',
  'dclick - Command to execute when the button is pressed twice.',
  'lpress - Command to execute when the button is long pressed.',
  'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',
  "On/Off - Enable or disable the button function on this pin.",
  'Action - The Edit button allows you to access the button settings menu.'
];

export const enlangmonitoring = [
  '', // Empty string for index 0
  'ID - A unique numerical identifier of the pin. Assigned automatically',
  'PIN - The unique number of the digital or analog pin.',
  'Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)',
  'Monitoring - Enable or disable the monitoring of this pin.',
  'Relay connection - Pins with which this monitor interacts.',
  'INFO - Name for navigation.',
  "On/Off - 'On' or 'Off' this monitor.",
  'Action - Some actions with this pin.'
];

export const enencoder = [
  '', // 0
  'ID - A unique numerical identifier of the encoder. Assigned automatically.', // 1
  'PIN - The unique number of the pin.', // 2
  'Encoder A (ID) - Main pin of encoder A (DT).', // 3
  'Encoder B (ID) - Additional pin of encoder B (CLK).', // 4
  'PWM connection - PWM connection for brightness control (dimmer).', // 5
  'Dimmer value (0-100) - Current dimmer value from 0 to 100.', // 6
  'Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.', // 7
  'INFO - Give a name to this encoder for quick navigation.', // 8
  'On/Off - Enable or disable the encoder handler.', // 9
  'Action - The Edit button allows you to access the encoder settings menu.', // 10
  'PWM Frequency - PWM frequency of the controlled device (in Hertz).', // 11
  'Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device.' // 12
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
  '', // 0
  'No - A unique numerical identifier of the task (cron). Assigned automatically.', // 1
  'Cron - Configure a schedule (cron) to perform the action.', // 2
  'Script - What action (script) must be performed at the time specified in the timer.', // 3
  'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!', // 4
  'On/Off - Enable or disable the execution of this task.', // 5
  'Action - The Edit button allows you to access the task settings menu.' // 6
];

export const enlangsettings = [
  '', // 0
  'Login - Enter the username for logging into the system. Used for web interface authentication.', // 1
  'Password - Enter your password for the system. It is recommended to use a strong password.', // 2
  'Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.', // 3
  'IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100', // 4
  'Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0', // 5
  'Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1', // 6
  'Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1', // 7
  'Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com', // 8
  'Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).', // 9
  'Client - Unique MQTT client identifier. Each device must have its own unique Client ID.', // 10
  'User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.', // 11
  'Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.', // 12
  'TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm', // 13
  'RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm', // 14
  'HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net', // 15
  'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.', // 16
  'Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.', // 17
  'Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)', // 18
  'Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)', // 19
  'Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.', // 20
  'Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.', // 21
  'Day Length - Duration of daylight, calculated automatically based on coordinates and current date.', // 22
  'Next full moon - Date and time of the next full moon, calculated automatically.', // 23
  'Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25', // 24
  'Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00' // 25
];

export const enlangsettingsmap = {
  'Login':          1,
  'Password':       2,
  'Time zone UTC':  3,
  'IP address':     4,
  'Subnet mask':    5,
  'Default gateway':6,
  'Token':          7,
  'Host':           8,
  'Port':           9,
  'Client':         10,
  'User':           11,
  'MQTT Password':  12,
  'TX topic':       13,
  'RX topic':       14,
  'HTTPS domain':   15,
  'Private Key':    16,
  'Public Key':     17,
  'Longitude':      18,
  'Latitude':       19,
  'Sunrise':        20,
  'Sunset':         21,
  'Day Length':     22,
  'Next full moon': 23,
  'Date':           24,
  'Time':           25,
};

export const enlangsettingsmap2 = enlangsettingsmap;

export const enlangsettings2 = enlangsettings;

export const enlangsettings_idx = enlangsettingsmap;

export const enlangsettings_full = enlangsettings;

export const enlangsettings_complete = enlangsettings;

export const enlangsettings3 = enlangsettings;

export const enlangsettings_v2 = enlangsettings;

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

export const enLangsecurity = [
  '', // 0
  'RXD Pin - Receive Data Pin (RX).', // 1
  'TXD Pin - Transmit Data Pin (TX).', // 2
  'Phone Number - Phone number for SMS notifications and calls.', // 3
  'Info - Additional information for quick navigation.', // 4
  'OnOff - Enable or disable the SIM800L module.', // 5
  'Action - The Edit button allows you to access the settings menu.' // 6
];

export const enLangsecuritypins = [
  '', // 0
  'ID - A unique numerical identifier of the pin. Assigned automatically.', // 1
  'Pin - The unique number of the digital or analog pin.', // 2
  'Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).', // 3
  'Action - Action to perform when the sensor is triggered.', // 4
  'Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).', // 5
  'INFO - Additional information for quick navigation.', // 6
  'On/Off - Enable or disable the security pin.', // 7
  'Edit Pin - The Edit button allows you to access the security pin settings.' // 8
];

export const enlange1Wire = [
  '', // 0
  'ID - A unique numerical identifier. Assigned automatically.', // 1
  'Pin - The unique number of the digital pin to which the 1-Wire bus is connected.', // 2
  'Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).', // 3
  'Count of sensors - Number of found 1-Wire temperature sensors on this pin.', // 4
  'On/Off - The function of enabling or disabling polling of connected sensors on this bus.', // 5
  'Actions - The Edit button to bind a specific sensor to this connection.' // 6
];
import re

with open("Core/Src/setings.c", "r") as f:
    content = f.read()

# Replace all calls first
content = content.replace("writeField(", "writeField(&USBHFile, buffer, ")

# Remove the nested functions
pattern = re.compile(
    r"[ \t]*// Helper function to write a(?: JSON object)? field\n"
    r"[ \t]*void writeField\(&USBHFile, buffer, const char \*name, const char \*format, \.\.\.\) \{(?:[^{}]*)\}\n",
    re.MULTILINE | re.DOTALL
)

content = pattern.sub("", content)

# Define the static function
static_writeField = """static void writeField(FIL *file, char *buffer, const char *name, const char *format, ...) {
  va_list args;
  UINT bytesWritten;
  va_start(args, format);
  // Write field name
  snprintf(buffer, JSON_BUF_SIZE, "\\"%s\\":", name);
  f_write(file, buffer, strlen(buffer), &bytesWritten);
  // Write field value
  vsnprintf(buffer, JSON_BUF_SIZE, format, args);
  f_write(file, buffer, strlen(buffer), &bytesWritten);
  va_end(args);
  // Write comma
  f_write(file, ",", 1, &bytesWritten);
}

"""

# Insert it before SetSettingsConfig
insert_pos = content.find("void SetSettingsConfig()")
if insert_pos != -1:
    content = content[:insert_pos] + static_writeField + content[insert_pos:]

with open("Core/Src/setings.c", "w") as f:
    f.write(content)

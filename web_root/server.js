import fs from 'fs';
import path from 'path';

const urlMappings = {
  '/api/login': {
    file: 'json/login.json',
    contentType: 'application/json'
  },
  '/api/logout': {
    file: 'json/logout.json',
    contentType: 'application/json'
  },
  '/api/select/get': {
    file: 'json/Select.json',
    contentType: 'application/json'
  },
  '/api/pintopin/get': {
    file: 'json/pintopin.json',
    contentType: 'application/json'
  },
  '/api/select/set': {
    file: 'json/Select2.json',
    contentType: 'application/json'
  },
  '/api/switch/get': {
    file: 'json/Switch.json',
    contentType: 'application/json'
  },
  '/api/onoff/set': {
    file: 'json/onoff.json',
    contentType: 'application/json'
  },
  '/api/switch/set': {
    file: 'json/Switch2.json',
    contentType: 'application/json'
  },
  '/api/onewire/get': {
    file: 'json/onewire.json',
    contentType: 'application/json'
  },
  '/api/onewire/set': {
    file: 'json/onewire2.json',
    contentType: 'application/json'
  },
  '/api/sensor/set': {
    file: 'json/onewire3.json',
    contentType: 'application/json'
  },
  '/api/button/get': {
    file: 'json/Button.json',
    contentType: 'application/json'
  },
  '/api/button/set': {
    file: 'json/Button2.json',
    contentType: 'application/json'
  },
  '/api/encoder/get': {
    file: 'json/Encoder.json',
    contentType: 'application/json'
  },
  '/api/encoder/set': {
    file: 'json/Encoder2.json',
    contentType: 'application/json'
  },
  '/api/relay/get': {
    file: 'json/Relay.json',
    contentType: 'application/json'
  },
  '/api/relay/set': {
    file: 'json/Relay2.json',
    contentType: 'application/json'
  },
  '/api/pwm/get': {
    file: 'json/PWM.json',
    contentType: 'application/json'
  },
  '/api/pwm/set': {
    file: 'json/PWM2.json',
    contentType: 'application/json'
  },
  '/api/cron/get': {
    file: 'json/Timers.json',
    contentType: 'application/json'
  },
  '/api/cron/set': {
    file: 'json/Timers2.json',
    contentType: 'application/json'
  },
    '/api/pid/get': {
    file: 'json/Pid.json',
    contentType: 'application/json'
  },
  '/api/pid/set': {
    file: 'json/Pid2.json',
    contentType: 'application/json'
  },
  '/api/numline/set': {
    file: 'json/Timers3.json',
    contentType: 'application/json'
  },
  '/api/debug': {
    file: 'json/debug.json',
    contentType: 'application/json'
  },
  '/api/stats/get': {
    file: 'json/stats.json',
    contentType: 'application/json'
  },
  '/api/events/get': {
    file: 'json/events.json',
    contentType: 'application/json'
  },
  '/api/mysett/get': {
    file: 'json/settings.json',
    contentType: 'application/json'
  },
  '/api/mysett/set': {
    file: 'json/settings2.json',
    contentType: 'application/json'
  },
  '/api/security/get': {
    file: 'json/security.json',
    contentType: 'application/json'
  },
  '/api/security/set': {
    file: 'json/security2.json',
    contentType: 'application/json'
  },

  '/api/firmware/commi': {
    file: 'json/firmware_commit.json',
    contentType: 'application/json'
  },
  '/api/firmware/rollback': {
    file: 'json/firmware_rollback.json',
    contentType: 'application/json'
  },
  '/api/firmware/statusv': {
    file: 'json/firmware_status.json',
    contentType: 'application/json'
  },
  '/api/device/reset': {
    file: 'json/device_reset.json',
    contentType: 'application/json'
  },
  '/api/device/eraselast': {
    file: 'json/device_eraselast.json',
    contentType: 'application/json'
  },
  '/api/connection/del': {
    file: 'json/connections.json',
    contentType: 'application/json'
  },
  '/api/stm32-time': {
    file: 'json/stm32time.json',
    contentType: 'application/json'
  },
  '/api/temp/get': {
    file: 'json/Temp.json',
    contentType: 'application/json'
  },
  '/api/firmware/upload': {
    file: 'json/upload.json',
    contentType: 'application/json'
  }
};

export default function redirectMiddleware(mode) {
  return {
    name: 'redirect-middleware',
    configureServer(server) {
      if (mode !== 'development') {
        console.warn('[security] redirectMiddleware disabled in non-dev mode');
        return;
      }

      const MOCK_DIR = path.resolve(process.cwd(), 'json');
      const MAX_BODY = 1024 * 1024; // 1 MB — защита от переполнения диска

      server.middlewares.use(async (req, res, next) => {
        const url = req.url;
        const mapping = urlMappings[url];

        if (!mapping) {
          next();
          return;
        }

        // Path traversal protection: resolve only inside MOCK_DIR
        const safePath = path.resolve(MOCK_DIR, path.basename(mapping.file));
        if (!safePath.startsWith(MOCK_DIR)) {
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        if (req.method === 'GET') {
          try {
            const fileContent = await fs.promises.readFile(safePath, 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', mapping.contentType);
            res.end(fileContent);
          } catch (error) {
            console.error('Error reading file:', error);
            res.statusCode = 500;
            res.end();
          }
        } else if (req.method === 'POST') {
          let body = '';
          let overflow = false;
          req.on('data', (chunk) => {
            body += chunk.toString();
            if (body.length > MAX_BODY) {
              overflow = true;
              req.destroy();
            }
          });
          req.on('end', async () => {
            if (overflow) {
              res.statusCode = 413;
              res.end('Payload Too Large');
              return;
            }
            try {
              const data = JSON.parse(body);
              await fs.promises.writeFile(
                safePath,
                JSON.stringify(data, null, 2),
                'utf-8'
              );
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'success' }));
            } catch (error) {
              console.error('Error writing file:', error);
              res.statusCode = 500;
              res.end();
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    }
  };
}

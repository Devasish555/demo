# Azure VM pe React + Node.js Deploy - Complete Guide

## PART 1: Azure Portal pe VM Create karna

**Step 1:** Azure Portal jao → https://portal.azure.com

**Step 2:** Search bar mein "Virtual Machines" type karo → Click karo

**Step 3:** "+ Create" → "Azure Virtual Machine" click karo

**Step 4:** Basics tab fill karo:
- Subscription: Azure for Students
- Resource Group: "Create new" → naam do `my-app-rg`
- VM name: `myvm`
- Region: East US (ya allowed region)
- Image: Ubuntu Server 22.04 LTS
- Size: Standard_B1s (free tier)
- Authentication: Password
- Username: `jamal` (ya kuch bhi)
- Password: Strong password set karo

**Step 5:** Networking tab:
- Public IP: Yes (default)
- Inbound ports: SSH (22), HTTP (80) select karo

**Step 6:** "Review + Create" → "Create" click karo

**Step 7:** 2-3 minute wait karo, VM ban jayega. Public IP note karo.

---

## PART 2: VM mein SSH se Connect karna

**Step 8:** Apne computer ka terminal kholo (Mac/Linux) ya PowerShell (Windows)

**Step 9:** SSH command run karo:
```bash
ssh username@YOUR_VM_IP
```
Example: `ssh jamal@104.214.169.124`

**Step 10:** Password enter karo jo VM create karte waqt set kiya tha

**Step 11:** "Yes" type karo agar fingerprint confirm karne bole

Ab tum VM ke andar ho!

---

## PART 3: VM mein Software Install karna

**Step 12:** System update karo:
```bash
sudo apt update
```

**Step 13:** System upgrade karo:
```bash
sudo apt upgrade -y
```

**Step 14:** Node.js install karo:
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
```

**Step 15:** Node install complete karo:
```bash
sudo apt install -y nodejs
```

**Step 16:** Check karo Node install hua:
```bash
node --version
```
(v22.x.x dikhna chahiye)

**Step 17:** Git install karo:
```bash
sudo apt install -y git
```

**Step 18:** PM2 install karo (process manager):
```bash
sudo npm install -g pm2
```

---

## PART 4: Project Clone aur Setup

**Step 19:** GitHub se project clone karo:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

**Step 20:** Project folder mein jao:
```bash
cd YOUR_REPO
```

**Step 21:** Dependencies install karo:
```bash
npm install
```

**Step 22:** React app build karo:
```bash
npm run build
```
(Yeh `dist` folder banayega)

---

## PART 5: Server Start karna

**Step 23:** Production mode set karo:
```bash
export NODE_ENV=production
```

**Step 24:** PM2 se server start karo:
```bash
pm2 start server/index.js --name "my-app"
```

**Step 25:** Check karo server chal raha hai:
```bash
pm2 status
```
("online" dikhna chahiye)

**Step 26:** PM2 auto-restart enable karo:
```bash
pm2 startup
```
(Jo command dikhe woh copy karke run karo)

**Step 27:** PM2 config save karo:
```bash
pm2 save
```

---

## PART 6: Nginx Setup (Web Server)

**Step 28:** Nginx install karo:
```bash
sudo apt install -y nginx
```

**Step 29:** Nginx config file edit karo:
```bash
sudo nano /etc/nginx/sites-available/default
```

**Step 30:** Sab content delete karo (Ctrl+K repeatedly) aur yeh paste karo:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 31:** Save karo:
- `Ctrl + X` press karo
- `Y` press karo
- `Enter` press karo

**Step 32:** Config test karo:
```bash
sudo nginx -t
```
("syntax is ok" dikhna chahiye)

**Step 33:** Nginx restart karo:
```bash
sudo systemctl restart nginx
```

---

## PART 7: Azure mein Port 80 Allow karna

**Step 34:** Azure Portal jao → Virtual Machines → apna VM select karo

**Step 35:** Left menu mein "Networking" click karo

**Step 36:** "Add inbound port rule" click karo:
- Destination port: 80
- Protocol: TCP
- Action: Allow
- Name: HTTP
- "Add" click karo

---

## PART 8: Website Access karo

**Step 37:** Browser mein jao:
```
http://YOUR_VM_IP
```

🎉 **Website live hai!**

---

## Useful Commands

| Kaam | Command |
|------|---------|
| Server status | `pm2 status` |
| Server restart | `pm2 restart my-app` |
| Server logs | `pm2 logs` |
| Server stop | `pm2 stop my-app` |
| Nginx restart | `sudo systemctl restart nginx` |
| Code update | `cd project && git pull && npm run build && pm2 restart my-app` |

---

## Code Update kaise kare (Future mein)

Jab bhi code change karo aur GitHub pe push karo, VM mein yeh run karo:

```bash
cd YOUR_REPO
git pull
npm install
npm run build
pm2 restart my-app
```

---

## Troubleshooting

### Website nahi khul rahi?
1. Check PM2: `pm2 status` (online hona chahiye)
2. Check Nginx: `sudo systemctl status nginx`
3. Check port 80 Azure mein allowed hai

### Server crash ho gaya?
```bash
pm2 restart my-app
pm2 logs
```

### Nginx error?
```bash
sudo nginx -t
sudo systemctl restart ngin
# QG4 Backend

Backend اولیه QG4 برای:

- ثبت‌نام با Username + Password + Rubika ID
- ورود با Username + Password
- Hash امن رمز عبور با bcrypt
- اتصال به Supabase Database
- سیستم کد تأیید یک‌بارمصرف
- محل اتصال به Rubika Bot
- آماده‌سازی برای Deploy روی Render

## نصب محلی

```bash
npm install
```

فایل `.env.example` را به `.env` تغییر دهید و مقادیر واقعی را وارد کنید.

سپس:

```bash
npm start
```

Health check:

```text
GET /api/health
```

## API

### درخواست کد

```text
POST /api/verification/request
```

Body:

```json
{
  "rubikaId": "YOUR_RUBIKA_ID"
}
```

### تأیید کد

```text
POST /api/verification/verify
```

Body:

```json
{
  "rubikaId": "YOUR_RUBIKA_ID",
  "code": "123456"
}
```

### ثبت‌نام

```text
POST /api/auth/register
```

Body:

```json
{
  "username": "iliacraft",
  "password": "your-password",
  "rubikaId": "YOUR_RUBIKA_ID",
  "verificationCode": "123456"
}
```

### ورود

```text
POST /api/auth/login
```

Body:

```json
{
  "username": "iliacraft",
  "password": "your-password"
}
```

## مهم

- `SUPABASE_SERVICE_ROLE_KEY` را هرگز در Frontend قرار ندهید.
- `RUBIKA_BOT_TOKEN` را هرگز در Frontend یا GitHub قرار ندهید.
- فایل `.env` نباید Commit شود.
- قبل از استفاده در محیط واقعی، session/JWT، rate limiting و ذخیره پایدار verification code اضافه کنید.
- اتصال واقعی Rubika Bot باید در `services/rubika.js` پیاده‌سازی شود.
- برای ثبت‌نام واقعی، باید قبل از insert شدن کاربر، کد یک‌بارمصرف به‌صورت امن Verify شود.

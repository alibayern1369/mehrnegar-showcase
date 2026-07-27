# انتشار ویترین عمومی (بدون سورس)

این پوشه فقط برای ساخت یک ریپوی **Public** روی GitHub است. ریپوی اصلی پروژه را **Private** نگه دارید.

## ۱) ریپوی اصلی را Private کنید

در GitHub → Settings → Danger Zone → Change visibility → Private.

## ۲) ویترین را به عنوان ریپوی جداگانه منتشر کنید

از ریشه پروژه:

```bash
# ویندوز PowerShell
cd showcase
git init
git add .
git commit -m "Add Mehrnegar public showcase (screenshots only)"

# ساخت ریپوی عمومی و push
gh repo create mehrnegar-showcase --public --source=. --remote=origin --push
```

اگر `gh` ندارید، در GitHub یک ریپوی خالی `mehrnegar-showcase` بسازید و:

```bash
git remote add origin https://github.com/YOUR_USER/mehrnegar-showcase.git
git branch -M main
git push -u origin main
```

## ۳) دمو زنده را بالا بیاورید

طبق `docs/demo-deploy.md` در ریپوی اصلی (Private):

- Postgres جدا
- `DEMO_MODE=true`
- بدون credential واقعی SMS
- لینک دمو را در `showcase/README.md` جایگزین کنید

## ۴) در رزومه

- لینک ریپوی showcase (عمومی)
- لینک دمو زنده
- ذکر کنید: source available on request / private

هر بار اسکرین‌شات‌ها را عوض کردید:

```bash
# از ریشه پروژه
Copy-Item -Force docs\screenshots\*.png showcase\screenshots\
```

سپس در پوشه `showcase` دوباره commit/push کنید.

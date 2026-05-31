# ⚖️ Юридический навигатор · Грузия

AI-ассистент по грузинскому праву для русскоязычных экспатов.   
Работает на базе **Google Gemini**, деплоится на **Vercel** за 5 минут.

---

## 🚀 Быстрый старт (деплой на Vercel)

### Шаг 1 — Получите API ключ Gemini
1. Идите на [aistudio.google.com](https://aistudio.google.com/)
2. Войдите через Google-аккаунт
3. Нажмите **"Get API key"** → **"Create API key"**
4. Скопируйте ключ (он выглядит как `AIzaSy...`)

### Шаг 2 — Загрузите проект на GitHub
```bash
git init
git add .
git commit -m "Initial commit: Legal Navigator Georgia"
git remote add origin https://github.com/YOUR_USERNAME/legal-navigator.git
git push -u origin main
```

### Шаг 3 — Деплой на Vercel
1. Идите на [vercel.com](https://vercel.com) и войдите через GitHub
2. Нажмите **"Add New Project"**
3. Выберите ваш репозиторий `legal-navigator`
4. В разделе **"Environment Variables"** добавьте:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** ваш ключ от Google AI Studio
5. Нажмите **"Deploy"**

✅ Через 2-3 минуты ваш сайт будет доступен по адресу `https://legal-navigator-xxx.vercel.app`

---

## 🛠️ Локальная разработка

```bash
npm install
cp .env.example .env.local
# Вставьте ваш Gemini API ключ в .env.local
npm run dev
# Откройте http://localhost:3000
```

---

## 📁 Структура проекта

```
legal-navigator/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # API endpoint → Gemini
│   ├── globals.css            # Стили
│   ├── layout.tsx             # Корневой layout с шрифтами
│   └── page.tsx               # Главная страница + чат
├── components/
│   └── MarkdownRenderer.tsx   # Рендер ответов AI
├── lib/
│   └── config.ts              # System prompt + категории + подсказки
├── .env.example               # Пример переменных окружения
├── vercel.json                # Конфиг Vercel
└── README.md
```

---

## ✏️ Как кастомизировать

### Изменить категории вопросов
Откройте `lib/config.ts` и редактируйте массив `CATEGORIES`.

### Изменить поведение AI
Откройте `lib/config.ts` и редактируйте `SYSTEM_PROMPT`.

### Добавить контакты юриста
В `app/page.tsx` найдите `mailto:lawyer@example.com` и замените на реальный email.

### Добавить номер телефона
В `app/page.tsx` добавьте кнопку с `href="tel:+995..."`.

---

## 💼 Бизнес-модель: Лидогенерация

1. **Бесплатный режим** — AI отвечает на базовые вопросы
2. **Кнопка «Записаться к юристу»** — ведёт на форму или email
3. **Монетизация:** договоритесь с 2-3 русскоязычными юристами в Тбилиси  
   - Фикс за лид: $20-50
   - % от сделки: 10-15%

**Рекомендуемые партнёры:** ищите в Telegram-группах экспатов Грузии, на Expat.com, Facebook-группах «Русские в Тбилиси».

---

## ⚠️ Важно

Приложение предоставляет **информационную справку**, не юридическую консультацию.  
Для официальных действий пользователи должны обращаться к лицензированному юристу.

---

## 📈 Возможные улучшения

- [ ] **RAG (база знаний):** загрузите PDF законов Грузии и настройте поиск по ним
- [ ] **История чатов:** сохранение в localStorage
- [ ] **Telegram Mini App:** адаптация под Telegram WebApp
- [ ] **Мультиязычность:** добавить грузинский и английский
- [ ] **Аналитика:** подключить Vercel Analytics
- [ ] **Форма записи:** интеграция с Calendly или Google Forms

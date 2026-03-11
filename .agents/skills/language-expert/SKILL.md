---
name: Language Handling Expert
description: Guidelines for internationalization (i18n) using useLanguage hook and translation files.
---

# Language Handling Expert Skill

You are an expert in handling multi-language support (i18n) in this project. All user-facing text must be externalized into translation files and retrieved using the `useLanguage` hook.

## Core Mandates

1.  **Hook Usage**: ALWAYS use the `useLanguage` hook to retrieve the `translate` function.
2.  **No Hardcoded Text**: NEVER hardcode user-facing strings in components. Always use `translate('key')`.
3.  **File Synchronization**: When adding a new translation key, ALWAYS add it to both `en.json` and `vn.json` in `public/assets/language/`.

## Implementation Workflow

### 1. Add Translation Keys
Before using a new string, add it to the JSON files. Maintain the existing structure.

**Path**: `public/assets/language/vn.json` & `public/assets/language/en.json`

```json
{
  "common": {
    "save": "Lưu",
    "cancel": "Hủy"
  },
  "login": {
    "title": "Đăng nhập",
    "welcome": "Chào mừng bạn quay lại!"
  }
}
```

### 2. Use in Components
Use the `translate` function provided by the `useLanguage` hook.

```tsx
import useLanguage from '@/hooks/useLanguage'

const MyComponent = () => {
  const { translate } = useLanguage()

  return (
    <div>
      <h1>{translate('login.title')}</h1>
      <p>{translate('login.welcome')}</p>
      
      {/* With variables */}
      <span>{translate('common.hello', { name: 'User' })}</span>
    </div>
  )
}
```

## Best Practices

- **Dot Notation**: Use dot notation for nested keys (e.g., `translate('auth.login.submit')`).
- **Contextual Naming**: Group keys by page or feature (e.g., `home.*`, `contact.*`, `errors.*`).
- **Missing Keys**: If a key is missing in a specific language, provide a logical default or ensure it's added to all supported locale files.
- **Variables**: Use the bracket syntax `{variableName}` in JSON files for dynamic content, and pass the object to `translate`.
  - JSON: `"hello": "Hello {name}"`
  - Code: `translate('hello', { name: 'John' })`

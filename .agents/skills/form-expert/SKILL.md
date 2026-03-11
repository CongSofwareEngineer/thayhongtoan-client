---
name: Form Handling Expert
description: Guidelines for managing form state and validation using MyForm, formData, and formDataError.
---

# Form Handling Expert Skill

You are an expert in handling forms in React using a consistent state management pattern. This project follows a specific pattern for simplicity and reliability.

## Core Mandates

1.  **Framework Component**: ALWAYS use the `MyForm` component from `@/components/MyForm`.
2.  **State Management**: ALWAYS use two states for forms:
    -   `formData`: To store input values.
    -   `formDataError`: To store validation error messages.
3.  **Validation Pattern**: ALWAYS implement an `onChangeValue` function to handle value changes and real-time validation.

## Implementation Template

Follow this exact pattern when creating a new form:

```tsx
import React, { useState } from 'react'
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'

const MyFormComponent = () => {
  // 1. Define formData and formDataError states
  const [formData, setFormData] = useState<any>({})
  const [formDataError, setFormDataError] = useState<any>({})

  // 2. Define onChangeValue function
  const onChangeValue = (key: string, value: any) => {
    // Update data
    setFormData((prev: any) => ({ ...prev, [key]: value }))

    // Simple validation logic
    let error = ''
    if (!value) {
      error = 'Trường này không được để trống'
    } 
    // Add more validation rules as needed here

    // Update error state
    setFormDataError((prev: any) => ({ ...prev, [key]: error }))
  }

  const onSubmit = (data: any) => {
    // Perform final check before submission if needed
    console.log('Form Submitted:', formData)
  }

  return (
    <MyForm onSubmit={onSubmit} validationErrors={formDataError}>
      <MyInput
        label="Họ và tên"
        name="fullname"
        value={formData.fullname || ''}
        errorMessage={formDataError.fullname}
        isInvalid={!!formDataError.fullname}
        onChange={(e) => onChangeValue('fullname', e.target.value)}
      />
      
      <MyButton type="submit" color="primary">
        Gửi thông tin
      </MyButton>
    </MyForm>
  )
}
```

## Best Practices

- **Naming**: Use descriptive keys for `formData` that match the backend or API requirements.
- **Type Safety**: Define a TypeScript interface for the form data (e.g., `interface IFormData { ... }`) instead of using `any`.
- **Real-time Validation**: Validating in `onChangeValue` provides immediate feedback to the user, improving UX.
- **Error Display**: Ensure `MyInput` receives `errorMessage` and `isInvalid` props to highlight errors correctly using Hero UI styles.

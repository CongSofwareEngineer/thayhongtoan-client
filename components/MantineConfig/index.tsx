'use client'
import React from 'react'
import {
  Button,
  Checkbox,
  createTheme,
  Drawer,
  Input,
  MantineProvider,
  Modal,
  PasswordInput,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'

import '@mantine/core/styles/ScrollArea.css'
import '@mantine/core/styles/UnstyledButton.css'
import '@mantine/core/styles/VisuallyHidden.css'
import '@mantine/core/styles/Paper.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/CloseButton.css'
import '@mantine/core/styles/Group.css'
import '@mantine/core/styles/Loader.css'
import '@mantine/core/styles/Overlay.css'
import '@mantine/core/styles/ModalBase.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/InlineInput.css'
import '@mantine/core/styles/Flex.css'
import '@mantine/core/styles/FloatingIndicator.css'

// import '@mantine/core/styles/Paper.css'
// import '@mantine/core/styles/Popover.css'
// import '@mantine/core/styles/ModalBase.css'
// import '@mantine/core/styles/Overlay.css'
// import '@mantine/core/styles/CloseButton.css'
// import '@mantine/core/styles/UnstyledButton.css'
// import '@mantine/core/styles/LoadingOverlay.css'
// import '@mantine/core/styles/Loader.css'
// import '@mantine/core/styles/ScrollArea.css'

import '@mantine/core/styles/Checkbox.css'
import '@mantine/core/styles/Avatar.css'
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Grid.css'
import '@mantine/core/styles/Modal.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Rating.css'
import '@mantine/core/styles/Tabs.css'
import '@mantine/core/styles/Slider.css'
import '@mantine/core/styles/PasswordInput.css'
import '@mantine/core/styles/Tooltip.css'
import '@mantine/core/styles/Menu.css'
import '@mantine/core/styles/Image.css'
import '@mantine/core/styles/Drawer.css'
//new

import '@mantine/core/styles/Combobox.css'
export const theme = createTheme({
  /* Put your mantine theme override here */
  components: {
    Modal: Modal.extend({
      defaultProps: {
        w: 500,
      },
      styles: {
        content: {
          width: 500,
          padding: 5,
          borderRadius: 8,
        },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: 8,
        justify: 'center',
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        },
      },
      vars: (_, props) => {
        if (props.variant === 'filled') {
          return {
            root: {
              '--button-bg': '#fcd34d',
              '--button-color': 'black',
              '--button-bd': '#fcd34d',
              '--button-hover': '#fbdf88',
            },
          }
        }
        return {
          root: {
            '--button-bg': '#29a200',
            '--button-hover': '#70bd56',
          },
        }
      },
      styles: {
        inner: {
          margin: 'auto',
        },
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: 6,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 6,
        height: 30,
        pos: 'relative',
        pb: 20,
        mb: 0,
      },
      styles: {
        input: {
          minHeight: 30,
          height: 30,
          marginBottom: 0,
        },
        error: {
          position: 'absolute',
          bottom: 0,
        },
        wrapper: {
          marginBottom: 0,
        },
        label: {
          marginBottom: 4,
        },
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: 6,
        height: 30,
        pos: 'relative',
        pb: 20,
        mb: 0,
      },
      styles: {
        input: {
          minHeight: 30,
          height: 30,
          marginBottom: 0,
        },
        error: {
          position: 'absolute',
          bottom: 0,
        },
        wrapper: {
          marginBottom: 0,
        },
        label: {
          marginBottom: 4,
        },
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        radius: 6,
        mih: 30,
      },
      styles: {
        input: {
          minHeight: 30,
        },
        label: {
          marginBottom: 4,
        },
      },
    }),
    RangeSlider: RangeSlider.extend({
      defaultProps: {
        color: '#03a92182',
        size: 'sm',
      },
      styles: {
        label: {
          marginBottom: 4,
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: 6,
        height: 30,
      },
      styles: {
        input: {
          cursor: 'pointer',
          minHeight: 30,
          height: 30,
        },
        label: {
          marginBottom: 4,
        },
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        color: 'green',
      },
      styles: {
        input: {
          cursor: 'pointer',
        },
        error: {
          position: 'absolute',
          bottom: -10,
        },
        label: {
          marginBottom: 4,
        },
      },
    }),
    Drawer: Drawer.extend({
      styles: {
        header: {
          borderBottom: `1px solid #c6c6c6`,
          padding: '10px 20px',
          minHeight: 'unset',
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        body: {
          paddingTop: 20,
        },
      },
    }),
  },
  fontSizes: {
    md: '14px', // Default cho Desktop
  },
  breakpoints: {
    sm: '568px',
    md: '768px',
  },
})

const MantineConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <style>
        {`
          @media (max-width: 768px) {
            :root {
              --mantine-font-size-md: 13px; /* Font size 13px cho mobile */
            }
          }
        `}
      </style>

      {children}
    </MantineProvider>
  )
}

export default MantineConfig

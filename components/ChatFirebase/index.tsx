'use client'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useUserData from '@/hooks/useUserData'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '@/configs/images'

import { getDataLocal, saveDataLocal } from '@/utils/functions'
import { LOCAL_STORAGE_KEY } from '@/constants/app'
import ClientApi from '@/services/clientApi'
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai'
import ChatMessage from '../ChatMessage'
import MyImage from '../MyImage'
import ItemChatDetail from '../ItemChatDetail'
import { Input } from '@mantine/core'
import { useDragControls, motion } from 'framer-motion'

export type DataMessage = {
  date: number
  content: string
  isAdmin?: boolean
  isSeen?: boolean
  attributes?: { [key: string]: any }
}

const ChatFirebase: NextPage = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const isDragging = useRef(false)
  const dbRef = useRef<FBRealtimeUtils | null>(null)
  const idBDRef = useRef<number | string>(0)
  const controls = useDragControls()

  const [listChats, setListChats] = useState<DataMessage[]>([])
  const { userData } = useUserData()
  const [content, setContent] = useState('')
  const [enableChat, setEnableChat] = useState(false)
  const [isSendMuchMessages, setIsSendMuchMessages] = useState(false)
  const [position] = useState({ right: 20, bottom: 20 })

  useEffect(() => {
    const createDB = (keyName: string | number) => {
      idBDRef.current = keyName
      setIsSendMuchMessages(false)
      dbRef.current = new FBRealtimeUtils(`Chat/${keyName}`)
      setTimeout(() => {
        dbRef.current?.listenerOnValue(async (message: DataMessage[]) => {
          if (message.length > 0 && message[message.length - 1]?.isAdmin) {
            setIsSendMuchMessages(false)
          }

          setListChats(message)
        })
      }, 200)
    }

    if (userData?.sdt) {
      if (dbRef.current && dbRef.current.nameDB !== `Chat/${userData?.sdt}`) {
        dbRef.current?.remove().finally(() => {
          createDB(userData?.sdt!)
        })
      } else {
        createDB(userData?.sdt!)
      }
    } else {
      const iDLocalStorage = getDataLocal(LOCAL_STORAGE_KEY.IDChatMessages)
      const timeStamp = iDLocalStorage || Date.now()
      if (!iDLocalStorage) {
        saveDataLocal(LOCAL_STORAGE_KEY.IDChatMessages, timeStamp)
      }
      createDB(timeStamp)
    }
  }, [userData])

  useEffect(() => {
    if (enableChat) {
      setListChats((pre) => {
        const obUpdate: { [key: string | number]: any } = {}
        const arrTemp: DataMessage[] = pre.map((e) => {
          const itemSeen = { ...e, isSeen: true }
          if (itemSeen.isAdmin) {
            obUpdate[itemSeen.date] = itemSeen
          }
          return itemSeen
        })
        if (dbRef.current) {
          dbRef.current.update(obUpdate)
        }
        return arrTemp
      })
    }
  }, [enableChat])

  const checkValidMess = (): boolean => {
    let isErrorSendMuchMessages = false
    let numberRequest = 0

    listChats.forEach((e) => {
      isErrorSendMuchMessages = false
      if (e.isAdmin) {
        numberRequest = 0
      } else {
        if (numberRequest === 3) {
          isErrorSendMuchMessages = true
        } else {
          numberRequest++
        }
      }
    })

    return !isErrorSendMuchMessages
  }

  const handleSend = async () => {
    const isValidSend = checkValidMess()

    if (isValidSend) {
      const text = content
      if (content?.trim()) {
        setContent('')

        const toDateNumber = Date.now()
        const body: DataMessage = {
          content: text,
          date: toDateNumber,
        }
        await dbRef.current?.create({
          [toDateNumber]: body,
        })
        ClientApi.sendNotiNewChatMessages(idBDRef.current.toString())
      }
    } else {
      setIsSendMuchMessages(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    isDragging.current = true
    e.preventDefault()
  }

  const handleClick = () => {
    if (!isDragging.current) {
      setEnableChat(true)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  const renderAmountNewMessage = () => {
    const amountNew = listChats.filter((e) => !e.isSeen && e.isAdmin).length
    if (amountNew === 0) {
      return <></>
    }
    return (
      <div className='absolute top-[-10px] right-[-10px] bg-red-300 px-2 py-1   rounded-[50%] text-[10px]  '>
        {amountNew}
      </div>
    )
  }

  if (userData?.isAdmin) {
    return <></>
  }

  return (
    <div
      style={{
        right: enableChat ? 20 : position.right,
        bottom: enableChat ? 20 : position.bottom,
      }}
      className='fixed z-[11]'
    >
      {enableChat ? (
        <div
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px 1px',
          }}
          className='flex animate-zoom flex-col w-[300px] rounded-md relative overflow-hidden   bg-white'
        >
          <div className='flex justify-between px-3 py-1  items-center bg-green-300'>
            <div>Chat</div>

            <div className='text-black text-xl'>
              <AiOutlineCloseCircle
                className='cursor-pointer'
                onClick={() => setEnableChat(false)}
              />
            </div>
          </div>

          <div className=' relative flex flex-col flex-1 min-h-[400px] max-h-[400px] overflow-y-auto'>
            <ChatMessage isLoadMore={false} isReverse loading={false} data={listChats}>
              <div className='flex w-full justify-start'>
                <div
                  style={{
                    borderRadius: 8,
                    borderBottomLeftRadius: 0,
                  }}
                  className='px-3  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: translate('chat.helloUser'),
                    }}
                  />
                </div>
              </div>

              {listChats.map((e: DataMessage) => {
                return <ItemChatDetail data={e} key={e.date} />
              })}
              {isSendMuchMessages && (
                <div className='w-full px-3 text-center text-[12px] text-red-400'>
                  {translate('errors.sendMuchMessages')}
                </div>
              )}
            </ChatMessage>
          </div>

          <div className='flex w-full border-t-[1px] border-gray-300'>
            <div className='flex flex-1'>
              <Input
                onKeyDown={handleKeyDown}
                value={content}
                placeholder={translate('placeholder.enterContent')}
                onChange={(text) => setContent(text.target.value)}
                className='w-full !pl-2 '
                styles={{
                  input: {
                    border: 0,
                    paddingLeft: 5,
                  },
                }}
              />
              <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                <AiOutlineSend onClick={handleSend} className='cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          drag
          // dragListener={false}
          dragConstraints={{
            left: -window.innerWidth + 50,
            right: 20,
            top: -window.innerHeight + 50,
            bottom: 0,
          }}
          style={{ touchAction: 'none' }}
          animate={false}
          dragControls={controls}
          dragElastic={false}
          onDrag={(e: any) => {
            console.log({ onDrag: e })
            handleMouseMove(e)
          }}
          onDragEnd={() => {
            if (isMobile && !isDragging.current) {
              handleClick()
            }

            setTimeout(() => {
              isDragging.current = false
            }, 200)
          }}
        >
          <div onClick={handleClick} className='relative'>
            <MyImage
              alt='icon-message-chat'
              src={images.icon.iconMessageChat}
              className='!relative select-none !w-[40px] !h-[40px] drop-shadow-img'
            />
            {renderAmountNewMessage()}
            <div
              onClick={handleClick}
              className='absolute inset-0 w-full h-full z-10 cursor-pointer '
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ChatFirebase

'use client';

import React, { FC, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Button from '../ui/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handelClose = useCallback(() => {
    if(disabled) return;
    setShowModal(false)
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled])

  const handelSubmit = useCallback(() => {
    if(disabled) return;
    onSubmit()
  }, [onSubmit, disabled])
  
  if(!isOpen) return null;

  return (
    <div className='flex justify-center items-center max-md:items-end bg-neutral-800/70 fixed top-0 z-50 w-full h-full'>
      {/* Content */}
      <div className={`translate duration-300 bg-white sm:rounded-md max-sm:rounded-t-md w-full md:w-4/6 lg:w-3/6 xl:w-2/5 ${showModal? 'translate-y-0': 'translate-y-full'} `}>
        {/* Header */}
        <div className="flex item-center justify-center p-6 rounded-t border-b-[1px] relative w-full">
          <button className='p-1 border-0 outline-none hover:opacity-70 transition absolute left-9' onClick={handelClose}>
            <IoMdClose size={18} />
          </button>
          <div className="text-lg font-semibold">
            {title}
          </div>
        </div>
        {/* Body */}
        <div className="relative p-6 flex-auto">
          {body}
        </div>
        <div className="flex flex-col gap-2 p-6">
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-4 
              w-full
            "
          >
            {secondaryAction && secondaryLabel && (
              <Button 
                disabled={disabled} 
                label={secondaryLabel} 
                onClick={secondaryAction}
                outline
              />  
            )}
            <Button label={actionLabel} onClick={handelSubmit} />
          </div>
          {footer}
        </div>
      </div>
    </div>
  )
}

export default Modal
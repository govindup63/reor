import React, { useRef, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hideCloseButton?: boolean;
  tailwindStylesOnBackground?: string;
}

const ReorModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  hideCloseButton,
  tailwindStylesOnBackground,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // const widthClass = getDimension(widthType as ModalWidthType);

  const handleOffClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOffClick);
    return () => {
      document.removeEventListener('mousedown', handleOffClick);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-40 ${tailwindStylesOnBackground}`}
    >
      <div
        ref={modalRef}
        className='bg-dark-gray-c-three rounded-lg shadow-xl  max-w-4xl max-h-3xl flex flex-col justify-center items-center border-solid border-gray-600 border'
      >
        <div className='w-full items-end border-b border-gray-700 px-4 h-0 z-50'>
          {!hideCloseButton && (
            <div className='flex justify-end m-2'>
              <button
                onClick={onClose}
                className='w-5 h-5 flex items-center justify-center text-gray-600 cursor-pointer bg-transparent border-none hover:bg-slate-700 hover:bg-opacity-40'
              >
                <span className='text-3xl leading-none'>&times;</span>
              </button>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ReorModal;

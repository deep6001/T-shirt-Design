import React from 'react';
import CustomButton from './CustomButton';

const Aipicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  const handleChange = (e) => {
    setPrompt(e.target.value); // Fix the function to set the prompt value
  };

  return (
    <div className='aipicker-container '>
      <textarea
          placeholder='Ask AI...'
          rows={5}
          value={prompt}
          onChange={handleChange} 
          className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
            type='outline'
            title='Asking AI...'
            customStyle='text-xs'
          />
        ) : (
          <>
            <CustomButton
                type='outline'
                title='AI Logo'
                handleClick={() => handleSubmit('logo')}
                customStyle='text-xs'
            />
            <CustomButton
              type='filled'
              title='AI Full'
              handleClick={() => handleSubmit('full')}
              customStyle='text-xs'
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Aipicker;

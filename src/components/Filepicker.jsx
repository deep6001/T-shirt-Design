import React from 'react';
import CustomButton from './CustomButton';

const Filepicker = ({ file, setFile, readFile }) => {
  const handleFileChange = (e) => {
    // Use e.target.files[0] to get the selected file
    setFile(e.target.files[0]);
  };

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          type="file"
          id='file-upload'
          accept='image/*'
          onChange={handleFileChange}
          // Use onChange event and handleFileChange function
        />
        <label
          htmlFor="file-upload"
          className='filepicker-label'
        >
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'no file selected' : file.name}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyle='text-xs'
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyle='text-xs'
        />
      </div>
    </div>
  );
};

export default Filepicker;

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import { download, logoShirt, stylishShirt } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import {
  CustomButton,
  Aipicker,
  Colorpicker,
  Filepicker,
  Tab
} from '../components';
import state from '../store';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile]=useState('');
  const [prompt, setPrompt]=useState('');
  const [genratingImg, setGenratingImg]=useState(false);
  const [activeEditorTab, setActiveEditorTab]=useState('');
  const [activeFillterTab, setActiveFillterTab]=useState({
                                                          logoShirt:true,
                                                          stylishShirt:false
                                                        }
                                                        );



  const generateTabContent=()=>{
      switch (activeEditorTab){
        case 'colorPicker':
          return <Colorpicker></Colorpicker>

        case 'filePicker':
          return <Filepicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                  ></Filepicker>
        
        case 'aiPicker':
          return <Aipicker
              prompt={prompt}
              setPrompt={setPrompt}
              genratingImg={genratingImg}
              handleSubmit={handleSubmit}
              />
        default:
          return null;

      }
  }
  const handleSubmit = async (type) => {
    // Check if prompt is not empty
    if (!prompt) return alert('Enter the prompt');
  
    try {
      setGenratingImg(true);
      // Make API request
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      // Process the API response
      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (err) {
      alert(err);
    } finally {
      setGenratingImg(false);
      setActiveEditorTab('');
    }
  };
  

  const handleTabClick = (tabName) => {
    setActiveEditorTab(tabName);

  };
  const handleDecals=(type,result)=>{
    const decalType=DecalTypes[type];
    state[decalType.stateProperty]=result;
    if(!activeFillterTab[decalType.FilterTabs]){
      handleActiveFillterTab(decalType.FilterTabs)
    }
  }
  const readFile=(type)=>{
      reader(file)
      .then((result)=>{
         handleDecals(type,result);
         setActiveEditorTab('');
      })
  }
  const handleActiveFillterTab=(tabName)=>{
      switch(tabName){
        case "logoShirt":
          state.isLogoTexture=!activeFillterTab[tabName];
          break;
        case 'stylishShirt':
          state.isFullTexture=!activeFillterTab[tabName];
          break;
        

        default:
          state.isFullTexture=false;
          state.isLogoTexture=true;

      }
      setActiveFillterTab((prevstate)=>{
        return {
          ...prevstate,
          [tabName]:!prevstate[tabName]
        }
      })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-0'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name)
                    }}
                  />

                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
         
          <motion.div
          className='absolute z10 top-5 right-5'
          {...fadeAnimation}>

            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={()=>state.intro=true}
              customStyle='w-fit px-4 py-2.5 font-bold text-sm'
            >

            </CustomButton>

          </motion.div>


          <motion.div
          className='filtertabs-container'
          {...slideAnimation('up')}>
              {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=""
                    handleClick={() => {
                     
                    }}
                  />
                ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;

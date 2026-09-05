'use client'

import CodeFile from '../components/CodeFile';
import CodeFileNameTab from '../components/CodeFileNameTab';
import { useState } from 'react';
import styles from '../styles/home-layout.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from '../types/Files';
import SectionLinks from '../components/SectionLinks';

export default function Home() {
  const [showLinks, setShowLinks] = useState<boolean>(true);
  const [activeScreenQuarter, setActiveScreenQuarter] = useState<number>(1); 
  console.log(activeScreenQuarter);
  const [fileData, setFileData] = useState<FileData[]> ([
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, fileOpen: true, activeFileInQuarter: true },
    { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true },
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Spare Testing', lineCount: 8, fileOpen: true, activeFileInQuarter: false },
    { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, fileOpen: true, activeFileInQuarter: true },
  ])

  const updateFileScreenQuarter = (fileKey: string, newQuarter: number) : void => {
    const newFileData : FileData[] = fileData.map(f => {
      if (f.key !== fileKey) return f
      return ({
        ...f,
        screenQuarter: newQuarter
      })
    })

    setFileData(newFileData);
  }

  const updateQuarterActiveFile = (fileKey: string) : void => {
    const quarterOfClickedFile = fileData.find(f => f.key === fileKey)!.screenQuarter;

    const newFileData : FileData[] = fileData.map(f => {
      if (f.key !== fileKey && f.screenQuarter !== quarterOfClickedFile) return f;
      if (f.key !== fileKey && f.screenQuarter === quarterOfClickedFile) return ({
        ...f,
        activeFileInQuarter: false
      })
      return ({
        ...f,
        activeFileInQuarter: true
      })
    });

    setFileData(newFileData);
  }

  const updateActiveScreenQuarter = (newQuarter: number) : void => setActiveScreenQuarter(newQuarter);

  //Passed into CodeFileNameTab components to trigger on clicking cross button
  const closeFile = (fileKey: string) : void => {
    //Need to update next file in quarter as activeFileInQuarter = true if multiple in quarter array from closed file
    //Get quarter of closed file for use in updating activeFileInQuarter
    const closedFileQuarter : number = fileData.find(f => f.key === fileKey)!.screenQuarter;

    //Need key of first file in the same quarter of closed file to set as activeFileInQuarter
    //May not be other files open in same quarter, filter matching first then get key of index 0 if exists
    const matchingQuarterFiles : FileData[] = fileData.filter(f => f.key !== fileKey && f.screenQuarter === closedFileQuarter);
    const firstFileKeyMatchingQuarter : string = matchingQuarterFiles.length > 0 ? matchingQuarterFiles[0].key : '';

    const newFileData : FileData[] = fileData.map(f => {
      if (f.key !== fileKey && f.key !== firstFileKeyMatchingQuarter) return f;
      if (f.key === firstFileKeyMatchingQuarter) return ({
        ...f,
        activeFileInQuarter: true
      })
      return ({
        ...f,
        screenQuarter: 0,
        fileOpen: false
      });
    });

    setFileData(newFileData);
  }

  const openFile = (fileKey : string) : void => {
    //Each file can only be open once, early return if already open
    if (fileData.find(f => f.key === fileKey)!.fileOpen) return;

    const newFileData : FileData[] = fileData.map(f => {
      //No changes for files that don't match and are in a different quarter of screen to current active
      if(f.key !== fileKey && f.screenQuarter !== activeScreenQuarter) return f;
      //Only one file per quarter of screen can have activeFileInQuarter as true to display content
      if(f.key !== fileKey && f.screenQuarter === activeScreenQuarter) return ({
        ...f,
        activeFileInQuarter: false
      })
      return ({
        ...f,
        fileOpen: true,
        screenQuarter: activeScreenQuarter,
        activeFileInQuarter: true
      })
    });

    console.log(newFileData);

    setFileData(newFileData);
  }

  const quarterFiles: FileData[][] = [[], [], [], []];

  fileData.forEach(f => {
    if (!f.fileOpen) return;
    quarterFiles[f.screenQuarter - 1].push(f);
  })

  return (
    <div className={styles.window}>
      <div className={`${styles.topScreenBar} ${styles.rowFlex} `}>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconRed} `}></div>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconYellow} `}></div>
        <div className={` ${styles.windowControlContainer} ${styles.windowIconGreen} `}></div>
      </div>

      <div className={`${styles.homeContainer} ${styles.rowFlex} `}>
        <div className={styles.iconsPane}>
          <p>icons</p>
        </div>
        <div className={styles.filesPane}>
          <div className={`${globalStyles.rowFlex}`}>
            <button onClick={() => setShowLinks(!showLinks)}>{`>`}</button>
            <p>My Portfolio</p>
          </div>
          {
            showLinks && <SectionLinks files={fileData} sectionName='Home Page' openFile={openFile} />
          }
        </div>

        <div className={`${styles.rowFlex} ${styles.contentPane}`}>
          {
            (quarterFiles[0].length > 0 || quarterFiles[1].length > 0) &&
            (
              <div className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`}>
                { quarterFiles[0].length > 0 &&
                  <div className={`${codeFileStyles.screenQuarterContainer}`} onClick={() => updateActiveScreenQuarter(1)}>
                    <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                      {
                        quarterFiles[0].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} closeFile={closeFile} setActiveFileInQuarter={updateQuarterActiveFile} />)
                      }
                    </div>
                    {
                      quarterFiles[0].length > 0 && <CodeFile file={quarterFiles[0].filter(f => f.activeFileInQuarter)[0]} />
                    }
                  </div>
                }
                { quarterFiles[1].length > 0 &&
                  <div className={`${codeFileStyles.screenQuarterContainer}`}  onClick={() => updateActiveScreenQuarter(2)}>
                    <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                      {
                        quarterFiles[1].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} closeFile={closeFile} setActiveFileInQuarter={updateQuarterActiveFile} />)
                      }
                    </div>
                    {
                      quarterFiles[1].length > 0 && <CodeFile file={quarterFiles[1].filter(f => f.activeFileInQuarter)[0]} />
                    }
                  </div>
                }
              </div>
            )
          }
          {
            (quarterFiles[2].length > 0 || quarterFiles[3].length > 0) &&
            (
              <div className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`}>
                { quarterFiles[2].length > 0 &&
                  <div className={`${codeFileStyles.screenQuarterContainer}`}  onClick={() => updateActiveScreenQuarter(3)}>
                    <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                      {
                        quarterFiles[2].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} closeFile={closeFile} setActiveFileInQuarter={updateQuarterActiveFile} />)
                      }
                    </div>
                    {
                      quarterFiles[2].length > 0 && <CodeFile file={quarterFiles[2].filter(f => f.activeFileInQuarter)[0]} />
                    }
                  </div>
                }
                { quarterFiles[3].length > 0 &&
                  <div className={`${codeFileStyles.screenQuarterContainer}`}  onClick={() => updateActiveScreenQuarter(4)}>
                    <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                      {
                        quarterFiles[3].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} activeFileInQuarter={f.activeFileInQuarter} closeFile={closeFile} setActiveFileInQuarter={updateQuarterActiveFile} />)
                      }
                    </div>
                    {
                      quarterFiles[3].length > 0 && <CodeFile file={quarterFiles[3].filter(f => f.activeFileInQuarter)[0]} />
                    }
                  </div>
                }
              </div>
            )
          }
        </div>
      </div>

      <div className={styles.bottomScreenBar}>
        <div>footer</div>
      </div>
    </div>
  );
}
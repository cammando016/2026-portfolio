'use client'

import CodeFile from '../components/CodeFile';
import CodeFileNameTab from '../components/CodeFileNameTab';
import { useState } from 'react';
import styles from '../styles/home-layout.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from '../types/Files';
import { useFileDataStore } from '../store/fileDataStore';
import SectionLinks from '../components/SectionLinks';

export default function Home() {
  const [showLinks, setShowLinks] = useState<boolean>(true);
  const [activeScreenQuarter, setActiveScreenQuarter] = useState<number>(1); 
  const fileData = useFileDataStore(state => state.fileData);
  const closeFile = useFileDataStore(state => state.closeFile);
  const openFile = useFileDataStore(state => state.openFile);
  const updateFileScreenQuarter = useFileDataStore(state => state.updateFileScreenQuarter);
  const updateQuarterActiveFile = useFileDataStore(state => state.updateQuarterActiveFile);
  const updateActiveScreenQuarter = useFileDataStore(state => state.updateActiveScreenQuarter);

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
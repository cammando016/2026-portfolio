'use client'

import CodeFile from '../components/CodeFile';
import CodeFileNameTab from '../components/CodeFileNameTab';
import styles from '../styles/home-layout.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from '../types/Files';
import { useFileDataStore } from '../store/fileDataStore';

export default function Home() {
  const fileData = useFileDataStore(state => state.fileData);
  const closeFile = useFileDataStore(state => state.closeFile);
  const updateFileScreenQuarter = useFileDataStore(state => state.updateFileScreenQuarter);
  const updateQuarterActiveFile = useFileDataStore(state => state.updateQuarterActiveFile);
  const updateActiveScreenQuarter = useFileDataStore(state => state.updateActiveScreenQuarter);

  const quarterFiles: FileData[][] = [[], [], [], []];

  fileData.forEach(f => {
    if (!f.fileOpen) return;
    quarterFiles[f.screenQuarter - 1].push(f);
  })

  return (
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
  );
}
'use client'

import CodeFile from '../components/CodeFile';
import CodeFileNameTab from '../components/CodeFileNameTab';
import { useState } from 'react';
import styles from '../styles/home-layout.module.scss';
import codeFileStyles from '../styles/codeFile.module.scss';
import globalStyles from '../styles/global.module.scss';
import { FileData } from '../types/Files';

export default function Home() {
  const [fileData, setFileData] = useState<FileData[]> ([
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'About Me', lineCount: 20, fileOpen: true, activeFileInQuarter: true },
    { key: crypto.randomUUID(), screenQuarter: 2, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true },
    { key: crypto.randomUUID(), screenQuarter: 1, fileName: 'Github Graph', lineCount: 6, fileOpen: true, activeFileInQuarter: true },
    { key: crypto.randomUUID(), screenQuarter: 4, fileName: 'Contact', lineCount: 15, fileOpen: true, activeFileInQuarter: true },
  ])

  const updateScreenQuarter = (fileKey: string, newQuarter: number) => {
    const newFileData = fileData.map(f => {
      if (f.key !== fileKey) return f
      return ({
        ...f,
        screenQuarter: newQuarter
      })
    })

    setFileData(newFileData);
  }

  const quarterFiles: FileData[][] = [[], [], [], []];

  fileData.forEach(f => {
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
          <p>links</p>
        </div>

        <div className={`${styles.rowFlex} ${styles.contentPane}`}>
          {
            (quarterFiles[0].length > 0 || quarterFiles[1].length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarterFiles[0].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarterFiles[0].length > 0 && <CodeFile file={quarterFiles[0][0]} />
                  }
                </div>

                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarterFiles[1].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarterFiles[1].length > 0 && <CodeFile file={quarterFiles[1][0]} />
                  }
                </div>
              </div>
            )
          }
          {
            (quarterFiles[2].length > 0 || quarterFiles[3].length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarterFiles[2].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarterFiles[2].length > 0 && <CodeFile file={quarterFiles[2][0]} />
                  }
                </div>

                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarterFiles[3].map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarterFiles[3].length > 0 && <CodeFile file={quarterFiles[3][0]} />
                  }
                </div>
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

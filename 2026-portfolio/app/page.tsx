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

  const quarter1Files = fileData.filter(f => f.screenQuarter === 1 && f.fileOpen);
  const quarter2Files = fileData.filter(f => f.screenQuarter === 2 && f.fileOpen);
  const quarter3Files = fileData.filter(f => f.screenQuarter === 3 && f.fileOpen);
  const quarter4Files = fileData.filter(f => f.screenQuarter === 4 && f.fileOpen);
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
            (quarter1Files.length > 0 || quarter2Files.length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarter1Files.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarter1Files.length > 0 && <CodeFile file={quarter1Files[0]} />
                  }
                </div>

                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarter2Files.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarter2Files.length > 0 && <CodeFile file={quarter2Files[0]} />
                  }
                </div>
              </div>
            )
          }
          {
            (quarter3Files.length > 0 || quarter4Files.length > 0) &&
            (
              <div className={`${styles.verticalFileSplit}`}>
                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarter3Files.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarter3Files.length > 0 && <CodeFile file={quarter3Files[0]} />
                  }
                </div>

                <div>
                  <div className={`${codeFileStyles.fileBar} ${codeFileStyles.container} ${globalStyles.rowFlex}`}>
                    {
                      quarter4Files.map(f => <CodeFileNameTab key={f.key} fileName={f.fileName} fileKey={f.key} />)
                    }
                  </div>
                  {
                    quarter4Files.length > 0 && <CodeFile file={quarter4Files[0]} />
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

'use client'

import { useHomeFileDataStore } from '../store/homeFileDataStore';
import MainContentSection from '../components/MainContentSection';

export default function Home() {
  const fileData = useHomeFileDataStore(state => state.fileData);
  return <MainContentSection fileData={fileData} />
}
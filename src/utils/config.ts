import { resolve, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// 폴더 경로를 src 폴더 기준으로 받고, 폴더가 있는지 확인 / 없으면 생성하는 함수
export const createFolder = (folderPath: string) => {
  if (!folderPath) {
    throw new Error('folderPath is required');
  }
  const path = join(__dirname, '..', folderPath); // 상대 경로 설정
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

// 프로그램 동작 시에 필요한 폴더를 생성하는 함수
export const initialConfigFolder = () => {
  try {
    createFolder('media/user_profile');
  } catch (error) {
    console.error('폴더 생성 중 오류 발생:', error);
  }
}

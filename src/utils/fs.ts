import { USER_PROFILE_PATH } from './config';

import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

/** 프로필 이미지 파일 이름을 받고 프로필 폴더에서 이미지를 삭제 */
export const deleteUserProfile = (profile: string) => {
  const path = join(__dirname, '..', USER_PROFILE_PATH, profile);
  if (existsSync(path)) {
    unlinkSync(path);
  }
}

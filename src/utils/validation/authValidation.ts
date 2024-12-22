interface ValidSignUpInput {
  username: string;
  email: string;
  password: string;
}
export const validSignUpInput = (validProps: ValidSignUpInput) => {
  if (!validProps.username || !validProps.email || !validProps.password) {
    throw new Error('Username, Email, Password are required');
  }
  return;
}

// 사용자가 입력한 로그인 정보가 유효한지 확인하는 함수
interface ValidSignInInput {
  email: string;
  password: string;
}
export const validSignInInput = (validProps: ValidSignInInput) => {
  if (!validProps.email || !validProps.password) {
    throw new Error('Email and Password are required');
  }
  return;
}

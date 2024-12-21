# MEMO 

1. UserToken 테이블과 User 테이블의 조인 조건문 수정
    - 1. User 테이블에서 'token' 컬럼 코드 삭제 
    - 2. Token 조인 조건을 OneToOne으로 수정

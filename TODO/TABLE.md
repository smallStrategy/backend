# 데이터베이스 테이블 설계 작업 순서

이 프로젝트에서는 PostgreSQL을 사용하여 테크 매거진/블로그 플랫폼의 데이터베이스를 설계합니다. 아래는 각 테이블을 설정하고 관련 작업을 진행할 순서입니다.

## 1. 사용자 관리 테이블 설정

- [x] **사용자 테이블 (Users)**: 사용자의 기본 정보와 계정 관리를 위한 테이블을 생성합니다.
  - `id`, `email`, `password_hash`, `username`, `profile_picture`, `bio`, `created_at`, `updated_at` 필드 추가

## 2. 게시글 관리 테이블 설정

- [ ] **게시글 테이블 (Posts)**: 사용자가 작성한 게시글을 관리합니다.
  - `id`, `user_id`, `title`, `content`, `slug`, `created_at`, `updated_at`, `status` 필드 추가
  - `user_id`는 `users` 테이블의 외래키로 연결

## 3. 댓글 관리 테이블 설정

- [ ] **댓글 테이블 (Comments)**: 게시글에 달린 댓글을 관리합니다.
  - `id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at` 필드 추가
  - `post_id`는 `posts` 테이블의 외래키로 연결
  - `user_id`는 `users` 테이블의 외래키로 연결

## 4. 태그 관리 테이블 설정

- [ ] **태그 테이블 (Tags)**: 게시글에 태그를 붙여서 분류하고 검색할 수 있도록 관리합니다.
  - `id`, `name`, `created_at` 필드 추가

## 5. 게시글-태그 다대다 관계 테이블 설정

- [ ] **게시글-태그 관계 테이블 (Post_Tags)**: 게시글과 태그 간의 다대다 관계를 처리하는 테이블을 생성합니다.
  - `post_id`, `tag_id` 필드 추가
  - `post_id`는 `posts` 테이블의 외래키, `tag_id`는 `tags` 테이블의 외래키로 연결
  - `post_id`, `tag_id` 합성 Primary Key 설정

## 6. 좋아요 관리 테이블 설정

- [ ] **좋아요 테이블 (Likes)**: 게시글에 대한 좋아요를 관리합니다.
  - `id`, `post_id`, `user_id`, `created_at` 필드 추가
  - `post_id`는 `posts` 테이블의 외래키, `user_id`는 `users` 테이블의 외래키로 연결

## 7. 북마크 관리 테이블 설정

- [ ] **북마크 테이블 (Bookmarks)**: 사용자가 북마크한 게시글을 관리합니다.
  - `id`, `post_id`, `user_id`, `created_at` 필드 추가
  - `post_id`는 `posts` 테이블의 외래키, `user_id`는 `users` 테이블의 외래키로 연결

## 8. 알림 관리 테이블 설정

- [ ] **알림 테이블 (Notifications)**: 사용자에게 전달할 알림을 관리합니다.
  - `id`, `user_id`, `type`, `message`, `read`, `created_at` 필드 추가
  - `user_id`는 `users` 테이블의 외래키로 연결

## 9. 관리자 작업 테이블 설정

- [ ] **관리자 작업 테이블 (Admin Actions)**: 관리자가 게시글 및 사용자 관리 작업을 기록합니다.
  - `id`, `user_id`, `action`, `created_at` 필드 추가
  - `user_id`는 `users` 테이블의 외래키로 연결

---

## 우선순위 및 진행 순서

1. 사용자 관련 테이블부터 시작하여 사용자 인증 및 계정 관리 기능을 구현합니다.
2. 게시글 및 댓글 관리 기능을 설정하여 콘텐츠 생성 및 관리가 가능하게 만듭니다.
3. 태그 및 게시글-태그 관계 테이블을 설정하여 콘텐츠의 분류 및 검색을 지원합니다.
4. 좋아요 및 북마크 기능을 통해 사용자 피드백 기능을 추가합니다.
5. 알림 테이블을 설정하여 사용자에게 알림을 제공하는 시스템을 구축합니다.
6. 관리 작업 테이블을 추가하여 관리자가 사용자 및 콘텐츠를 관리할 수 있도록 합니다.

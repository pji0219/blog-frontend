// n초 뒤에 실행 되게하는 promise
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
  {
    id: 1,
    title: '포스트1',
    desc: '포스트1 입니다.'
  },
  {
    id: 2,
    title: '포스트2',
    desc: '포스트2 입니다.'
  },
  {
    id: 3,
    title: '포스트3',
    desc: '포스트3 입니다.'
  },
  {
    id: 4,
    title: '포스트4',
    desc: '포스트4 입니다.'
  },
]

export const PostsAPI = async () => {
  await sleep(1000);
  return posts;
}
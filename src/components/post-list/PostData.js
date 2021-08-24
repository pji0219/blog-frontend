import js from './js.png';

// n초 뒤에 실행 되게하는 promise
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// 'wrwrwerwerwerwerewrwrwrwrwrwrwrwrwrwrwrwrwrwrwrwrrertyyyyyyyyttttttttttwerwerwerwerwerwerwerwerwerwerwerwer'
const posts = [
  {
    id: 1,
    img: js,
    title: '포스트1',
    desc: '포스트1 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 2,
    img: js,
    title: '포스트2',
    desc: '포스트2 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 3,
    img: js,
    title: '포스트3',
    desc: '포스트3 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 4,
    img: js,
    title: '포스트4',
    desc: '포스트4 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 5,
    img: js,
    title: '포스트5',
    desc: '포스트5 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 6,
    img: js,
    title: '포스트6',
    desc: '포스트6 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 7,
    img: js,
    title: '포스트7',
    desc: '포스트7 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 8,
    img: js,
    title: '포스트8',
    desc: '포스트8 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 9,
    img: js,
    title: '포스트9',
    desc: '포스트9 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 10,
    img: js,
    title: '포스트10',
    desc: '포스트10 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 11,
    img: js,
    title: '포스트11',
    desc: '포스트11 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
  {
    id: 12,
    img: js,
    title: '포스트12',
    desc: '포스트12 입니다.',
    date: '최근',
    user: 'administrator',
    comments: 7,
    views: 100,
  },
]

export const PostsAPI = async () => {
  await sleep(1000);
  return posts;
}
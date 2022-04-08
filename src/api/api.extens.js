import md5 from 'md5'

const extens = (slug, limit) => {
  const PUBLIC_KEY = `${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`;
  const PRIVATE_KEY = `${process.env.REACT_APP_MARVEL_PRIVATE_KEY}`;
  const timestamp = new Date().getTime();
  const stringToHash = timestamp + PRIVATE_KEY + PUBLIC_KEY;
  const hash = md5(stringToHash);
  const result = `${slug}?limit=${limit}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`

  return result
}

export default extens;
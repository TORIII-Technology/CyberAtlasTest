const fetcher = (...args) => fetch(...args).then((res) => res.json())

// 若API速度太快，可增加延遲時間用
// const fetcher = (...args) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(fetch(...args).then(res => res.json()))
//     }, 1000)
//   })

export default fetcher

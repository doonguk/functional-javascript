export const curry = f => (a, ..._) => _.length ? f(a,..._) : (..._) => f(a, ..._)
// 함수를 특정 시점에 평가 할 수 있는 함수

export const map = curry((f, iter) => {
  let res = []
  for(const a of iter) res.push(f(a))
  return res
})

export const filter = curry((f,iter) => {
  let res = []
  for(const a of iter){
    if(f(a)) res.push(a)
  }
  return res
})

export const reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }
  for(const a of iter){
    acc = f(acc, a)
  }
  return acc
})

const go = (...args) => reduce((a, f) => f(a), args)
// 인자로 받은 값들을 다음 인자로 전달해 평가하여 값을 reduce 하는 함수

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs)
//축약된 함수를 리턴하는 함수 pipe함수에 값을 전달하면 go 함숭에 값이 전달~

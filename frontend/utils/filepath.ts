import { sep, join } from 'path'

export function fixLocalPath(path: string) {
  const splitPath = path.split(sep)
  let pathStartPos = 0

  for (let i = 0; i < splitPath.length; i++) {
    if (splitPath[i] === 'server') {
      pathStartPos = i + 1
    }
  }

  return join(process.cwd(), ...splitPath.slice(pathStartPos))
}
